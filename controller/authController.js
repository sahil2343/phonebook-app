const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token;
  if (req.header.token) {
    token = req.header.token;
  } else {
    token = req.cookies.token;
  }
  console.log("token ", token);

  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
