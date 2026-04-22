# GymLog — Design Specifications

Derivato dal wireframe interattivo su Claude Design (aprile 2026).  
Target: mobile-first web app, viewport di riferimento **390×780px** (iPhone 14 Pro).

---

## 1. Design Tokens

### 1.1 Color Palette

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#212327` | Sfondo principale di ogni schermata |
| `--bg-canvas` | `#18191C` | Sfondo dell'app shell / body |
| `--card` | `#2A2D33` | Card, header, bottom sheet |
| `--surface` | `#1E2023` | Input, tab strip, aree secondarie |
| `--surface-raised` | `#3A3D44` | Tab/pill attiva su surface |
| `--ink` | `#FEFCFC` | Testo primario |
| `--ink-2` | `rgba(254,252,252,0.75)` | Testo secondario |
| `--muted` | `rgba(254,252,252,0.40)` | Label, placeholder, icone disabilitate |
| `--border` | `rgba(254,252,252,0.10)` | Bordi sottili di card e divider |
| `--border-strong` | `rgba(254,252,252,0.15)` | Bordi di input e pill non-accentati |
| `--accent` | `#F1452A` | CTA primario, barra progresso, bordo scheda attiva, active nav item |
| `--accent-sec` | `#EF6149` | Badge, tag secondari |
| `--accent-ter` | `#F3745A` | Sfumature/hover dello stato accent |
| `--blue` | `#4F8EF7` | Superset, note PT, azioni secondarie |
| `--green` | `#3DB882` | Serie completate, successo, progressione positiva |

**Colori semitrasparenti derivati** (usati per background di badge/hint):

| Uso | Valore |
|---|---|
| Badge accent (sfondo) | `rgba(241,69,42,0.25)` |
| Hint "Aumenta peso" (sfondo) | `rgba(45,160,110,0.12)` |
| Hint "Aumenta peso" (bordo) | `rgba(45,160,110,0.35)` |
| Note PT (sfondo) | `rgba(79,142,247,0.08)` |
| Note PT (bordo) | `rgba(79,142,247,0.20)` |
| Success banner (sfondo) | `rgba(61,184,130,0.08)` |
| Success banner (bordo) | `rgba(61,184,130,0.25)` |

---

### 1.2 Typography

Font unico: **Inter** (Google Fonts), pesi: 400 · 500 · 600 · 700 · 800.

| Ruolo | Size | Weight | Color |
|---|---|---|---|
| Titolo schermata | 28px | 700 | `--ink` |
| Titolo card / sezione | 22px | 700–800 | `--ink` |
| Titolo esercizio (allenamento) | 26px | 700 | `--ink` |
| Heading secondario | 18–20px | 700 | `--ink` |
| Body / lista | 15–16px | 400 | `--ink` |
| Label esplicativa | 14px | 400 | `--muted` |
| Caption / tag | 12–13px | 400 | `--ink-2` |
| Micro (nav label, date) | 10–11px | 400 | `--muted` |

Letter-spacing: `-0.5px` solo su titoli ≥ 26px.  
Line-height: `1.1` su titoli, `1.5` su body e note.

---

### 1.3 Spacing & Layout

| Proprietà | Valore |
|---|---|
| Padding orizzontale schermate | `16px` |
| Padding header top (safe area) | `52–60px` |
| Gap tra card | `12–14px` |
| Gap tra elementi interni card | `8–10px` |
| Bottom nav height | `72px` |
| Bottom padding scrollabile | `80px` (sopra nav) |

---

### 1.4 Border Radius

| Elemento | Radius |
|---|---|
| Card principale | `14px` |
| Card grande / bottom sheet | `16px` |
| Bottom sheet (top only) | `28px 28px 0 0` |
| Pulsante | `10px` |
| Input field | `6px` |
| Tag / badge compatto | `4px` |
| Pill / chip arrotondato | `999px` |
| Avatar / logo mark | `20px` (logo app), `999px` (avatar) |
| Chart dot | `999px` |
| Step indicator | `999px` |

---

### 1.5 Shadows & Elevation

| Contesto | Box-shadow |
|---|---|
| Logo mark auth | `0 8px 24px rgba(232,93,58,0.30)` |
| Bottom sheet | `0 -4px 24px rgba(0,0,0,0.07)` |
| Tab attiva su surface | `0 1px 4px rgba(0,0,0,0.10)` |

---

## 2. Componenti Globali

### 2.1 Bottom Navigation

