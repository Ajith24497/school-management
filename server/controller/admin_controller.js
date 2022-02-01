const { Admin, User, UserType, School } = require("../models");
const bcrypt = require("bcryptjs");

const getAdmin = async (req, res) => {
  try {
    const { uuid } = req.params;
    const admin = await Admin.findOne({
      where: { uuid },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["user_name", "login_name"],
        },
        {
          model: School,
          as: "school",
          attributes: ["name", "uuid"],
        },
      ],
    });
    res.json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admin = await Admin.findAll({
      where: { is_deleted: false },
      include: {
        model: User,
        as: "user",
        attributes: ["user_name"],
        required: true,
      },
    });
    res.json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addAdmin = async (req, res) => {
  try {
    const { user_name, user_type, login_name, login_pass, school_id } =
      req.body;

    const hashedPassword = await bcrypt.hash(login_pass, 10);
    const usertype = await UserType.findOne({ where: { uuid: user_type } });
    const school = await School.findOne({ where: { uuid: school_id } });
    const user = await User.create({
      user_name,
      user_type_id: usertype.id,
      login_name,
      login_pass: hashedPassword,
    });
    const admin = await Admin.create({
      user_id: user.id,
      school_id: school.id,
    });
    res.json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { user_name, login_name, school_id, uuid } = req.body;
    const admin = await Admin.findOne({
      where: { uuid },
      include: [{ model: User, as: "user", attributes: ["uuid"] }],
    });

    const updatedSchool = await School.findOne({ where: { uuid: school_id } });

    const user = admin.dataValues.user.dataValues;

    const updateUser = await User.update(
      { user_name, login_name },
      { where: { uuid: user.uuid } }
    );
    if (!updateUser) {
      res.status(400).json({ message: "user details not updated" });
    }
    const updatedAdmin = await Admin.update(
      { school_id: updatedSchool.id },
      { where: { uuid } }
    );
    if (!updateAdmin) {
      res.status(400).json({ message: "school details not updated" });
    }

    res.status(200).json({ message: "updated Successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { uuid } = req.body;
    const admin = await Admin.update({ is_deleted: true }, { where: { uuid } });

    if (admin) {
      res.status(200).json({ message: "Admin Deleted Successfully" });
    }
    res.status(400).json({ message: "Admin not deleted" });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};

module.exports = { getAdmin, getAllAdmins, addAdmin, updateAdmin, deleteAdmin };
