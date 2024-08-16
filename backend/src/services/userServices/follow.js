const connection = require("../../database/connection");

module.exports = async ({ userId, followingId }) => {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM followers_tbl WHERE follower_id = ? AND following_id = ?",
      [userId, followingId]
    );

    if (rows.length > 0) {
      return { alreadyFollowing: true };
    }

    const query =
      "INSERT INTO followers_tbl (follower_id, following_id) VALUES (?, ?)";
    await connection.execute(query, [userId, followingId]);

    return { success: true };
  } catch (error) {
    console.error(error);
  }
};
