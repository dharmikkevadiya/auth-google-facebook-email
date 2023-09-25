const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { getMe, getAllUsers } = require("../controllers/user.js");

//@route    GET /me
//@desc     Get me
//@access   PRIVATE
router.get("/me", auth, getMe.controller);

//@route    GET /users
//@desc     Get all users
//@access   PRIVATE
router.get("/users", auth, getAllUsers.controller);

module.exports = router;
