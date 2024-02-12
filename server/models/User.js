const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    OTP: {
      type: String,
      minlength: 6,
      default: "123456",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
    loginAttempt: {
      type: Number,
      default: 0,
    },
  }
  // {
  //   methods: {
  //     async compareOTPassword(candidateOTP) {
  //       const isMatch = await bcrypt.compare(candidateOTP, this.OTP);
  //       return isMatch;
  //     },
  //   },
  // }
);

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified("OTP"));
  const salt = await bcrypt.genSalt(10);
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.isModified("OTP")) {
    this.OTP = await bcrypt.hash(this.OTP, salt);
  }
});

UserSchema.methods.comparePassword = async function (
  canditatePassword,
  isOTP = false
) {
  if (isOTP) {
    return await bcrypt.compare(canditatePassword, this.OTP);
  }
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

// UserSchema.methods.compareOTPassword = async function (candidateOTP) {
//   const isMatch = await bcrypt.compare(candidateOTP, this.OTP);
//   return isMatch;
// };

module.exports = mongoose.model("User", UserSchema);
