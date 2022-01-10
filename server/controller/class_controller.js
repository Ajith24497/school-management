const { Class, School } = require("../models");

const getAllClass = async (req, res) => {
  try {
    const classess = await Class.findAll();
    res.json(classess);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getClass = async (req, res) => {
  const { uuid } = req.params;
  try {
    const classes = await Class.findOne({ where: { uuid } });
    res.json(classes);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addClass = async (req, res) => {
  const { name, schoolId } = req.body;
  try {
    const school = await School.findOne({ where: { uuid: schoolId } });
    const classes = await Class.create({ name, school_id: school.id });
    res.json(classes);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateClass = async (req, res) => {
  res.send("This update Class");
};

const deleteClass = async (req, res) => {
  res.send("This delete Class");
};

module.exports = { getClass, getAllClass, addClass, updateClass, deleteClass };
