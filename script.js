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
    let focusedInput = modal.querySelector("input");
    focusedInput.focus();
    elementToBlur.classList.add("blur");
}

function hideModal() {
    modal.style.display = "none";
    elementToBlur.classList.remove("blur");
}

openModal.addEventListener("click", () => {
    document.querySelector(".form-title").textContent = "Add Book";
    showModal();
});
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
function createBookItem(book) {
    const bookItem = document.createElement("div");
    bookItem.setAttribute("dataset-bookid", book.id);
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

// Render the Edit Icon into the book card
function createEditIcon(book) {
    const editIcon = document.createElement("img");
    editIcon.src = "./assets/pencil.svg";
    editIcon.setAttribute("class", "icons");
    editIcon.addEventListener("click", () => editBookItem(book));
    return editIcon;
}

// Open the modal with the book values when the edit icons is clicked
function editBookItem(book) {
    showModal();
    document.querySelector(".form-title").textContent = "Edit Book";
    document
        .querySelector(".add-book-form")
        .setAttribute("dataset-bookid", book.id);
    document.querySelector("#title").value = book.title || "";
    document.querySelector("#author").value = book.author || "";
    document.querySelector("#pages").value = book.pages || "";
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
    myLibrary.map((book) => {
        createBookItem(book);
    });
}

//Books array
let myLibrary = [];

addBookToLibrary("book1", "me", 34, "to Read");
addBookToLibrary("book2", "me", 340, "Read");
addBookToLibrary("book3", "me", 54, "to Read");
addBookToLibrary("book4", "me", 3244, "to Read");

renderBooks();
