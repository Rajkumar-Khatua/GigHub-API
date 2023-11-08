import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";

export const createGig = async (req, res, next) => {
  // it come from jwt
  if (!req.isSeller)
    return next(createError(403, "Only Sellers can create a product"));

  const newGig = new Gig({
    // userId come from JWT
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (error) {
    next(error);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    // find gig ID from DB
    const gig = await Gig.findById(req.params.id);
    // if user id not == gigID throw Error
    if (gig.userId !== req.userId)
      return next(createError(401, "You can delete only your gig"));
    // if everything is good then delete the gig!
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (error) {
    next(error);
  }
};
export const getGig = async (req, res, next) => {
  try {
    // find gig ID from DB
    const gig = await Gig.findById(req.params.id);
    // if gig is not found
    if (!gig) {
      next(createError(404, "Gig not found!"));
    }
    res.status(200).send(gig);
  } catch (error) {
    next(error);
  }
};
export const getGigs = async (req, res, next) => {
  // filters items
  const q = req.query;
  const filters = {
    // if there is query category spread the object
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    // 'i' is for ignore case sensitive
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });

    res.status(200).send(gigs);
  } catch (error) {
    next(error);
  }
};
