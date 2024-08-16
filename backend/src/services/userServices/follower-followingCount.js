const connection = require("../../database/connection");

module.exports = async (userId) => {
  try {
    const [followers] = await connection.execute(
      "SELECT COUNT(*) as followerCount FROM followers_tbl WHERE following_id = ?",
      [userId]
    );

    const [following] = await connection.execute(
      "SELECT COUNT(*) as followingCount FROM followers_tbl WHERE follower_id = ?",
      [userId]
    );

    return {
      followerCount: followers[0].followerCount,
      followingCount: following[0].followingCount,
    };
  } catch (error) {
    console.error(error);
  }
};
