const pool = require('../../src/config/db');

const getCategories = async () => {
    const [rows] = await pool.query('SELECT * FROM CATEGORIES');
    return rows
}

const createCategory = async (data) => {
    const {name, image_path} = data;
    const query = 'INSERT INTO CATEGORIES (name,image_path) VALUES (?,?)'
    const [rows] = await pool.query(query,[name, image_path])
    const insertedRowId = rows.insertId
    const [newRows] = await pool.query(`SELECT * FROM CATEGORIES WHERE CATEGORY_ID = ${insertedRowId}`)
    return newRows[0]

}
module.exports = {
    getCategories,
    createCategory
}