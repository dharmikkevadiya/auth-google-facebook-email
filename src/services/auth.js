const User = require("../models/user"); //Database Model
const { checkPassword } = require("../helper/helper");
const { MSG } = require("../helper/constant");
const CustomErrorHandler = require("../helper/CustomErrorHandler");

class AuthService {
  async signup(body) {
    const { name, phone, email, password } = body;

    // check user already exist
    const isUserExist = await User.findOne({ email });
    if (isUserExist) throw CustomErrorHandler.alreadyExist(MSG.EMAIL_TAKEN);

    // create user
    const newUser = await User.register({
      name,
      email,
      phone,
      password,
    });

    return newUser;
  }

  async login(body) {
    const { email, password } = body;

    let user = await User.findOne({ email }).select("+password");

    // chack email
    if (!user) if (!user) throw CustomErrorHandler.wrongCredentials();

    // check password
    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) throw CustomErrorHandler.wrongCredentials();

    // jwt token
    const token = await user.generateAuthToken();
    user = JSON.parse(JSON.stringify(user));
    delete user.password;
    user.token = token;

    return user;
  }

  async googleLogin(id) {
    let user = await User.findById(id);

    // jwt token
    const token = await user.generateAuthToken();
    user = JSON.parse(JSON.stringify(user));
    user.token = token;

    return user;
  }

  async facebookLogin(id) {
    let user = await User.findById(id);

    // jwt token
    const token = await user.generateAuthToken();
    user = JSON.parse(JSON.stringify(user));
    user.token = token;

    return user;
  }
}

module.exports = AuthService;
