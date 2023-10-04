const mysql = require('mysql2');


// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: 'db4free.net',
  user: 'datosseguro',
  database: 'datosseguro',
  password: 'falcofalco'
});

module.exports = pool.promise();