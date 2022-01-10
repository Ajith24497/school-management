const { Student, User, UserType, School, ClassSection } = require("../models");
const bcrypt = require("bcryptjs");

const getStudent = async (req, res) => {
  try {
    const { uuid } = req.params;
    const student = await Student.findOne({ where: { uuid } });
    res.send(student);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addStudent = async (req, res) => {
  const {
    student_name,
    user_type,
    login_name,
    login_pass,
    roll_no,
    reg_no,
    school_id,
    class_sec_id,
    phone_no,
    address,
    parent_name,
    parent_mobile_no,
    gender,
    age,
    blood_group,
    date_of_birth,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(login_pass, 10);
    const usertype = await UserType.findOne({ where: { uuid: user_type } });
    const user = await User.create({
      user_name: student_name,
      user_type_id: usertype.id,
      login_name,
      login_pass: hashedPassword,
    });
    const school = await School.findOne({ where: { uuid: school_id } });
    const classsection = await ClassSection.findOne({
      where: { uuid: class_sec_id },
    });

    const student = await Student.create({
      user_id: user.id,
      roll_no,
      reg_no,
      school_id: school.id,
      class_sec_id: classsection.id,
      phone_no,
      address,
      parent_name,
      parent_mobile_no,
      gender,
      age,
      blood_group,
      date_of_birth,
    });
    res.json(student);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateStudent = async (req, res) => {
  res.send("jeubee");
};

const deleteStudent = async (req, res) => {
  res.send("jeubee");
};

module.exports = {
  getStudent,
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};
