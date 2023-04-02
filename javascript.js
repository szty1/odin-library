// Data Structures

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pageCount = pages;
  this.read = read;
}



function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function toggleReadStatus() {
  myLibrary[this.dataset.index].read = !myLibrary[this.dataset.index].read;
  listBooks();
}

function deleteBook() {
  myLibrary.splice(this.dataset.index, 1);
  listBooks();
}

function listBooks() {
  bookscontainer.innerHTML = '';

  myLibrary.forEach( (book, index) => {
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
  readbuttons.forEach((button) => button.addEventListener('click', toggleReadStatus));

  const deletebuttons = document.querySelectorAll('div.book a.delete');
  deletebuttons.forEach((button) => button.addEventListener('click', deleteBook));
};

function openAddNewForm() {
  modal.style.display = "flex";
}

function closeAddNewForm() {
  modal.style.display = "none";
}

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

const modal = document.querySelector('div.modal');
const bookscontainer = document.querySelector('div.books');

const form = document.querySelector('div.add form');
form.addEventListener('submit', validateForm);

const inputFields = document.querySelectorAll('.modal input');
inputFields.forEach((input) => {
  input.errormessage = document.querySelector(`#${input.id} + p.errormessage`);
});

const addnewlink = document.querySelector('div.header a');
addnewlink.addEventListener('click', openAddNewForm);

const modalclose = document.querySelector('div.modal a.closebutton');
modalclose.addEventListener('click', closeAddNewForm);


addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', false);
addBookToLibrary('Lord of the Rings', 'J.R.R. Tolkien', '910', true);
addBookToLibrary('Catch 22', 'Joseph Heller', '405', false);

listBooks();
