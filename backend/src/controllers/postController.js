const jwt = require("jsonwebtoken");
const createPost = require("../services/postServices/createPost");
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

    await createPost(userId, content, location);

    res.status(200).send({ message: "Post created successfully." });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
