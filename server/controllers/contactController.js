const Contact = require("../models/Contact");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ contacts, count: contacts.length });
};
const getContact = async (req, res) => {
  const {
    user: { userId },
    params: { id: contactId },
  } = req;

  const contact = await Contact.findOne({
    _id: contactId,
    createdBy: userId,
  });
  if (!contact) {
    throw new NotFoundError(`No contact with id ${contactId}`);
  }
  res.status(StatusCodes.OK).json({ contact });
};

const createContact = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const contact = await Contact.create(req.body);
  res.status(StatusCodes.CREATED).json({ contact });
};

const updateContact = async (req, res) => {
  const {
    body: { name, relation },
    user: { userId },
    params: { id: contactId },
  } = req;
  console.log(name, relation, userId, req.body);
  if (name === "" || relation === "") {
    throw new BadRequestError("name or relation fields cannot be empty");
  }
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!contact) {
    throw new NotFoundError(`No contact with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ contact });
};

const deleteContact = async (req, res) => {
  const {
    user: { userId },
    params: { id: contactId },
  } = req;

  const contact = await Contact.findByIdAndRemove({
    _id: contactId,
    createdBy: userId,
  });
  if (!contact) {
    throw new NotFoundError(`No contact with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
  getContact,
};
