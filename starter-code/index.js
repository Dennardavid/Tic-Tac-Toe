/* Variables used */
const buttonX = document.querySelector("#image-x");
const buttonO = document.querySelector("#image-o");
const play_against_cpu = document.querySelector(".play_against_cpu");
const play_against_person = document.querySelector(".play_against_person");
const play_game = document.querySelector(".play_game");
const pickplayer = document.querySelector(".pickplayer");
const restart_game = document.querySelector(".restart_game");
const modal = document.querySelector(".modal");
const message_to_player = document.querySelector(".message_to_player");
const modal_button_1 = document.querySelector(".modal_button_1");
const modal_button_2 = document.querySelector(".modal_button_2");
const modal_pic = document.querySelector(".modal_pic");
const modal_header = document.querySelector(".modal_header");
const hidden = document.querySelector(".hidden");
const gameButtons = document.querySelectorAll(".keys");
let playerTurn = document.querySelector(".whosturnimg");
let playerSymbol = "";
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

// Set the player to X
buttonX.addEventListener("click", function () {
  /* Set current player to X */
  playerSymbol = "X";

  // Set the background so that two backgrounds can't be the same at once when selecting a player
  buttonX.style.backgroundColor = "#60b347";
  buttonO.style.backgroundColor = "#a8bfc9";

  // Making selection of player area hidden and actual game visible for cpu works only after selecting your player mark
  playCpu();
  playPerson();

  /* Function call to restart game */
  restartModal();
  restart();

  modal.addEventListener("click", closeModal);

  /* Fuction call on cancel button */
  modal_button_1.addEventListener("click", closeModal);

  /* Function call to displayer player image on the keys */
  addClickListenersToButtons();
});

buttonO.addEventListener("click", function () {
  playerSymbol = "X";

  // Set the background so that two backgrounds can't be the same at once when selecting a player
  buttonO.style.backgroundColor = "#60b347";
  buttonX.style.backgroundColor = "transparent";

  // Making selection of player area hidden and actual game visible for cpu works only after selecting your player mark
  playCpu();
  playPerson();

  /* Function call to restart game */
  restartModal();
  restart();

  /* Function calls to close the modal */
  modal.addEventListener("click", closeModal);

  /* Fuction call on cancel button */
  modal_button_1.addEventListener("click", closeModal);

  /* Function call to displayer player image on the keys */
  addClickListenersToButtons();
});

/* Funtion to switch to playing pc mode */
const playCpu = function () {
  play_against_cpu.addEventListener("click", function () {
    if (playerSymbol === "") {
      console.log("no player selected");
    } else {
      play_game.style.display = "block";
      pickplayer.style.display = "none";
    }
    /* let cpuMove = Math.trunc(Math.random() * 9);
    console.log(cpuMove); */
  });
};

/* Funtion to switch to playing with another player mode */
const playPerson = function () {
  play_against_person.addEventListener("click", function () {
    if (playerSymbol === "") {
      console.log("no player selected");
    } else {
      play_game.style.display = "block";
      pickplayer.style.display = "none";
    }
  });
};

/* Function to listen to all the buttons on the keypad */
function addClickListenersToButtons() {
  gameButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      let buttonImage = button.querySelector(".gameimg");
      if (buttonImage.getAttribute("src") === "") {
        buttonImage.setAttribute(
          "src",
          playerSymbol === "X" ? "./assets/icon-x.png" : "./assets/icon-o.png"
        );
        buttonImage.setAttribute(
          "alt",
          playerSymbol === "X" ? "Player X" : "Player O"
        );
        switchPlayer();
      }
    });
  });
}

/* Function to bring up restart modal */
const restartModal = function () {
  restart_game.addEventListener("click", function () {
    modal.style.visibility = "visible";
    message_to_player.style.display = "none";
    modal_button_1.textContent = "NO, CANCEL";
    modal_button_1.style.width = "139px";
    modal_button_2.textContent = "YES, RESTART";
    modal_button_2.style.width = "151px";
    modal_pic.style.display = "none";
    modal_header.style.color = "#A8BFC9";
    modal_header.textContent = "RESTART GAME?";
  });
};

/* Function to restart the game */
const restart = function () {
  modal_button_2.addEventListener("click", function () {
    modal.style.visibility = "hidden";
    play_game.style.display = "none";
    pickplayer.style.display = "block";
    buttonX.style.backgroundColor = "transparent";
    buttonO.style.backgroundColor = "#a8bfc9";
    playerSymbol = "";
    gameButtons.forEach(function (button) {
      let buttonImage = button.querySelector(".gameimg");
      buttonImage.setAttribute("src", playerSymbol === "X" ? "" : "");
      buttonImage.setAttribute("alt", playerSymbol === "X" ? "" : "");
    });
  });
};

/* Function to close modal with escape key */
const closeModal = function () {
  modal.style.visibility = "hidden";
};

/* Function to switch between players in play with another player */
const switchPlayer = function () {
  if (playerSymbol === "X") {
    playerSymbol = "O";
    playerTurn.setAttribute("src", "./assets/o-turn.png");
  } else {
    playerSymbol = "X";
    playerTurn.setAttribute("src", "./assets/x-turn.png");
  }
};
