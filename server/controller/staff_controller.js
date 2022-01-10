const {
  School,
  User,
  UserType,
  Designation,
  ClassSection,
  Staff,
} = require("../models");
const bcrypt = require("bcryptjs");

const getStaff = async (req, res) => {
  const { uuid } = req.params;
  try {
    const staff = await Staff.findOne({ where: { uuid } });
    res.json(staff);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllStaffs = async (req, res) => {
  try {
    const staff = await Staff.findAll();
    res.json(staff);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addStaff = async (req, res) => {
  const {
    user_type,
    user_name,
    login_name,
    login_pass,
    school_id,
    class_section,
    designation_id,
    management_staff,
    phone_no,
    gender,
    age,
    date_of_birth,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(login_pass, 10);
    const userType = await UserType.findOne({ where: { uuid: user_type } });
    const user = await User.create({
      user_type_id: userType.id,
      user_name,
      login_name,
      login_pass: hashedPassword,
    });
    const school = await School.findOne({ where: { uuid: school_id } });
    const classSection = await ClassSection.findOne({
      where: { uuid: class_section },
    });
    const designation = await Designation.findOne({
      where: { uuid: designation_id },
    });
    const staff = await Staff.create({
      user_id: user.id,
      school_id: school.id,
      class_sec_id: classSection.id,
      designation_id: designation.id,
      management_staff,
      phone_no,
      gender,
      age,
      date_of_birth,
    });
    res.json(staff);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateStaff = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteStaff = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllStaffs,
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
};
