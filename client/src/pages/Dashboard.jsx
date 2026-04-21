import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus, Dumbbell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/client";

import { DAYS_SHORT } from "../constants/dashboardConst";
import formatDate from "../utils/formatDate";

// estrarre la logica in una funzione helper
function currentWeek(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24 * 7)) + 1;
  return Math.max(1, diff);
}
// estrarre la logica in una funzione helper
function WeekCalendar() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  return (
    <div style={{ background: "#2A2D33", border: "1.5px solid rgba(254,252,252,0.08)", borderRadius: 14, padding: "14px 16px" }}>
      <p style={{ fontSize: 15, fontWeight: 600, color: "#FEFCFC", margin: "0 0 12px" }}>Settimana corrente</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {weekDays.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          const isPast = d < today && !isToday;
          return (
            <div
              key={i}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                borderRadius: 8, padding: "6px 0",
                background: isToday ? "#F1452A" : "rgba(254,252,252,0.05)",
              }}
            >
              <span style={{ fontSize: 10, color: isToday ? "#fff" : "rgba(254,252,252,0.40)" }}>
                {DAYS_SHORT[i]}
              </span>
              <span style={{
                fontSize: 12, fontWeight: 500,
                color: isToday ? "#fff" : isPast ? "#3DB882" : "rgba(254,252,252,0.40)",
              }}>
                {isToday ? d.getDate() : isPast ? "✓" : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Usa componente esterno
function SkeletonCard() {
  return (
    <div style={{
      background: "#2A2D33", borderRadius: 14, height: 96,
      border: "1.5px solid rgba(254,252,252,0.08)",
      animation: "pulse 1.5s ease-in-out infinite",
    }} />
  );
}

function EmptyState({ onAdd }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "80px 24px", textAlign: "center" }}>
      <div style={{
        width: 72, height: 72, borderRadius: 20,
        background: "rgba(241,69,42,0.10)",
        border: "2px dashed #F1452A",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Dumbbell size={32} style={{ color: "#F1452A" }} />
      </div>
      <div>
        <p style={{ fontSize: 18, fontWeight: 600, color: "#FEFCFC", margin: "0 0 6px" }}>Nessuna scheda trovata</p>
        <p style={{ fontSize: 14, color: "rgba(254,252,252,0.40)", margin: 0 }}>
          Carica la scheda del tuo PT per iniziare
        </p>
      </div>
      <button
        onClick={onAdd}
        style={{
          height: 42, borderRadius: 10, border: "none",
          background: "#F1452A", color: "#fff",
          fontSize: 17, fontWeight: 700,
          fontFamily: "Inter, sans-serif",
          cursor: "pointer", padding: "0 24px",
          display: "flex", alignItems: "center", gap: 8,
        }}
      >
        <Plus size={18} /> Aggiungi scheda
      </button>
    </div>
  );
}

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const today = new Date();

  const { data, isLoading } = useQuery({
    queryKey: ["workout_sheets"],
    queryFn: async () => {
      const res = await api.get("/api/schede");
      return res.data.data ?? [];
    },
    retry: false,
  });

  const sheets = Array.isArray(data) ? data : [];
  const activeSheet = sheets[0] ?? null;

  return (
    <div style={{ minHeight: "100svh", background: "#212327", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{
        background: "#2A2D33",
        padding: "60px 16px 16px",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
      }}>
        <div>
          <p style={{ fontSize: 14, color: "rgba(254,252,252,0.40)", margin: 0 }}>{formatDate(today)}</p>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#FEFCFC", margin: "2px 0 0", letterSpacing: "-0.5px" }}>
            Ciao, {user?.first_name || "atleta"} 👋
          </h1>
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
          background: "#2E3238",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: "#F1452A",
        }}>
          {user?.first_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
        </div>
      </div>

      {/* Body */}
      {isLoading ? (
        <div style={{ padding: "16px 16px 80px", display: "flex", flexDirection: "column", gap: 12 }}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : !activeSheet ? (
        <EmptyState onAdd={() => navigate("/parse")} />
      ) : (
        <div style={{ padding: "16px 16px 80px", display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Scheda attiva banner */}
          <div style={{ background: "#F1452A", borderRadius: 14, padding: "14px 16px" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", margin: "0 0 4px" }}>Scheda attiva</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>{activeSheet.name}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span style={{
                fontSize: 12, padding: "2px 10px", borderRadius: 999,
                background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 500,
              }}>
                Settimana {currentWeek(activeSheet.start_date)}/{activeSheet.weeks_number}
              </span>
              <span style={{
                fontSize: 12, padding: "2px 10px", borderRadius: 999,
                background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 500,
              }}>
                {new Date(activeSheet.start_date).toLocaleDateString("it-IT", { month: "short", year: "numeric" })}
                {activeSheet.end_date
                  ? ` → ${new Date(activeSheet.end_date).toLocaleDateString("it-IT", { month: "short", year: "numeric" })}`
                  : ""}
              </span>
            </div>
          </div>

          {/* Oggi */}
          <div style={{ background: "#2A2D33", border: "1.5px solid rgba(254,252,252,0.08)", borderRadius: 14, padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#FEFCFC", margin: 0 }}>Allenamento di oggi</p>
              <span style={{
                fontSize: 12, padding: "2px 10px", borderRadius: 999,
                background: "rgba(61,184,130,0.15)", color: "#3DB882", fontWeight: 500,
              }}>
                da fare
              </span>
            </div>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 10, padding: "20px 0",
              background: "#1E2023",
            }}>
              <Dumbbell size={22} style={{ color: "rgba(254,252,252,0.40)" }} />
            </div>
            <p style={{ fontSize: 12, color: "rgba(254,252,252,0.40)", textAlign: "center", margin: "8px 0 12px" }}>
              Le sessioni saranno disponibili a breve
            </p>
            <div style={{ height: 1, background: "rgba(254,252,252,0.10)", margin: "0 0 12px" }} />
            <button
              style={{
                width: "100%", height: 42, borderRadius: 10, border: "none",
                background: "#F1452A", color: "#fff",
                fontSize: 17, fontWeight: 700, fontFamily: "Inter, sans-serif", cursor: "pointer",
              }}
              onClick={() => navigate("/start-workout")}
            >
              ▶ Inizia allenamento
            </button>
          </div>

          {/* Settimana */}
          <WeekCalendar />

          {/* Aggiungi scheda */}
          <button
            onClick={() => navigate("/parse")}
            style={{
              width: "100%", background: "transparent", cursor: "pointer",
              border: "2px dashed rgba(254,252,252,0.15)", borderRadius: 14,
              padding: "16px", color: "rgba(254,252,252,0.40)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontSize: 15, fontFamily: "Inter, sans-serif",
            }}
          >
            <Plus size={18} />
            <span>Aggiungi nuova scheda</span>
          </button>
        </div>
      )}
    </div>
  );
};
