import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";

// Delete a user
export const deleteUser = async (req, res, next) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);

    // Check if the user exists
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Check if the user making the request is the owner (authenticated user)
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account"));
    }

    // Delete the user
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted");
  } catch (error) {
    return next(createError(500, "Server error"));
  }
};

// Get a user by ID
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    // Check if the user exists
    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).send(user);
  } catch (error) {
    return next(createError(500, "Server error"));
  }
};

// Update user profile
export const updateUser = async (req, res, next) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);

    // Check if the user exists
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Check if the user making the request is the owner (authenticated user)
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can update only your account"));
    }

    // Update the user's profile data
    await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(200).send("User profile updated");
  } catch (error) {
    return next(createError(500, "Server error"));
  }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    return next(createError(500, "Server error"));
  }
};
