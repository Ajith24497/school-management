const { Student, MarkDetails, Exam } = require("../models");

const getMarkDetails = async (req, res) => {
  const { uuid } = req.params;
  try {
    const mark = await MarkDetails.findOne({ where: { uuid } });
    res.json(mark);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllMarkDetails = async (req, res) => {
  try {
    const mark = await MarkDetails.findAll();
    res.json(mark);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addMarkDetails = async (req, res) => {
  const { exam_id, student_id, mark } = req.body;
  try {
    const exam = await Exam.findOne({ where: { uuid: exam_id } });
    const student = await Student.findOne({ where: { uuid: student_id } });
    const marks = await MarkDetails.create({
      exam_id: exam.id,
      student_id: student.id,
      mark,
    });
    res.json(marks);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateMarkDetails = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteMarkDetails = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllMarkDetails,
  getMarkDetails,
  addMarkDetails,
  updateMarkDetails,
  deleteMarkDetails,
};
