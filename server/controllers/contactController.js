const Contact = require('../models/contact');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const mongoose = require('mongoose');
const moment = require('moment');

const getAllContacts = async (req, res) => {
  const { search, relation,  sort } = req.query;
console.log(search, relation, sort);
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  if (relation && relation !== 'all') {
    queryObject.relation = relation;
  }

  let result = Contact.find(queryObject);

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }


  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const contacts = await result;

  const totalContacts = await Contact.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalContacts / limit);

  res.status(StatusCodes.OK).json({ contacts, totalContacts, numOfPages });
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
    throw new NotFoundError(`No contact with id ${jobId}`);
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
    body: { company, position },
    user: { userId },
    params: { id: contactId },
  } = req;

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
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

const showStats = async (req, res) => {
  let stats = await Contact.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Contact.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

module.exports = {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
  getContact,
  showStats,
};
