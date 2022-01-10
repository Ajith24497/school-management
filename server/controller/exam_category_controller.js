const { School, ExamCategory } = require("../models");

const getAllExamCategory = async (req, res) => {
  try {
    const examCategory = await ExamCategory.findAll();
    res.json(examCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getExamCategory = async (req, res) => {
  const { uuid } = req.params;
  try {
    const examCategory = await ExamCategory.findOne({ where: { uuid } });
    res.json(examCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addExamCategory = async (req, res) => {
  const { name, schoolId } = req.body;
  try {
    const school = await School.findOne({ where: { uuid: schoolId } });
    const examCategory = await ExamCategory.create({
      name,
      school_id: school.id,
    });
    res.json(examCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateExamCategory = async (req, res) => {
  res.send("This update ExamCategory");
};

const deleteExamCategory = async (req, res) => {
  res.send("This delete ExamCategory");
};

module.exports = {
  getExamCategory,
  getAllExamCategory,
  addExamCategory,
  updateExamCategory,
  deleteExamCategory,
};
