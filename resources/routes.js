const express = require("express");
const {
  registerController,
} = require("../src/main/controllers/registerController");
const { loginController } = require("../src/main/controllers/loginController");
const { checkToken } = require("../src/main/middlewares/checkToken");
const route = express.Router();

route.post("/register", registerController);
route.post("/login", loginController);
route.get("/test-login", checkToken, (req, res) => {
  res.status(200).json({ message: "Autenticado com sucesso!" });
});

module.exports = route;
