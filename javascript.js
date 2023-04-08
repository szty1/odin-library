// Data Structures

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  deleteBook(index) {
    this.books.splice(index, 1);
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

const myLibrary = new Library();

const INIT_DATA = [
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', pageCount:'295', read: false },
  { title: 'Lord of the Rings', author: 'J.R.R. Tolkien', pageCount: '910', read: true},
  { title: 'Catch 22', author: 'Joseph Heller', pageCount: '405', read: true},
];

// Library functions

function addBookToLibrary(title, author, pages, read) {
  myLibrary.addBook(new Book(title, author, pages, read));
  listBooks();
}

function deleteBookfromLibrary() {
  myLibrary.deleteBook(this.dataset.index);
  listBooks();
}

function toggleReadStatusOfBook() {
  myLibrary.books[this.dataset.index].toggleRead();
  listBooks();
}

// Render functions

function listBooks() {
  bookscontainer.innerHTML = '';

  myLibrary.books.forEach( (book, index) => {
    let html = `<div class="book ${book.read ? 'read' : 'unread'}">
      <p class="author">${book.author}</p>
      <p class="title">${book.title}</p>
      <p class="pages">Contains ${book.pageCount} pages</p>
      <a class="read" data-index="${index}">${book.read ? 'Mark as unread' : 'Mark as read'}</a>
      <a class="delete" data-index="${index}">Delete item</a>
    </div>`;
    bookscontainer.innerHTML += html;
  }); 

  const readbuttons = document.querySelectorAll('div.book a.read');
  readbuttons.forEach((button) => button.addEventListener('click', toggleReadStatusOfBook));

  const deletebuttons = document.querySelectorAll('div.book a.delete');
  deletebuttons.forEach((button) => button.addEventListener('click', deleteBookfromLibrary));
};

function openAddNewForm() {
  modal.style.display = "flex";
}

function closeAddNewForm() {
  modal.style.display = "none";
}

function displayError(input) {
  if (input.validity.valueMissing) {
    switch (input.id) {
      case 'author':
        input.errormessage.textContent = 'Please enter the author!';
        break;
      case 'title':
        input.errormessage.textContent = 'Please enter the book title!';
        break;
      case 'pageCount':
        input.errormessage.textContent = 'Please enter the page count!';
        break;
    }
  } else if (input.validity.patternMismatch) {
    switch (input.id) {
      case 'pageCount':
        input.errormessage.textContent = "Please enter only numbers here!";
        break;
    }
  }
  input.errormessage.className = 'errormessage active';
  input.className = 'error';
}

function clearErrorMessages() {
  inputFields.forEach((input) => {
    input.errormessage.textContent = '';
    input.errormessage.className = 'errormessage';
    input.className = '';
  });
}

// Form handling

function validateForm(e) {
  e.preventDefault();
  let formValid = true;
  inputFields.forEach((input) => {
    if (!input.validity.valid) {
      displayError(input);
      formValid = false;
    }
  });
  if (formValid) {
    let formData = new FormData(e.target);
    addBookToLibrary(formData.get('title'), formData.get('author'), formData.get('pageCount'), formData.get('read'));
    form.reset();
    clearErrorMessages() 
    closeAddNewForm();
    listBooks();
  }
}

// HTML elements

const modal = document.querySelector('div.modal');
const bookscontainer = document.querySelector('div.books');
const form = document.querySelector('div.add form');
const inputFields = document.querySelectorAll('.modal input');
const addnewlink = document.querySelector('div.header a');
const modalclose = document.querySelector('div.modal a.closebutton');

// Event listeners

form.addEventListener('submit', validateForm);
inputFields.forEach((input) => {
  input.errormessage = document.querySelector(`#${input.id} + p.errormessage`);
});
addnewlink.addEventListener('click', openAddNewForm);
modalclose.addEventListener('click', closeAddNewForm);

// Add Test Data

INIT_DATA.forEach((book) => {
  myLibrary.addBook(new Book(book.title, book.author, book.pages, book.read));
});

// Init

listBooks();
