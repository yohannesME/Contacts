const express = require("express");

const router = express.Router();
const {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
  getContact,
} = require("../controllers/contactController");
const { authenticateUser } = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, createContact)
  .get(authenticateUser, getAllContacts);

router
  .route("/:id")
  .get(authenticateUser, getContact)
  .delete(authenticateUser, deleteContact)
  .patch(authenticateUser, updateContact);

module.exports = router;
