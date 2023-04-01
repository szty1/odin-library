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
  myLibrary.forEach( book => {
    let html = `<div class="book ${book.read ? 'read' : 'unread'}">
      <p class="author">${book.author}</p>
      <p class="title">${book.title}</p>
      <p class="pages">Contains ${book.pageCount} pages</p>
      <a href="#">Mark as read</a>
      <a href="#">Delete item</a>
    </div>`;
    bookscontainer.innerHTML += html;
  }); 
};

function openAddNewForm() {
  console.log(this.e);
  modal.style.display = "flex";
}

function closeAddNewForm() {
  modal.style.display = "none";
}

function validateInput() {

}

const modal = document.querySelector('div.modal');
const bookscontainer = document.querySelector('div.books');

const form = document.querySelector('div.add form');
form.addEventListener('submit', validateInput);

const addnewlink = document.querySelector('div.header a');
addnewlink.addEventListener('click', openAddNewForm);

const modalclose = document.querySelector('div.modal a.closebutton');
modalclose.addEventListener('click', closeAddNewForm);

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', false);
addBookToLibrary('Lord of the Rings', 'J.R.R. Tolkien', '910', true);


listBooks();
