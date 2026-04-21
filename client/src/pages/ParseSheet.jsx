import { useState, useRef } from "react";
import Loader from "../components/Loader";
import api from "../api/client";

const TAB_AI = "ai";
const TAB_JSON = "json";

export const ParseSheet = () => {
  const [tab, setTab] = useState(TAB_AI);

  // --- Tab AI ---
  const [file, setFile] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const inputRef = useRef(null);

  // --- Tab JSON ---
  const [jsonText, setJsonText] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importStats, setImportStats] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) { setFile(selected); setAiError(null); setAiResult(null); }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) { setFile(dropped); setAiError(null); setAiResult(null); }
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await api.post("/api/schede/parse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAiResult(res.data.data);
    } catch (err) {
      setAiError(err.response?.data?.error || err.message || "Errore durante il parsing");
    } finally {
      setAiLoading(false);
    }
  };

  const handleUseJson = () => {
    if (aiResult) {
      setJsonText(JSON.stringify(aiResult, null, 2));
      setTab(TAB_JSON);
    }
  };

  const handleImport = async (e) => {
    e.preventDefault();
    setImportError(null);
    setImportStats(null);

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      setImportError("JSON non valido — controlla la sintassi");
      return;
    }

    const scheda = parsed.scheda || parsed;
    if (!scheda.giorni) {
      setImportError("Campo 'giorni' mancante nel JSON");
      return;
    }

    setImportLoading(true);
    try {
      const res = await api.post("/api/schede/import", {
        scheda,
        name: sheetName,
        startDate,
        endDate: endDate || undefined,
      });
      setImportStats(res.data.data.stats);
    } catch (err) {
      setImportError(err.response?.data?.error || err.message || "Errore durante il salvataggio");
    } finally {
      setImportLoading(false);
    }
  };

  const s = {
    page: {
      minHeight: "100svh",
      background: "#212327",
      padding: "60px 16px 80px",
      fontFamily: "Inter, sans-serif",
    },
    header: { marginBottom: 24 },
    title: { fontSize: 28, fontWeight: 700, color: "#FEFCFC", margin: 0, letterSpacing: "-0.5px" },
    subtitle: { fontSize: 14, color: "rgba(254,252,252,0.40)", marginTop: 4 },
    tabStrip: {
      display: "flex",
      background: "#1E2023",
      borderRadius: 12,
      padding: 4,
      marginBottom: 20,
    },
    tab: (active) => ({
      flex: 1,
      height: 36,
      border: "none",
      borderRadius: 9,
      fontFamily: "Inter, sans-serif",
      fontSize: 15,
      fontWeight: active ? 700 : 400,
      color: active ? "#FEFCFC" : "rgba(254,252,252,0.40)",
      background: active ? "#3A3D44" : "transparent",
      cursor: "pointer",
      boxShadow: active ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
      transition: "all 0.15s",
    }),
    card: {
      background: "#2A2D33",
      border: "1.5px solid rgba(254,252,252,0.08)",
      borderRadius: 14,
      padding: "16px",
    },
    dropZone: (hasFile) => ({
      border: `2px dashed ${hasFile ? "#F1452A" : "rgba(241,69,42,0.50)"}`,
      background: hasFile ? "rgba(241,69,42,0.10)" : "rgba(241,69,42,0.06)",
      borderRadius: 16,
      padding: "36px 20px",
      textAlign: "center",
      cursor: "pointer",
    }),
    dropTitle: { fontSize: 17, fontWeight: 700, color: "#FEFCFC", margin: "0 0 4px" },
    dropCaption: { fontSize: 14, color: "rgba(254,252,252,0.40)", margin: 0 },
    label: { fontSize: 13, color: "rgba(254,252,252,0.40)", display: "block", marginBottom: 2 },
    input: {
      width: "100%",
      height: 36,
      background: "#2A2D33",
      border: "1.5px solid rgba(254,252,252,0.15)",
      borderRadius: 6,
      color: "#FEFCFC",
      fontSize: 15,
      padding: "0 10px",
      boxSizing: "border-box",
      fontFamily: "Inter, sans-serif",
    },
    textarea: {
      width: "100%",
      minHeight: 180,
      background: "#1E2023",
      border: "1.5px solid rgba(254,252,252,0.15)",
      borderRadius: 6,
      color: "#FEFCFC",
      fontSize: 13,
      padding: "10px",
      boxSizing: "border-box",
      fontFamily: "monospace",
      resize: "vertical",
    },
    btnPrimary: {
      width: "100%",
      height: 42,
      background: "#F1452A",
      border: "none",
      borderRadius: 10,
      color: "#fff",
      fontSize: 17,
      fontWeight: 700,
      fontFamily: "Inter, sans-serif",
      cursor: "pointer",
    },
    btnPrimaryDisabled: {
      width: "100%",
      height: 42,
      background: "rgba(241,69,42,0.40)",
      border: "none",
      borderRadius: 10,
      color: "rgba(255,255,255,0.5)",
      fontSize: 17,
      fontWeight: 700,
      fontFamily: "Inter, sans-serif",
      cursor: "not-allowed",
    },
    btnGhost: {
      width: "100%",
      height: 42,
      background: "#2E3238",
      border: "1.5px solid rgba(254,252,252,0.15)",
      borderRadius: 10,
      color: "#FEFCFC",
      fontSize: 15,
      fontWeight: 400,
      fontFamily: "Inter, sans-serif",
      cursor: "pointer",
      marginTop: 8,
    },
    error: {
      fontSize: 14,
      color: "#F1452A",
      background: "rgba(241,69,42,0.10)",
      border: "1px solid rgba(241,69,42,0.25)",
      borderRadius: 8,
      padding: "8px 12px",
    },
    successBanner: {
      background: "rgba(61,184,130,0.08)",
      border: "1px solid rgba(61,184,130,0.25)",
      borderRadius: 10,
      padding: "12px 14px",
    },
    successTitle: { fontSize: 16, fontWeight: 700, color: "#3DB882", margin: "0 0 8px" },
    statRow: { display: "flex", justifyContent: "space-between", fontSize: 14, color: "rgba(254,252,252,0.75)", marginBottom: 4 },
    statVal: { fontWeight: 700, color: "#FEFCFC" },
    divider: { height: 1, background: "rgba(254,252,252,0.10)", margin: "16px 0" },
    row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
    gap: (n) => ({ marginBottom: n }),
    jsonSuccess: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      color: "#3DB882",
      padding: "6px 0",
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.title}>Nuova scheda</h1>
        <p style={s.subtitle}>Analizza un file con AI oppure importa un JSON</p>
      </div>

      <div style={s.tabStrip}>
        <button style={s.tab(tab === TAB_AI)} onClick={() => setTab(TAB_AI)}>Analizza con AI</button>
        <button style={s.tab(tab === TAB_JSON)} onClick={() => setTab(TAB_JSON)}>Importa JSON</button>
      </div>

      {tab === TAB_AI && (
        <div style={s.card}>
          <form onSubmit={handleAiSubmit}>
            <div
              style={s.dropZone(!!file)}
              onClick={() => inputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,image/jpeg,image/png,image/webp"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {file ? (
                <>
                  <p style={s.dropTitle}>{file.name}</p>
                  <p style={s.dropCaption}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>📄</div>
                  <p style={s.dropTitle}>Trascina il file qui</p>
                  <p style={s.dropCaption}>oppure clicca per selezionare</p>
                  <p style={{ ...s.dropCaption, marginTop: 8 }}>PDF, JPG, PNG, WEBP — max 20MB</p>
                </>
              )}
            </div>

            {aiError && <div style={{ ...s.error, marginTop: 12 }}>{aiError}</div>}

            {aiResult && (
              <div style={{ ...s.successBanner, marginTop: 12 }}>
                <p style={s.successTitle}>✓ Parsing completato</p>
                <p style={{ fontSize: 13, color: "rgba(254,252,252,0.40)", margin: 0 }}>
                  {aiResult.scheda?.giorni?.length ?? 0} giorni · {aiResult.scheda?.durata_settimane ?? "?"} settimane
                </p>
                <button type="button" style={{ ...s.btnGhost, marginTop: 10, height: 36, fontSize: 14 }} onClick={handleUseJson}>
                  Usa questo JSON per salvare →
                </button>
              </div>
            )}

            <div style={{ marginTop: 16 }}>
              <button
                type="submit"
                disabled={!file || aiLoading}
                style={!file || aiLoading ? s.btnPrimaryDisabled : s.btnPrimary}
              >
                {aiLoading ? <Loader size="small" color="white" /> : "Invia a Gemini"}
              </button>
            </div>
          </form>
        </div>
      )}

      {tab === TAB_JSON && (
        <div style={s.card}>
          {importStats ? (
            <div style={s.successBanner}>
              <p style={{ ...s.successTitle, fontSize: 18 }}>✓ Scheda salvata!</p>
              <div style={{ ...s.divider, margin: "10px 0" }} />
              <div style={s.statRow}><span>Giorni</span><span style={s.statVal}>{importStats.totalDays}</span></div>
              <div style={s.statRow}><span>Superset</span><span style={s.statVal}>{importStats.totalSupersets}</span></div>
              <div style={s.statRow}><span>Esercizi</span><span style={s.statVal}>{importStats.totalExercises}</span></div>
              <div style={s.statRow}><span>Progressioni settimanali</span><span style={s.statVal}>{importStats.totalProgressions}</span></div>
              <button
                style={{ ...s.btnGhost, marginTop: 12 }}
                onClick={() => { setImportStats(null); setJsonText(""); setSheetName(""); setStartDate(""); setEndDate(""); }}
              >
                Importa un'altra scheda
              </button>
            </div>
          ) : (
            <form onSubmit={handleImport}>
              <div style={s.gap(14)}>
                <label style={s.label}>JSON scheda</label>
                <textarea
                  style={s.textarea}
                  placeholder={'{\n  "scheda": { "giorni": [...] }\n}'}
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                />
              </div>

              <div style={{ ...s.divider }} />

              <div style={s.gap(12)}>
                <label style={s.label}>Nome scheda *</label>
                <input
                  style={s.input}
                  type="text"
                  placeholder="es. Scheda 3 — Upper/Lower"
                  value={sheetName}
                  onChange={(e) => setSheetName(e.target.value)}
                  required
                />
              </div>

              <div style={{ ...s.row2, marginTop: 12 }}>
                <div>
                  <label style={s.label}>Data inizio *</label>
                  <input style={s.input} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </div>
                <div>
                  <label style={s.label}>Data fine</label>
                  <input style={s.input} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>

              {importError && <div style={{ ...s.error, marginTop: 14 }}>{importError}</div>}

              <div style={{ marginTop: 16 }}>
                <button
                  type="submit"
                  disabled={!jsonText || !sheetName || !startDate || importLoading}
                  style={!jsonText || !sheetName || !startDate || importLoading ? s.btnPrimaryDisabled : s.btnPrimary}
                >
                  {importLoading ? <Loader size="small" color="white" /> : "Salva scheda nel DB →"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
