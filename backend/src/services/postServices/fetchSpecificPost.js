const connection = require("../../database/connection");

const fetchSpecificPost = async (postId) => {
  const [rows] = await connection.execute(
    "SELECT content, location, image, stars, date_created FROM post_tbl WHERE postId = ?",
    [postId]
  );
  return rows[0];
};

module.exports = fetchSpecificPost;
