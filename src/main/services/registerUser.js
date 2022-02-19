const { User, userModel } = require("../models/usersModel");
const validator = require("validator");
const bcrypt = require("bcrypt");

class Register {
  _email;
  _password;
  _confirmPassword;
  _userClass;
  constructor(email, password, confirmPassword) {
    this._userClass = new User(email, password);
    this._email = this._userClass._email;
    this._password = this._userClass._password;
    this._confirmPassword = confirmPassword;
  }

  verifyEmail() {
    const email = this._email;
    if (!validator.isEmail(email)) throw new Error("Email Inválido!");
  }

  verifyPassword() {
    const password = this._password;
    if (!password || password.length < 6)
      throw new Error("A senha precisa ter no minimo 6 caracteres.");
  }

  confirmPassword() {
    const password = this._password;
    const confirmPassword = this._confirmPassword;
    if (password !== confirmPassword) {
      throw new Error("As duas senhas não coincidem.");
    }
  }

  async registerUser() {
    try {
      this.verifyEmail();
      this.verifyPassword();
      this.confirmPassword();
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(this._password, salt);
      await userModel.create({ email: this._userClass._email, password });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

module.exports = Register;
