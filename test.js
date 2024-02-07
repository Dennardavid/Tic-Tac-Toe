var origBoard = [
  [0, 1, 2],
  ["O", "X", "O"],
  [6, 7, 8],
];

function emptyIndexies(board) {
  const empty = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== "O" && board[i][j] !== "X") {
        empty.push([i, j]); // Push the indices of the empty cell
      }
    }
  }
  return empty;
}

console.log("emptyIndexies", emptyIndexies(origBoard));

var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var huPlayer = "P";
var aiPlayer = "C";
var iter = 0;
var round = 0;
var aiCo = "white";
var huCo = "#333";

function move(element, player, color) {
  console.log("element" + element.id);
  if (board[element.id] != "P" && board[element.id] != "C") {
    round++;
    $(element).css("background-color", color);
    board[element.id] = player;
    console.log(board);

    if (winning(board, player)) {
      setTimeout(function () {
        alert("YOU WIN");
        reset();
      }, 500);
      return;
    } else if (round > 8) {
      setTimeout(function () {
        alert("TIE");
        reset();
      }, 500);
      return;
    } else {
      round++;
      var index = minimax(board, aiPlayer).index;
      var selector = "#" + index;
      $(selector).css("background-color", aiCo);
      board[index] = aiPlayer;
      console.log(board);
      console.log(index);
      if (winning(board, aiPlayer)) {
        setTimeout(function () {
          alert("YOU LOSE");
          reset();
        }, 500);
        return;
      } else if (round === 0) {
        setTimeout(function () {
          alert("tie");
          reset();
        }, 500);
        return;
      }
    }
  }
}

function reset() {
  round = 0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  $("td").css("background-color", "transparent");
}

function minimax(reboard, player) {
  iter++;
  let array = avail(reboard);
  if (winning(reboard, huPlayer)) {
    return {
      score: -10,
    };
  } else if (winning(reboard, aiPlayer)) {
    return {
      score: 10,
    };
  } else if (array.length === 0) {
    return {
      score: 0,
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = reboard[array[i]];
    reboard[array[i]] = player;

    if (player == aiPlayer) {
      var g = minimax(reboard, huPlayer);
      move.score = g.score;
    } else {
      var g = minimax(reboard, aiPlayer);
      move.score = g.score;
    }
    reboard[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

//available spots
function avail(reboard) {
  return reboard.filter((s) => s != "P" && s != "C");
}

// winning combinations
function winning(board, player) {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}

function checkWinner(playerSymbol, board) {
  let youTied = true;
  // Check rows, columns, and diagonals for a winning combination
  for (let row = 0; row < 3; row++) {
    if (
      // Check rows
      (board[row][0] === playerSymbol &&
        board[row][1] === playerSymbol &&
        board[row][2] === playerSymbol) ||
      // Check columns
      (board[0][row] === playerSymbol &&
        board[1][row] === playerSymbol &&
        board[2][row] === playerSymbol)
    ) {
      displayWinnerUI(board);
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
      displayWinnerUI(board);
    }

    /*Loop through rows and columns to check for ties  */
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === "") {
          youTied = false; // If any cell is empty, it's not a tie
          return youTied;
        }
      }
    }

    if (youTied) {
      // It's a tie
      theyTied(board);
      break;
    }
  }
  return false;
}
