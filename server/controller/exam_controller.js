const { Exam, Subject, ExamCategory } = require("../models");

const getExam = async (req, res) => {
  const { uuid } = req.params;
  try {
    const exam = await Exam.findOne({ where: { uuid } });
    res.json(exam);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllExams = async (req, res) => {
  try {
    const exam = await Exam.findAll();
    res.json(exam);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addExam = async (req, res) => {
  const { exam_category, subject_id } = req.body;
  try {
    const examCategory = await ExamCategory.findOne({
      where: { uuid: exam_category },
    });
    const subject = await Subject.findOne({ where: { uuid: subject_id } });
    const exam = await Exam.create({
      exam_category_id: examCategory.id,
      subject_id: subject.id,
    });
    res.json(exam);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateExam = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteExam = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllExams, getExam, addExam, updateExam, deleteExam };
