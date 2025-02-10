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
const getAllComandasByBillId = async (billId) => {
  const [comandas] = await pool.query(
    `
      SELECT
          *
      FROM
          comandas
      WHERE
          bill_id = ?
  `,
    [billId]
  );

  // Para cada comanda, obtén sus adicionales
  const comandasConAdicionales = await Promise.all(
    comandas.map(async (comanda) => {
      const [additionals] = await pool.query(
        `
          SELECT
              *
          FROM
              comanda_additionals
          WHERE
              comanda_id = ?
      `,
        [comanda.comanda_id]
      );
      const parsedAdditionals = additionals.map((additional) => ({
        ...additional,
        price: Number(additional.price),
        price_ref: Number(additional.price_ref),
        image_path: additional.image_path,
      }));
      return {
        ...comanda,
        price: Number(comanda.price),
        price_ref: Number(comanda.price_ref),
        image_path: comanda.image_path,
        additionals: parsedAdditionals || [],
      };
    })
  );

  return comandasConAdicionales;
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
    image_path,
  } = comandaData;
  const modifiersJSON = JSON.stringify(modifiers);

  try {
    // Insertar la comanda principal
    const [comandaResult] = await pool.query(
      `
          INSERT INTO comandas (category_id, product_id, bill_id, name, price, price_ref, qty, modifiers, image_path)
          VALUES(
              ?,
              ?,
              ?,
              ?,
              ?,
              ?,
              ?,
              ?,
              ?)
      `,
      [
        category_id,
        product_id,
        bill_id,
        name,
        price,
        price_ref,
        qty,
        modifiersJSON,
        image_path,
      ]
    );

    const comandaId = comandaResult.insertId;

    // Insertar los adicionales
    if (additionals && additionals.length > 0) {
      const additionalsQuery = `
            INSERT INTO comanda_additionals (comanda_id, product_id, name, price, qty, price_ref, image_path)
            SELECT
              ?,  -- comanda_id
              p.product_id,
              p.name,
              p.price,
              ?, -- qty
              p.price_ref,
              p.image_path
            FROM products p
            WHERE p.product_id = ?
          `;

      for (const additional of additionals) {
        const { product_id: additionalProductId, qty: additionalQty } =
          additional;
        await pool.query(additionalsQuery, [
          comandaId,
          additionalQty,
          additionalProductId,
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
const updateComandaStatus = async (comandaId, status) => {
  console.log("STATUS =>", status);

  const [result] = await pool.query(
    `
      UPDATE comandas
      SET 
        status = ?,
        time_progress = CASE
          WHEN time_progress IS NULL AND status = 'in progress' THEN NOW()
          ELSE time_progress
        END
      WHERE comanda_id = ?
    `,
    [status.status, comandaId]
  );
  return result.affectedRows > 0;
};
const deleteComanda = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM comandas WHERE comanda_id = ?",
    [id]
  );
  return result.affectedRows > 0;
};
const getStatus = async () => {
  const comandasStatus = {
    waiting: [],
    inProgress: [],
    filled: [],
  };

  const getComandasWithDetails = async (estado) => {
    const [comandas] = await pool.query(
      `
      SELECT
          c.*,
          t.table_id AS table_table_id,
          t.name AS table_name,
          z.zone_id AS zone_zone_id,
          z.name AS zone_name
      FROM
          comandas c
      INNER JOIN bills b ON c.bill_id = b.bill_id
      INNER JOIN tables t ON b.table_id = t.table_id
      INNER JOIN zone z ON t.zone_id = z.zone_id
      WHERE c.status = ?
  `,
      [estado]
    );
    return comandas.map((comanda) => {
      const {
        table_table_id,
        table_name,
        zone_zone_id,
        zone_name,
        ...comandaData
      } = comanda;
      return {
        ...comandaData,
        modifiers: comanda.modifiers,
        table: {
          table_id: table_table_id,
          name: table_name,
        },
        zone: {
          zone_id: zone_zone_id,
          name: zone_name,
        },
      };
    });
  };

  comandasStatus.waiting = await getComandasWithDetails("waiting");
  comandasStatus.inProgress = await getComandasWithDetails("in progress");
  comandasStatus.filled = await getComandasWithDetails("filled");
  return comandasStatus;
};
module.exports = {
  getAllComandas,
  getComandaById,
  createComandaWithAdditionals,
  updateComanda,
  deleteComanda,
  createComandas,
  getAllComandasByBillId,
  updateComandaStatus,
  getStatus,
};
