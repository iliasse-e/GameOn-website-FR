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


// add red warning message if user input is invalid (prend 2 paramètres: nom de l'id de l'input / index de l'input qui renvoit un message d'erreur)
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

    const node = document.createElement("P");
    const textnode = document.createTextNode(errorMessage[index]);
    node.appendChild(textnode);
    target.parentNode.after(node);
    node.className = "data-error";
    target.classList.add("input-error");
  }
}

// gather all inputs in an array
let inputsArray = Array.prototype.slice.call(document.querySelectorAll(".text-control"));
inputsArray.push(document.querySelector(".checkbox-input"));
inputsArray.push(document.getElementById("checkbox1"));



// submit form
function validate() {

  let validaity = inputsArray.length;
  console.log(validaity)

  for (let i = 0; i < inputsArray.length; i++) {
    if (inputsArray[i].validity.valid) {
      validaity --;
      console.log(validaity);
    }
  }

  // Removes all error messages
  let errorMessages = document.querySelectorAll(".data-error");
  for (let i=0; i < errorMessages.length; i++) {
    errorMessages[i].remove();
  }

  // removes all input red border
  let errorInputs = document.querySelectorAll(".input-error");
  for (let i=0; i < errorInputs.length; i++) {
    errorInputs[i].classList.remove("input-error");
  }


  if (validaity < 1) {

    // message of submission
    const form = document.querySelector(".modal-body > form");

    const node = document.createElement("P");
    const textnode = document.createTextNode("Merci ! Votre réservation a été reçue.");
    node.appendChild(textnode);
    form.parentNode.after(node);
    node.className = "form-validation-message";

    form.style.display = "none";

    // add ok button
    const node2 = document.createElement("button");
    const textnode2 = document.createTextNode("Ok");
    node2.appendChild(textnode2);
    node.after(node2);
    node2.className = "btn-submit btn-ok";

    // add closing func to "Ok" button
    node2.setAttribute("onclick", "closeModal();")

    // delete data
    document.getElementById("form").reset();
  }

  else {
    // calls function to check each modal's input
    inputsArray.forEach(item => {
      item.addEventListener("input", invalidWarning(item, inputsArray.indexOf(item)));
    });
  }
}

