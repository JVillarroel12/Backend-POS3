const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.code === "ER_DUP_ENTRY") {
    return res
      .status(409)
      .send({ message: "El valor para el campo único ya existe." });
  }

  res.status(500).send({ message: "Ocurrió un error en el servidor." });
};

module.exports = errorHandler;
