// Main form validation function called on submit
function validateForm(event) {
  // Prevent default form submission behavior (page reload)
  event.preventDefault();
  
  // Get references to error message and secret message DOM elements
  var nameError = document.getElementById('nameError');
  var zipError = document.getElementById('zipError');
  var secretDiv = document.getElementById('secretMessage');
  
  // Clear previous messages and remove 'show' class to hide error/secret messages
  if (nameError) {
    nameError.innerHTML = '';
    nameError.classList.remove('show');
  }
  if (zipError) {
    zipError.innerHTML = '';
    zipError.classList.remove('show');
  }
  if (secretDiv) {
    secretDiv.innerHTML = '';
    secretDiv.classList.remove('show');
  }

  // I used an object here so the validation rules live in one place and are easier to adjust later.
  var validationRules = {
    maxNameLength: 20,
    zipPattern: /^\d{5}$/
  };

  // Gather the fields in one list so I can clean them up with a loop instead of repeating trim logic.
  var inputs = [
    document.getElementById('firstName'),
    document.getElementById('lastName'),
    document.getElementById('zipCode')
  ];

  // A simple loop helps make sure each input is trimmed before I validate it.
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i]) {
      inputs[i].value = inputs[i].value.trim();
    }
  }

  // Pull the cleaned values back out so I can validate them.
  var first = (document.getElementById('firstName') || {}).value || '';
  var last = (document.getElementById('lastName') || {}).value || '';
  var zip = (document.getElementById('zipCode') || {}).value || '';

  // I used a helper function for the name formatting so the secret code stays readable.
  var fullName = formatDisplayName(first, last);

  // These if/else checks decide whether the form should stop for an error or continue.
  if (fullName.length > validationRules.maxNameLength) {
    if (nameError) {
      nameError.innerHTML = 'Full name must be 20 characters or fewer.';
      nameError.classList.add('show');
    }
    return false;
  } else if (!validationRules.zipPattern.test(zip)) {
    if (zipError) {
      zipError.innerHTML = 'Zip code must be exactly 5 digits.';
      zipError.classList.add('show');
    }
    return false;
  }

  // If everything passes, I show the secret message with the formatted name and zip code.
  if (secretDiv) {
    secretDiv.innerHTML = 'Secret code is: ' + fullName + '-' + zip;
    secretDiv.classList.add('show');
  }

  // Return false so the page does not reload after a successful check.
  return false;
}

// This helper function formats the name so the final secret code looks cleaner.
function formatDisplayName(first, last) {
  var nameParts = [first, last].filter(function (part) {
    return part && part.length > 0;
  });

  return nameParts.join(' ');
}
