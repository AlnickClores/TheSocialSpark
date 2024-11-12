const db = require("../../database/connection");

exports.starPost = async (postId, userId) => {
  try {
    const [existingStar] = await db.query(
      "SELECT * FROM post_star_tbl WHERE postId = ? AND userId = ?",
      [postId, userId]
    );

    if (existingStar.length > 0) {
      await db.query(
        "DELETE FROM post_star_tbl WHERE postId = ? AND userId = ?",
        [postId, userId]
      );
      await db.query(
        "UPDATE post_tbl SET stars = stars - 1 WHERE postId = ? AND stars > 0",
        [postId]
      );
      return { message: "Post unstarred", starred: false };
    } else {
      await db.query(
        "INSERT INTO post_star_tbl (postId, userId) VALUES (?, ?)",
        [postId, userId]
      );
      await db.query("UPDATE post_tbl SET stars = stars + 1 WHERE postId = ?", [
        postId,
      ]);
      return { message: "Post starred", starred: true };
    }
  } catch (error) {
    console.error("Error in starPost service:", error);
    throw error;
  }
};
