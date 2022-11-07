const X = document.querySelector(".xSelected");
const O = document.querySelector(".oSelected");
const gameCpu = document.querySelector(".cpu");
const gamePlayer = document.querySelector(".player");
const firstPage = document.querySelector(".firstpage");
const gamePage = document.querySelector(".gamepage");
const gameButtons = document.querySelectorAll(".gamebutton");
const gameX = document.querySelectorAll(".xbtn");
const gameO = document.querySelectorAll(".obtn");
const iconX = document.querySelector(".xgame");
const iconO = document.querySelector(".ogame");
const replay = document.querySelector(".btnrestart");
const replayPopUp = document.querySelector(".replaypopup");
const popUpBackground = document.querySelector(".popupbg");
const xWinPopUp = document.querySelector(".winXpopup");
const xLostPopUp = document.querySelector(".lostXpopup");
const tiedPopUp = document.querySelector(".tiedpopup");
const xWinText = document.querySelector(".Xwon");
const oWinText = document.querySelector(".Xlost");
const p2Text = document.querySelector(".scoretextyou");
const p1Text = document.querySelector(".scoretextcpu");
const restartCancel = document.querySelector(".cancelbtn");
const restartButton = document.querySelector(".replaybtn");
const xScore = document.querySelector(".resultX");
const tiesScore = document.querySelector(".resultties");
const oScore = document.querySelector(".resultO");
const xWinNextRound = document.querySelector(".winXnext");
const oWinNextRound = document.querySelector(".lostXnext");
const tiedNextRound = document.querySelector(".tiedbtn");

let turn = "x";
let arrayX = [];
let arrayO = [];
let player1 = "o";
let xCount = 0;
let tieCount = 0;
let oCount = 0;
let playCpu = false;
let gameOver = false;

let arrayWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

X.addEventListener("click", () => {
  X.classList.add("active");
  O.classList.remove("active");
  player1 = "x";
  p2Text.innerHTML = "X (P1)";
  p1Text.innerHTML = "O (P2)";
});

O.addEventListener("click", () => {
  O.classList.add("active");
  X.classList.remove("active");
  player1 = "o";
  p2Text.innerHTML = "X (P2)";
  p1Text.innerHTML = "O (P1)";
});

gamePlayer.onclick = () => {
  firstPage.style.display = "none";
  gamePage.style.display = "flex";
};

replay.onclick = () => {
  popUpBackground.style.display = "block";
  replayPopUp.style.display = "flex";
};

restartCancel.onclick = () => {
  popUpBackground.style.display = "none";
  replayPopUp.style.display = "none";
};

restartButton.onclick = () => {
  popUpBackground.style.display = "none";
  replayPopUp.style.display = "none";
  arrayX = [];
  arrayO = [];
  removeIcons();
  xCount = 0;
  xScore.innerHTML = xCount;
  oCount = 0;
  oScore.innerHTML = oCount;
  tieCount = 0;
  tiesScore.innerHTML = tieCount;
  gameOver = false;
  if (player1 === "o" && playCpu) {
    setTimeout(cpuMove, 500);
  }
};

xWinNextRound.onclick = () => {
  popUpBackground.style.display = "none";
  xWinPopUp.style.display = "none";
  arrayX = [];
  arrayO = [];
  removeIcons();
  turn = "x";
  gameOver = false;
  if (player1 === "o" && playCpu) {
    setTimeout(cpuMove, 500);
  }
};

oWinNextRound.onclick = () => {
  popUpBackground.style.display = "none";
  xLostPopUp.style.display = "none";
  arrayX = [];
  arrayO = [];
  removeIcons();
  turn = "x";
  gameOver = false;
  if (player1 === "o" && playCpu) {
    setTimeout(cpuMove, 500);
  }
};

const tiedNext = () => {
  console.log("Hello");
  popUpBackground.style.display = "none";
  tiedPopUp.style.display = "none";
  arrayX = [];
  arrayO = [];
  removeIcons();
  turn = "x";
  gameOver = false;
  if (player1 === "o" && playCpu) {
    setTimeout(cpuMove, 500);
  }
};

