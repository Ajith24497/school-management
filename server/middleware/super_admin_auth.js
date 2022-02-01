const { Login, User, UserType } = require("../models");
const { getAuthBearerToken } = require("./auth_bearer_token");

const authenticate = async (req, res, next) => {
  try {
    const token = getAuthBearerToken(req);
    if (!token) {
      res.status(400).json({ message: "Token Required" });
    }
    const userLoginDetails = await Login.findOne({
      where: { token },
      include: {
        model: User,
        as: "user",
        include: { model: UserType, as: "user_type" },
      },
    });
    if (!userLoginDetails) res.status(400).json({ message: "Invalid Token" });
    const userTypeId = userLoginDetails.dataValues.user.dataValues.user_type.id;
    if (userTypeId == "4") {
      next();
    } else {
      res.status(400).json({ message: "You are not authorized" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = authenticate;
