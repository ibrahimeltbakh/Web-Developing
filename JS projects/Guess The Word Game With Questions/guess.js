//Game Name Setting
let gamename = "Guess The Word";
document.title = gamename;
document.querySelector("h1").innerHTML = gamename;
document.querySelector(
  "footer"
).innerHTML = `${gamename} Game Created By Ibrahim Samir Eltbakh`;

//Game Varables
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
//manage Questions
const questions = [
  "What is the output type of typeof operator when used on a string?",
  "Which JavaScript method is used to join two or more arrays?",
  "What JavaScript keyword is used to define a block of code to be executed, if a specified condition is true?",
  "What string method is used to find the first occurrence of a specified text in a string?",
  "What JavaScript object represents an array-like structure of key-value pairs?",
  "What JavaScript method is used to add one or more elements to the end of an array?",
  "Which JavaScript method is used to remove whitespace from both ends of a string?",
  "What JavaScript method is used to combine all elements of an array into a single string?",
];

//manage Words
let wordToGuess = "";
const words = [
  "String",
  "Concat",
  "Switch",
  "Search",
  "object",
  "push()",
  "trim()",
  "join()",
];
randomIndex = Math.floor(Math.random() * words.length);
wordToGuess = words[randomIndex].toLowerCase();
const question = document.querySelector(".question");
question.innerHTML = questions[randomIndex];

//Manage Check Answer Button
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handelGuessWord);

//Manage Hints Button
document.querySelector(".hint span").innerHTML = numberOfHints;
const hintsButton = document.querySelector(".hint");
hintsButton.addEventListener("click", getHint);

//Manage BackSpace Key
document.addEventListener("keydown", handelBackSpace);

//Manage BackSpace Key
document.addEventListener("keydown", handelEnter);

function generateInput() {
  //Creat Main Div
  let inputContainer = document.querySelector(".guess-area .inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-input");
    //creat Input
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxLength", "1");
      tryDiv.append(input);
    }
    inputContainer.append(tryDiv);
  }
  //focus in first element
  inputContainer.children[0].children[1].focus();
  //Disable all Inputs except first one
  const inputsInDisableDiv = document.querySelectorAll(".disabled-input input");
  inputsInDisableDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      //conver Input To Uppercase
      this.value = this.value.toUpperCase();
      //go to next index
      const nextIndex = inputs[index + 1];
      if (nextIndex) nextIndex.focus();
    });
    input.addEventListener("keydown", function (event) {
      let curruntInputIndex = Array.from(inputs).indexOf(event.target); // event.target === this
      //if right key pressed
      if (event.key === "ArrowRight") {
        const nextIndex = curruntInputIndex + 1;
        if (nextIndex < inputs.length) inputs[nextIndex].focus();
      } else if (event.key === "ArrowLeft") {
        const preIndex = curruntInputIndex - 1;
        if (preIndex >= 0) inputs[preIndex].focus();
      }
    });
  });
}

function handelGuessWord() {
  let successfulGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    //game Logic
    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place"); //Letter Is Correct And In Place
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place"); //Letter Is Correct But Not In Place
      successfulGuess = false;
    } else {
      inputField.classList.add("no"); //Letter Is Correct But Not In Place
      successfulGuess = false;
    }
  }

  //check if the user win or lose
  let message = document.querySelector(".guess-area .message");
  if (successfulGuess) {
    if (numberOfHints === 2) {
      message.innerHTML = `You Win The Word Is <span> ${wordToGuess} </span> 
      <p>Congratz You Did Not Use Hints</p>`;
    } else {
      message.innerHTML = `You Win The Word Is <span> ${wordToGuess} </span>`;
    }
    //disable all tries Divs
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));
    //disable control buttons
    guessButton.disabled = true;
    //disable control buttons
    hintsButton.disabled = true;
  } else {
    if (currentTry === numberOfTries) {
      message.innerHTML = `You Lose The Word Is <span> ${wordToGuess} </span>`;
      //disable this try
      document
        .querySelector(`.try-${currentTry}`)
        .classList.add("disabled-input");
      //disable control buttons
      guessButton.disabled = true;
      //disable control buttons
      hintsButton.disabled = true;
    } else {
      //disable this try
      document
        .querySelector(`.try-${currentTry}`)
        .classList.add("disabled-input");
      //disable all inputs in this try
      document
        .querySelectorAll(`.try-${currentTry} input`)
        .forEach((input) => (input.disabled = true));

      //increase index
      currentTry++;
      //enable next try
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-input");
      //enable all inputs in next try
      document
        .querySelectorAll(`.try-${currentTry} input`)
        .forEach((input) => (input.disabled = false));
      //try again Message
      message.innerHTML = `Try Again`;

      //focus in first element in this try
      document.querySelector(`.try-${currentTry}`).children[1].focus();
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    hintsButton.disabled = true;
  }
  //Get All Enabled Inputs
  let enabledInputs = document.querySelectorAll("input:not([disabled])");
  //Get All Empty Inputs in this Enabled Inputs
  let emptyInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );
  if (emptyInputs.length > 0);
  //Get random Number from this empty Inputs array
  const randomIndex = Math.floor(Math.random() * emptyInputs.length);
  //Get element of this random index
  const elementofRandomIndex = emptyInputs[randomIndex];
  //get index of this element in enabled inputs
  const indexTofill = Array.from(enabledInputs).indexOf(elementofRandomIndex);
  //get letter of this index from word and fill the element
  elementofRandomIndex.value = wordToGuess[indexTofill].toUpperCase();
}

function handelBackSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      let prevInput = inputs[currentIndex - 1];
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

function handelEnter(event) {
  if (event.key === "Enter") handelGuessWord();
}

window.onload = function () {
  generateInput();
};
