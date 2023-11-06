const Joi = require("joi");

const booksSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string().required(),
  isbn: Joi.number().required(),
});

module.exports = {
  booksSchema,
};
