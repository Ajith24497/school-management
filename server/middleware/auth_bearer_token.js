const getAuthBearerToken = (req) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    throw new Error({ message: "Invalid Token" });
  }
  return bearerHeader.split(" ")[1];
};

module.exports = { getAuthBearerToken };
