const express = require("express");
const upload = require("../middleware/upload");
const dbController = require("../controllers/dbController");
const usersController = require("../controllers/userController");

const router = express.Router();

// check database connection
router.get("/db-connection", dbController.checkDbConnection);

// fetch user data
router.get("/user", usersController.getUserData);

// register
router.post("/registration", usersController.registration);

// login
router.post("/login", usersController.login);

// update profile
router.put(
  "/updateProfile",
  upload.single("image"),
  usersController.updateProfile
);

module.exports = router;
