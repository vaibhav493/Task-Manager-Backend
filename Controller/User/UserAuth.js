const { UserRegister } = require("../../Model/User/RegistrationModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistration = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await UserRegister.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const newUser = new UserRegister(req.body);
    await newUser.save();
    res.status(201).json({ msg: " user succesfully registered !" });
  } catch (err) {
    res.status(500).json({ error: "failed to register a new user !" });
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await UserRegister.findOne({ email });
    if (!user)
      return res
        .status(500)
        .json({ msg: "user not found , Invalid Credential !" });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      let payload = {
        email,
        password,
        userID: user._id,
      };
      let token = jwt.sign({ payload }, process.env.SECRET_KEY, {
        expiresIn: "12h",
      });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error during login !!" });
  }
};
module.exports = {
  userRegistration,
  userLogin,
};
