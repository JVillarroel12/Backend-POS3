const { pool } = require("../config/db");

const getAllComandas = async () => {
  const [rows] = await pool.query(
    `
        select 
            comandas.*
        from comandas
        `
  );
  if (!rows || rows.length === 0) {
    return null;
  }
  return rows.map((comanda) => ({
    ...comanda,
    modifiers: JSON.parse(comanda.modifiers),
  }));
};

const getComandaById = async (id) => {
  const [rows] = await pool.query(
    `
        select 
            comandas.*
        from comandas
        where comandas.comanda_id = ?
        `,
    [id]
  );
  if (!rows || rows.length === 0) {
    return null;
  }
  const comanda = rows[0];

  return {
    ...comanda,
    modifiers: JSON.parse(comanda.modifiers),
  };
};

const createComandaWithAdditionals = async (comandaData) => {
  const {
    category_id,
    product_id,
    bill_id,
    name,
    price,
    price_ref,
    qty,
    modifiers,
    additionals,
  } = comandaData;
  const modifiersJSON = JSON.stringify(modifiers);

  try {
    // Insertar la comanda principal
    const query = `
            INSERT INTO comandas (category_id, product_id, bill_id, name, price, price_ref, qty, modifiers)
            VALUES(
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?)
        `;
    const values = [
      category_id,
      product_id,
      bill_id,
      name,
      price,
      price_ref,
      qty,
      modifiersJSON,
    ];

    console.log("Query:", query);
    console.log("Values:", values);

    const [comandaResult] = await pool.query(query, values);

    console.log("Comanda Result:", comandaResult);
    const comandaId = comandaResult.insertId;

    console.log("Comanda ID:", comandaId);

    // Insertar los adicionales
    if (additionals && additionals.length > 0) {
      const additionalsQuery = `
                INSERT INTO comanda_additionals (comanda_id, product_id, name, price, qty)
                VALUES(
                    ?,
                    ?,
                    ?,
                    ?,
                    ?);
            `;

      for (const additional of additionals) {
        const {
          product_id: additionalProductId,
          name: additionalName,
          price: additionalPrice,
          qty: additionalQty,
        } = additional;
        await pool.query(additionalsQuery, [
          comandaId,
          additionalProductId,
          additionalName,
          additionalPrice,
          additionalQty,
        ]);
      }
    }

    return {
      comanda_id: comandaId,
      message: "Comanda and additionals created successfully",
    };
  } catch (error) {
    console.error("Error creating comanda with additionals:", error);
    throw error;
  }
};

const createComandas = async (comandasData) => {
  try {
    //Para multiples inserciones
    const results = await Promise.all(
      comandasData.map(async (comandaData) => {
        return await createComandaWithAdditionals(comandaData);
      })
    );
    return results;
  } catch (error) {
    console.error("Error creating comandas:", error);
    throw error;
  }
};

const updateComanda = async (id, comandaData) => {
  const {
    category_id,
    product_id,
    bill_id,
    table_id,
    name,
    price,
    price_ref,
    qty,
    modifiers,
  } = comandaData;
  const modifiersJSON = JSON.stringify(modifiers); // Serializa el arreglo a JSON
  const [result] = await pool.query(
    "UPDATE comandas SET category_id = ?, product_id = ?, bill_id = ?, table_id = ?, name = ?, price = ?, price_ref = ?, qty = ?, modifiers = ? WHERE comanda_id = ?",
    [
      category_id,
      product_id,
      bill_id,
      table_id,
      name,
      price,
      price_ref,
      qty,
      modifiersJSON,
      id,
    ]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { comanda_id: id, ...comandaData };
};

const deleteComanda = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM comandas WHERE comanda_id = ?",
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllComandas,
  getComandaById,
  createComandaWithAdditionals,
  updateComanda,
  deleteComanda,
  createComandas,
};
