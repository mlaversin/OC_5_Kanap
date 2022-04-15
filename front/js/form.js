function getValidForm() {
  const charRegex = new RegExp("^[a-zA-Zâéèêëïöîôç '-]+$");
  const addressRegex = new RegExp("^[0-9a-zA-Zàâäéèêëïîôöùûüç '-]+$");
  const emailRegex = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
  );

  const firstName = document.getElementById('firstName');
  const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
  firstName.addEventListener('input', (e) => {
    if (charRegex.test(firstName.value) || !firstName.value) {
      firstNameErrorMsg.textContent = '';
    } else {
      firstNameErrorMsg.textContent =
        'Veuillez utiliser uniquement les caractères autorisés.';
    }
  });

  const lastName = document.getElementById('lastName');
  const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
  lastName.addEventListener('input', (e) => {
    if (charRegex.test(lastName.value) || !lastName.value) {
      lastNameErrorMsg.textContent = '';
    } else {
      lastNameErrorMsg.textContent =
        'Veuillez utiliser uniquement les caractères autorisés.';
    }
  });

  const address = document.getElementById('address');
  const addressErrorMsg = document.getElementById('addressErrorMsg');
  address.addEventListener('change', (e) => {
    if (addressRegex.test(address.value) || !address.value) {
      addressErrorMsg.textContent = '';
    } else {
      addressErrorMsg.textContent = 'Veuillez saisir une adresse valide.';
    }
  });

  const city = document.getElementById('city');
  const cityErrorMsg = document.getElementById('cityErrorMsg');
  city.addEventListener('input', (e) => {
    if (charRegex.test(city.value) || !city.value) {
      cityErrorMsg.textContent = '';
    } else {
      cityErrorMsg.textContent =
        'Veuillez utiliser uniquement les caractères autorisés.';
    }
  });

  const email = document.getElementById('email');
  const emailErrorMsg = document.getElementById('emailErrorMsg');
  email.addEventListener('change', (e) => {
    if (emailRegex.test(email.value) || !email.value) {
      emailErrorMsg.textContent = '';
    } else {
      emailErrorMsg.textContent = 'Veuillez saisir une adresse email valide.';
    }
  });
}

export { getValidForm };
