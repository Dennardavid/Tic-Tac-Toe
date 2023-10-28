/* Function to checker the winner of the game */
function checkWinner(playerSymbol) {
  // Check rows, columns, and diagonals for a winning combination
  for (let i = 0; i < 3; i++) {
    // Check rows
    if (
      board[i][0] === playerSymbol &&
      board[i][1] === playerSymbol &&
      board[i][2] === playerSymbol
    ) {
      winnerModal.style.visibility = "visible";
    } else if (
      // Check columns
      board[0][i] === playerSymbol &&
      board[1][i] === playerSymbol &&
      board[2][i] === playerSymbol
    ) {
      winnerModal.style.visibility = "visible";
    } else if (
      // Check diagonals
      (board[0][0] === playerSymbol &&
        board[1][1] === playerSymbol &&
        board[2][2] === playerSymbol) ||
      (board[0][2] === playerSymbol &&
        board[1][1] === playerSymbol &&
        board[2][0] === playerSymbol)
    ) {
      winnerModal.style.visibility = "visible";
    } else {
      //Display for tied case
      winnerModal.style.visibility = "visible";
    }
  }
  console.log(board);
  return false;
}
