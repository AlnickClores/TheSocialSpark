const connection = require("../../database/connection");

const editPost = async (postId, userId, updateFields) => {
  try {
    const updates = [];
    const values = [];

    if (updateFields.content !== undefined) {
      updates.push("content = ?");
      values.push(updateFields.content);
    }
    if (updateFields.image !== undefined) {
      updates.push("image = ?");
      values.push(updateFields.image);
    }
    if (updateFields.location !== undefined) {
      updates.push("location = ?");
      values.push(updateFields.location);
    }

    values.push(postId, userId);

    if (updates.length === 0) {
      return { error: "No fields to update" };
    }

    const query = `
      UPDATE post_tbl
      SET ${updates.join(", ")}
      WHERE postId = ? AND userId = ?
    `;

    const [result] = await connection.query(query, values);
    return result;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

module.exports = editPost;
