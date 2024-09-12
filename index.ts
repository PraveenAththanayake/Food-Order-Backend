import express from "express";

const app = express();

app.use("/", (req, res) => {
  return res.json("Hello World");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
