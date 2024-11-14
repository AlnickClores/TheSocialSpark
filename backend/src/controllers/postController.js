const jwt = require("jsonwebtoken");
const createPost = require("../services/postServices/createPost");
const fetchPost = require("../services/postServices/fetchPost");
const deletePost = require("../services/postServices/deletePost");
const starPost = require("../services/postServices/starPost");
const isStarred = require("../services/postServices/checkStarredPost");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_KEY;

exports.createPost = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    const { content, location } = req.body;
    const image = req.file;

    const imageData = image ? image.buffer : null;

    await createPost(userId, content, imageData, location);

    res.status(200).send({ message: "Post created successfully." });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.fetchPost = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const posts = await fetchPost(userId);

    const formattedPosts = posts.map((post) => ({
      postId: post.postId,
      userId: post.userId,
      content: post.content,
      image: post.image ? post.image.toString("base64") : null,
      location: post.location,
      stars: post.stars,
      date_created: post.date_created,
    }));

    res.status(200).send(formattedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const result = await deletePost(postId, userId);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized to delete." });
    }

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting the post." });
  }
};

exports.starPost = async (req, res) => {
  const { postId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;

    if (!postId || isNaN(postId)) {
      return res.status(400).json({ error: "Invalid postId" });
    }

    const result = await starPost.starPost(postId, userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error toggling star on post:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while starring the post" });
  }
};

exports.isStarred = async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const result = await isStarred.isStarred(postId, userId);
    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
