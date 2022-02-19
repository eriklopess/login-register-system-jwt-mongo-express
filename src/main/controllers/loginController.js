const Login = require("../services/loginUser");
const jwt = require("jsonwebtoken");
const teste = "test";
require("dotenv").config();

exports.loginController = async (req, res) => {
  const login = new Login(req.body.email, req.body.password);

  login
    .loginUser()
    .then(() => {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          email: login._email,
        },
        secret
      );

      res.status(200).json({ message: "Logado com sucesso.", token });
    })
    .catch((e) => {
      console.log(e);

      res.status(400).json({ message: "Erro" });
    });
};
