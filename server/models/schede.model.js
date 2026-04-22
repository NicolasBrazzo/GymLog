const supabase = require("../config/db_connection");

const tableName = "workout_sheets";

const getWorkoutSheetsByUserId = async (userId) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error("DATABASE_GET_SCHEDE_ERROR");

  return data ?? [];
};

const getWorkoutDayBySheetId = async (sheetId) => {
  const { data, error } = await supabase
    .from("workout_days")
    .select("*")
    .eq("workout_sheet_id", sheetId)
    .order("order_index", { ascending: true });

  if (error) throw new Error("DATABASE_GET_GIORNI_ERROR");

  return data ?? [];
};

const saveWorkoutSheet = async (userId, { name, startDate, endDate, weeksNumber, giorni }) => {
  const { data: sheet, error: sheetError } = await supabase
    .from("workout_sheets")
    .insert({ name, user_id: userId, start_date: startDate, end_date: endDate || null, weeks_number: weeksNumber })
    .select()
    .single();

  if (sheetError) { console.error("DB_INSERT_SHEET_ERROR detail:", sheetError); throw new Error(`DB_INSERT_SHEET_ERROR: ${sheetError.message}`); }

  let totalDays = 0, totalSupersets = 0, totalExercises = 0, totalProgressions = 0;

  for (let i = 0; i < giorni.length; i++) {
    const giorno = giorni[i];

    const { data: day, error: dayError } = await supabase
      .from("workout_days")
      .insert({ name: `Giorno ${giorno.id}`, workout_sheet_id: sheet.id, order_index: i })
      .select()
      .single();

    if (dayError) { console.error("DB_INSERT_DAY_ERROR detail:", dayError); throw new Error(`DB_INSERT_DAY_ERROR: ${dayError.message}`); }
    totalDays++;

    for (let j = 0; j < giorno.superset.length; j++) {
      const ss = giorno.superset[j];

      const { data: superset, error: ssError } = await supabase
        .from("supersets")
        .insert({ workout_day_id: day.id, order_index: j })
        .select()
        .single();

      if (ssError) { console.error("DB_INSERT_SUPERSET_ERROR detail:", ssError); throw new Error(`DB_INSERT_SUPERSET_ERROR: ${ssError.message}`); }
      totalSupersets++;

      for (let k = 0; k < ss.esercizi.length; k++) {
        const es = ss.esercizi[k];

        const { data: exercise, error: esError } = await supabase
          .from("exercises")
          .insert({ name: es.nome, superset_id: superset.id, order_index: k })
          .select()
          .single();

        if (esError) { console.error("DB_INSERT_EXERCISE_ERROR detail:", esError); throw new Error(`DB_INSERT_EXERCISE_ERROR: ${esError.message}`); }
        totalExercises++;

        for (const sett of es.settimane) {
          // reps è NOT NULL nel DB — per esercizi a tempo usa durata come fallback
          const reps = sett.ripetizioni != null ? String(sett.ripetizioni) : (sett.durata ?? "—");

          const { error: wpError } = await supabase
            .from("weekly_progressions")
            .insert({
              exercise_id: exercise.id,
              week_number: sett.settimana,
              sets: sett.serie,
              reps,
            });

          if (wpError) { console.error("DB_INSERT_WP_ERROR detail:", wpError); throw new Error(`DB_INSERT_WP_ERROR: ${wpError.message}`); }
          totalProgressions++;
        }
      }
    }
  }

  return { sheet, stats: { totalDays, totalSupersets, totalExercises, totalProgressions } };
};

module.exports = {
  getWorkoutSheetsByUserId,
  getWorkoutDayBySheetId,
  saveWorkoutSheet,
};
