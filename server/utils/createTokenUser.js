const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    location: user.location,
    phoneNumber: user.phoneNumber,
    email: user.email,
    role: user.role,
  };
};

module.exports = createTokenUser;
