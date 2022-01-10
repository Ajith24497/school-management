const { School, Staff, ClassSection, Subject } = require("../models");

const getSubject = async (req, res) => {
  const { uuid } = req.params;
  try {
    const subject = await Subject.findOne({ where: { uuid } });
    res.json(subject);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const subject = await Subject.findAll();
    res.json(subject);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addSubject = async (req, res) => {
  const { school_id, staff_id, class_sec_id, name } = req.body;
  try {
    const school = await School.findOne({ where: { uuid: school_id } });
    const staff = await Staff.findOne({ where: { uuid: staff_id } });
    const classSection = await ClassSection.findOne({
      where: { uuid: class_sec_id },
    });
    const subject = await Subject.create({
      name,
      school_id: school.id,
      staff_id: staff.id,
      class_sec_id: classSection.id,
    });
    res.json(subject);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateSubject = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteSubject = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllSubjects,
  getSubject,
  addSubject,
  updateSubject,
  deleteSubject,
};
