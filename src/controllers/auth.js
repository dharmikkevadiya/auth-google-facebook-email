const AuthService = require("../services/auth");
const service = new AuthService();
const { MSG } = require("../helper/constant");
const { Response } = require("../helper/helper");
const userSchema = require("../helper/validationSchema");
const { celebrate } = require("celebrate");

module.exports.signup = {
  validator: celebrate({ body: userSchema.signup }),
  controller: async function signup(req, res, next) {
    try {
      const result = await service.signup(req.body);

      res.json(Response(MSG.SIGNUP_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.login = {
  validator: celebrate({ body: userSchema.login }),
  controller: async function login(req, res, next) {
    try {
      const result = await service.login(req.body);

      res.json(Response(MSG.LOGIN_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.googleLogin = {
  controller: async function googleLogin(req, res, next) {
    try {
      const result = await service.googleLogin(req.user._id);

      res.json(Response(MSG.LOGIN_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.facebookLogin = {
  controller: async function facebookLogin(req, res, next) {
    try {
      const result = await service.facebookLogin(req.user._id);

      res.json(Response(MSG.LOGIN_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};
