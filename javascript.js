let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pageCount = pages;
  this.read = read;

  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.read ? 'read' : 'not read yet'}`;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function listBooks() {

}

function toggleAddNewForm() {
  
}

function validateInput() {

}

const form = document.querySelector('div.add form');
form.addEventListener('submit', validateInput);

const addNewLink = document.querySelector('div.add a');
addNewLink.addEventListener('click', toggleAddNewForm);

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', false);
addBookToLibrary('Lord of the Rings', 'J.R.R. Tolkien', '910', true);
