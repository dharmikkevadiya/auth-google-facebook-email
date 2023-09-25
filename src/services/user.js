const User = require("../models/user"); //Database Model

class UserService {
  async getMe(user) {
    return user;
  }

  async getAllUsers() {
    const users = await User.find();

    return users;
  }
}

module.exports = UserService;
