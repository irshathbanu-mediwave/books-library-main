const {
  updatebooks,
  addbyid,
  deletebook,
  allbooks,
  getbook,
} = require("../db");

const getAllbooksController = (req, res) => {
  const books = getbook();
  res.send(books);
};

const addbooksController = (req, res) => {
  const books =allbooks(req.xop);
  res.send(books);
};
const addByid = (req, res) => {
  const books  = addbyid({ id: req.params.id });
  res.send(books );
};
const updatebooksController = (req, res, next) => {
  const books  = updatebooks ({ payload: req.xop, id: req.params.id });
  if (!books ) {
    return next({
      status: 400,
      message: "books  not updated",
    });
  }
  res.send(books );
};

const deletebooksController = (req, res, next) => {
  const books  = deletebook({ id: req.params.id });
  if (!books ) {
    return next({
      status: 400,
      message: "books  not found",
    });
  }
  res.send(books );
};

module.exports = {
    getAllbooksController ,
    deletebooksController,
    addbooksController,
    addByid,
    updatebooksController
};
