const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");
let playAgain = document.querySelector(".play-again");
let img = document.querySelector(".image img");
const eventKey = window.addEventListener("keydown", (event) => {
  const none = event.key;
  console.log(none);
});

lettersArray.forEach((letters) => {
  let span = document.createElement("span");
  let theletter = document.createTextNode(letters);
  span.appendChild(theletter);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

playAgain.addEventListener("click", () => {
  location.reload();
});

// => The second phase
const words = {
  programming: ["JavaScript", "Python", "Java", "Ruby"],
  movies: [
    "Inception",
    "Interstellar",
    "The Matrix",
    "How to Train Your Dragon",
  ],
  people: ["Albert Einstein", "Ibn Sina", "Nikola Tesla", "Isaac Newton"],
  countries: ["Palestine", "Canada", "USA", "Morocco", "Egypt"],
};

let allKeys = Object.keys(words);
let randomPropertyNum = Math.floor(Math.random() * allKeys.length);

let randomPropertyName = allKeys[randomPropertyNum];
console.log(randomPropertyName + " => randomPropertyName");

let randomPropertyValue = words[randomPropertyName];
console.log(randomPropertyValue + " => randomPropertyValue");

let randomWord =
  randomPropertyValue[Math.floor(Math.random() * randomPropertyValue.length)];
console.log(randomWord + " => randomWord");
if (randomWord == "Ruby") {
  img.src = "Image/ruby-the-king-of-precious-stone-709034_720x.webp";
} else if (randomWord == "Palestine") {
  img.src = "Image/free-palestine.jpg";
} else if (randomWord == "Egypt") {
  img.src = "Image/egypt.jpg";
} else if (randomWord == "Morocco") {
  img.src = "Image/morocco.jpg";
} else if (randomWord == "Nikola Tesla") {
  img.src = "Image/tesla.webp";
} else if (randomWord == "How to Train Your Dragon") {
  img.src = "Image/dragon.jpg";
} else if (randomWord == "Ibn Sina") {
  img.src = "Image/Sina.jpg";
} else if (randomWord == "Isaac Newton") {
  img.src = "Image/newton.webp";
} else if (randomWord == "USA") {
  img.src = "Image/usa.jpg";
} else if (randomWord == "Canada") {
  img.src = "Image/canada.webp";
} else if (randomWord == "Albert Einstein") {
  img.src = "Image/einstein-child.jpg";
} else if (randomWord == "Interstellar") {
  img.src = "Image/water.jpg";
} else if (randomWord == "JavaScript") {
  img.src = "Image/JavaScript_code.png";
} else if (randomWord == "Python") {
  img.src = "Image/python.webp";
} else if (randomWord == "Java") {
  img.src = "Image/java.webp";
} else if (randomWord == "Inception") {
  img.src = "Image/inception.webp";
} else if (randomWord == "The Matrix") {
  img.src = "Image/matrix.jpg";
}

document.querySelector(".game-info .category span").innerHTML =
  randomPropertyName;

// => The third phase

const letterGuessed = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomWord);
console.log(lettersAndSpace);
lettersAndSpace.forEach((letter) => {
  let emptySapn = document.createElement("span");
  if (letter === " ") {
    emptySapn.className = "with-space";
    emptySapn.innerHTML = " ";
  }

  letterGuessed.appendChild(emptySapn);
});

// => The 4 phase

let guessSpans = document.querySelectorAll(".letters-guess span");
let wrnongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML;
    console.log(theClickedLetter + " clicked");

    lettersAndSpace.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter === wordLetter.toLowerCase()) {
        theStatus = true;
        console.log(
          `Found ${theClickedLetter.toUpperCase()} At Index  ${wordIndex}`
        );

        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    if (theStatus !== true) {
      function endGame() {
        let div = document.createElement("div");
        let divText = document.createTextNode(
          `Game Over, The Word is ${randomWord}`
        );
        div.appendChild(divText);
        div.className = "popup";
        document.body.appendChild(div);
      }

      wrnongAttempts++;
      theDraw.classList.add(`wrong-${wrnongAttempts}`);
      document.getElementById("fail").play();

      if (wrnongAttempts === 4) {
        let letterBoxes = document.querySelectorAll(".letter-box");
        endGame();
        letterBoxes.forEach((btn) => {
          btn.classList.add("clicked");
          document.getElementById("fail-audio").play();
          playAgain.style.display = "block";
        });
      }
    } else if (theStatus === true) {
      document.getElementById("success").play();
      if (Array.from(guessSpans).every((span) => span.innerHTML !== "")) {
        let div = document.createElement("div");
        let divText = document.createTextNode("Congratulations ! You Won !");
        div.appendChild(divText);
        div.className = "popup";
        document.body.appendChild(div);
        document.getElementById("success-audio").play();
        playAgain.style.display = "block";
        let letterBoxes = document.querySelectorAll(".letter-box");
        letterBoxes.forEach((btn) => {
          btn.classList.add("clicked");
        });
      }
    }

    console.log(theStatus + " => theStatus");
  }
});
