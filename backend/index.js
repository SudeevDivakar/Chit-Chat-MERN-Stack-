//Require Express
const express = require("express");

//Require mongoose
const mongoose = require("mongoose");

//Require environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

//Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DATABASE CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("ERROR IN DATABASE CONNECTION", err);
  });

//Require cors
const cors = require("cors");

//Require Routes
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");

//Start Express App
const app = express();

//Configure middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/user", userRoutes);

app.use("/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

//Start Express server
app.listen(process.env.PORT, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.PORT}`);
});
