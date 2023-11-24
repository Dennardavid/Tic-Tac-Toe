/* Variables used */
const buttonX = document.querySelector("#image-x");
const buttonO = document.querySelector("#image-o");
const play_against_cpu = document.querySelector(".play_against_cpu");
const play_against_person = document.querySelector(".play_against_person");
const pickplayer = document.querySelector(".pickplayer");
const play_game = document.querySelector(".play_game");
const restart_game = document.querySelector(".restart_game");
const message_to_player = document.querySelector(".message_to_player");
const cancel = document.querySelector(".cancel");
const yesRestart = document.querySelector(".yesRestart");
const modal_pic = document.querySelector(".modal_pic");
const quit = document.querySelector(".quit");
const winnerHeader = document.querySelector(".winnerHeader");
const modal_header = document.querySelector(".modal_header");
const hidden = document.querySelector(".hidden");
const gameButtons = document.querySelectorAll(".keys");
let playerTurn = document.querySelector(".whosturnimg");
const winnerModal = document.querySelector(".winnerModal");
const restartModal = document.querySelector(".restartModal");
const btnNextRound = document.querySelector(".nextRound");
let playerSymbol = "";
const scoreForX = document.querySelector(".scoreForX");
const scoreForO = document.querySelector(".scoreForO");
const tieScore = document.querySelector(".tie-score");
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let xScore = 0;
let oScore = 0;
let tiedScore = 0;
let winMessage = "";

// Set the player to X
buttonX.addEventListener("click", function () {
  /* Set current player to X */
  playerSymbol = "X";
  console.log(playerSymbol);
  // Set the background so that two backgrounds can't be the same at once when selecting a player
  buttonX.style.backgroundColor = "#60b347";
  buttonO.style.backgroundColor = "#a8bfc9";

  // Making selection of player area hidden and actual game visible for cpu works only after selecting your player mark
  playCpu();
  playPerson();

  /* Function call to display player image on the keys */
  addClickListenersToButtons();

  /* Function call to restart game */
  restartTheModal();
  restart();
  quitGame();
  restartModal.addEventListener("click", closeModal);
  // winnerModal.addEventListener("click", closeWinnerModal);

  /* Fuction call on cancel button */
  cancel.addEventListener("click", closeModal);
  nextRound();
  // quitGame();
});

buttonO.addEventListener("click", function () {
  playerSymbol = "X";
  console.log(playerSymbol);
  // Set the background so that two backgrounds can't be the same at once when selecting a player
  buttonO.style.backgroundColor = "#60b347";
  buttonX.style.backgroundColor = "transparent";

  // Making selection of player area hidden and actual game visible for cpu works only after selecting your player mark
  playCpu();
  playPerson();

  /* Function call to displayer player image on the keys */
  addClickListenersToButtons();

  /* Function call to restart game */
  restartTheModal();
  restart();
  quitGame();

  /* Function calls to close the modal */
  restartModal.addEventListener("click", closeModal);
  // winnerModal.addEventListener("click", closeWinnerModal);
  /* Fuction call on cancel button */
  cancel.addEventListener("click", closeModal);
  nextRound();
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
      /* Codes To display the image on the button */
      let buttonImage = button.querySelector(".gameimg");
      if (buttonImage.getAttribute("src") === "") {
        buttonImage.setAttribute(
          "src",
          playerSymbol === "X"
            ? "./starter-code/assets/icon-x.png"
            : "./starter-code/assets/icon-o.png"
        );
        buttonImage.setAttribute(
          "alt",
          playerSymbol === "X" ? "Player X" : "Player O"
        );

        /* Codes To update the board */
        let row = Math.floor(index / 3);
        let col = index % 3;
        board[row][col] = playerSymbol;

        // console.log(playerSymbol);
        /* Function call to check winner */
        checkWinner(playerSymbol);

        switchPlayer();
      }
    });
    // button.addEventListener(hov);
  });
}

/* Function to switch between players in play with another player */
const switchPlayer = function () {
  if (playerSymbol === "X") {
    playerSymbol = "O";
    playerTurn.setAttribute("src", "./starter-code/assets/o-turn.png");
  } else {
    playerSymbol = "X";
    playerTurn.setAttribute("src", "./starter-code/assets/x-turn.png");
  }
};

/* Function to bring up restart modal */
const restartTheModal = function () {
  restart_game.addEventListener("click", function () {
    restartModal.style.visibility = "visible";
  });
};

/* Function to restart the game */
const restart = function () {
  yesRestart.addEventListener("click", function () {
    restartModal.style.visibility = "hidden";
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
    playerTurn.setAttribute("src", "./starter-code/assets/x-turn.png");
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    updateScoreBoard();
    // console.log(playerSymbol);
  });
};

