import express from "express";
import { AdminRoute, VandorRoute } from "./routes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URI } from "./config";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/vandor", VandorRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(8000, () => {
  console.clear();
  console.log("Server is running on port 8000");
});
