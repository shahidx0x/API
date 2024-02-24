const configs = require("../../../config");
const User = require("../users/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {
  signUp: async (req, res, next) => {
    try {
      const { name, password } = req.body;
      const existingUser = await User.findOne({ name });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const newUser = new User({ name, password });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, configs.jwt.secret, {
        expiresIn: configs.jwt.expires_in,
      });
      res
        .cookie("token", token, { httpOnly: true })
        .status(201)
        .json({
          message: "User created successfully",
          user: { id: newUser._id, name: newUser.name },
        });
    } catch (error) {
      next(error);
    }
  },

  signIn: async (req, res, next) => {
    try {
      const { name, password } = req.body;
      const user = await User.findOne({ name });
      if (!user) {
        return res.status(401).json({ error: "User doest exist" });
      }
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, configs.jwt.secret, {
        expiresIn: configs.jwt.expires_in,
      });
      res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({
          message: "Login successful",
          user: { id: user._id, name: user.name },
        });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AuthController;