/* Function to execute when the quit game button is clicked */
const quitGame = function () {
  quit.addEventListener("click", function () {
    winnerModal.style.visibility = "hidden";
    pickplayer.style.display = "block";
    play_game.style.display = "none";
    playerSymbol = "";
    gameButtons.forEach(function (button) {
      let buttonImage = button.querySelector(".gameimg");
      buttonImage.setAttribute("src", playerSymbol === "X" ? "" : "");
      buttonImage.setAttribute("alt", playerSymbol === "X" ? "" : "");
    });
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    playerTurn.setAttribute("src", "./starter-code/assets/x-turn.png");
    buttonX.style.backgroundColor = "transparent";
    buttonO.style.backgroundColor = "#a8bfc9";
    updateScoreBoard();
    // console.log(board);
  });
};

const updateScoreBoard = function () {
  xScore = 0;
  oScore = 0;
  tiedScore = 0;
  scoreForO.textContent = oScore;
  scoreForX.textContent = xScore;
  tieScore.textContent = tiedScore;
};

const nextRound = function () {
  btnNextRound.addEventListener("click", function () {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    closeWinnerModal();
    gameButtons.forEach(function (button) {
      let buttonImage = button.querySelector(".gameimg");
      buttonImage.setAttribute("src", playerSymbol === "X" ? "" : "");
      buttonImage.setAttribute("alt", playerSymbol === "X" ? "" : "");
    });
    playerTurn.setAttribute("src", "./starter-code/assets/x-turn.png");
    playerSymbol = "X";
    // winnerHeader.textContent = "";
    // console.log(board);
  });
};

/* Functions to close modal by clicking outside */
const closeModal = function () {
  restartModal.style.visibility = "hidden";
};

const closeWinnerModal = function () {
  winnerModal.style.visibility = "hidden";
};

const xWon = function () {
  modal_pic.setAttribute("src", "./starter-code/assets/icon-x.png");
  modal_pic.style.display = "block";
  modal_pic.style.marginRight = "15px";
  winnerHeader.style.color = "#31c3bd";
  winnerModal.style.visibility = "visible";
  winMessage = playerSymbol === "X" ? "YOU WON!" : "OH NO, YOU LOST…";
  message_to_player.textContent = winMessage;
  winnerHeader.textContent = "TAKES THE ROUND";
  xScore = xScore + 1;
  scoreForX.textContent = xScore;
  console.log(xScore);
};

const oWon = function () {
  modal_pic.setAttribute("src", "./starter-code/assets/icon-o.png");
  modal_pic.style.display = "block";
  modal_pic.style.marginRight = "10px";
  winnerModal.style.visibility = "visible";
  winnerHeader.style.color = "#f2b137";
  winMessage = playerSymbol === "X" ? "YOU WON!" : "OH NO, YOU LOST…";
  message_to_player.textContent = winMessage;
  winnerHeader.textContent = "TAKES THE ROUND";
  oScore = oScore + 1;
  console.log(oScore);
  scoreForO.textContent = oScore;
};

const theyTied = function () {
  winMessage = "";
  message_to_player.textContent = winMessage;
  winnerHeader.textContent = "ROUND TIED";
  winnerHeader.style.color = "#a8bfc9";
  winnerHeader.style.marginLeft = "-3px";
  winnerModal.style.visibility = "visible";
  modal_pic.style.display = "none";
  tiedScore++;
  console.log(tiedScore);
  tieScore.textContent = tiedScore;
};

/* Function to checker the winner of the game */
function checkWinner(playerSymbol) {
  let youTied = true;
  // Check rows, columns, and diagonals for a winning combination
  for (let i = 0; i < 3; i++) {
    // Check rows
    if (
      board[i][0] === playerSymbol &&
      board[i][1] === playerSymbol &&
      board[i][2] === playerSymbol
    ) {
      if (playerSymbol === "X") {
        xWon();
        console.log(playerSymbol);
        break;
      }
      if (playerSymbol === "O") {
        oWon();
        console.log(playerSymbol);
        break;
      }
    }
    if (
      // Check columns
      board[0][i] === playerSymbol &&
      board[1][i] === playerSymbol &&
      board[2][i] === playerSymbol
    ) {
      if (playerSymbol === "X") {
        xWon();
        console.log(playerSymbol);
        break;
      }
      if (playerSymbol === "O") {
        oWon();
        console.log(playerSymbol);
        break;
      }
    }
    if (
      // Check diagonals
      (board[0][0] === playerSymbol &&
        board[1][1] === playerSymbol &&
        board[2][2] === playerSymbol) ||
      (board[0][2] === playerSymbol &&
        board[1][1] === playerSymbol &&
        board[2][0] === playerSymbol)
    ) {
      if (playerSymbol === "X") {
        xWon();
        console.log(playerSymbol);
        break;
      }
      if (playerSymbol === "O") {
        oWon();
        console.log(playerSymbol);
        break;
      }
    }

    /*Loop through rows and columns to check for ties  */
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === "") {
          youTied = false; // If any cell is empty, it's not a tie
          break;
        }
      }
    }

    if (youTied) {
      // It's a tie
      theyTied();
      break;
    }
  }
  console.log(board);
  return false;
}
