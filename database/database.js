const mysql = require("mysql2/promise");

const mysqlDetails = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Deepak@12",
  database: "gradious",
});

module.exports = mysqlDetails;