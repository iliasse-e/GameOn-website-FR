function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector(".modal-body > form");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// add red warning content if user input is invalid (prend 2 paramètres: nom de l'id de l'input / index de l'input qui renvoit un content d'erreur)
function invalidWarning(target, index) {

  const errorMessage = [
    "Veuillez entrer 2 caractères ou plus pour le champ du prénom",
    "Veuillez entrer 2 caractères ou plus pour le champ du nom",
    "Veuillez entrer une adresse mail valide",
    "Vous devez entrer votre date de naissance",
    "Veuillez entrer un nombre entre 0 et 99",
    "Veuillez selectionner une ville",
    "Vous devez vérifier que vous acceptez les termes et conditions",
  ]

  if (!target.validity.valid) {

  submissionSuccedMessage("p", errorMessage[index], "data-error", target)

  }
}

// gather all form inputs in an array
let inputsArray = Array.prototype.slice.call(document.querySelectorAll(".text-control"));
inputsArray.push(document.querySelector(".checkbox-input"));
inputsArray.push(document.getElementById("checkbox1"));


// add new html element to modal when submission succeded
function submissionSuccedMessage(htmlElement, content, className, position) {

  const node = document.createElement(""+htmlElement);
  const textnode = document.createTextNode(""+content);
  node.appendChild(textnode);

  if (position == form) {
    position.after(node);
    node.className = ""+className;
  }

  else {
    position.parentNode.after(node);
    node.className = ""+className;
    position.classList.add("input-error");
  }
  
}

function inputsChecker() {

  let invalidInputs = inputsArray.length;
  for (let i = 0; i < inputsArray.length; i++) {
    if (inputsArray[i].validity.valid) {
      invalidInputs --;
    }
  }
  return invalidInputs
}

// removes red error messages
function errorMessageRemover(className) {
  let target = document.querySelectorAll(""+className);
  if (className == ".input-error") {
    for (let i=0; i < target.length; i++) {
      target[i].classList.remove("input-error");
    }
  }
  else {
    for (let i=0; i < target.length; i++) {
      target[i].remove();
    }
  }
}

// submit form
function validate() {

  // Removes all error messages
  errorMessageRemover(".data-error");
  
  // removes all input red border
  errorMessageRemover(".input-error");

  if (inputsChecker() < 1) {

    // delete data and hide form
    document.getElementById("form").reset();
    form.style.display = "none";

    // add ok button & content of sumbission
    submissionSuccedMessage("button", "Ok", "btn-submit btn-ok", form)
    submissionSuccedMessage("p", "Merci ! Votre réservation a été reçue.", "form-validation-content", form)

    // add up closing functionality to "Ok" button
    document.querySelector(".btn-ok").setAttribute("onclick", "closeModal();")
  }

  else {
    // calls function to check each modal's input
    inputsArray.forEach(item => {
      item.addEventListener("input", invalidWarning(item, inputsArray.indexOf(item)));
    });
  }
}

