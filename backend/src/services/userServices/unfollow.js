const connection = require("../../database/connection");

module.exports = async ({ userId, followingId }) => {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM followers_tbl WHERE follower_id = ? AND following_id = ?",
      [userId, followingId]
    );

    if (rows.length > 0) {
      await connection.execute(
        "DELETE FROM followers_tbl WHERE follower_id = ? AND following_id = ?",
        [userId, followingId]
      );
      return { alreadyFollowing: true, unfollowed: true };
    } else {
      return { alreadyFollowing: false, unfollowed: false };
    }
  } catch (error) {
    console.error(error);
  }
};
