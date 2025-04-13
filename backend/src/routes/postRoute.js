const express = require("express");
const multer = require("multer");
const post = require("../controllers/postController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// create a post
router.post("/create-post", upload.single("image"), post.createPost);

// fetch posts
router.get("/fetch-post", post.fetchPost);

//fetch specific post
router.get("/:postId", post.fetchSpecificPost);

// delete a post
router.delete("/delete/:postId", post.deletePost);

// edit a post
router.put("/edit/:postId", upload.single("image"), post.editPost);

// star or unstar post
router.post("/star/:postId", post.starPost);

// check if user already starred the post
router.get("/is-starred/:postId/:userId", post.isStarred);

// fetch the posts of the followed users
router.get("/followed-users-posts", async (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
          SELECT p.postId, p.userId, p.content, p.image, p.location, p.stars, p.date_created, u.username, u.profile_picture 
          FROM post_tbl p
          JOIN followers_tbl f ON p.userId = f.followed_id
          JOIN user_tbl u ON p.userId = u.userId
          WHERE f.follower_id = ?
          ORDER BY p.date_created DESC
      `;

    const [posts] = await db.promise().query(query, [userId]);

    res.json(posts);
  } catch (error) {
    console.error("Error fetching followed users' posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
