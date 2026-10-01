import { readFile, writeFile } from "fs/promises"

class Shelf {

books = {}
collections = {}

constructor(path) {
  if (!path) return

  try {
    return readFile(path + "/shelfData.json")
    .then(data => {
      const { books, collections } = JSON.parse(data.toString())
      this.books = books
      this.collections = collections

      return this
    })
    .catch(err => { throw err })
    
  } catch (err) {
    console.log("Shelf data parse failed: " + err.message)
  }

}

addBook(arr) {
  if (!Array.isArray(arr)) throw new Error("addBook() only accepts arrays with values of [path, name]")
  
  arr = arr.map(async item => {
    const [name, path] = item
    const newBook = createBook(path)
    newBook
    .then(book => this.books[name] = book)
    .catch(err => {throw err})

    return newBook
  })
  
  return Promise.all(arr)
}

collect(arr, name) {

  arr = Array.isArray(arr) ? arr : [arr]
  if (!this.getCollection(name)) this.collections[name] = {}
  this.collections[name].books = arr.map(bookName => {
    const book = this.getBook(bookName)
    return book
  }).filter(b => {if (b) return true})
  
  return this
  
}

save(path) {
  const { books, collections } = this
  const d = JSON.stringify({books, collections})

  writeFile(path + "/shelfData.json", d)
  .catch(err => console.log(err.message))

  return this
  
}

getBook(name) { return this.books[name] }
getCollection(name) { return this.collections[name] }

}
  
function createBook(p) {

  return readFile(p)
  .then(buf => {
    const st = buf.toString()
    const arr = st.split("\n")
    
    const content = arr.filter(v => v !== "").filter((v, i) => i > 4)
    const copy = {}
    let curChapter = ""
    content.forEach(v => {
      if (v.includes("$")) {
        curChapter = v.split("$")[1]
        copy[curChapter] = []
      } else {
        copy[curChapter].push(v)
      }
    })

    let [ sponsers, cast, description, title, cover ] = arr.map((v, i) => {
      if (v === "" && i < arr.length - 1) return arr[i - 1]
    }).filter(v => v !== undefined)
    
    cast = cast.includes(",") ? cast.split(",") : "null"
    
    return { sponsers, cast, description, title, cover, copy }
  })
  .catch(err => console.log(err.message))
  
}

export default Shelf
