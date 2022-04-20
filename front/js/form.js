/*
 * Checks if contact form fields are present and valid.
 * @returns {Object[]} contact - object represents the customer form data
 */

function getValidForm() {
  // Regex declaration
  const charRegex = new RegExp("^[a-zA-Zâéèêëïöîôç '-]+$");
  const addressRegex = new RegExp("^[0-9a-zA-Zàâäéèêëïîôöùûüç '-]+$");
  const emailRegex = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
  );

  // Input verification
  let firstNameValid = false;
  const firstName = document.getElementById('firstName');
  const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
  if (!firstName.value) {
    firstNameErrorMsg.textContent = 'Ce champ est obigatoire.';
  } else if (!charRegex.test(firstName.value)) {
    firstNameErrorMsg.textContent =
      'Veuillez utiliser uniquement les caractères autorisés.';
  } else {
    firstNameErrorMsg.textContent = '';
    firstNameValid = true;
  }

  let lastNameValid = false;
  const lastName = document.getElementById('lastName');
  const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
  if (!lastName.value) {
    lastNameErrorMsg.textContent = 'Ce champ est obigatoire.';
  } else if (!charRegex.test(lastName.value)) {
    lastNameErrorMsg.textContent =
      'Veuillez utiliser uniquement les caractères autorisés.';
  } else {
    lastNameErrorMsg.textContent = '';
    lastNameValid = true;
  }

  let addressValid = false;
  const address = document.getElementById('address');
  const addressErrorMsg = document.getElementById('addressErrorMsg');
  if (!address.value) {
    addressErrorMsg.textContent = 'Ce champ est obigatoire.';
  } else if (!addressRegex.test(address.value)) {
    addressErrorMsg.textContent = 'Veuillez saisir une adresse valide.';
  } else {
    addressErrorMsg.textContent = '';
    addressValid = true;
  }

  let cityValid = false;
  const city = document.getElementById('city');
  const cityErrorMsg = document.getElementById('cityErrorMsg');
  if (!city.value) {
    cityErrorMsg.textContent = 'Ce champ est obigatoire.';
  } else if (!charRegex.test(city.value)) {
    cityErrorMsg.textContent = 'Ce champ comporte une erreur.';
  } else {
    cityErrorMsg.textContent = '';
    cityValid = true;
  }

  let emailValid = false;
  const email = document.getElementById('email');
  const emailErrorMsg = document.getElementById('emailErrorMsg');
  if (!email.value) {
    emailErrorMsg.textContent = 'Ce champ est obigatoire.';
  } else if (!emailRegex.test(email.value)) {
    emailErrorMsg.textContent = 'Veuillez saisir une adresse email valide.';
  } else {
    emailErrorMsg.textContent = '';
    emailValid = true;
  }

  // if all fields are valid, creation and return of the contact object
  if (
    firstNameValid &&
    lastNameValid &&
    addressValid &&
    cityValid &&
    emailValid
  ) {
    const contact = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      address: address.value.trim(),
      city: city.value.trim(),
      email: email.value.trim(),
    };

    return contact;
  }
}

export { getValidForm };
