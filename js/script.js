// Assignment Code
var generateBtn = document.querySelector("#generate");

function generatePassword() {
  var pLength = prompt("Choose your password length (8 to 128 characters): ");
  while (!(pLength >= 8 && pLength <= 128)) {
    pLength = prompt("Error: invalid length. Please enter a number between 8 and 128");
  }
  // Creating an array of objects used to refer to each character type for the password, whether or not they are required and whether or not they have been used.
  var charTypes = [
    { type: "lowercase letter", req: true, used: false },
    { type: "uppercase letter", req: true, used: false },
    { type: "numeric", req: true, used: false },
    { type: "special character", req: true, used: false }
  ];
  console.log(charTypes.req);
  for (var i = 0; i < charTypes.length; i++) {
    charTypes[i].req = confirm("Must it have at least one "+charTypes[i].type+"?");
  }
  while (!charTypes[0].req && !charTypes[1].req && !charTypes[2].req && !charTypes[3].req) {
    alert("Error: at least one chracter type must be selected. Please try again");
    for (var i = 0; i < charTypes.length; i++) {
      charTypes[i].req = confirm("Must it have at least one "+charTypes[i].type+"?");
    }
  }
  // initialising the password string
  var password = "";
  var reqLength = 0;
  // while loop runs until the password has been filled with the correct characters
  while (reqLength != pLength) {
    // random char val determines the character to be added to password
    var charVal = Math.floor(Math.random()*95)+32;
    var useChar = true;
    // if statement determines if random char val is used if the char type is required for the password
    if ((!charTypes[0].req && charVal >= 97 && charVal <= 122)
    || (!charTypes[1].req && charVal >= 65 && charVal <= 90)
    || (!charTypes[2].req && charVal >= 48 && charVal <= 57)
    || (!charTypes[3].req && ((charVal >= 32 && charVal <= 47)
      || (charVal >= 58 && charVal <= 64)
      || (charVal >= 91 && charVal <= 96)
      || (charVal >= 123 && charVal <= 126)))) {
      useChar = false;
    }
    // only add char to password if we are using it
    if (useChar) {
      // creating the char with HTMLs ASCII code and incrementing out passwords length (reqLength records how long the actual password we are generating currently
      // is, whereas password.length would be too large very quick)
      password = password + "&#"+charVal+";";
      reqLength++;
      // if/else if statements change our boolean variables that represent whether or not certain char types have been used
      if (charVal >= 97 && charVal <= 122) {
        charTypes[0].used = true;
      } else if (charVal >= 65 && charVal <= 90) {
        charTypes[1].used = true;
      } else if (charVal >= 48 && charVal <= 57) {
        charTypes[2].used = true;
      } else if (((charVal >= 32 && charVal <= 47) || (charVal >= 58 && charVal <= 64) || (charVal >= 91 && charVal <= 96) || (charVal >= 123 && charVal <= 126))) {
        charTypes[3].used = true;
      }
      // only adds last character to password if every required char type has been satisfied, if not removes it from string and continues loop
       if ((reqLength == pLength) && !(charTypes[0].req == charTypes[0].used && charTypes[1].req == charTypes[1].used && charTypes[2].req == charTypes[2].used && charTypes[3].req == charTypes[3].used)) {
        var decrease_amount = 3+charVal.toString().length;
        password = password.substring(0,password.length-decrease_amount);
        reqLength--;
       }
    }
  }
  return password;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.innerHTML = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
