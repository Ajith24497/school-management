const { Class, Section, ClassSection, School } = require("../models");

const getClassSection = async (req, res) => {
  const { uuid } = req.params;
  try {
    const classSection = await ClassSection.findOne({ where: { uuid } });
    res.json(classSection);
  } catch (err) {
    res.json(err);
  }
};

const getAllClassSection = async (req, res) => {
  try {
    const classSection = await ClassSection.findAll();
    res.json(classSection);
  } catch (err) {
    res.json(err);
  }
};

const addClassSection = async (req, res) => {
  const { classUUID, sectionUUID, schoolUUID } = req.body;
  try {
    const classes = await Class.findOne({ where: { uuid: classUUID } });
    const section = await Section.findOne({ where: { uuid: sectionUUID } });
    const school = await School.findOne({ where: { uuid: schoolUUID } });

    const classsection = await ClassSection.create({
      name: `${classes.name}-${section.name}`,
      class_id: classes.id,
      section_id: section.id,
      school_id: school.id,
    });
    res.json(classsection);
  } catch (err) {
    res.json(err);
  }
};

const updateClassSection = async (req, res) => {
  try {
  } catch (err) {
    res.json(err);
  }
};

const deleteClassSection = async (req, res) => {
  try {
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getClassSection,
  getAllClassSection,
  addClassSection,
  updateClassSection,
  deleteClassSection,
};
