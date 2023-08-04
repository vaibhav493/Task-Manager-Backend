const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token required try to login " });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    if (req.method !== "PATCH") {
      req.body.userID = decodedToken.payload.userID;
      req.body.email = decodedToken.payload.email;
      req.body.password = decodedToken.payload.password;
    }

    next();
  });
};

module.exports = { authenticateToken };
