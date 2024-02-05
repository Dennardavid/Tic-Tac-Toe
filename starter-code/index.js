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
let cpuSymbol = "";
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
const ImageforX = "./starter-code/assets/icon-x.png";
const ImageforO = "./starter-code/assets/icon-o.png";

// Set the player to X
buttonX.addEventListener("click", function () {
  /* Set current player to X */
  playerSymbol = "X";
  cpuSymbol = "O";
  // Set the background so that two backgrounds can't be the same at once when selecting a player
  buttonX.style.backgroundColor = "#60b347";
  buttonO.style.backgroundColor = "#a8bfc9";
});

buttonO.addEventListener("click", function () {
  /* Set current player to O */
  playerSymbol = "O";
  cpuSymbol = "X";

  // Set the background so that two backgrounds can't be the same at once when selecting a player
  buttonO.style.backgroundColor = "#60b347";
  buttonX.style.backgroundColor = "transparent";
});

const checkIfPlayerSelectedSymbol = function () {
  if (playerSymbol === "") {
    console.log("no player selected");
  } else {
    play_game.style.display = "block";
    pickplayer.style.display = "none";
  }
};

/* Funtion to switch to playing pc mode */
const playCpu = function () {
  checkIfPlayerSelectedSymbol();
  displayOutline();
  restartTheModal();
  quitGame();
  restart();
  nextRound();
  cancel.addEventListener("click", closeModal);

  gameButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      let CurrentButtonImage = button.querySelector(".gameimg");
      if (CurrentButtonImage.getAttribute("src") === "") {
        CurrentButtonImage.setAttribute(
          "src",
          playerSymbol === "X" ? `${ImageforX}` : `${ImageforO}`
        );
        CurrentButtonImage.setAttribute(
          "alt",
          playerSymbol === "X" ? "Player X" : "Player O"
        );

        let row = Math.floor(index / 3);
        let col = index % 3;
        board[row][col] = playerSymbol;
        console.log(board);

        // Check for player's win
        checkWinner(playerSymbol);

        // Execute CPU move
        setTimeout(makeCpuMove, 1000);
      }
    });
  });
};

function makeCpuMove() {
  // Check for CPU win and make a move
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        // Simulate a move
        board[i][j] = cpuSymbol;

        // Check if CPU wins
        if (checkWinner(cpuSymbol)) {
          // Display CPU move on the board
          let cpuMoveIndex = i * 3 + j;
          let cpuMoveButton = gameButtons[cpuMoveIndex];
          let cpuMoveImage = cpuMoveButton.querySelector(".gameimg");
          cpuMoveImage.setAttribute(
            "src",
            cpuSymbol === "X" ? `${ImageforX}` : `${ImageforO}`
          );
          cpuMoveImage.setAttribute(
            "alt",
            cpuSymbol === "X" ? "Player X" : "Player O"
          );

          // Switch player after CPU move
          // switchPlayer();

          if (checkWinner(cpuSymbol)) {
            // Display CPU move on the board
            displayCpuMove(i, j);
            return;
          }
          // return;
        }

        // Undo the simulated move
        board[i][j] = "";
      }
    }
  }

  // If CPU can't win, try to block the player
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        // Simulate a move
        board[i][j] = playerSymbol;

        // Check if player wins
        if (checkWinner(playerSymbol)) {
          // Display CPU move on the board
          let cpuMoveIndex = i * 3 + j;
          let cpuMoveButton = gameButtons[cpuMoveIndex];
          let cpuMoveImage = cpuMoveButton.querySelector(".gameimg");
          cpuMoveImage.setAttribute(
            "src",
            cpuSymbol === "X" ? `${ImageforX}` : `${ImageforO}`
          );
          cpuMoveImage.setAttribute(
            "alt",
            cpuSymbol === "X" ? "Player X" : "Player O"
          );

          // Switch player after CPU move
          switchPlayer();
          if (checkWinner(playerSymbol)) {
            // Display CPU move on the board
            displayCpuMove(i, j);
            return;
          }
          return;
        }

        // Undo the simulated move
        board[i][j] = "";
      }
    }

    // If neither winning nor blocking, make a random move
    let availableMoves = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          availableMoves.push({ row: i, col: j });
        }
      }
    }

    if (availableMoves.length > 0) {
      // Choose a random move
      let randomMove =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      let cpuMoveIndex = randomMove.row * 3 + randomMove.col;
      let cpuMoveButton = gameButtons[cpuMoveIndex];
      let cpuMoveImage = cpuMoveButton.querySelector(".gameimg");

      // Display CPU move on the board
      cpuMoveImage.setAttribute(
        "src",
        cpuSymbol === "X" ? `${ImageforX}` : `${ImageforO}`
      );
      cpuMoveImage.setAttribute(
        "alt",
        cpuSymbol === "X" ? "Player X" : "Player O"
      );

      // Switch player after CPU move
      switchPlayer();
    }
  }
}

/* Function call to play cpu */
play_against_cpu.addEventListener("click", playCpu);

/* Funtion to switch to playing with another player mode */
const playPerson = function () {
  checkIfPlayerSelectedSymbol();
  addClickListenersToButtons();
  displayOutline();
  restartTheModal();
  quitGame();
  restart();
  nextRound();
  cancel.addEventListener("click", closeModal);
};

