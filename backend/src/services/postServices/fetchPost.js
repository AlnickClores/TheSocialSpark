const connection = require("../../database/connection");

const fetchPostsByUserId = async (userId) => {
  const [rows] = await connection.execute(
    "SELECT * FROM post_tbl WHERE userId = ? ORDER BY date_created DESC",
    [userId]
  );
  return rows;
};

module.exports = fetchPostsByUserId;
