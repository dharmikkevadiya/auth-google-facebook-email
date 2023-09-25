const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  googleLogin,
  facebookLogin,
  logout,
} = require("../controllers/auth");
const passport = require("../middleware/oAuth");

//@route    POST /signup
//@desc     User signup
//@access   PUBLIC
router.post("/signup", signup.validator, signup.controller);

//@route    POST /login
//@desc     User login
//@access   PUBLIC
router.post("/login", login.validator, login.controller);

//@route    POST /auth/google
//@desc     User google auth
//@access   PUBLIC
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleLogin.controller
);

//@route    POST /auth/favebook
//@desc     User facebook auth
//@access   PUBLIC
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  facebookLogin.controller
);

module.exports = router;