Fissa in basso, altezza **72px**, sfondo `rgba(30,32,35,0.97)` con blur consigliato, bordo top `1px solid var(--border)`.  
3 tab: **Dashboard** (⌂) · **Schede** (☰) · **Profilo** (◉).  
Stato attivo: icona + label in `#F1452A`. Inattivo: `rgba(254,252,252,0.40)`.  
Icona: 22px. Label: 12px. Disposizione: column, centrata, gap 2px.

### 2.2 Button

Altezza fissa **42px**. `border-radius: 10px`. Font Inter 17px, weight 700.

| Variante | Background | Testo | Border |
|---|---|---|---|
| Primary | `#F1452A` | `#fff` | nessuno |
| Secondary (blue) | `#4F8EF7` | `#fff` | nessuno |
| Ghost / Default | `#2E3238` | `#FEFCFC` | `1.5px solid rgba(254,252,252,0.15)` |

### 2.3 Input Field

Altezza **36px**. Background `#2A2D33`. Bordo `1.5px solid rgba(254,252,252,0.15)`. Border-radius `6px`.  
Testo pieno: `#FEFCFC` 15px. Placeholder: `rgba(254,252,252,0.35)` 15px.  
Label sopra: 13px, `rgba(254,252,252,0.40)`, margin-bottom 2px.

### 2.4 Tag / Badge

Border-radius `4px`. Padding `1px 7px`. Font 13px.  
Background variabile (vedi palette semitrasparente). Testo `rgba(254,252,252,0.75)`.

### 2.5 Pill / Chip

Border-radius `999px`. Padding `3px 12px`. Font Inter 15px.

- **Accent**: background `#F1452A`, testo `#fff`, font-weight 700.
- **Default**: background `rgba(254,252,252,0.06)`, bordo `1.5px solid rgba(254,252,252,0.15)`, testo `rgba(254,252,252,0.75)`, font-weight 400.
- **Mini** (selettore settimane): padding `2px 10px`, font 13px.

### 2.6 Divider

Altezza `1px`. Background `rgba(254,252,252,0.10)`. Margin vertical variabile (default 8px).

### 2.7 Card

Background `#2A2D33`. Border `1.5px solid rgba(254,252,252,0.08)`. Border-radius `14px`. Padding `14–16px`.  
Scheda **attiva**: border `2px solid #F1452A`.

---

## 3. Schermate

### 3.1 Login / Registrazione (`/auth`)

**Layout**: due zone verticali. In alto (flex: 1): logo centrato. In basso: card con angoli superiori arrotondati `28px 28px 0 0`, bg `#2A2D33`.

**Logo mark**:
- 72×72px, `border-radius: 20px`, background `#F1452A`.
- Box-shadow: `0 8px 24px rgba(232,93,58,0.30)`.
- Lettera "G" 36px, weight 800, colore `#fff`.
- Sotto: "GymLog" 28px weight 800, lettera-spacing -0.5px.
- Sotto ancora: "Il tuo diario di allenamento" 15px, colore `--muted`.

**Tab switcher** ("Accedi" / "Registrati"):
- Container: bg `#1E2023`, padding 4px, border-radius 12px.
- Tab attiva: bg `#3A3D44`, border-radius 9px, font-weight 700, shadow `0 1px 4px rgba(0,0,0,0.1)`.
- Tab inattiva: trasparente, font-weight 400, colore `rgba(254,252,252,0.40)`.
- Altezza tab: 36px.

**Campi**:
- **Solo su "Registrati"**: `Nome completo`.
- Sempre visibili: `Email`, `Password` (con toggle visibilità 👁 a destra).
- **Solo su "Accedi"**: link "Password dimenticata?" allineato a destra, 13px, colore `#F1452A`.

**CTA principale**: Btn Primary larghezza 100%, testo "Accedi" / "Crea account".

**Divider "oppure"**: `Label 13px` centrata tra due linee `rgba(254,252,252,0.10)`.

**Accesso Google**: div 42px altezza, border `1.5px solid rgba(254,252,252,0.12)`, border-radius 10px, icona "G" 18px + testo "Continua con Google" 15px weight 600, colore `#FEFCFC`.

---

### 3.2 Onboarding / Upload Scheda (`/onboarding`)

**Header**: back "← Annulla" 13px muted. Titolo "Nuova scheda" 22px weight 700.

**Step indicator** (4 step: Carica · Analisi · Conferma · Salvato):
- Cerchi 28×28px, border-radius 999px.
- Step completato: bg `#3DB882`, checkmark `✓`.
- Step corrente: bg `#F1452A`, bordo `2px solid #F1452A`.
- Step futuro: bg `#2E3238`.
- Connettore orizzontale: `flex: 1`, height 2px. Completato: `#3DB882`. Non completato: `#2E3238`.
- Label sotto cerchio: 10px, colore accent se attivo, muted altrimenti.