gameButtons.forEach((element, index) => {
  element.addEventListener("click", () => {
    if (playCpu) {
      if (
        player1 === "x" &&
        turn === "x" &&
        !arrayX.includes(index) &&
        !arrayO.includes(index)
      ) {
        gameX[index].style.display = "block";
        arrayX.push(index);
        hoverIcon();
        turn = "o";
        turnChange();
        winX();
        if (!gameOver) {
          setTimeout(cpuMove, 500);
        }
      } else if (
        player1 === "o" &&
        turn === "o" &&
        !arrayX.includes(index) &&
        !arrayO.includes(index)
      ) {
        gameO[index].style.display = "block";
        arrayO.push(index);
        hoverIcon();
        turn = "x";
        turnChange();
        winO();
        if (!gameOver) {
          setTimeout(cpuMove, 500);
        }
      }
    } else {
      if (turn === "x" && !arrayX.includes(index) && !arrayO.includes(index)) {
        gameX[index].style.display = "block";
        arrayX.push(index);
        hoverIcon();
        turn = "o";
        turnChange();
        winX();
      } else if (!arrayX.includes(index) && !arrayO.includes(index)) {
        gameO[index].style.display = "block";
        arrayO.push(index);
        hoverIcon();
        turn = "x";
        turnChange();
        winO();
      }
    }
  });
});

function turnChange() {
  if (turn === "x") {
    iconX.style.display = "block";
    iconO.style.display = "none";
  } else {
    iconX.style.display = "none";
    iconO.style.display = "block";
  }
}

function hoverIcon() {
  if (turn === "x") {
    gameButtons.forEach((button, index) => {
      if (arrayX.includes(index) || arrayO.includes(index)) {
        button.classList.remove("showx");
      } else {
        button.classList.replace("showx", "showo");
      }
    });
  } else {
    gameButtons.forEach((button, index) => {
      if (arrayX.includes(index) || arrayO.includes(index)) {
        button.classList.remove("showo");
      } else {
        button.classList.replace("showo", "showx");
      }
    });
  }
}

function winX() {
  for (let i = 0; i < arrayWin.length; i++) {
    let win = arrayWin[i].every((numbers) => {
      return arrayX.includes(numbers);
    });
    if (win) {
      popUpBackground.style.display = "block";
      xWinPopUp.style.display = "flex";
      if (player1 === "x") {
        xWinText.innerHTML = "YOU WON!";
      } else {
        xWinText.innerHTML = "OH NO, YOU LOST...";
      }
      xCount++;
      xScore.innerHTML = xCount;
      gameOver = true;
      break;
    }
    if (i === arrayWin.length - 1) {
      tied();
    }
  }
}

function winO() {
  for (let i = 0; i < arrayWin.length; i++) {
    let win = arrayWin[i].every((numbers) => {
      return arrayO.includes(numbers);
    });
    if (win) {
      popUpBackground.style.display = "block";
      xLostPopUp.style.display = "flex";
      if (player1 === "x") {
        xWinText.innerHTML = "OH NO, YOU LOST...";
      } else {
        xWinText.innerHTML = "YOU WON!";
      }
      oCount++;
      oScore.innerHTML = oCount;
      gameOver = true;
      break;
    }
  }
}

function tied() {
  if (arrayX.length === 5) {
    popUpBackground.style.display = "block";
    tiedPopUp.style.display = "flex";
    tieCount++;
    tiesScore.innerHTML = tieCount;
  }
}

function removeIcons() {
  gameButtons.forEach((button) => {
    button.children[0].style.display = "none";
    button.children[1].style.display = "none";
  });
}

gameCpu.onclick = () => {
  firstPage.style.display = "none";
  gamePage.style.display = "flex";
  p2Text.innerHTML = "X (YOU)";
  p1Text.innerHTML = "O (CPU)";
  playCpu = true;
  if (player1 === "o") {
    setTimeout(cpuMove, 500);
    p2Text.innerHTML = "O (YOU)";
    p1Text.innerHTML = "X (CPU)";
  }
};

function cpuMove() {
  let randomNumber = Math.floor(Math.random() * 9);
  while (arrayX.includes(randomNumber) || arrayO.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * 9);
  }
  if (
    player1 === "o" &&
    !arrayX.includes(randomNumber) &&
    !arrayO.includes(randomNumber)
  ) {
    gameX[randomNumber].style.display = "block";
    arrayX.push(randomNumber);
    hoverIcon();
    turn = "o";
    turnChange();
    winX();
  } else if (!arrayX.includes(randomNumber) && !arrayO.includes(randomNumber)) {
    gameO[randomNumber].style.display = "block";
    arrayO.push(randomNumber);
    hoverIcon();
    turn = "x";
    turnChange();
    winO();
  }
}
