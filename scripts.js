document.getElementById('generate').addEventListener('click', function() {
    var length = document.getElementById('length').value;
    var lowercase = document.getElementById('lowercase').checked;
    var excludeDuplicates = document.getElementById('exclude-duplicates').checked;
    var uppercase = document.getElementById('uppercase').checked;
    var numbers = document.getElementById('numbers').checked;
    var symbols = document.getElementById('symbols').checked;
    var spaces = document.getElementById('spaces').checked;
    
    var password = generatePassword(length, lowercase, excludeDuplicates, uppercase, numbers, symbols, spaces);
    document.getElementById('password').value = password;
  });
  
  document.getElementById('length').addEventListener('input', function() {
    var length = document.getElementById('length').value;
    document.getElementById('lengthValue').innerText = length;
  });
  
  document.getElementById('copy').addEventListener('click', function() {
    var passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
  });
  
  function generatePassword(length, lowercase, excludeDuplicates, uppercase, numbers, symbols, spaces) {
    var charset = '';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (excludeDuplicates) charset = removeDuplicates(charset);
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-';
    if (spaces) charset += ' ';
  
    if (spaces && charset.length < length) {
      var spacesToAdd = length - charset.length;
      for (var i = 0; i < spacesToAdd; i++) {
        charset += ' ';
      }
    }
  
    var password = '';
    var spaceAdded = false;
    for (var i = 0; i < length; i++) {
      if (spaces && !spaceAdded && Math.random() < 0.5) {
        password += ' ';
        spaceAdded = true;
      } else {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
    }
    return password;
  }
  
  function removeDuplicates(str) {
    return str.split('').filter(function(item, pos, self) {
      return self.indexOf(item) === pos;
    }).join('');
  }
  