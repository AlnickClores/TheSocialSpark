const express = require("express");
const connection = require("../database/connection");
const register = require("../services/register");

const router = express.Router();

// check database connection
router.get("/db-connection", async (req, res) => {
  try {
    const result = await connection.execute("SELECT 1 + 1 AS result");
    console.log("Result:", result);
    const [rows, fields] = result;
    res.send({
      message: "Database connection successful",
      result: rows[0].result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Database connection failed." });
  }
});

// register
router.post("/registration", async (req, res) => {
  try {
    const { username, email, password, date_joined } = req.body;
    await register(username, email, password, date_joined);
    res.status(200).send({ message: "User created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating user." });
  }
});

module.exports = router;
