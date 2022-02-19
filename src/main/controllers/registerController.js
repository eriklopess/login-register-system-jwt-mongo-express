const Register = require("../services/registerUser");

exports.registerController = async (req, res) => {
  console.log(req.body);
  const registerUser = new Register(
    req.body.email,
    req.body.password,
    req.body.confirmPassword
  );
  registerUser
    .registerUser()
    .then(() => res.status(200).json(req.body))
    .catch((err) => res.status(400).json({ message: err.message }));
};
