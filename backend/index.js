//Require Express
const express = require("express");

//Require environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Require cors
const cors = require("cors");

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

//Start Express server
app.listen(process.env.PORT, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.PORT}`);
});
