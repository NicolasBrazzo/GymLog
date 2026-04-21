const express = require("express");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const protect = require("../middleware/auth");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato file non supportato. Usa PDF, JPG, PNG o WEBP."));
    }
  },
});

const PROMPT = `Analizza questa scheda di allenamento e restituisci SOLO un JSON valido, senza testo prima o dopo, senza backtick, senza markdown.

Schema atteso:
{
  "scheda": {
    "numero": <intero>,
    "atleta": "<Nome Cognome>",
    "durata_settimane": <intero>,
    "tipo": "<es. split 2>",
    "giorni": [
      {
        "id": "<lettera es. A>",
        "superset": [
          {
            "id": "<lettera es. A>",
            "recupero_secondi": <intero o null>,
            "esercizi": [
              {
                "id": "<es. A1>",
                "nome": "<nome esercizio>",
                "tipo_progressione": "<peso|tempo|corporeo>",
                "note_globali": "<stringa o null>",
                "settimane": [
                  {
                    "settimana": <intero>,
                    "serie": <intero>,
                    "ripetizioni": "<stringa, usa / come separatore se varia es. 8/6/6/4>",
                    "durata": "<stringa o null>",
                    "indicatore": "<+|=|null>",
                    "note": "<stringa o null>"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

Regole:
- tipo_progressione: "peso" se si usa bilanciere/manubri/macchine con carico, "tempo" se l'esercizio si misura in secondi/minuti, "corporeo" se a corpo libero senza carico
- ripetizioni: sempre stringa, usa "/" se il valore varia settimana per settimana
- indicatore: presente SOLO se la scheda riporta esplicitamente (+) o (=), altrimenti null
- note: cattura tutto fuori dal formato standard (es. "+zavorra", "P75", "+braccio")
- Se un campo è assente nella scheda, usa null`;

router.post("/parse", protect, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: "Nessun file ricevuto" });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return res.status(500).json({ ok: false, error: "Chiave Gemini non configurata" });
    }

    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const filePart = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    const result = await model.generateContent([PROMPT, filePart]);
    const rawText = result.response.text().trim();

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      console.error("Gemini raw output:", rawText);
      return res.status(422).json({
        ok: false,
        error: "Gemini non ha restituito JSON valido",
        raw: rawText,
      });
    }

    if (!parsed.scheda || !Array.isArray(parsed.scheda.giorni)) {
      return res.status(422).json({
        ok: false,
        error: "JSON non conforme allo schema atteso",
        data: parsed,
      });
    }

    return res.json({ ok: true, data: parsed });

  } catch (err) {
    if (err.message && err.message.includes("Formato file")) {
      return res.status(400).json({ ok: false, error: err.message });
    }
    console.error("PARSE ERROR:", err);
    return res.status(500).json({ ok: false, error: "Errore durante il parsing" });
  }
});

module.exports = router;
