# Backend Routes

Tutte le rotte richiedono `Authorization: Bearer <token>` salvo dove indicato.

---

## Auth — `/auth`

| Metodo | Path | Auth | Descrizione |
|--------|------|------|-------------|
| POST | `/auth/login` | No | Login email+password → restituisce JWT |
| GET | `/auth/me` | Sì | Dati utente corrente |
| POST | `/auth/logout` | No | Client-side, il server risponde OK |

---

## Schede — `/api/schede`

| Metodo | Path | Auth | Descrizione |
|--------|------|------|-------------|
| GET | `/api/schede` | Sì | Lista di tutte le schede dell'utente |
| GET | `/api/schede/:id/giorni` | Sì | Giorni (`workout_days`) di una scheda specifica |
| POST | `/api/schede/parse` | Sì | Upload file (PDF/img) → Gemini → JSON strutturato |
| POST | `/api/schede/import` | Sì | Salva nel DB la scheda parsata |

### Dettaglio response

**`GET /api/schede`**
```json
{
  "ok": true,
  "data": [
    { "id": "uuid", "name": "Scheda 3", "start_date": "2025-01-01", "end_date": "2025-03-31", "weeks_number": 8, "created_at": "..." }
  ]
}
```

**`GET /api/schede/:id/giorni`**
```json
{
  "ok": true,
  "data": [
    { "id": "uuid", "name": "Giorno A", "workout_sheet_id": "uuid", "order_index": 0 }
  ]
}
```

**`POST /api/schede/import`** — body:
```json
{
  "name": "Scheda 3",
  "startDate": "2025-01-01",
  "endDate": "2025-03-31",
  "scheda": {
    "durata_settimane": 8,
    "giorni": [ ... ]
  }
}
```

---

## Sessioni — `/api/sessions`

> Da implementare. Gestiscono una singola sessione di allenamento (giorno + settimana).

| Metodo | Path | Auth | Descrizione |
|--------|------|------|-------------|
| GET | `/api/sessions` | Sì | Lista sessioni recenti dell'utente (per dashboard) |
| POST | `/api/sessions` | Sì | Crea una nuova sessione |
| GET | `/api/sessions/:id` | Sì | Carica sessione completa con esercizi e progressioni della settimana |
| PATCH | `/api/sessions/:id/complete` | Sì | Marca la sessione come completata |

### Dettaglio request/response

**`POST /api/sessions`** — body:
```json
{
  "workout_day_id": "uuid",
  "week_number": 3
}
```
Response: `{ "ok": true, "data": { "id": "uuid", "workout_day_id": "...", "week_number": 3, "completed": false } }`

**`GET /api/sessions/:id`** — risponde con la sessione + tutti gli esercizi del giorno con le progressioni della settimana corrente. Questa è la query principale per StartWorkout:
```json
{
  "ok": true,
  "data": {
    "session": { "id": "uuid", "week_number": 3, "completed": false },
    "workout_day": { "id": "uuid", "name": "Giorno A" },
    "supersets": [
      {
        "id": "uuid",
        "order_index": 0,
        "exercises": [
          {
            "id": "uuid",
            "name": "Squat",
            "order_index": 0,
            "progression": { "id": "uuid", "week_number": 3, "sets": 4, "reps": "8" }
          }
        ]
      }
    ]
  }
}
```

**`GET /api/sessions`** — query params opzionali: `?limit=5`
```json
{
  "ok": true,
  "data": [
    { "id": "uuid", "week_number": 3, "completed": true, "created_at": "...", "workout_day": { "name": "Giorno A" } }
  ]
}
```

---

## Log Allenamento — `/api/logs`

> Da implementare. Registrano i pesi e le reps effettive per ogni esercizio in sessione.

| Metodo | Path | Auth | Descrizione |
|--------|------|------|-------------|
| POST | `/api/logs` | Sì | Salva il log di un esercizio (peso, serie, reps) |
| GET | `/api/logs?session_id=:id` | Sì | Tutti i log di una sessione (per mostrare i pesi già inseriti) |

### Dettaglio request/response

**`POST /api/logs`** — body:
```json
{
  "weekly_progression_id": "uuid",
  "weight": 80.0,
  "sets": 4,
  "reps": "8",
  "note": "sentito bene"
}
```
Response: `{ "ok": true, "data": { "id": "uuid", ... } }`

**`GET /api/logs?session_id=:id`**
> Nota: `workout_logs` non ha un campo `session_id` diretto — il collegamento è tramite `weekly_progression_id → exercise → superset → workout_day → session`. Valutare se aggiungere `session_id` a `workout_logs` nel DB o fare la join lato query.

---

## Health

| Metodo | Path | Auth | Descrizione |
|--------|------|------|-------------|
| GET | `/health` | No | Health check |
