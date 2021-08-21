function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const signUpModal = document.querySelector("#sign-up-modal");
const closeSignUpModal = document.querySelector("#close-submit");
const confirmationModal = document.querySelector("#submit-state-modal");
const closeconfirmationModal = document.querySelector("#close-confirmation");
const modalBg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn");
const okBtn = document.querySelector("#submit-state-modal .btn-ok")
const submitBtn = document.querySelector("#submit-state-modal .btn-submit")
const formData = document.querySelectorAll(".formData");
const form = document.querySelector(".modal-body > form");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  signUpModal.style.display = "block";
}

// close modal form
function closeModal(modal) {
  modal.style.display = "none";
}

// add close function to crosses and button
closeconfirmationModal.addEventListener("click", () => { closeModal(confirmationModal)});
closeSignUpModal.addEventListener("click", () => { closeModal(signUpModal)});
okBtn.addEventListener("click", () => { closeModal(confirmationModal)});

// form fields objects
const formFields = [
  {
    inputContainer: document.getElementById("formData-first"),
    input: document.getElementById("first"),
    errorMessage: "Veuillez entrer 2 lettres ou plus pour le champ du prénom",
  },
  {
    inputContainer: document.getElementById("formData-last"),
    input: document.getElementById("last"),
    errorMessage: "Veuillez entrer 2 lettres ou plus pour le champ du nom",
  },
  {
    inputContainer: document.getElementById("formData-email"),
    input: document.getElementById("email"),
    errorMessage: "Veuillez entrer une adresse mail valide",
  },
  {
    inputContainer: document.getElementById("formData-birthdate"),
    input: document.getElementById("birthdate"),
    errorMessage: "Vous devez entrer votre date de naissance",
  },
  {
    inputContainer: document.getElementById("formData-quantity"),
    input: document.getElementById("quantity"),
    errorMessage: "Veuillez entrer un nombre entre 0 et 99",
  },
  {
    inputContainer: document.getElementById("formData-location"),
    input: document.getElementById("location1"),
    errorMessage: "Veuillez selectionner une ville",
  },
  {
    inputContainer: document.getElementById("formData-user-condition"),
    input: document.getElementById("checkbox1"),
    errorMessage: "Vous devez vérifier que vous acceptez les termes et conditions",
  }
]

// apply check validity to each input
formFields.forEach(field => {
   field.input.addEventListener("change", () => { checkValidity(field)})
  }
)

// form field validity inspection
function checkValidity(formField) {

  if (!formField.input.validity.valid || formField.input.validity.valueMissing) {
    formField.inputContainer.setAttribute("data-error", formField.errorMessage);
    formField.inputContainer.setAttribute("data-error-visible", "true")
  }
  else {
    formField.inputContainer.setAttribute("data-error", "");
    formField.inputContainer.setAttribute("data-error-visible", "")
  }
}

// inspects if form is fully filled
function formIsValid() {

  let valid = true;

  for (let i = 0; i < formFields.length; i++) {  
    if (formFields[i].input.checkValidity() == false) {
      return false}
  }
  return valid
}

// submit form
function validate() {

  if (formIsValid()) {
    // delete data and brings up confirmation modal
    form.reset();
    signUpModal.style.display = "none";
    confirmationModal.style.display = "block"
  }
  else {
    formFields.forEach(field => checkValidity(field))
  }
}