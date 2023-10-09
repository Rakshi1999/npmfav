const { verifyToken } = require("../services/handleToken");

const chectAuth = async (req, res, next) => {
  // check jwt valid or not!!
  try {
    let { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).json({ message: "Authorization Error" });
    }
    authorization = authorization.slice(7);

    let decodedVal = await verifyToken(authorization);
    if (decodedVal) {
      next();
    }
  } catch (error) {
    return res.status(400).json({ message: "Un-Authorized" });
  }
};

module.exports = chectAuth;
