-- Abilita estensione per UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS
-- gli utenti dell'app. Contiene le credenziali di accesso e i dati anagrafici base.
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name text NOT NULL,
    last_name text,
    email text NOT NULL UNIQUE,
    password_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- WORKOUT SHEETS
-- le schede di allenamento create dal PT. Ogni scheda appartiene a un utente e ha una durata definita in settimane.
CREATE TABLE workout_sheets (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    start_date date NOT NULL,
    end_date date,
    weeks_number integer NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- WORKOUT_DAYS
--  i giorni che compongono una scheda, come Giorno A, Giorno B. Ogni giorno appartiene a una scheda.
CREATE TABLE workout_days (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    workout_sheet_id uuid NOT NULL REFERENCES workout_sheets(id) ON DELETE CASCADE,
    order_index integer NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- SUPERSETS
-- i gruppi di esercizi dentro un giorno. Un superset può contenere uno o più esercizi che si eseguono in sequenza con un recupero condiviso.
CREATE TABLE supersets (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_day_id uuid NOT NULL REFERENCES workout_days(id) ON DELETE CASCADE,
    order_index integer NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- EXERCISES
-- i singoli esercizi dentro un superset. Ogni esercizio ha una posizione ordinata all'interno del suo superset.
CREATE TABLE exercises (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    superset_id uuid NOT NULL REFERENCES supersets(id) ON DELETE CASCADE,
    order_index integer NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- weekly_progressions
-- il piano del PT per ogni esercizio, settimana per settimana. Dice quante serie e quante ripetizioni fare in quella settimana specifica.
CREATE TABLE weekly_progressions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id uuid NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    week_number integer NOT NULL,
    sets integer NOT NULL,
    reps text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- workout_logs
-- quello che registri tu in palestra. Il peso usato, le serie e le ripetizioni effettivamente completate per ogni esercizio in ogni sessione.
CREATE TABLE workout_logs (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    weekly_progression_id uuid NOT NULL REFERENCES weekly_progressions(id) ON DELETE CASCADE,
    weight numeric(5,2),
    sets integer NOT NULL,
    reps text NOT NULL,
    note text,
    created_at timestamp with time zone DEFAULT now()
);

-- SESSIONS
CREATE TABLE sessions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_day_id uuid NOT NULL REFERENCES workout_days(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week_number integer NOT NULL,
    completed bool NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- QUERY iniziale appena apro l'app 
SELECT *
FROM sessions AS s
JOIN workout_days AS wd ON s.wokout_day_id = wd.id
JOIN supersets AS super ON super.workout_day_id = wd.id
JOIN exercises AS ex ON ex.superset_id = super.id
JOIN weekly_progressions AS wp ON wp.exercise_id = ex.id
WHERE user_id = $1 AND wp.week_number = s.week_number
ORDER BY super.order_index, ex.order_index