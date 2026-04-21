import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import api from "../api/client";

function formatDateRange(start, end) {
  const s = new Date(start).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
  if (!end) return s;
  const e = new Date(end).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
  return `${s} → ${e}`;
}

export const WorkoutSheets = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["workout_sheets"],
    queryFn: async () => {
      const res = await api.get("/api/schede");
      return res.data.data ?? [];
    },
    retry: false,
  });

  const sheets = Array.isArray(data) ? data : [];

  return (
    <div style={{ minHeight: "100svh", background: "#212327", fontFamily: "Inter, sans-serif", padding: "60px 16px 80px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FEFCFC", margin: "0 0 20px", letterSpacing: "-0.5px" }}>
        Le mie schede
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {isLoading ? (
          <>
            {[1, 2].map((i) => (
              <div key={i} style={{
                background: "#2A2D33", borderRadius: 14, height: 130,
                border: "1.5px solid rgba(254,252,252,0.08)",
              }} />
            ))}
          </>
        ) : (
          sheets.map((sheet, idx) => {
            const isActive = idx === 0;
            return (
              <div
                key={sheet.id}
                style={{
                  background: "#2A2D33",
                  border: isActive ? "2px solid #F1452A" : "1.5px solid rgba(254,252,252,0.08)",
                  borderRadius: 14,
                  padding: "16px",
                }}
              >
                {/* Name + badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "#FEFCFC", margin: 0, flex: 1 }}>
                    {sheet.name}
                  </p>
                  {isActive && (
                    <span style={{
                      fontSize: 12, padding: "1px 7px", borderRadius: 4,
                      background: "rgba(241,69,42,0.25)", color: "rgba(254,252,252,0.75)",
                    }}>
                      attiva
                    </span>
                  )}
                </div>

                {/* Date range */}
                <p style={{ fontSize: 13, color: "rgba(254,252,252,0.40)", margin: "0 0 12px" }}>
                  {formatDateRange(sheet.start_date, sheet.end_date)}
                </p>

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(254,252,252,0.10)", margin: "0 0 12px" }} />

                {/* Stats */}
                <div style={{ display: "flex", gap: 24, marginBottom: 12 }}>
                  <div>
                    <p style={{ fontSize: 13, color: "rgba(254,252,252,0.40)", margin: "0 0 2px" }}>Settimane</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "#FEFCFC", margin: 0 }}>{sheet.weeks_number}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: "rgba(254,252,252,0.40)", margin: "0 0 2px" }}>Giorni/sett.</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "#FEFCFC", margin: 0 }}>—</p>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(254,252,252,0.10)", margin: "0 0 12px" }} />

                {/* CTA row */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{
                    flex: 1, height: 42, borderRadius: 10,
                    background: "#2E3238", border: "1.5px solid rgba(254,252,252,0.15)",
                    color: "#FEFCFC", fontSize: 14, fontWeight: 500,
                    fontFamily: "Inter, sans-serif", cursor: "pointer",
                  }}>
                    Vedi scheda
                  </button>
                  {isActive && (
                    <button style={{
                      flex: 1, height: 42, borderRadius: 10,
                      background: "#F1452A", border: "none",
                      color: "#fff", fontSize: 14, fontWeight: 700,
                      fontFamily: "Inter, sans-serif", cursor: "pointer",
                    }}>
                      Allena ora
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Aggiungi nuova scheda */}
        <button
          onClick={() => navigate("/parse")}
          style={{
            background: "transparent", cursor: "pointer",
            border: "2px dashed rgba(254,252,252,0.15)", borderRadius: 14,
            padding: "24px 16px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            color: "rgba(254,252,252,0.40)", fontSize: 16,
            fontFamily: "Inter, sans-serif",
          }}
        >
          <Plus size={22} style={{ color: "rgba(254,252,252,0.40)" }} />
          <span>Aggiungi nuova scheda</span>
        </button>
      </div>
    </div>
  );
};
