const express = require("express");
const jwt = require("jsonwebtoken");
const connection = require("../database/connection");
const multer = require("multer");
const path = require("path");
const upload = require("../middleware/upload");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_KEY;

router.post("/login", async (req, res) => {
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
});

router.get("/user", async (req, res) => {
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
});

router.put("/updateProfile", upload.single("image"), async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    const { username, bio, location } = req.body;
    let image = req.file ? req.file.filename : null;

    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    await connection.execute(
      "UPDATE user_tbl SET username = ?, bio = ?, location = ?, image = ? WHERE userID = ?",
      [username, bio, location, image, userId]
    );

    res.status(200).send({ message: "Profile Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
