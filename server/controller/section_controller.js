const { Section, School } = require("../models");

const getAllSection = async (req, res) => {
  try {
    const section = await Section.findAll();
    res.json(section);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSection = async (req, res) => {
  const { uuid } = req.params;
  try {
    const section = await Section.findOne({ where: { uuid } });
    res.json(section);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addSection = async (req, res) => {
  const { name, schoolId } = req.body;
  try {
    const school = await School.findOne({ where: { uuid: schoolId } });
    const section = await Section.create({ name, school_id: school.id });
    res.json(section);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateSection = async (req, res) => {
  res.send("This update Section");
};

const deleteSection = async (req, res) => {
  res.send("This delete Section");
};

module.exports = {
  getSection,
  getAllSection,
  addSection,
  updateSection,
  deleteSection,
};
