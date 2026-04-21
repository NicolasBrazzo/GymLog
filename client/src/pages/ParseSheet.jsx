import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Loader from "../components/Loader";
import api from "../api/client";

export const ParseSheet = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setError(null);
      setSuccess(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      setError(null);
      setSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/api/schede/parse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("=== SCHEDA PARSATA ===", res.data.data);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Errore durante il parsing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Carica scheda</h1>
          <p className="text-sm text-muted-foreground">
            PDF o immagine — Gemini estrae la struttura automaticamente
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                file
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/30 hover:border-primary/50"
              }`}
              onClick={() => inputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />

              {file ? (
                <div className="space-y-1">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Trascina il file qui</p>
                  <p className="text-xs text-muted-foreground">oppure clicca per selezionare</p>
                  <p className="text-xs text-muted-foreground mt-2">PDF, JPG, PNG, WEBP — max 20MB</p>
                </div>
              )}
            </div>

            {error && (
              <p className="text-sm text-destructive font-medium">{error}</p>
            )}

            {success && (
              <p className="text-sm text-green-600 font-medium">
                Parsing completato — controlla la console
              </p>
            )}

            <Button type="submit" className="w-full" disabled={!file || loading}>
              {loading ? <Loader size="small" color="white" /> : "Invia a Gemini"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
