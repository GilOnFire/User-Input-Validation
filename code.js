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

  // Get input values from form fields and trim whitespace
  var first = (document.getElementById('firstName') || {}).value || '';
  var last  = (document.getElementById('lastName')  || {}).value || '';
  var zip   = (document.getElementById('zipCode')   || {}).value || '';

  // Remove leading/trailing whitespace from each input
  first = first.trim();
  last  = last.trim();
  zip   = zip.trim();

  // Concatenate first and last name with a space between them (if both exist)
  var fullName = first + (first && last ? ' ' : '') + last;

  // Validate that combined full name is 20 characters or fewer
  if (fullName.length > 20) {
    if (nameError) {
      nameError.innerHTML = 'Full name must be 20 characters or fewer.';
      nameError.classList.add('show');  // Display error message
    }
    return false;  // Block form submission
  }

  // Validate that zip code is exactly 5 digits (0-9 only)
  // Regex: ^ = start, \d = digit, {5} = exactly 5, $ = end
  if (!/^\d{5}$/.test(zip)) {
    if (zipError) {
      zipError.innerHTML = 'Zip code must be exactly 5 digits.';
      zipError.classList.add('show');  // Display error message
    }
    return false;  // Block form submission
  }

  // All validation passed — display secret message with combined name and zip code
  if (secretDiv) {
    secretDiv.innerHTML = 'Secret code is: ' + fullName + '-' + zip;
    secretDiv.classList.add('show');  // Display secret message with animation
  }

  // Return false to prevent page reload (form does not actually submit)
  return false;
}