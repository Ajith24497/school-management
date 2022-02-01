const { getAuthBearerToken } = require("../middleware/auth_bearer_token");
const { Login } = require("../models");

const logout = async (req, res) => {
  const token = getAuthBearerToken(req);
  try {
    const { user_id } = await Login.findOne({ where: { token } });
    if (user_id) {
      const deleteUserLogin = await Login.destroy({ where: { user_id } });
      if (deleteUserLogin)
        res.status(200).json({ message: "User Logged out successfully" });
    } else {
      res.status(400).json({ message: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: "user not found" });
  }
};

module.exports = logout;
