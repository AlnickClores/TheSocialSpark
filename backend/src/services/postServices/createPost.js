const connection = require("../../database/connection");

module.exports = async (userId, content, image = null, location = null) => {
  try {
    const query =
      "INSERT INTO post_tbl (userId, content, image, location) VALUES (?, ?, ?, ?)";

    await connection.execute(query, [userId, content, image, location]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
