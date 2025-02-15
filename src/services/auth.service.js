const Auth = require("../models/auth.model");
const User = require("../models/user.model");

const authenticateUser = async (userData) => {
  const { user, password } = userData;

  // 1. Autenticar al usuario
  const authenticatedUser = await Auth.authenticateUser(user, password);

  // 2. Verificar el resultado de la autenticación
  if (!authenticatedUser) {
    const existingUser = await User.getUserByUsername(user);
    if (!existingUser) {
      // Usuario no encontrado
      throw new Error("El usuario no existe");
    } else {
      // Contraseña incorrecta
      throw new Error("Contraseña invalida");
    }
  }

  // 3. Obtener la información del usuario
  let userDetails = await User.getUserByUsername(user);
  if (!userDetails || !userDetails.profile) {
    throw new Error("No autorizado");
  }

  return userDetails;
};

module.exports = {
  authenticateUser,
};
