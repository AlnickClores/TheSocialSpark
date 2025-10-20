const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "social_spark",
  password: "Knotz@2k3",
});

module.exports = connection;
