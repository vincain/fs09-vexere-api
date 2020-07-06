const { User } = require("../../../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //build-in-package
const _ = require("lodash");

// Register
const createUser = (req, res, next) => {
  const { email, password, fullname } = req.body;

  let newUser;
  newUser = new User({
    email,
    password,
    fullname,
  });
  return newUser
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const jwtSign = promisify(jwt.sign);
const login = (req, res, next) => {
  const { email, password } = req.body;

  let _user;
  User.findOne({
    email,
  })
    .then((user) => {
      _user = user;
      if (!user)
        return Promise.reject({
          message: "Email not found",
        });

      return bcrypt.compare(password, user.password);
    })
    .then((isMatched) => {
      if (!isMatched)
        return Promise.reject({
          message: "Wrong Password",
        });

      const payload = _.pick(_user, ["_id", "email", "fullname", "userType"]);
      return jwtSign(payload, "vexere", { expiresIn: "1h" });
    })
    .then((token) => {
      return res.status(200).json({
        message: "Login successfully!",
        token,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const uploadAvatar = (req, res, next) => {
  const { email } = req.user;

  User.findOne({ email })
    .then((user) => {
      if (!user)
        return Promise.reject({
          message: "Email not found",
        });

      user.avatar = req.file.path;
      return user.save();
    })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      if (!err.status) return res.status(500).json();
      return res.status(err.status).json(err.message);
    });
};

module.exports = {
  createUser,
  login,
  uploadAvatar,
};
