//letters
let letters = "abcdefghijklmnopqrstuvwxyz";
//Get array from letters
let lettersArray = Array.from(letters);

//select letters container
let letterContainer = document.querySelector(".letters");

//Generate Letters
lettersArray.forEach((letter) => {
  //creat span
  let span = document.createElement("span");
  //add class to span
  span.classList.add("letterBox");
  //creat text node
  let theLetter = document.createTextNode(letter);
  //append Letter to span
  span.appendChild(theLetter);
  //append span to letters container
  letterContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

//get Category Array
let CategoryArray = Object.keys(words);
//Get Random Category
let randomCategory = Math.floor(Math.random() * CategoryArray.length);
// get name category name
let categoryName = CategoryArray[randomCategory];
// get category content
let categoryContent = words[categoryName];

// get Random index from this random category
let randomWordIndex = Math.floor(Math.random() * categoryContent.length);
//get word of this random index
let randomWord = categoryContent[randomWordIndex];

//append categoryName to game-info
document.querySelector(".game-info .category span").innerHTML = categoryName;

//select letters-guess div
let lettersGuessDiv = document.querySelector(".letters-guess");

//convert choosen word to array
let choosenWordArray = Array.from(randomWord);

choosenWordArray.forEach((letter) => {
  //creat span
  let span = document.createElement("span");
  //add class to span if letter is space
  if (letter === " ") {
    span.classList.add("space-letter");
  }
  //append span to lettersGuessDiv
  lettersGuessDiv.appendChild(span);
});

//Handel Clicked on letters
//select hangMan Div
hangmanDraw = document.querySelector(".hangman-draw");
//wrong chosen Letters
let wrongLetter = 0;
let rightLetter = 0;
document.addEventListener("click", (e) => {
  // cliked letter status
  let LetterStatus = false;
  //check if cliked is letters
  if (e.target.className === "letterBox") {
    e.target.classList.add("cliked");
    //get cliked Letter
    let chosenLetter = e.target.innerHTML.toLowerCase();
    //compare chosen cliked letter with our Random word
    let TheChosenWord = Array.from(randomWord.toLowerCase());
    TheChosenWord.forEach((wordLetter, wordIndex) => {
      if (chosenLetter == wordLetter) {
        //update Status
        LetterStatus = true;
        rightLetter++;
        //select number of span in letters-guess
        document.querySelector(
          `.letters-guess span:nth-child(${wordIndex + 1})`
        ).innerHTML = chosenLetter;
        /**********another solution***********/
        /* 
        //select guess Spans
        let guessSpans = document.querySelectorAll(".letters-guess span");
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = chosenLetter;
          }
        }); */
      }
    });
    if (LetterStatus !== true) {
      //increase Number Of Wrong Letters
      wrongLetter++;
      //add wrong-Class To hangmanDraw
      hangmanDraw.classList.add(`wrong-${wrongLetter}`);
      //play fail sound
      document.getElementById("fail").play();
      if (wrongLetter === 8) endGame();
    } else {
      //play success sound
      document.getElementById("success").play();
      if (rightLetter === randomWord.length) endGame();
    }
  }
});
// End Game Function
function endGame() {
  //add End Of Game class To body
  document.querySelector("body").classList.add("end-of-game");
  //add finished class To letterContainer
  letterContainer.classList.add("finished");
  // Create Popup Div
  let popup = document.querySelector(".popup");
  if (wrongLetter >= 0 && wrongLetter <= 2) {
    popup.innerHTML = `Congratz You Win With: Perfect Score (${wrongLetter}) Wrong letters 
    The Man Says Thank You The Word Is: <span>${randomWord}</span>`;
  } else if (wrongLetter >= 3 && wrongLetter <= 5) {
    popup.innerHTML = `Congratz You Win With: medium Score (${wrongLetter}) Wrong letters 
    The Man Says Thank You The Word Is: <span>${randomWord}</span>`;
  } else if (wrongLetter >= 6 && wrongLetter < 8) {
    popup.innerHTML = `Congratz You Win With: low Score (${wrongLetter}) Wrong letters 
    The Man Says Thank You The Word Is: <span>${randomWord}</span>`;
  } else {
    popup.innerHTML = `Game Over You Lose And The Man Has been Hanged,The Word Is: ${randomWord}`;
    popup.classList.add("game-over");
  }
}
