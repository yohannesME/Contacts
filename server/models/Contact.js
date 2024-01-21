const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Name"],
    },
    relation: {
      type: String,
      required: [true, "Please provide a relation"],
      default: "Other",
      enum: {
        values: ["Friend", "Relative", "Co-Worker", "Other"],
        message: "{VALUE} is not supported.",
      },
    },
    location: {
      type: String,
    },
    officePhone: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide a valide Phone Number",
      },
    },
    mobilePhone: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide a valide Phone Number",
      },
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid Email Addreses",
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("Contact", ContactSchema);
