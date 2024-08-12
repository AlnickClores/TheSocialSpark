const express = require("express");
const multer = require("multer");
const post = require("../controllers/postController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// create a post
router.post("/create-post", upload.single("image"), post.createPost);

// fetch posts
router.get("/fetch-post", post.fetchPost);

module.exports = router;
