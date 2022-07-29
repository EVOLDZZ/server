import User from "../models/UserOld.js";
import bcrypt from "bcryptjs";
import { createError } from "../middleware/error.js";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json("USER HAS BEEN CREATED");
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isCorrect = bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong password"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, isAdmin, ...restDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...restDetails }, isAdmin });
  } catch (error) {
    next(createError("404", error));1
  }
};
