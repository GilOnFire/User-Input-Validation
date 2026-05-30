function validateForm(event) {
  event.preventDefault();
  
  var nameError = document.getElementById('nameError');
  var zipError = document.getElementById('zipError');
  var secretDiv = document.getElementById('secretMessage');
  
  // Clear previous messages and classes
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

  var first = (document.getElementById('firstName') || {}).value || '';
  var last  = (document.getElementById('lastName')  || {}).value || '';
  var zip   = (document.getElementById('zipCode')   || {}).value || '';

  first = first.trim();
  last  = last.trim();
  zip   = zip.trim();

  var fullName = first + (first && last ? ' ' : '') + last;

  if (fullName.length > 20) {
    if (nameError) {
      nameError.innerHTML = 'Full name must be 20 characters or fewer.';
      nameError.classList.add('show');
    }
    return false;
  }

  if (!/^\d{5}$/.test(zip)) {
    if (zipError) {
      zipError.innerHTML = 'Zip code must be exactly 5 digits.';
      zipError.classList.add('show');
    }
    return false;
  }

  // All validation passed — show secret message
  if (secretDiv) {
    secretDiv.innerHTML = 'Secret code is: ' + fullName + '-' + zip;
    secretDiv.classList.add('show');
  }

  return false;
}