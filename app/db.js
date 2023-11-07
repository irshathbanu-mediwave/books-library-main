const { v4: uuidv4 } = require("uuid");
const { isValidISBN } = require("./isbn");

const books = [
  {
    id:"132",
    title: "testing",
    isbn: "1861972717",
  },
];
const bookdsratings = [
  {
    id: 102,
    rating: 5,
    bookId:1505,
  },
];
//all books
const allbooks = () => books;
// newbooks
const addonebook = ({ title, isbn }) => {
  const bookid = uuidv4();
  if (isValidISBN(isbn)) {
    const b = {
      id: bookid,
      title,
      isbn,
    };
    books.push(b);
    return b;
  } else return null
  
};
const addRating = ({ rating, bookId }) => {
  const ratingId = uuidv4();

  const bookRating = {
    id: ratingId,
    rating,
    bookId,
  };
  bookdsratings.push(bookRating);
  return bookRating;
};
const getbookbyid = (id) => {
  const book = books.find((b) => b.id == id);
  if (!book) {
    return null;
  }
  const ratingentry = bookdsratings.find((b) => b.bookId == id);
  const rating = ratingentry ? ratingentry.rating : 0;
  b = {
    id: book.id,
    title: book.title,
    isbn: book.isbn,
    rating: rating,
  };
  return b;
};
const updatebooks = ({ id, title }) => {
  const idx = books.findIndex((b) => b.id == id);
  if (idx != -1) {
    books[idx]["title"] = title;

    return books[idx];
  }
  return null;
};
//delete book
const deletebook = ( id ) => {
  const idx = books.findIndex((b) => b.id == id);
  const ratingidx= bookdsratings.findIndex((b) => b.bookId == id);
  if (idx == -1) {
    return null;
  }

 const b=books[idx];
 books.splice(idx,1)
 if (ratingidx !== -1) {
  const r = bookdsratings[ratingidx];
  bookdsratings.splice(ratingidx, 1);
  return {
    b,
    r,
  };
}
return b;
};

const updaterating = ({ rating, bookId }) => {
  const idx = bookdsratings.findIndex((b) => b.bookId == bookId);
  if (idx != -1) {
    bookdsratings [idx]["rating"] = rating;
    return bookdsratings[idx];
  }
  return null;
};

const getratingbyid = (id) => {
  const rating = bookdsratings.find((r) => r.id == id);
  if (!rating) {
    return null;
  }
  const book = books.find((b) => b.id == rating.bookId);
  return {
    id: rating.id,
    rating: rating.rating,
    book,
  };
};
const deleteratingbyid = (id) => {
  const idx =bookdsratings.findIndex((r) => r.id == id);
  if (idx == -1) {
    return null;
  }
  const deletedRating = bookdsratings[idx];
  bookdsratings.splice(idx, 1);
  return deletedRating;
};

module.exports = {
  updatebooks,
  getbookbyid,
  deletebook,
  allbooks,
  addonebook ,
  addRating,
  updaterating ,
  getratingbyid ,
  deleteratingbyid 

};

//single books
// const addbyid = ({ id }) => {
//   const idx = books.findIndex((b) => b.id === id);
//   if (idx === -1) {
//     return null;
//   }
//   return books[idx];
// };

//

//

//   const book = books[idx];
//   book.splice(idx, 1);
//   return book;
// };
