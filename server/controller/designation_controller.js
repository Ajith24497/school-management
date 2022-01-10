const { Designation, School } = require("../models");

const getDesignation = async (req, res) => {
  const { uuid } = req.params;
  try {
    const designation = await Designation.findOne({ where: { uuid } });
    res.json(designation);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllDesignations = async (_, res) => {
  try {
    const designation = await Designation.findAll();
    res.json(designation);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addDesignation = async (req, res) => {
  const { school_id, name, grade } = req.body;
  try {
    const school = await School.findOne({ where: { uuid: school_id } });
    const designation = await Designation.create({
      school_id: school.id,
      name,
      grade,
    });
    res.json(designation);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateDesignation = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteDesignation = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getDesignation,
  getAllDesignations,
  addDesignation,
  updateDesignation,
  deleteDesignation,
};
