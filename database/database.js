const mysql = require("mysql2/promise");

const mysqlDetails = mysql.createPool({
  host: "sql6.freesqldatabase.com",
  user: "sql6686095",
  password: "R2v7DmZWAW",
  database: "sql6686095",
});

module.exports = mysqlDetails;
