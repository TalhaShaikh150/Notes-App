let NotesList = JSON.parse(localStorage.getItem("NotesList")) || [];

loadPages();

function loadPages() {
  const modalElement = document.querySelector(".modal");
  const overLay = document.querySelector(".overlay");
  const saveButton = document.querySelector(".js-save");

  saveButton.addEventListener("click", () => {
    addNote(modalElement, overLay);
  });

  renderNote();

  showModal(modalElement, overLay);
  closeModal(modalElement, overLay);
}

/* This Function Is To Display Modal */
function showModal(modalElement, overLay) {
  const buttonElement = document.querySelector(".js-add-note");
  const wholeBody = document.body;

  buttonElement.addEventListener("click", () => {
    modalElement.classList.add("display");
    overLay.classList.add("display");
    wholeBody.addEventListener("keydown", (event) => {
      function hide() {
        modalElement.classList.remove("display");
        overLay.classList.remove("display");
      }
      if (event.key === "Escape") {
        hide();
      }
    });
  });
}

/* This Function Is To Close Modal */
function closeModal(modalElement, overLay) {
  const closeButton = document.querySelector(".fa-xmark");

  closeButton.addEventListener("click", hide);
  function hide() {
    modalElement.classList.remove("display");
    overLay.classList.remove("display");
  }
}

function addNote(modalElement, overLay) {
  const titleInput = document.querySelector(".js-title");
  const categoryInput = document.querySelector(".js-category");
  const contentInput = document.querySelector(".js-content");

  const title = titleInput.value;
  const category = categoryInput.value;
  const content = contentInput.value;

  if (title === "" || category === "" || content === "") {
    alert("Please Fill All The Fields");
    return;
  } else {
    NotesList.unshift({ title, category, content });
    renderNote();
    modalElement.classList.remove("display");
    overLay.classList.remove("display");

    titleInput.value = "";
    categoryInput.value = "";
    contentInput.value = "";

    saveToStorage();
  }
}

function renderNote() {
  const noteContainer = document.querySelector(".notes-container");
  let html = "";

  for (let i = 0; i < NotesList.length; i++) {
    let noteObject = NotesList[i];
    const { title, category, content } = noteObject;

    html += `  
            <div class="note">
                <div class="note-head">
                    <h3>${title}</h3>
                    <i class="fa-solid fa-trash" data-index=${i}></i>
                </div>
                <p class="content">${content}</p>

                <div class="note-head">
                    <button class="category-btn">${category}</button>
                    <p>Date</p>
                </div>
            </div>
        `;
  }

  noteContainer.innerHTML = html;
  deleteNote();
}

function deleteNote() {
  let deleteIcon = document.querySelectorAll(".fa-trash");

  deleteIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      let indexnum = icon.dataset.index;
      NotesList.splice(indexnum, 1);
      deleteAnimation();
      setTimeout(() => {
        saveToStorage();
        renderNote();
      }, 400);
    });
  });
}
function deleteAnimation() {
  let notes = document.querySelectorAll(".note");
  notes.forEach((singleNote) => {
    singleNote.addEventListener("click", () => {
      singleNote.classList.add("delete-animation");
    });
  });
}

function saveToStorage() {
  localStorage.setItem("NotesList", JSON.stringify(NotesList));
}
