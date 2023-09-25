const { model, Schema } = require("mongoose");
const jwt = require("jsonwebtoken");
const { genPasswordHash, checkPassword } = require("../helper/helper");
const { JWT_SECRET } = require("../config");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    authMethod: { type: String, required: true, default: "email" },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

UserSchema.static(
  "register",
  async ({ name, email, phone, authMethod, password }) => {
    const passwordHash = await genPasswordHash(password);

    const newUser = await new User({
      name,
      email,
      phone,
      authMethod,
      password: passwordHash,
    }).save();

    // newUser = JSON.parse(JSON.stringify(newUser));
    // delete newUser.password;

    return newUser;
  }
);

//Generate Token
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET, { expiresIn: "7d" });
  return token;
};

const User = new model("User", UserSchema);
module.exports = User;
