const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',  
    user: 'root',       
    password: 'password',  
    database: 'banco_social'  
});

module.exports = pool;
