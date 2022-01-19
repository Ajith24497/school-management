const { SuperAdmin, User, UserType } = require("../models");
const bcrypt = require("bcryptjs");

const getSuperAdmin = async (req, res) => {
  try {
    const { uuid } = req.params;
    const admin = await SuperAdmin.findOne({ where: { uuid } });
    res.json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllSuperAdmins = async (req, res) => {
  try {
    const admin = await SuperAdmin.findAll();
    res.json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addSuperAdmin = async (req, res) => {
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
    const admin = await SuperAdmin.create({
      user_id: user.id,
    });
    res.json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateSuperAdmin = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getSuperAdmin,
  getAllSuperAdmins,
  addSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
