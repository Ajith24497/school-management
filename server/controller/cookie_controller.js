const jwt = require("jsonwebtoken");

const createCookie = (req, res) => {
  const { cookieName, cookieValue, expireSeconds } = req.body;
  const cookieOptions = {
    sameSite: "strict",
    path: "/",
    expires: new Date(new Date().getTime() + expireSeconds * 1000),
    httpOnly: true,
    signed: true,
  };
  res
    .cookie(cookieName, cookieValue, cookieOptions)
    .json({ status: "ok", message: "Cookie Created Successfully" });
};

const deleteCookie = (req, res) => {
  const { cookieName } = req.body;
  res
    .clearCookie(cookieName)
    .json({ status: "ok", message: "Cookie Deleted Successfully" });
};

const getCookies = (req, res) => {
  const { token } = req.signedCookies;
  if (token) {
    const userInfo = jwt.decode(token, { complete: true });
    const { id, user_type_id } = userInfo.payload;
    res.json({ id, user_type_id, token });
  } else {
    res.json({ status: "notok" });
  }
};

module.exports = { createCookie, deleteCookie, getCookies };
