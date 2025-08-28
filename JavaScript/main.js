let numOfTries = 6;
let numOfLetters = 6;
let currentTry = 1;
let wordtoGuess = "";
let HintsNum = 2;
let messsage = document.querySelector(".message");
const none = true;
let messageWrong = document.querySelector(".worng");

const words = ["Wassim", "Ilyass", "Master", "Cheked", "School"];
wordtoGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

function generateInpute() {
  const inputContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numOfTries; i++) {
    const trydiv = document.createElement("div");
    trydiv.classList.add(`try-${i}`);
    trydiv.innerHTML = `<span>Try ${i}</span>`;
    inputContainer.appendChild(trydiv);

    if (i !== 1) trydiv.classList.add("hid-elm");
    if (i >= 3) trydiv.classList.add("hid-elm");
    for (let j = 1; j <= numOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}--letter-${j}`;
      input.setAttribute("maxlength", "1");
      trydiv.appendChild(input);
    }
    inputContainer.appendChild(trydiv);
  }

  inputContainer.children[0].children[1].focus();

  const inputsDisabled = document.querySelectorAll(".hid-elm input");
  inputsDisabled.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();

      if (input.value == " ") {
        input.value = "";
      }

      const nextInput = inputs[index + 1];
      if (nextInput && !input.value == "" && none == true) nextInput.focus();
      if (input.value == "") {
        messageWrong.classList.add("wrong-show");
        input.classList.add("border-red");

        setTimeout(function () {
          messageWrong.classList.remove("wrong-show");
        }, 1500);

        setInterval(function () {
          input.classList.remove("border-red");
        }, 800);
      }
    });
  });
}

const guessButton = document.querySelector(".check");
let gameLogic = function () {
  let successGuess = true;

  for (let i = 1; i <= numOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}--letter-${i}`
    );
    let letter = inputField.value.toLowerCase();
    const actualLetter = wordtoGuess[i - 1];
    // Game Logic
    if (letter == actualLetter) {
      inputField.classList.add("value-green");
    } else if (wordtoGuess.includes(letter) && letter !== "") {
      inputField.classList.add("value-orange");
      successGuess = false;
    } else {
      inputField.classList.add("value-red");
      successGuess = false;
    }
  }
  if (successGuess == true) {
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((trydiv) => trydiv.classList.add("hid-elm"));
    messsage.innerHTML = "Great Job !";
    messsage.classList.add("bg-green");
    guessButton.disabled = true;
    hint.disabled = true;
  } else {
    document.querySelector(`.try-${currentTry}`).classList.add("hid-elm");
    const currenTryInputes = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currenTryInputes.forEach((input) => (input.disabled = true));

    currentTry++;

    const NextinputDisabled = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    NextinputDisabled.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document.querySelector(`.try-${currentTry}`).classList.remove("hid-elm");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      hint.disabled = true;
      messsage.innerHTML = `Game Over ! The word was ${wordtoGuess}`;
      messsage.classList.add("bg-red");
    }
  }
};

document.addEventListener("keydown", (event) => {
  if (event.key.startsWith("Enter")) {
    gameLogic();
  }
});

guessButton.addEventListener("click", handleGuesses);

function handleGuesses() {
  gameLogic();
}

// ==== Start Hint Button ====
let hint = document.querySelector(".Hint");

hint.innerHTML = `${HintsNum} Hints `;
hint.addEventListener("click", function () {
  HintsNum--;
  hint.innerHTML = `${HintsNum} Hints `;

  if (HintsNum === 0) {
    hint.disabled = true;
  }

  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill !== -1) {
      randomInput.value = wordtoGuess[indexToFill].toUpperCase();
      randomInput.classList.add("value-green");
    }
  }
});

// ==== End Hint Button ====

window.onload = function () {
  generateInpute();
};

function handleBcackSpace(event) {
  let none = false;
  const inputs = document.querySelectorAll("input:not([disabled])");
  const currntIndex = Array.from(inputs).indexOf(document.activeElement);
  if (event.key === "Backspace") {
    messageWrong.style.display = "none";
    setTimeout(function () {
      messageWrong.style.display = "flex";
    }, 1500);

    if (currntIndex > 0) {
      const currentInput = inputs[currntIndex];
      const prevInput = inputs[currntIndex - 1];
      currentInput.value = "";
      prevInput.focus();

      // let inputEnabled = inputs[currntIndex - 1];
    }
  }
}

document.addEventListener("keydown", handleBcackSpace);
