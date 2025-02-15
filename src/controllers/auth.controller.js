const authService = require("../services/auth.service");

const authenticateUser = async (req, res) => {
  try {
    const { user, password } = req.body;

    // 1. Autenticar al usuario
    const userDetails = await authService.authenticateUser({ user, password });

    if (!userDetails) {
      return res.status(404).json({ message: "Credenciales inválidas" });
    }
    // 2. Devolver la información del usuario
    return res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error in authenticateUser controller", error);
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  authenticateUser,
};
