const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const { login_name, login_pass } = req.body;
  try {
    const user = await User.findOne({ where: { login_name } });
    if (await bcrypt.compare(login_pass, user.login_pass)) {
      const token = jwt.sign(
        {
          id: user.uuid,
          login_name: user.login_name,
          user_type_id: user.user_type_id,
        },
        process.env.JWT_SECRET
      );
      res.json({
        status: "OK",
        token,
      });
    } else {
      res.status(500).json("Wrong Password");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = login;
