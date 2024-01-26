const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const checkPermissions = require('./checkPermissions');
const sendVerificationEmail = require('./sendVerficationEmail');
const sendResetPasswordEmail = require('./sendResetPasswordEmail');
const createHash = require('./createHash');
const createRandomOTP = require('./createRandomOTP');
const sendOTPEmail = require('./sendOTPEmail');

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
  createRandomOTP,
  sendOTPEmail
};
