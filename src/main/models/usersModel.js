const mongoose = require("mongoose");

class User {
  _email;
  _password;

  constructor(email, password) {
    this._email = email;
    this._password = password;
  }
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
  User,
  userModel,
};
