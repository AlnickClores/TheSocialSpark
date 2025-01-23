const connection = require("../../database/connection");

module.exports = async (userId) => {
  try {
    const [followers] = await connection.execute(
      `
      SELECT u.userID, u.username, u.image 
      FROM followers_tbl f
      JOIN user_tbl u ON f.follower_id = u.userID
      WHERE f.following_id = ?
      `,
      [userId]
    );

    const [following] = await connection.execute(
      `
      SELECT u.userID, u.username, u.image 
      FROM followers_tbl f
      JOIN user_tbl u ON f.following_id = u.userID
      WHERE f.follower_id = ?
      `,
      [userId]
    );

    return {
      followers,
      following,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch followers and following.");
  }
};
