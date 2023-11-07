const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const {
  updatebooks,
  getbookbyid,
  deletebook,
  allbooks,
  addonebook,
  addRating,
  updaterating,
  getratingbyid,
  deleteratingbyid,
} = require("./db");
const Joi = require("joi");
const app = express();
const config = require("./config");
app.use(express.json());
app.use(morgan("dev"));
//READ for books
app.get("/books", (req, res) => {
  const books = allbooks();
  res.send(books);
});
//get id
app.get("/books/:bookid", (req, res) => {
  const book = getbookbyid(req.query.bookid);
  console.log(book + req.query.bookid);
  if (!book) {
    return res.status(400).json({
      message: "book not found",
    });
  }
  return res.send(book);
});
//POST for book
app.post("/books", (req, res) => {
  const booksSchema = Joi.object({
    title: Joi.string().required(),
    isbn: Joi.string().required(),
  });
  const { value, error } = booksSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message),
    });
  }
  const book = addonebook(value);
  if (!book) {
    return next({
      status: 400,
      message: "invalid isbn",
    });
  }
  return res.send(book);
});

//put for book
app.put("/books/:bookid", (req, res) => {
  const editschema = Joi.object({
    title: Joi.string().required(),
  });
  const { value, error } = editschema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((m) => m.message),
    });
  }
  const book = updatebooks({ id: req.params.bookid, title: req.body.title });

  if (!book) {
    return res.status(400).json({
      message: "book not found",
    });
  }
  return res.send(book);
});
// delete books
app.delete("/books/:bookid", (req, res) => {
  const book = deletebook(req.params.bookid);
  if (!book) {
    return res.status(400).json({
      message: "book not found",
    });
  }
  return res.send(book);
});
//get for rating
app.get("/rating/:ratingid", (req, res) => {
  const book = getratingbyid(req.params.ratingid);
  if (!book) {
    return res.status(400).json({
      message: "rating not found",
    });
  }
  return res.send(book);
});
// delete for rating
app.delete("/rating/:ratingid", (req, res) => {
  const rating = deleteratingbyid(req.params.ratingid);
  if (!rating) {
    return res.status(400).json({
      message: "rating not found ",
    });
  }
  return res.json(rating);
});
// put for rating
app.put("/books/:bookid/rating", (req, res) => {
  const rating = updaterating({
    rating: req.body.rating,
    bookId: req.params.bookid,
  });
  if (!rating) {
    return res.status(400).json({
      message: "rating not found",
    });
  }
  const ratingSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
  });

  const { value, error } = ratingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message),
    });
  }

  return res.json(rating);
});
//POST for rating
app.post("/books/:bookid/rating", (req, res) => {
  const ratingSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
  });

  const { value, error } = ratingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message),
    });
  }
  const rating = addRating({
    rating: req.body.rating,
    bookId: req.params.bookid,
  });
  return res.json(rating);
});
app.listen(config.appPort, () => {
  console.log(`Server running on ${config.appPort}`);
});