**Step 0 — Carica**:
- Drop zone: `border: 2px dashed rgba(241,69,42,0.50)`, bg `rgba(241,69,42,0.06)`, border-radius 16px, padding 36px 20px. Icona 📄 40px, titolo 17px weight 700, caption 14px, Btn Primary "Scegli file".
- Sezione "oppure" con fotocamera (Box placeholder h=120px).
- Sezione manuale opzionale: campo "Nome scheda", campi affiancati "Data inizio" / "Data fine" (50%/50%).
- CTA finale: Btn Primary "Analizza con AI →".

**Step 1 — Analisi**:
- Spinner circolare 80×80px: `border: 4px solid`, top `#F1452A`, resto `#f0ede8`. Icona ✨ al centro.
- Titolo 20px weight 700, subtitle 14px.
- Lista 4 progress step: card con bg `#2A2D33`, border-radius 10px. Step attivo: bordo `1.5px solid #F1452A`. Step completo: opacity 1, bordo trasparente. Step futuro: opacity 0.4. Cerchietto indicatore 22px: verde (✓), rosso (…), grigio.

**Step 2 — Conferma**:
- Banner successo verde: "✓ Analisi completata".
- Card "INFO SCHEDA": campi pre-compilati (nome, inizio, fine, settimane, giorni/sett.).
- Card per ogni giorno parsato: header col nome giorno + tag "✏ modifica". Lista esercizi con nome e "✕" per rimozione. Footer "+ Aggiungi esercizio" in `#4F8EF7`.
- CTA "Salva scheda nel DB →" (primary) + "← Ricarica file" (ghost).

**Step 3 — Salvato**:
- Cerchio successo 80×80px: bg `rgba(45,160,110,0.12)`, border `3px solid #3DB882`. Checkmark ✓ 36px.
- Titolo "Scheda salvata!" 22px weight 800, colore `#3DB882`.
- Card riepilogo cascade save: 4 righe (Scheda, Giorni, Esercizi, Superset) con valore colorato a destra.
- CTA "Vai alla Dashboard →" (primary) + "Carica un'altra scheda" (ghost).

---

### 3.3 Dashboard / Home (`/`)

**Header** (bg `#2A2D33`, padding top 60px):
- Sinistra: data corrente 14px muted, sotto "Ciao, [Nome] 👋" 26px weight 700.
- Destra: avatar circolare 38×38px, bg `#2E3238`.

**Contenuto** (scrollabile, padding bottom 80px):

**Scheda attiva** — banner full-width bg `#F1452A`, border-radius 14px, padding 14px 16px:
- "Scheda attiva" 13px bianco 75%.
- Nome scheda 20px weight 700 bianco.
- Tag row: "Settimana X/Y" e date range su bg `rgba(254,252,252,0.15)`.

**Oggi — Giorno X** — card `#2A2D33`:
- Header row: nome giorno 18px weight 700 + tag status (verde se da fare).
- Lista esercizi: nome 15px, serie/rip 13px muted. Superset: barra vertical sinistra `#4F8EF7` 3px. Non-superset: spazio trasparente 3px.
- Divider. CTA "▶ Inizia allenamento" primary full-width.

**Settimana corrente** — card `#2A2D33`:
- Griglia 7 colonne (L M M G V S D). Cell border-radius 8px, padding 6px 0.
- Oggi: bg `#F1452A`, lettera + giorno bianco.
- Completato: bg `#e8f4ee`, checkmark `✓` in `#3DB882`.
- Futuro: bg `rgba(254,252,252,0.05)`, "—" in muted.

**Ultimo allenamento** — card `#2A2D33`:
- "Ieri — Giorno X · N min" 13px muted.
- 3 stat affiancate: numero grande (22px weight 700, colore accent/blue/green) + caption 12px.

**BottomNav**: active = tab 0 (Dashboard).

---

### 3.4 Tutte le Schede (`/schede`)

**Header**: "Le mie schede" 28px weight 700. Padding top 60px.

**Lista schede** (gap 12px, scrollabile):
- Ogni card `#2A2D33`, border-radius 14px, padding 16px.
- Scheda attiva: bordo `2px solid #F1452A`.
- Layout: nome 17px weight 700 + badge "attiva" `rgba(241,69,42,0.25)`.
- Data range 13px muted sotto.
- Divider.
- Due stat affiancate: "Settimane" e "Giorni/sett." con valore 18px weight 700.
- Divider.
- CTA row: "Vedi scheda" (ghost, flex:1) + "Allena ora" (primary, flex:1, solo se attiva).

