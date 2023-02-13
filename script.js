// Functions related to the modal
const openModal = document.getElementById("btn-open-modal");
const closeModal = document.getElementById("btn-close-modal");
const modal = document.getElementById("modal");
const elementToBlur = document.querySelector(".book-cards");

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
