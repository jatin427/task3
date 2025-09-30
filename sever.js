const express = require("express");
const app = express();
const PORT = 3000;

// Middleware for JSON
app.use(express.json());

// In-memory books array
let books = [
  { id: 1, title: "Book One", author: "Author One" },
  { id: 2, title: "Book Two", author: "Author Two" }
];

// -------------------- CRUD Endpoints --------------------

// 1. GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// 2. GET single book by id
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// 3. POST (add new book)
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// 4. PUT (update book by id)
app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// 5. DELETE (remove book by id)
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const deletedBook = books.splice(index, 1);
  res.json(deletedBook[0]);
});

// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});