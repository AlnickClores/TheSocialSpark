const connection = require("../../database/connection");

exports.isStarred = async (postId, userId) => {
  try {
    const [rows] = await connection.query(
      `SELECT * FROM post_star_tbl WHERE postId = ? AND userId = ?`,
      [postId, userId]
    );

    return rows.length > 0;
  } catch (error) {
    console.error("Error in isPostStarred service:", error);
    throw new Error("Database query failed");
  }
};
