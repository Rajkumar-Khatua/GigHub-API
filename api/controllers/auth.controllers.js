import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
// register
export const register = async (req, res, next) => {
  try {
    // Hash the password
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been successfully created");
  } catch (error) {
    // res.status(500).send("Something went wrong!" + error);
    next(error);
  }
};

//login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "Use not Found :("));
    }
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      //   return res.status(400).send("invalid user name and password");
      return next(createError(404, "Invalid User name or Password!"));
    // create token
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWTSECRET_KEY
    );

    // now send the user!
    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (error) {
    next(error);
  }
};
// logout

export const logout = async (req, res,next) => {
  // clear cookie from our site
  try {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out.");
  } catch (error) {
    next(createError(404, "user has been already logged out."));
  }
};
