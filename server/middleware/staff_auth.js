const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(" ")[0] === "Bearer"
        ? req.headers.authorization.split(" ")[1]
        : 0;
    if (!token)
      res.status(500).json({ status: "Not ok", message: "Invalid Token" });
    const { id: user, user_type_id } = await jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    if (user_type_id === "3" || user_type_id === "1") {
      next();
    } else {
      res
        .status(500)
        .json({ status: "Not ok", message: "You are not authorized" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = authenticate;
