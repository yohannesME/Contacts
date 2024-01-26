
const sendEmail = require('./sendEmail');

const sendOTPEmail = async ({ name, email, OTP, origin }) => {
  const resetURL = `${origin}/user/OTP?&email=${email}`;
  const message = ` <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
        
  <h2>Your One-Time Password for Contacts</h2>
  
  <p>Dear ${name},</p>
  
  <p>Thank you for using Contact. To complete your login or verification process, please use the following one-time password (OTP):</p>
  
  <p style="font-size: 24px; font-weight: bold; color: #007BFF;">Your One-Time Password (OTP): ${OTP}</p>
  
  <p>This OTP is valid for a single use and will expire shortly. Do not share this OTP with anyone for security reasons.</p>
  
  <p>If you did not request this OTP, please ignore this email.</p>
  
  <p>Thank you,<br>
  Yohannes Mesganaw</p>

</div>
  `;

  return sendEmail({
    to: email,
    subject: 'OTP',
    html: `<h4>Hello, ${name}</h4>
   ${message}
   `,
  });
};

module.exports = sendOTPEmail;
