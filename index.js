import { readFile } from "fs/promises"

class Shelf {

books = {}
collections = {}

async addBook(name, path) {
  this.books[name] = await newBook(path, name)
  return this
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

getBook(name) { return this.books[name] }
getCollection(name) { return this.collections[name] }

}
  
function newBook(p, n) {

  return readFile(p)
  .then(buf => {
    const st = buf.toString()
    const arr = st.split("\n")
    
    const copy = arr.filter(v => v !== "").filter((v, i) => i > 4)
    let [ sponsers, cast, description, title, cover ] = arr.map((v, i) => {
      if (v === "" && i < arr.length - 1) return arr[i - 1]
    }).filter(v => v !== undefined)
    
    cast = cast.split(",")
    
    return { sponsers, cast, description, title, cover, copy, id: n }
  })
  .catch(err => console.log(err.message))
  
}

export default Shelf
