# Shelf

Shelf is a lightweight utility for loading, organizing, and persisting book data in simple JavaScript objects. It tracks individual books, groups them into named collections, and can save/load them from a JSON file on disk.

## Shelf class

### Properties

- `books`: an object keyed by book name. Each value is a parsed book object.
- `collections`: an object keyed by collection name. Each collection stores a `books` array of selected book entries.

### Constructor

- `constructor(path)`: optional initializer that reads `shelfData.json` from the given directory and restores the current `books` and `collections` state.

### Methods

- `addBook(arr)`: accepts an array of `[name, path]` entries, reads each book file, parses the content, stores each result in `books`, and resolves all additions with `Promise.all()`.
- `collect(arr, name)`: accepts a single book name or an array of names, resolves them into book objects, and stores them in `collections[name].books`.
- `save(path)`: writes the current `books` and `collections` state to `path + "/shelfData.json"` and returns the current `Shelf` instance.
- `getBook(name)`: returns the book entry stored under `books[name]`.
- `getCollection(name)`: returns the collection entry stored under `collections[name]`.

### Parsed book shape

Each book parsed by `createBook()` includes fields such as:

- `sponsers`
- `cast` (array of cast names)
- `description`
- `title`
- `cover`
- `copy` (an object of chapter sections, grouped by chapter label)

The `copy` field is built from chapter markers in the source text, where entries beginning with `$` start a new chapter section and following lines are grouped under that chapter.
