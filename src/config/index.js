const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/user-auth";
const JWT_SECRET = process.env.JWT_SECRET || "hellojwt123";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT || 5000;

module.exports = {
  MONGODB_URL,
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_APP_ID,
  FACEBOOK_CLIENT_SECRET,
  BASE_URL,
  PORT,
};
