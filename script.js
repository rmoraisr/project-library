// #### Book Constructor #####
function Book(title, author, pages, isRead, id = new Date().getTime()) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
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
const openModalButton = document.getElementById("btn-open-modal");
openModalButton.addEventListener("click", () => {
    document.querySelector(".form-title").textContent = "Add Book";
    openModal("add");
});
const closeModalButton = document.getElementById("btn-close-modal");
closeModalButton.addEventListener("click", () => closeModal());

const bookForm = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("isRead");
let currentBook;

function openModal(mode, book = null) {
    currentBook = book;
    if (mode === "add") {
        bookForm.reset();
        currentBook = null;
    } else if (mode === "edit") {
        titleInput.value = book.title;
        authorInput.value = book.author;
        pagesInput.value = book.pages;
        readInput.value = book.isRead;
    }
    modal.style.display = "block";
    const focusedInput = modal.querySelector("input");
    focusedInput.focus();
    document.querySelector(".books-cards").classList.add("blur");
}

function closeModal() {
    modal.style.display = "none";
    document.querySelector(".books-cards").classList.remove("blur");
}

function submitForm(event) {
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.value;
    const id = currentBook ? currentBook.id : new Date().getTime();
    const book = new Book(title, author, pages, read, id);
    if (currentBook) {
        const index = myLibrary.findIndex((b) => b.id === currentBook.id);
        myLibrary[index] = book;
    } else {
        addBookToLibrary(book);
    }
    renderBooks();
    closeModal();
}

// ### Event Listeners ###
bookForm.addEventListener("submit", submitForm);

// ### Sample data ###
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const book2 = new Book("1984", "George Orwell", 328, false);
addBookToLibrary(book1);
addBookToLibrary(book2);

console.log(myLibrary)

// ### Initialize render ###
renderBooks();
