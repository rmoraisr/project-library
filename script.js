const openModal = document.getElementById("btn-open-modal");
const closeModal = document.getElementById("btn-close-modal");
const modal = document.getElementById("modal");
const elementToBlur = document.querySelector(".book-cards");
const books = document.querySelector(".books"); // main div holding all bookings cards

// Functions related to the modal
function showModal() {
    modal.style.display = "block";
    document.querySelector(".form-title").textContent = "Add Book";
    let focusedInput = modal.querySelector("input");
    focusedInput.focus();
    elementToBlur.classList.add("blur");
}

function hideModal() {
    modal.style.display = "none";
    elementToBlur.classList.remove("blur");
}

openModal.addEventListener("click", () => showModal());
closeModal.addEventListener("click", () => hideModal());

// Functions related to the books constructor
function Book(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = Math.floor(Math.random() * 1000000);
}

function addBookToLibrary(title, author, pages, isRead) {
    myLibrary.push(new Book(title, author, pages, isRead));
    renderBooks();
}

//helper function to create html elements with text content and classes
function createBookElement(el, content, className) {}

//Function to create all of the book content on the book dom card
function createBookItem(book, index) {}

function renderBooks() {
    books.textContent = "";
    myLibrary.map((book, index) => {
        createBookItem(book, index);
    });
}

//Books array
let myLibrary = [];
