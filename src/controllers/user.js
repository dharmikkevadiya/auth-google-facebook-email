const UserService = require("../services/user");
const service = new UserService();
const { MSG } = require("../helper/constant");
const { Response } = require("../helper/helper");
const CustomErrorHandler = require("../helper/CustomErrorHandler");

module.exports.getMe = {
  controller: async function getMe(req, res, next) {
    try {
      const result = await service.getMe(req.user);
      return res.json(Response(MSG.FOUND_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.getAllUsers = {
  controller: async function getAllUsers(req, res, next) {
    try {
      const result = await service.getAllUsers();
      return res.json(Response(MSG.FOUND_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};
