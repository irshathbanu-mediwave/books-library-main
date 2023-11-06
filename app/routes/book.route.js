const express = require("express");
const router = express.Router();

const { validate } = require("../middlewares/validate.middleware");
const { bookSchema } = require("../validations/book.schema");
const {
  getAllbooksController,
  deletebooksController,
  addbooksController,
  addByid,
  updatebooksController,
} = require("../controllers/book.controllres");

router.get("/", getAllbooksController);
router.get("/:id", addByid);
router.post("/", validate(bookSchema), addbooksController);
router.put("/:id", validate(bookSchema), updatebooksController);
router.delete("/:id", deletebooksController);

module.exports = router;
