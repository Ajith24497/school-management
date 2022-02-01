const { User, Login } = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("node:crypto");
require("dotenv").config();

const login = async (req, res) => {
  const { login_name, login_pass } = req.body;
  try {
    const user = await User.findOne({ where: { login_name } });

    if (!user) res.status(400).json({ message: "Wrong username" });
    const expire_time = new Date(
      // new Date().getTime() + 1 * (1000 * 60 * 60) //one hour
      new Date().getTime() + 15 * 60 * 1000 // 5min
    );

    const isLoginCredentialsTrue = await bcrypt.compare(
      login_pass,
      user.login_pass
    );

    if (isLoginCredentialsTrue) {
      let token = crypto.randomBytes(10).toString("base64");
      const createUserLogin = await Login.create({
        user_id: user.id,
        token,
        expire_time,
      });
      if (!createUserLogin) {
        res.status(400).json({ message: "user login not created" });
      }
      res.status(200).json({ token, message: "user created successfully" });
    } else {
      res.status(400).json({ message: "Invalid Password" });
    }
  } catch (err) {
    res.status(400).json({ message: "test", errors: err });
  }
};

module.exports = login;
