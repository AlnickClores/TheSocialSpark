const connection = require("../../database/connection");

module.exports = async (userId, content, location = null) => {
  try {
    const query =
      "INSERT INTO post_tbl (userId, content, location) VALUES (?, ?, ?)";

    await connection.execute(query, [userId, content, location]);
  } catch (error) {
    console.log(error);
  }
};
