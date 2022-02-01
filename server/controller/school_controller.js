const { getAuthBearerToken } = require("../middleware/auth_bearer_token");
const { School } = require("../models");

const getSchool = async (req, res) => {
  const { uuid } = req.params;
  try {
    const school = await School.findOne({ where: { uuid } });
    res.json(school);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllSchool = async (req, res) => {
  try {
    const school = await School.findAll({ where: { is_deleted: false } });
    res.status(200).json(school);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const addSchool = async (req, res) => {
  const { name, branch, syllabus, address, email, tel_no } = req.body;
  try {
    const school = await School.create({
      name,
      branch,
      syllabus,
      address,
      email,
      tel_no,
    });
    res.json(school);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateSchool = async (req, res) => {
  try {
    const { name, branch, syllabus, address, email, tel_no, uuid } = req.body;
    const school = await School.update(
      {
        name,
        branch,
        syllabus,
        address,
        email,
        tel_no,
      },
      {
        where: {
          uuid,
        },
      }
    );
    res.json(school);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteSchool = async (req, res) => {
  try {
    const { uuid } = req.body;
    const school = await School.update(
      { is_deleted: true },
      { where: { uuid } }
    );

    if (school) {
      res.status(200).json({ message: "User Deleted Successfully" });
    }
    res.status(400).json({ message: "User Not Found" });
  } catch (error) {
    res.status(400).json({ message: "error", error });
  }
};

module.exports = {
  getSchool,
  getAllSchool,
  addSchool,
  updateSchool,
  deleteSchool,
};
