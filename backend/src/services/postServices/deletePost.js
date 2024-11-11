const connection = require("../../database/connection");

module.exports = async (postId, userId) => {
  try {
    const query = "DELETE FROM post_tbl WHERE postId = ? AND userId = ?";

    const [result] = await connection.execute(query, [postId, userId]);

    if (result.affectedRows === 0) {
      throw new Error("Post not found or unauthorized to delete");
    }

    return { message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
