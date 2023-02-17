// #### Book Constructor #####
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = Math.floor(Math.random() * 1000000);
}

// ### Library Array ###
let myLibrary = [];

// ### Add book to library ###
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// ### Render library ###

// Helper function to create html elements with text content and classes
function createBookElement(el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute("class", className);
    return element;
}

function renderBooks() {
    const booksGrid = document.querySelector(".books-cards");
    booksGrid.textContent = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const bookCard = document.createElement("div");
        bookCard.setAttribute("dataset-bookid", book.id);
        bookCard.setAttribute("class", "book-card");
        // edit icon
        const editIcon = document.createElement("img");
        editIcon.src = "./assets/pencil.svg";
        editIcon.setAttribute("class", "icons");
        editIcon.addEventListener("click", () => openModal("edit", book));
        // delete icon
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "./assets/trash-can.svg";
        deleteIcon.setAttribute("class", "icons");
        deleteIcon.addEventListener("click", () => {
            myLibrary = myLibrary.filter((b) => b.id !== book.id);
            renderBooks();
        });
        // book info
        const title = createBookElement("h2", book.title, "book-title");
        const author = createBookElement("p", `Author: ${book.author}`);
        const pages = createBookElement("p", `Pages: ${book.pages}`);
        // Is read button
        const readButton = createBookElement(
            "button",
            book.isRead ? "Read" : "To Read",
            "book-isRead"
        );
        readButton.addEventListener("click", () => {
            book.isRead - !book.isRead;
            readButton.textContent = book.isRead ? "Read" : "To Read";
        });
        // append all elements to the book item
        bookCard.append(editIcon, deleteIcon, title, author, pages, readButton);
    }
}

// ### Modal Form ###
const modal = document.getElementById("modal");

// ### Event Listeners ###

// ### Sample data ###

// ### Initialize render ###

const openModal = document.getElementById("btn-open-modal");
const closeModal = document.getElementById("btn-close-modal");

const elementToBlur = document.querySelector(".books-cards");
// main div holding all bookings cards

// Add books via form
const addBookForm = document.querySelector(".book-form");
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

//Function to create all of the book content on the book dom card

// Get the value select on the dropdown list
function getSelectedValue() {
    const selectElement = document.getElementById("isRead");
    const selectedIndex = selectElement.selectedIndex;
    const selectedValue = selectElement.options[selectedIndex].text;
    return selectedValue;
}

//Books array

addBookToLibrary("book1", "me", 34, "to Read");
addBookToLibrary("book2", "me", 340, "Read");
addBookToLibrary("book3", "me", 54, "to Read");
addBookToLibrary("book4", "me", 3244, "to Read");

renderBooks();
