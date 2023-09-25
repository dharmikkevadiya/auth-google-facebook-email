const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const genPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const Response = (message, data = {}) => ({
  status: 200,
  message,
  data,
});

module.exports = {
  checkPassword,
  genPasswordHash,
  Response,
};
