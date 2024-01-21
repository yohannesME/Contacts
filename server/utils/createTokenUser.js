const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    location: user.location,
    phoneNumber: user.phoneNumber,
    email: user.email,
  };
};

module.exports = createTokenUser;
