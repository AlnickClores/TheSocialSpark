const connection = require("../database/connection");

exports.checkDbConnection = async (req, res) => {
  try {
    const result = await connection.execute("SELECT 1 + 1 AS result");
    console.log("Result:", result);
    const [rows, fields] = result;
    res.send({
      message: "Database connection successful",
      result: rows[0].result,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({ message: "Database connection Failed." });
  }
};
