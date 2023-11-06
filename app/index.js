const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const { notfound } = require("./middlewares/notfound.middleware");
const { errorHandler } = require("./middlewares/errorhandler.middleware");
const Bookrouter=require("./routes/book.route")
const app = express();
const config = require("./config");
app.use(express.json());
app.use(morgan("dev"));

app.use("/books",Bookrouter);

app.use(notfound);
app.use(errorHandler);
app.listen(config.appPort, () => {
  console.log(`Server running on ${config.appPort}`);
});
