const { Admin, User, UserType } = require("../models");
const bcrypt = require("bcryptjs");

const getAdmin = async (req, res) => {
  try {
    const { uuid } = req.params;
    const admin = await Admin.findOne({ where: { uuid } });
    res.json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admin = await Admin.findAll();
    res.json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addAdmin = async (req, res) => {
  const { user_name, user_type, login_name, login_pass } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(login_pass, 10);
    const usertype = await UserType.findOne({ where: { uuid: user_type } });
    const user = await User.create({
      user_name,
      user_type_id: usertype.id,
      login_name,
      login_pass: hashedPassword,
    });
    const admin = await Admin.create({
      user_id: user.id,
    });
    res.json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateAdmin = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAdmin, getAllAdmins, addAdmin, updateAdmin, deleteAdmin };
