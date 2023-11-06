const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const config = require("./config")
app.use(express.json());
app.use(morgan("dev"));




app.listen(config.appPort, () => {
    console.log(`Server running on ${config.appPort}`);
  });
  