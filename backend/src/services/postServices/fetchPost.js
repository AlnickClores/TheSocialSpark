const connection = require("../../database/connection");

const fetchPostsByUserId = async (userId) => {
  const [rows] = await connection.execute(
    `SELECT p.postId, p.userId, p.content, p.image AS postImage, p.location, p.stars, p.date_created,
            u.username, u.image AS userImage
     FROM post_tbl p
     JOIN user_tbl u ON p.userId = u.userID
     WHERE p.userId = ?
     ORDER BY p.date_created DESC`,
    [userId]
  );
  return rows;
};

module.exports = fetchPostsByUserId;
