const { User, userModel } = require("../models/usersModel");
const validator = require("validator");
const bcrypt = require("bcrypt");

class Login {
  _email;
  _password;
  _userClass;

  constructor(email, password) {
    this._userClass = new User(email, password);
    this._email = this._userClass._email;
    this._password = this._userClass._password;
  }

  verifyEmail() {
    const email = this._email;
    if (!validator.isEmail(email)) throw new Error("Email Inválido.");
  }

  verifyPasswordLength() {
    const password = this._password;
    if (!password || password.length < 6)
      throw new Error("A senha precisa ter no minimo 6 caracteres.");
  }

  async verifyPasswordCompare() {
    const password = this._password;
    const user = await this.findUser();
    console.log(password);
    const COMPARED_PASSWORD = bcrypt.compareSync(this._password, user.password);
    if (!COMPARED_PASSWORD) throw new Error("Senha Incorreta.");
  }

  async findUser() {
    const user = await userModel.findOne({ email: this._email });
    if (!user) throw new Error("Usuario não encontrado.");
    return user;
  }

  async loginUser() {
    this.verifyEmail();
    this.verifyPasswordLength();
    await this.verifyPasswordCompare();
  }
}

module.exports = Login;
