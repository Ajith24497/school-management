const { UserType } = require("../models");

const getUserType = async (req, res) => {};
const getAllUserTypes = async (req, res) => {
  try {
    const usertype = await UserType.findAll();
    res.json(usertype);
  } catch (err) {
    res.status(500).json(err);
  }
};
const addUserType = async (req, res) => {
  const { type_name } = req.body;
  try {
    const usertype = await UserType.create({
      type_name,
    });
    res.json(usertype);
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateUserType = async (req, res) => {};
const deleteUserType = async (req, res) => {};

module.exports = {
  getAllUserTypes,
  getUserType,
  addUserType,
  updateUserType,
  deleteUserType,
};