**Aggiungi nuova scheda**: card con `border: 2px dashed rgba(254,252,252,0.15)`, icona "+" 22px + testo 16px, entrambi in muted.

**BottomNav**: active = tab 1 (Schede).

---

### 3.5 Scheda Singola (`/schede/:id`)

**Header** (bg `#2A2D33`):
- "← Schede" 13px muted.
- Nome scheda 22px weight 700 + "Settimana X di Y" 15px weight 400 muted (inline su seconda riga).
- Pill "Attiva" (accent) a destra.

**Selettore settimane** (horizontal scroll, no scrollbar):
- Pill W1–W8. Attivo: accent. Inattivo: ghost.

**Tab giorni** (Giorno A / B / C / D):
- Underline 2.5px `#F1452A` sul giorno attivo. Font 14px, weight 700 se attivo.
- Colore testo: attivo `#F1452A`, inattivo `rgba(254,252,252,0.40)`.

**Lista esercizi** (scrollabile, padding bottom 80px):
- Esercizi normali: card `#2A2D33`, border `1.5px solid rgba(254,252,252,0.08)`.
- Superset: card border `2px solid #4F8EF7`. Header bg `#4F8EF7`, testo "SUPERSET N" 12px weight 700 bianco.
- Ogni esercizio: nome 16px weight 700 + icona 🏋 + peso last volta 12px muted. Tags serie/rip.
- Tra esercizi dello stesso superset: `border-bottom: 1px dashed rgba(254,252,252,0.08)`.

**CTA** "▶ Allena Giorno A" primary full-width, sopra BottomNav.

**BottomNav**: active = tab 1 (Schede).

---

### 3.6 Allenamento (`/allenamento/:id`)

**Header** (bg `#2A2D33`, padding top 56px):
- "✕ Termina" 13px muted (sinistra) + "⏱ HH:MM" 13px muted (destra).
- Barra progresso: height 4px, bg `rgba(254,252,252,0.10)`, fill `#F1452A`, border-radius 2px. Larghezza = `(esercizioCorrente+1) / totale * 100%`. Transition 0.3s.
- "Esercizio N di TOT" 12px muted (sinistra) + tag "Superset" `rgba(58,126,232,0.15)` se applicabile (destra).

**Card esercizio** (bg `#2A2D33`, border-radius 16px, padding 16px):
- Nome esercizio 26px weight 700.
- Tag row: "N serie" + "X rip." (bg `rgba(241,69,42,0.25)`) + badge peso hint:
  - **↑ Aumenta peso**: bg `rgba(45,160,110,0.12)`, border `1px solid rgba(45,160,110,0.35)`, testo `#2da06e`, font-weight 600, font-size 13px, border-radius 999px.
  - **= Mantieni peso**: bg `rgba(0,0,0,0.06)`, border `1px solid rgba(0,0,0,0.12)`, testo `--ink-2`.
- Note PT: 14px `rgba(254,252,252,0.40)`, prefisso 📝.
- "Ultima volta: Xkg" 13px muted.

**Tabella serie** (bg `#2A2D33`, border-radius 16px, padding 12px 16px):
- Header row: "Serie" / "Rip." / "Kg" / "✓" — 12px muted.
- Ogni riga: "#N" 15px muted (larghezza 40px) | input rip (flex:1) | input kg (flex:1) | checkbox (32px).
- Input completato: bg `rgba(45,160,110,0.10)`, bordo `1px solid rgba(45,160,110,0.40)`, testo `#2da06e`.
- Input da compilare: bg chiaro `#f5f4f1`, bordo `1px solid rgba(254,252,252,0.10)`, testo muted.
- Checkbox: completata → bg `#3DB882`, ✓ bianco. Da fare → `○` in muted.
- Altezza ogni input: 34px, border-radius 8px.

**"Stesso peso" row** (bg `#2A2D33`, border-radius 12px, padding 12px 14px):
- Checkbox 22×22px, border-radius 6px. Spuntato: bg + bordo `#F1452A`, checkmark bianco 13px. Non spuntato: bg bianco, bordo `rgba(0,0,0,0.20)`.
- Label "Stesso peso" 15px. Colore: `--ink` se attivo, `--muted` se no.
- Input kg: 70×34px, border-radius 8px, bg bianco se attivo, grigio se no.
- Stepper ▲/▼: due button 24×15px, bg `#1E2023`, border-radius 4px. Step: ±2.5kg. Disabilitato se checkbox non attiva.

**Campo note**: bg `#2A2D33`, border-radius 12px, `border: 1px dashed rgba(254,252,252,0.15)`, "📝 Aggiungi nota..." 14px muted.

