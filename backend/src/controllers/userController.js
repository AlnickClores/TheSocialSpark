const jwt = require("jsonwebtoken");
const connection = require("../database/connection");
const multer = require("multer");
const path = require("path");
const register = require("../services/userServices/register");
const follow = require("../services/userServices/follow");
const fCounts = require("../services/userServices/follower-followingCount");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_KEY;

exports.registration = async (req, res) => {
  try {
    const { username, email, password, date_joined } = req.body;
    await register(username, email, password, date_joined);
    res.status(200).send({ message: "User created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating user." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM user_tbl WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }

    const user = rows[0];

    if (password !== user.password) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: user.userID, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.send({
      token,
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error." });
  }
};

exports.getUserData = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    const userId = decoded.id;

    const [rows] = await connection.execute(
      "SELECT userID, username, email, bio, date_joined, image, location FROM user_tbl WHERE userID = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const user = rows[0];

    if (user.image) {
      user.image = `http://localhost:3000/uploads/${user.image}`;
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).send({ message: "Invalid token" });
  }
};

exports.updateProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    const { username, bio, location } = req.body;
    const image = req.file ? req.file.filename : null;

    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Fetch existing user data
    const [existingUserRows] = await connection.execute(
      "SELECT username, bio, location, image FROM user_tbl WHERE userID = ?",
      [userId]
    );

    if (existingUserRows.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const existingUser = existingUserRows[0];

    const updates = [];
    const values = [];

    if (username !== undefined) {
      updates.push("username = ?");
      values.push(username);
    }
    if (bio !== undefined) {
      updates.push("bio = ?");
      values.push(bio);
    }
    if (location !== undefined) {
      updates.push("location = ?");
      values.push(location);
    }
    if (image !== null) {
      updates.push("image = ?");
      values.push(image);
    }

    if (updates.length === 0) {
      return res.status(400).send({ message: "No fields to update" });
    }

    values.push(userId);

    const updateQuery = `UPDATE user_tbl SET ${updates.join(
      ", "
    )} WHERE userID = ?`;

    console.log("Update Query:", updateQuery);
    console.log("Values:", values);

    await connection.execute(updateQuery, values);

    res.status(200).send({ message: "Profile Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.searchUser = async (req, res) => {
  const { query } = req.query;

  try {
    const [results] = await connection.execute(
      "SELECT userID, username, image FROM user_tbl WHERE username LIKE ?",
      [`%${query}%`]
    );

    const baseUrl = "http://localhost:3000/uploads/";
    const resultsWithFullImageUrls = results.map((user) => ({
      ...user,
      image: user.image ? `${baseUrl}${user.image}` : null,
    }));

    res.status(200).json(resultsWithFullImageUrls);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.getSearchedUserData = async (req, res) => {
  const { username } = req.params;

  try {
    const [rows] = await connection.execute(
      "SELECT userID, username, email, bio, date_joined, image, location FROM user_tbl WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    if (user.image) {
      user.image = `http://localhost:3000/uploads/${user.image}`;
    }

    const [postRows] = await connection.execute(
      "SELECT postId, content, date_created, stars, location, image FROM post_tbl where userId = ? ORDER BY date_created DESC",
      [user.userID]
    );

    user.posts = postRows.map((post) => ({
      ...post,
      image: post.image ? Buffer.from(post.image).toString("base64") : null,
    }));

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.followUser = async (req, res) => {
  const { userId, followingId } = req.body;

  console.log("Req Body:", req.body);

  if (!userId || !followingId) {
    return res
      .status(400)
      .json({ message: "User ID and Following ID are required." });
  }

  try {
    const result = await follow({ userId, followingId });

    if (result.alreadyFollowing) {
      return res.status(400).json({ message: "Already following this user." });
    }

    if (result.success) {
      return res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.getFollowersAndFollowing = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const { followerCount, followingCount } = await fCounts(userId);
    res.status(200).json({ followerCount, followingCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
