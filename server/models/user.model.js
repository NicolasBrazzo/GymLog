const supabase = require("../config/db_connection");

const tableName = "users";

// AL MOMENTO DISABILITATA
// create new user
// const createNewUser = async ( email, hashedPassword, isAdmin) => {
//   const { data, error } = await supabase
//     .from(tableName)
//     .insert([
//       {
//         email,
//         password: hashedPassword,
//         isAdmin,
//       },
//     ])
//     .select()
//     .single();

//   if (error) {
//     throw new Error("DATABASE_CREATE_USER_ERROR");
//   }

//   return data;
// };

// edit user by id
const updateUserById = async (id, userData) => {
  const { data, error } = await supabase
    .from(tableName)
    .update(userData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_EDIT_USER_ERROR");
  }

  return data;
};

// delete user by id
const deleteUserById = async (id) => {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_DELETE_USER_ERROR");
  }

  return data;
};

// find user by email
const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("email", email)
    .maybeSingle();   // .single genera un errore se non trova righe!

  if (error) {
    throw new Error("DATABASE_FIND_USER_ERROR");
  }

  return data; 
};

// find user by id
const findUserById = async (id) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("DATABASE_FIND_USER_ERROR");
  }

  return data;
};



module.exports = {
  // createNewUser,
  findUserByEmail,
  findUserById,
  updateUserById,
  deleteUserById,
};
