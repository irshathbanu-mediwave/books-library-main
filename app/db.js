const { v4: uuidv4 } = require("uuid");
const { isValidISBN } = require("./isbn");

const books = [
  {
    id: "ybybynjn",
    title: "testing",
    isbn: 1861972717,
  },
];
const allbooks = () => books;
const getbook = ({ title, isbn }) => {
  if (isValidISBN(isbn)) {
    const id = uuidv4();
    const b = {
      id,
      title,
      isbn,
    };
    books.push(b);
  } else console.log("Invalid");
  return b;
};
const addbyid = ({ id }) => {
  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) {
    return null;
  }
  return books[idx];
};

const updatebooks = ({ id, payload }) => {
  const idx = books.findIndex((b) => b.id == id);
  if (idx === -1) {
    return null;
  }

  books[idx]["title"] = payload["title"];
  books[idx]["isbn"] = payload["isbn"];
  return books[idx];
};

const deletebook = ({ id }) => {
  const idx = books.findIndex((b) => b.id == id);
  if (idx === -1) {
    return null;
  }

  const book = books[idx];
  book.splice(idx, 1);
  return book;
};

module.exports = {
  updatebooks,
  addbyid,
  deletebook,
  allbooks,
  getbook,
};
