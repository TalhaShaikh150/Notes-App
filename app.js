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
