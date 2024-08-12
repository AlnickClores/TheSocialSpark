const jwt = require("jsonwebtoken");
const createPost = require("../services/postServices/createPost");
const fetchPost = require("../services/postServices/fetchPost");
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
