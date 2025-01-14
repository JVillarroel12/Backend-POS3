const mysql = require('mysql2/promise'); 

require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '3.142.247.244',    
  user: process.env.DB_USER || 'pos3db',     
  password: process.env.DB_PASSWORD || 'CMho3jpG7fLMX!F5',     
  database: process.env.DB_NAME || 'pos3db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = pool;