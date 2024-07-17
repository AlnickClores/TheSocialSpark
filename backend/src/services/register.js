const connection = require("../database/connection");

module.exports = async (username, email, password, date_joined) => {
  try {
    const query =
      "INSERT INTO user_tbl (username, email, password, bio, date_joined, image) VALUES (?, ?, ?, NULL, ?, NULL)";

    await connection.execute(query, [username, email, password, date_joined]);
  } catch (error) {
    console.log(console.error());
  }
};
