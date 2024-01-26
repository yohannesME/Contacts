const crypto = require('crypto');

function createRandomOTP(length=6) {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(digits.length);
    otp += digits[randomIndex];
  }

  return otp;
}


module.exports = createRandomOTP