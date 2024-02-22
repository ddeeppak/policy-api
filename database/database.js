const mysql = require("mysql2/promise");

const mysqlDetails = mysql.createPool({
  host: "sql6.freesqldatabase.com",
  user: "root",
  password: "sql6686095",
  database: "sql6686095",
});

module.exports = mysqlDetails;
