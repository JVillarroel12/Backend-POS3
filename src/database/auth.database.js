const pool = require('../../src/config/db');

const findUserByUserName = async (user) => {
  const [rows] = await pool.query('SELECT * FROM USERS WHERE USER = ?', [user]);
  return rows[0];
};
  
const createUser = async (user, hashedPassword) => {
    const query = 'INSERT INTO USERS (USER, PASSWORD) VALUES (?, ?)';
    const [rows] = await pool.query(query, [user, hashedPassword]);
    return {userId: rows.insertId, user }
};
module.exports = {
    findUserByUserName,
    createUser
};