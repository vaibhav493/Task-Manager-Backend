const bcrypt = require("bcrypt");

// *Middleware function to hash the password before saving the user.

const hashPasswordMiddleware = (req, res, next) => {
  const userPlainPassword = req.body.password;

  bcrypt.hash(userPlainPassword, 10, (err, hashedPassword) => {
    if (err) {
      return next("found error while hashing password", err);
    }
    req.body.password = hashedPassword;
    next();
  });
};

module.exports = { hashPasswordMiddleware };
