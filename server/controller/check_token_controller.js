const { getAuthBearerToken } = require("../middleware/auth_bearer_token");
const {
  Login,
  User,
  UserType,
  Staff,
  Student,
  SuperAdmin,
  Admin,
} = require("../models");

const checkToken = async (req, res) => {
  try {
    const token = getAuthBearerToken(req);

    const userLoginDetails = await Login.findOne({
      where: { token },
      include: {
        model: User,
        as: "user",
        include: { model: UserType, as: "user_type" },
      },
    });

    if (!userLoginDetails) res.status(400).json({ message: "Invalid Token" });

    const expire_time = Number(
      new Date(userLoginDetails.expire_time).getTime()
    );
    const timeNow = Number(new Date(Date.now()).getTime());

    if (timeNow >= expire_time) {
      const deleteUserLoginDetails = await Login.destroy({
        where: { id: userLoginDetails.id },
      });

      if (deleteUserLoginDetails) {
        res.status(200).json({ message: "Token Expired" });
      } else {
        res.status(400).json({ message: "Error in Token Expiration" });
      }
    }

    const userTypeId = userLoginDetails.dataValues.user.dataValues.user_type.id;
    const userUUID = userLoginDetails.dataValues.user.dataValues.uuid;
    res.status(200).json({ userTypeId, userUUID });
  } catch (err) {
    res.status(500).json({ message: "Error", err });
  }
};

const getUserFromToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) res.status(400).json({ message: "Token is empty" });
    const userDetails = await Login.findOne({
      where: { token },
      include: [
        {
          model: User,
          as: "user",
          include: { model: UserType, as: "user_type", attributes: ["id"] },
        },
      ],
    });
    const userTypeId = Number(
      userDetails.dataValues.user.dataValues.user_type.id
    );
    const userId = userDetails.dataValues.user.uuid;

    let userInfo;

    switch (userTypeId) {
      case 1:
        userInfo = await Staff.findOne({
          include: {
            model: User,
            as: "user",
            where: {
              uuid: userId,
            },
          },
        });
        break;
      case 2:
        userInfo = await Student.findOne({
          include: {
            model: User,
            as: "user",
            where: {
              uuid: userId,
            },
          },
        });
        break;
      case 3:
        userInfo = await Admin.findOne({
          include: {
            model: User,
            as: "user",
            where: {
              uuid: userId,
            },
          },
        });
        break;
      case 4:
        userInfo = await SuperAdmin.findOne({
          include: {
            model: User,
            as: "user",
            where: {
              uuid: userId,
            },
          },
        });
        break;
      default:
        res.status(400).json({ message: "User Not found" });
        break;
    }

    const userUUID = userInfo.uuid;

    res.status(200).json({ userUUID, userTypeId });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { checkToken, getUserFromToken };
