let NotesList = JSON.parse(localStorage.getItem("NotesList")) || [];

/Show Modal/;
renderNote();

const buttonElement = document.querySelector(".js-add-note");
const modalElement = document.querySelector(".modal");
const overLay = document.querySelector(".overlay");
displayModal();
function displayModal() {
  buttonElement.addEventListener("click", () => {
    modalElement.classList.add("display");
    overLay.classList.add("display");
  });

  closeModal(modalElement, overLay);
}

/Close Modal/;
function closeModal(modalElement, overLay) {
  const closeButton = document.querySelector(".fa-xmark");
  closeButton.addEventListener("click", () => {
    modalElement.classList.remove("display");
    overLay.classList.remove("display");
  });
}

/Add Note/;
const saveButton = document.querySelector(".js-save");
function addNote() {
  const titleInput = document.querySelector(".js-title");
  const categoryInput = document.querySelector(".js-category");
  const contentInput = document.querySelector(".js-content");

  const title = titleInput.value;
  const category = categoryInput.value;
  const content = contentInput.value;

  NotesList.push({ title, category, content });
  renderNote();
  modalElement.classList.remove("display");
  overLay.classList.remove("display");
  titleInput.value = "";
  categoryInput.value = "";
  contentInput.value = "";
  saveToStorage();
}
saveButton.addEventListener("click", addNote);

function renderNote() {
  const noteContainer = document.querySelector(".notes-container");
  let html = "";
  for (let i = 0; i < NotesList.length; i++) {
    let noteObject = NotesList[i];
    const { title, category, content } = noteObject;
    html += `<div class="note">
          <div class="note-head">
     <h3>${title}</h3>
            <i class="fa-solid fa-trash"></i>
          </div>
          <div class="flex-col">
            <p class="content">${content}</p>
          </div>
          <div class="flex">
            <button class="category">${category}</button>
            <p>Date</p>
          </div>
        </div>`;
  }
  noteContainer.innerHTML = html;
}

function saveToStorage() {
  localStorage.setItem("NotesList", JSON.stringify(NotesList));
}
