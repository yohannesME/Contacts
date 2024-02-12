const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const stats = require("../controllers/adminController");

router.route("/").get([authenticateUser], stats);

module.exports = router;
