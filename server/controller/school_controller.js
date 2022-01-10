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
    const school = await School.findAll();
    res.json(school);
  } catch (err) {
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
  res.send("This update School");
};

const deleteSchool = async (req, res) => {
  res.send("This delete School");
};

module.exports = {
  getSchool,
  getAllSchool,
  addSchool,
  updateSchool,
  deleteSchool,
};
