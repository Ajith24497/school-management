const { User, UserType } = require("../models");

const getUser = async (req, res) => {};
const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll({
      include: {
        model: UserType,
        as: "user_type",
      },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
