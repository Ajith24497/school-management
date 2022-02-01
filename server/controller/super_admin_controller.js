const { SuperAdmin, User, UserType } = require("../models");
const bcrypt = require("bcryptjs");

const getSuperAdmin = async (req, res) => {
  try {
    const { uuid } = req.params;
    const superAdmin = await SuperAdmin.findOne({
      where: { uuid },
      include: {
        model: User,
        as: "user",
        attributes: ["user_name", "login_name"],
      },
    });
    if (!superAdmin) res.status(400).json({ message: "user not found" });
    res.json(superAdmin);
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
    const { user_name, login_name, uuid } = req.body;
    const superAdmin = await SuperAdmin.findOne({
      where: { uuid },
      include: [{ model: User, as: "user", attributes: ["uuid"] }],
    });

    const userId = superAdmin.dataValues.user.uuid;

    const updateUser = await User.update(
      { user_name, login_name },
      { where: { uuid: userId } }
    );

    if (!updateUser) res.status(400).json({ message: "Not Updated" });
    res.status(200).json(updateUser);
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
