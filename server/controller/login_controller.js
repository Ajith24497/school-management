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
          user_type_id: user.user_type_id,
        },
        process.env.JWT_SECRET
      );
      res.json({
        status: "OK",
        token,
        userType: user.user_type_id,
        userId: user.uuid,
      });
    } else {
      res.json({ status: "error", errors: "Wrong Password" });
    }
  } catch (err) {
    res.json({ status: "error", errors: err });
  }
};

module.exports = login;
