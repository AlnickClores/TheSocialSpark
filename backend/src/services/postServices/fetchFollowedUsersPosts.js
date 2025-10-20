const connection = require("../../database/connection");

const fetchFollowedUsersPosts = async (userId) => {
  const [rows] = await connection.execute(
    `
    SELECT 
      p.postId,
      p.userId,
      u.username,
      u.image AS userImage,
      p.content,
      p.image AS postImage,
      p.location,
      p.stars,
      p.date_created
    FROM post_tbl AS p
    LEFT JOIN user_tbl AS u
      ON p.userId = u.userID
    WHERE p.userId IN (
      SELECT following_id 
      FROM followers_tbl 
      WHERE follower_id = ?
    )
    ORDER BY p.date_created DESC
    `,
    [userId]
  );

  return rows;
};

module.exports = fetchFollowedUsersPosts;
