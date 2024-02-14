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
let board = ["", "", "", "", "", "", "", "", ""];
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

/* Funtion to switch to playing with another player mode */
const playPerson = function () {
  checkIfPlayerSelectedSymbol();
  addClickListenersToButtons();
  displayOutline();
  restartTheModal();
  quitGame();
  restart();
  nextRound();
  noCancel();
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
        board[index] = playerSymbol;
        console.log(board);
        console.log(index);

        /* Function call to check winner */
        checkWinner(playerSymbol, board);
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
  board = ["", "", "", "", "", "", "", "", ""];
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

const noCancel = function () {
  cancel.addEventListener("click", closeModal);
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

/* Function to display image on button when clicked */
function setButtonImage(buttonImage, symbol) {
  buttonImage.setAttribute("src", symbol === "X" ? ImageforX : ImageforO);
  buttonImage.setAttribute("alt", symbol === "X" ? "Player X" : "Player O");
}

/* Function to adjust content on the score board */
const initializeScoreBoard = function () {
  xScore = 0;
  oScore = 0;
  tiedScore = 0;
  scoreForO.textContent = oScore;
  scoreForX.textContent = xScore;
  tieScore.textContent = tiedScore;
};

/* Function to go to the next round when a winner emerges */
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
function checkWinner(playerSymbol, board) {
  // Check rows, columns, and diagonals for a winning combination
  for (let i = 0; i < board.length; i++) {
    if (
      (board[0] === playerSymbol &&
        board[1] === playerSymbol &&
        board[2] === playerSymbol) ||
      (board[3] === playerSymbol &&
        board[4] === playerSymbol &&
        board[5] === playerSymbol) ||
      (board[6] === playerSymbol &&
        board[7] === playerSymbol &&
        board[8] === playerSymbol) ||
      (board[0] === playerSymbol &&
        board[3] === playerSymbol &&
        board[6] === playerSymbol) ||
      (board[1] === playerSymbol &&
        board[4] === playerSymbol &&
        board[7] === playerSymbol) ||
      (board[2] === playerSymbol &&
        board[5] === playerSymbol &&
        board[8] === playerSymbol) ||
      (board[0] === playerSymbol &&
        board[4] === playerSymbol &&
        board[8] === playerSymbol) ||
      (board[2] === playerSymbol &&
        board[4] === playerSymbol &&
        board[6] === playerSymbol)
    ) {
      if (playerSymbol === "X") {
        xWon();
        console.log(playerSymbol);
        return;
      }
      if (playerSymbol === "O") {
        oWon();
        console.log(playerSymbol);
        return;
      }
    }

    /* Check for ties */
    if (!board.includes("")) {
      theyTied();
      console.log("Tied!");
      return; // It's a tie
    }
  }
}

/* Funtion to switch to playing pc mode */
// function playCpu() {
//   checkIfPlayerSelectedSymbol();
//   displayOutline();
//   restartTheModal();
//   quitGame();
//   restart();
//   nextRound();
//   noCancel();

//   gameButtons.forEach(function (button, index) {
//     button.addEventListener("click", function () {
//       let CurrentButtonImage = button.querySelector(".gameimg");
//       if (CurrentButtonImage.getAttribute("src") === "") {
//         CurrentButtonImage.setAttribute(
//           "src",
//           playerSymbol === "X" ? `${ImageforX}` : `${ImageforO}`
//         );
//         CurrentButtonImage.setAttribute(
//           "alt",
//           playerSymbol === "X" ? "Player X" : "Player O"
//         );

//         board[index] = playerSymbol;
//         console.log(board);

//         // Check for player's win
//         checkWinner(playerSymbol, board);
//         // switchPlayer();

//         // Execute CPU move
//         setTimeout(function () {
//           makeCpuMove(board, playerSymbol);
//         }, 500);
//       }
//     });
//   });
// }
// function emptyBoardSpaces(updatedBoard) {
//   let emptySpace = [];
//   for (let i = 0; i < updatedBoard.length; i++) {
//     if (updatedBoard[i] !== "X" && updatedBoard[i] !== "O") {
//       emptySpace.push(i);
//     }
//   }
//   console.log(emptySpace);
//   return emptySpace;
// }

// function makeCpuMove(updatedBoard, playerSymbol) {
//   let emptySpots = emptyBoardSpaces(updatedBoard);

//   if (checkWinner(playerSymbol, updatedBoard)) {
//     return { score: -10 };
//   } else if (checkWinner(cpuSymbol, updatedBoard)) {
//     return { score: 10 };
//   } else if (emptySpots.length === 0) {
//     return { score: 0 };
//   }

//   let moves = [];

//   for (let i = 0; i < emptySpots.length; i++) {
//     //create an object for each and store the index of that spot
//     let move = {};
//     move.index = updatedBoard[emptySpots[i]];

//     // set the empty spot to the current player
//     updatedBoard[emptySpots[i]] = cpuSymbol;

//     /*collect the score resulted from calling minimax
//       on the opponent of the current player*/
//     if (playerSymbol == cpuSymbol) {
//       let result = makeCpuMove(updatedBoard, playerSymbol);
//       move.score = result.score;
//     } else {
//       let result = makeCpuMove(updatedBoard, cpuSymbol);
//       move.score = result.score;
//     }

//     // reset the spot to empty
//     updatedBoard[emptySpots[i]] = move.index;

//     // push the object to the array
//     moves.push(move);
//   }

//   let bestMove;
//   if (playerSymbol === cpuSymbol) {
//     let bestScore = -10000;
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score > bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   } else {
//     // else loop over the moves and choose the move with the lowest score
//     let bestScore = 10000;
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score < bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   }

//   // return the chosen move (object) from the moves array
//   switchPlayer();
//   return moves[bestMove];
// }

// // console.log(emptyIndexies(board));

// /* Function call to play cpu */
// play_against_cpu.addEventListener("click", playCpu);
