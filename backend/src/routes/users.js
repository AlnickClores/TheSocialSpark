const express = require("express");
const dbController = require("../controllers/dbController");
const registerController = require("../controllers/registerController");

const router = express.Router();

// check database connection
router.get("/db-connection", dbController.checkDbConnection);

// register
router.post("/registration", registerController.registration);

module.exports = router;
