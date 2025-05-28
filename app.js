let NotesList = JSON.parse(localStorage.getItem("NotesList")) || [];

let previousTheme = JSON.parse(localStorage.getItem("theme")) || ["default"];

loadPages();
function loadPages() {
  const modalElement = document.querySelector(".modal");
  const overLay = document.querySelector(".overlay");
  const saveButton = document.querySelector(".js-save");

  saveButton.addEventListener("click", () => {
    addNote(modalElement, overLay);
  });
  switchThemes();
  restoreTheme();

  showcategory();
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
    const customAlert = document.querySelector(".custom-alert");
    customAlert.classList.add("display");
    setTimeout(() => {
      customAlert.classList.remove("display");
    }, 2000);
    return;
  } else {
    NotesList.unshift({ title, category, content });
    showcategory();
    searchNotes();

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
    <h3 class="search-title">${title}</h3>
    <div>
    <i class="fa-solid fa-pen-to-square" data-index=${i}></i>
    <i class="fa-solid fa-trash" data-index=${i}></i>
    </div>
    </div>
                <p class="content search-content">${content}</p>

                <div class="note-head">
                    <button class="category-btn search-category">${category.toLowerCase()}</button>
                    <p>Date</p>
                </div>
            </div>
        `;
  }

  noteContainer.innerHTML = html;

  deleteNote();
  searchNotes();
}
function deleteNote() {
  editNote();
  let deleteIcon = document.querySelectorAll(".fa-trash");

  deleteIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      let indexnum = icon.dataset.index;
      NotesList.splice(indexnum, 1);
      deleteAnimation();
      setTimeout(() => {
        saveToStorage();
        showcategory();

        renderNote();
      }, 300);
    });
  });
}

function editNote() {
  const modalElement = document.querySelector(".edit-modal");
  const overLay = document.querySelector(".overlay");

  const titleInput2 = document.querySelector(".modal-2 .js-title");
  const categoryInput2 = document.querySelector(".modal-2 .js-category");
  const contentInput2 = document.querySelector(".modal-2 .js-content");

  const editIcon = document.querySelectorAll(".fa-pen-to-square");
  let index;
  editIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      index = icon.dataset.index;
      let note = NotesList[index];
      overLay.classList.add("display");
      modalElement.classList.add("display");

      titleInput2.value = note.title;
      categoryInput2.value = note.category;
      contentInput2.value = note.content;
      function updateNote() {
        note.title = titleInput2.value;
        note.category = categoryInput2.value;
        note.content = contentInput2.value;
        saveToStorage();
        renderNote();

        overLay.classList.remove("display");
        modalElement.classList.remove("display");
      }
      const approveChanges = document.querySelector(".js-approve");
      approveChanges.addEventListener("click", updateNote);
    });
    const wholeBody = document.body;

    wholeBody.addEventListener("keydown", (event) => {
      function hide() {
        modalElement.classList.remove("display");
        overLay.classList.remove("display");
      }
      if (event.key === "Escape") {
        hide();
      }
    });
    const closeButton = document.querySelectorAll(".fa-xmark-edit");
    closeButton.forEach((closebtn) => {
      closebtn.addEventListener("click", hide);
      function hide() {
        modalElement.classList.remove("display");
        overLay.classList.remove("display");
      }
    });
  });
}
function showcategory() {
  const categories = document.querySelector("select");
  const noteContainer = document.querySelector(".notes-container");

  categories.innerHTML = `<option value="All">All</option>`;

  let optionhtml = "";
  NotesList.forEach((note) => {
    if (!optionhtml.includes(note.category)) {
      optionhtml += `<option class="All-options" value="${note.category.toLowerCase()}">${note.category.toLowerCase()}</option>`;
    }
  });
  categories.innerHTML += optionhtml;
  categories.addEventListener("change", () => {
    let updatedHtml = "";
    NotesList.forEach((note) => {
      if (
        categories.value === "All" ||
        categories.value === note.category.toLowerCase()
      ) {
        updatedHtml += `<div class="note">
                <div class="note-head">
                    <h3 class="
                    select-t">${note.title}</h3>
                    <div>
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-trash"></i>
                    </div>
                </div>

                <p class="content select-content">${note.content}</p>

                <div class="note-head">
                    <button class="category-btn select-category">${note.category.toLowerCase()}</button>
                    <p>Date</p>
                </div>
                
            </div>`;
      }
    });
    noteContainer.innerHTML = updatedHtml;
    deleteNote();
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

function searchNotes() {
  const allNotes = document.querySelectorAll(".note");
  const searchBar = document.querySelector(".js-search-note");
  searchBar.addEventListener("input", () => {
    const searchvalue = searchBar.value.toLowerCase();
    allNotes.forEach((note) => {
      const title = note.querySelector(".search-title").innerHTML.toLowerCase();
      const category = note
        .querySelector(".search-category")
        .innerHTML.toLowerCase();
      const content = note
        .querySelector(".search-content")
        .innerHTML.toLowerCase();
      if (
        title.includes(searchvalue) ||
        category.includes(searchvalue) ||
        content.includes(searchvalue)
      ) {
        note.style.display = "block";
      } else {
        note.style.display = "none";
      }
    });
  });
}

function switchThemes() {
  let Themes = ["default", "green", "purple", "blue"];

  let themebuttons = document.querySelectorAll(".js-theme");

  themebuttons.forEach((themebtn, index) => {
    themebtn.addEventListener("click", () => {
      let rootElement = document.documentElement;

      Themes.forEach((theme) => {
        rootElement.classList.remove(theme);
      });
      rootElement.classList.add(`${Themes[index]}`);
      themebuttons.forEach((btn) => btn.classList.remove("is-toggled"));
      themebtn.classList.add("is-toggled");
      previousTheme = Themes[index];

      localStorage.setItem("theme", JSON.stringify(previousTheme));
    });
  });
}

function restoreTheme() {
  let rootElement = document.documentElement;
  rootElement.classList.add(`${previousTheme}`);
}

function saveToStorage() {
  localStorage.setItem("NotesList", JSON.stringify(NotesList));
}
