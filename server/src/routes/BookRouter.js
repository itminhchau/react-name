const express = require('express');
const Book = require('../model/Book');
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books)
  } catch (error) {
    res.status(500).json({
      msg: "Error when get books"
    })
  }
})


router.post("/create", async (req, res) => {
  try {
    const book = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    }

    const newBook = new Book(book);
    const bookSave = await newBook.save();
    res.json(bookSave)
  } catch (error) {
    res.status(500).json({ msg: "Error when create book" })
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    }

    const editBook = await Book.findByIdAndUpdate(id, book, { new: true });


    res.json(editBook)
  } catch (error) {
    res.status(500).json({ msg: "Error when edit book" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndRemove(id);
    res.json({ msg: "book deleted" })
  } catch (error) {
    res.status(500).json({ msg: "Error when delete book" })
  }
})


module.exports = router;