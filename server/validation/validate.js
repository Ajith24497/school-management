const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ status: "error", errors: errors.array() });
};

module.exports = validate;
