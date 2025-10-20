const express = require("express");
const upload = require("../middleware/upload");
const dbController = require("../controllers/dbController");
const usersController = require("../controllers/userController");

const router = express.Router();

// check database connection
router.get("/db-connection", dbController.checkDbConnection);

// fetch user data
router.get("/user", usersController.getUserData);

// fetch specific user data
router.get("/user/:userId", usersController.getSpecificUserData);

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

// search other users
router.get("/search", usersController.searchUser);

// fetch user data by searched username
router.get("/:username", usersController.getSearchedUserData);

// follow user
router.post("/follow", usersController.followUser);

// unfollow user
router.post("/unfollow", usersController.unfollowUser);

// fetch the number of followers and following
router.get(
  "/:userId/followers-following",
  usersController.getFollowersAndFollowing
);

// check if the logged in user already followed the visited profile of other user
router.get("/check-follow-status/:username", usersController.checkFollowStatus);

// get the image of the user by username for the recent searches
router.get("/image/:username", usersController.getUserImageByUsername);

module.exports = router;
