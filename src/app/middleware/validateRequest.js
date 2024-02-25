const jwt = require("jsonwebtoken");
const config = require("../../config");
const validateRequest = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("unauthorized");
    }
    let verifiedUser = null;

    verifiedUser = jwt.verify(token.split(" ")[1], config.jwt.secret);
    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateRequest;