**Footer navigazione** (bg `#2A2D33`, bordo top, padding 12px 16px 28px):
- "← Indietro" ghost (flex:1) + "Avanti →" primary (flex:2).
- Ultimo esercizio: "🏁 Completa" primary.

---

### 3.7 Progressione Esercizio (`/esercizio/:id`)

**Header** (bg `#2A2D33`):
- "← Indietro" 13px muted.
- Nome esercizio 22px weight 800 + "Scheda · Giorno" 13px muted.
- Tag schema (es. "4×6-8 rip.") con bg `rgba(241,69,42,0.25)`.

**3 stat rapide** (row, gap 10px):
- Ogni stat: bg `#212327`, border-radius 10px, padding 8px 10px, testo centrato.
- Label 11px muted + valore 16px weight 800.
- "Ultimo" → `#F1452A`, "Record" → `#3DB882`, "Progresso" → `#4F8EF7`.

**Toggle grafico/tabella**:
- Container bg `#1E2023`, border-radius 10px, padding 3px.
- Tab attivo: bg `#3A3D44`, border-radius 8px, font-weight 700.
- Icone 📈 / 📋.

**Vista Grafico**:
- Card `#2A2D33`, padding 16px 16px 12px.
- SVG `viewBox="0 0 260 {chartH+20}"`, overflow visible.
- Grid lines: `stroke="rgba(254,252,252,0.07)"`, `stroke-dasharray="4,4"`.
- Etichette asse Y: 9px, `fill="rgba(254,252,252,0.35)"`.
- Area fill: `rgba(241,69,42,0.12)` (polygon).
- Linea: `stroke="#F1452A"`, stroke-width 2.5, strokeLinecap round.
- Dot: cerchio esterno r=5 fill `#F1452A`, cerchio interno r=3 fill `#212327`.
- Etichette asse X: 9px, `fill="rgba(254,252,252,0.35)"`.
- Card breakdown ultima sessione: barra proporzionale per ogni serie (bg `#1E2023`, fill `#F1452A`), altezza 8px, border-radius 4px.

**Vista Tabella**:
- Card `#2A2D33`, overflow hidden.
- Riga header: bg `#212327`, colonne DATA / S1 / S2 / S3 / S4, 12px weight 700 muted.
- Colonna DATA flex:1, colonne serie width 50px.
- Riga più recente: bg `rgba(241,69,42,0.08)`, valori 13px weight 700 `#F1452A`, badge "ultima" 11px accent.
- Righe storiche: bg `#2A2D33`, valori 13px weight 400 `#FEFCFC`.
- Separatori: `border-bottom: 1px solid rgba(254,252,252,0.05)`.

**Note PT**:
- Bg `rgba(79,142,247,0.08)`, border `1px solid rgba(79,142,247,0.20)`, border-radius 12px.
- Titolo "📝 Note PT" 13px weight 700 `#4F8EF7`.
- Corpo 13px muted.

---

## 4. Navigazione e Flusso

```
AuthScreen (non autenticato)
  ↓
OnboardingScreen (prima volta o nuova scheda)
  ↓
HomeScreen (Dashboard)  ←──→  SchedeScreen
                                    ↓
                             SchedaSingolaScreen
                                    ↓
                             AllenamentoScreen (wizard esercizio per esercizio)
                                    ↓
                             ProgressioneScreen (tap su esercizio)
```

- **BottomNav** presente su: Dashboard, Schede, Profilo.
- **Back navigation** inline (← testo) su: Scheda Singola, Allenamento, Progressione.
- **Allenamento**: navigazione interna con Avanti/Indietro, no back system. "✕ Termina" chiude e torna alla scheda.

---

## 5. Animazioni e Interazioni

| Elemento | Comportamento |
|---|---|
| Tab switcher (Auth/Segmented) | `transition: all 0.15s` su background/shadow |
| Barra progresso allenamento | `transition: width 0.3s` |
| Step indicator onboarding | `transition: all 0.2s` su circle, `transition: background 0.3s` su connettori |
| Stesso peso checkbox | `transition: all 0.15s` |
| Opacity input Stesso peso | `transition: opacity 0.2s` |
| Selettore settimane | Horizontal scroll senza scrollbar visibile |
| Schermate scrollabili | Scroll verticale nativo, no paginazione |

---

## 6. Responsive Notes

Il design è pensato per **390px di larghezza** (iPhone 14 Pro).  
Su viewport più larghi (tablet/desktop):
- Centrare il contenuto in un container max-width 430px.
- Sfondo esterno: `#18191C`.
- La BottomNav può diventare sidebar su breakpoint ≥ 768px (decisione futura).
