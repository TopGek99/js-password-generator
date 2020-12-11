// Assignment Code
var generateBtn = document.querySelector("#generate");

function generatePassword() {
  var pLength = prompt("Choose your password length (8 to 128 characters): ");
  while (!(pLength >= 8 && pLength <= 128)) {
    pLength = prompt("Error: invalid length. Please try again");
  }
  var charTypes = [
    { type: "lowercase letter", req: true },
    { type: "uppercase letter", req: true },
    { type: "numeric", req: true },
    { type: "special character", req: true }
  ];
  for (var i = 0; i < charTypes.length; i++) {
    charTypes[i].req = confirm("Must it have at least one "+charTypes[i].type+"?");
  }
  while (!charTypes[0].req && !charTypes[1].req && !charTypes[2].req && !charTypes[3].req) {
    alert("Error: at least one chracter type must be selected. Please try again");
    for (var i = 0; i < charTypes.length; i++) {
      charTypes[i].req = confirm("Must it have at least one "+charTypes[i].type+"?");
    }
  }
  var password = "";
  var reqLength = 0;
  var lcUsed = false;
  var ucUsed = false;
  var nUsed = false;
  var scUsed = false;
  while (reqLength != pLength) {
    var charVal = Math.floor(Math.random()*95)+32;
    var useChar = true;
    if ((!charTypes[0].req && charVal >= 97 && charVal <= 122) || (!charTypes[1].req && charVal >= 65 && charVal <= 90) || (!charTypes[2].req && charVal >= 48 && charVal <= 57) || (!charTypes[3].req && ((charVal >= 32 && charVal <= 47) || (charVal >= 58 && charVal <= 64) || (charVal >= 91 && charVal <= 96) || (charVal >= 123 && charVal <= 126)))) {
      useChar = false;
    }
    if (useChar) {
      password = password + "&#"+charVal+";";
      reqLength++;
      if (charVal >= 97 && charVal <= 122) {
        lcUsed = true;
      } else if (charVal >= 65 && charVal <= 90) {
        ucUsed = true;
      } else if (charVal >= 48 && charVal <= 57) {
        nUsed = true;
      } else if (((charVal >= 32 && charVal <= 47) || (charVal >= 58 && charVal <= 64) || (charVal >= 91 && charVal <= 96) || (charVal >= 123 && charVal <= 126))) {
        scUsed = true;
      }
       if ((reqLength == pLength) && !(charTypes[0].req == lcUsed && charTypes[1].req == ucUsed && charTypes[2].req == nUsed && charTypes[3].req == scUsed)) {
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