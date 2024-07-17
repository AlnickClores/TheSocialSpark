const connection = require("../database/connection");

module.exports = async (username, email, password) => {
  try {
    const query =
      "INSERT INTO user_tbl (username, email, password, bio, image) VALUES (?, ?, ?, NULL, NULL)";

    await connection.execute(query, [username, email, password]);
  } catch (error) {
    console.log(error);
  }
};
