const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Staff, User } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(" ")[0] === "Bearer"
        ? req.headers.authorization.split(" ")[1]
        : 0;
    if (!token) throw new Error("Invalid Token");
    const { id: user, user_type_id } = await jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    const staff = await Staff.findOne({
      include: {
        model: User,
        required: true,
        as: "user",
        where: {
          uuid: user,
        },
      },
    });
    const isManagementStaff = staff.dataValues.management_staff;
    if (user_type_id === "3" || isManagementStaff) {
      next();
    } else {
      res
        .status(500)
        .json({ status: "Not ok", message: "You are not authorized" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = authenticate;
