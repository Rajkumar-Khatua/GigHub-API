import createError from "../utils/createError.js";
import conversation from "../models/conversation.model.js";

export const createConversations = async (req, res, next) => {
  const newConversation = new conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: req.isSeller,
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (error) {
    next(error);
  }
};
export const updateConversations = async (req, res, next) => {
  try {
    const updatedConversation = await conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySeller: true,
          // readByBuyer: true,
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (error) {
    next(error);
  }
};

export const getSingleConversations = async (req, res, next) => {
  try {
    const singleConversation = await conversation.findOne({
      id: req.params.id,
    });
    if (!singleConversation)
      return next(createError(404, "conversation not found"));

    res.status(200).send(singleConversation);
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const allConversation = await conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({updatedAt:-1});
    res.status(200).send(allConversation);
  } catch (error) {
    next(error);
  }
};
