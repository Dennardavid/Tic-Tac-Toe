/* Variables used */
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
const imageX = document.querySelector("#image-x");
const imageO = document.querySelector("#image-o");

/* Funtion to switch to playing pc mode */
const playCpu = function () {
  play_against_cpu.addEventListener("click", function () {
    play_game.style.display = "block";
    pickplayer.style.display = "none";
  });
};

/* Funtion to switch to playing with another player mode */
const playPerson = function () {
  play_against_person.addEventListener("click", function () {
    play_game.style.display = "block";
    pickplayer.style.display = "none";
  });
};

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

/* Function to close modal with escape key */
const closeModal = function () {
  modal.style.visibility = "hidden";
};

/* Function to restart the game */
const restart = function () {
  modal_button_2.addEventListener("click", function () {
    modal.style.visibility = "hidden";
    play_game.style.display = "none";
    pickplayer.style.display = "block";
    imageX.style.backgroundColor = "transparent";
    imageO.style.backgroundColor = "#a8bfc9";
  });
};

// Function for when player is X
imageX.addEventListener("focus", function () {
  // Set the player to X
  const playerMark = "X";

  // Set the background so that two backgrounds can't be the same at once when selecting a player
  imageX.style.backgroundColor = "#60b347";
  imageO.style.backgroundColor = "#a8bfc9";

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
});

// Function for when player is O
imageO.addEventListener("focus", function () {
  // Set the player to O
  const playerMark = "O";

  // Set the background so that two backgrounds can't be the same at once when selecting a player
  imageO.style.backgroundColor = "#60b347";
  imageX.style.backgroundColor = "transparent";

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
});
