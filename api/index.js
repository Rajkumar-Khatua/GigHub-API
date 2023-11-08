import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.router.js";
import gigRoute from "./routes/gig.router.js";
import messageRoute from "./routes/message.router.js";
import orderRoute from "./routes/order.router.js";
import reviewRoute from "./routes/review.router.js";
import conversationRoute from "./routes/conversation.router.js";
import auth from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected!");
  } catch (error) {
    console.log(error);
  }
};
// allow DB to accept the json
app.use(express.json());
// cookie parser middle parser
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", auth);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/messages", messageRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/conversations", conversationRoute);

// Error handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});
const port = 5500;

app.listen(port, () => {
  connect();
  console.log("Backend is running");
});
