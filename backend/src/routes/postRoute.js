const express = require("express");
const upload = require("../middleware/upload");
const post = require("../controllers/postController");

const router = express.Router();

// create a post
router.post("/create-post", post.createPost);

module.exports = router;