/* Function call to play person */
play_against_person.addEventListener("click", playPerson);

/* Function to listen to all the buttons on the keypad */
function addClickListenersToButtons() {
  gameButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      /* Codes To display the image on the button */
      let CurrentButtonImage = button.querySelector(".gameimg");
      if (CurrentButtonImage.getAttribute("src") === "") {
        CurrentButtonImage.setAttribute(
          "src",
          playerSymbol === "X" ? `${ImageforX}` : `${ImageforO}`
        );
        CurrentButtonImage.setAttribute(
          "alt",
          playerSymbol === "X" ? "Player X" : "Player O"
        );

        /* Codes To update the board */
        let row = Math.floor(index / 3);
        let col = index % 3;
        board[row][col] = playerSymbol;

        /* Function call to check winner */
        checkWinner(playerSymbol);
        switchPlayer();
      }
    });
  });
}

/* Function to display outline on hover of button */
function displayOutline() {
  gameButtons.forEach(function (button) {
    let CurrentButtonImage = button.querySelector(".gameimg");
    button.addEventListener("mouseenter", function () {
      if (CurrentButtonImage.getAttribute("src") !== "") {
        let symbol = CurrentButtonImage.getAttribute("src").includes("icon-x")
          ? "X"
          : "O";

        CurrentButtonImage.setAttribute(
          "src",
          symbol === "X"
            ? "./starter-code/assets/icon-x-outline.png"
            : "./starter-code/assets/icon-o-outline.png"
        );
      }
    });

    /* Function to return to original symbol on mouse leave */
    button.addEventListener("mouseleave", function () {
      if (CurrentButtonImage.getAttribute("src") !== "") {
        let symbol = CurrentButtonImage.getAttribute("src").includes("icon-x")
          ? "X"
          : "O";

        CurrentButtonImage.setAttribute(
          "src",
          symbol === "X" ? `${ImageforX}` : `${ImageforO}`
        );
      }
    });
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

const resetButtons = function () {
  gameButtons.forEach(function (button) {
    let CurrentButtonImage = button.querySelector(".gameimg");
    CurrentButtonImage.setAttribute("src", playerSymbol === "X" ? "" : "");
    CurrentButtonImage.setAttribute("alt", playerSymbol === "X" ? "" : "");
  });
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
};

/* Function to restart the game */
const restart = function () {
  yesRestart.addEventListener("click", function () {
    restartModal.style.visibility = "hidden";
    resetButtons();
    playerTurn.setAttribute("src", "./starter-code/assets/x-turn.png");
    initializeScoreBoard();
    playerSymbol = playerSymbol;
  });
};

/* Function to execute when the quit game button is clicked */
const quitGame = function () {
  quit.addEventListener("click", function () {
    winnerModal.style.visibility = "hidden";
    play_game.style.display = "none";
    pickplayer.style.display = "flex";
    buttonX.style.backgroundColor = "transparent";
    buttonO.style.backgroundColor = "#a8bfc9";
    playerSymbol = "";
    resetButtons();
    playerTurn.setAttribute("src", "./starter-code/assets/x-turn.png");
    initializeScoreBoard();
  });
};

function setButtonImage(buttonImage, symbol) {
  buttonImage.setAttribute("src", symbol === "X" ? ImageforX : ImageforO);
  buttonImage.setAttribute("alt", symbol === "X" ? "Player X" : "Player O");
}

const initializeScoreBoard = function () {
  xScore = 0;
  oScore = 0;
  tiedScore = 0;
  scoreForO.textContent = oScore;
  scoreForX.textContent = xScore;
  tieScore.textContent = tiedScore;
};

const nextRound = function (playerSymbol) {
  btnNextRound.addEventListener("click", function () {
    closeWinnerModal();
    resetButtons();
    gameButtons.forEach(function (button) {
      let CurrentButtonImage = button.querySelector(".gameimg");
      CurrentButtonImage.setAttribute("src", playerSymbol === "X" ? "" : "");
      CurrentButtonImage.setAttribute("alt", playerSymbol === "X" ? "" : "");
    });
    playerTurn.setAttribute("src", "./starter-code/assets/x-turn.png");
    playerSymbol = playerSymbol;
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
  modal_pic.setAttribute("src", `${ImageforX}`);
  modal_pic.style.display = "block";
  modal_pic.style.marginRight = "15px";
  winnerHeader.style.color = "#31c3bd";
  winnerModal.style.visibility = "visible";
  winMessage = playerSymbol === "X" ? "PLAYER ONE WON!" : "PLAYER TWO WON!";
  message_to_player.textContent = winMessage;
  winnerHeader.textContent = "TAKES THE ROUND";
  xScore = xScore + 1;
  scoreForX.textContent = xScore;
};

const oWon = function () {
  modal_pic.setAttribute("src", `${ImageforO}`);
  modal_pic.style.display = "block";
  modal_pic.style.marginRight = "10px";
  winnerModal.style.visibility = "visible";
  winnerHeader.style.color = "#f2b137";
  winMessage = playerSymbol === "X" ? "PLAYER ONE WON!" : "PLAYER TWO WON!";
  message_to_player.textContent = winMessage;
  winnerHeader.textContent = "TAKES THE ROUND";
  oScore = oScore + 1;
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
  return false;
}
