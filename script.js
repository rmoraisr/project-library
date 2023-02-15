const openModal = document.getElementById("btn-open-modal");
const closeModal = document.getElementById("btn-close-modal");
const modal = document.getElementById("modal");
const elementToBlur = document.querySelector(".books-cards");
const books = document.querySelector(".books-cards"); // main div holding all bookings cards

// Add books via form
const addBookForm = document.querySelector("#add-book-form");
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    let newBook = {};
    for (let [name, value] of data) {
        newBook[name] = value;
    }
    addBookToLibrary(
        newBook["title"],
        newBook["author"],
        newBook["pages"],
        getSelectedValue()
    );
    addBookForm.reset();
    hideModal();
});

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
function Book(title, author, pages, isRead) {
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
function createBookElement(el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute("class", className);
    return element;
}

//Function to create all of the book content on the book dom card
function createBookItem(book, index) {
    const bookItem = document.createElement("div");
    bookItem.setAttribute("id", index);
    bookItem.setAttribute("key", index);
    bookItem.setAttribute("class", "book-card");
    bookItem.append(
        createEditIcon(book),
        createBookElement("h2", `Title: ${book.title}`, "book-title"),
        createBookElement("p", `Author: ${book.author}`, "book-author"),
        createBookElement("p", `Pages: ${book.pages}`, "book-pages"),
        createBookElement("button", book.isRead, "book-isRead")
    );
    books.append(bookItem);
}

function createEditIcon(book) {
    const editIcon = document.createElement("img");
    editIcon.src = "./assets/pencil.svg";
    editIcon.setAttribute("class", "icons");
    return editIcon;
}

// Get the value select on the dropdown list
function getSelectedValue() {
    const selectElement = document.getElementById("isRead");
    const selectedIndex = selectElement.selectedIndex;
    const selectedValue = selectElement.options[selectedIndex].text;
    return selectedValue;
}

function renderBooks() {
    books.textContent = "";
    myLibrary.map((book, index) => {
        createBookItem(book, index);
    });
}

//Books array
let myLibrary = [
    { title: "Book2", author: "Me", pages: 500, isRead: "to Read" },
    { title: "Book3", author: "Me", pages: 500 },
    { title: "Book2", author: "Me", pages: 500 },
    { title: "Book3", author: "Me", pages: 500 },
];

renderBooks();
