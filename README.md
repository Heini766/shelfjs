# Shelf

Shelf is a lightweight utility for organizing book data into simple JavaScript objects. It keeps track of individual books and groups them into named collections for easy access.

## Shelf class

### Properties

- `books`: an object keyed by book name. Each entry contains a parsed book record.
- `collections`: an object keyed by collection name. Each collection stores its books in a `books` array.

### Methods

- `addBook(name, path)`: async method that reads a book file from the given path, parses the content, stores it in `books[name]`, and returns the `Shelf` instance.
- `collect(arr, name)`: accepts either a single book name or an array of names, resolves them into book objects, stores them under `collections[name].books`, and returns the `Shelf` instance.
- `getBook(name)`: returns the book object stored in `books[name]`.
- `getCollection(name)`: returns the collection object stored in `collections[name]`.

### Parsed book shape

Each book added via `addBook` is stored as an object with fields such as:

- `sponsers`
- `cast`
- `description`
- `title`
- `cover`
- `copy`
- `id`
