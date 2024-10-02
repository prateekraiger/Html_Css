let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "purple", "red", "green"];
let start = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("#level-display");
let highScoreDisplay = document.querySelector("#high-score");

document.addEventListener("keypress", function () {
  if (!start) {
    console.log("Game is ON");
    start = true;
    levelup();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function levelup() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randidx = Math.floor(Math.random() * 4);
  let randcol = btns[randidx];
  let randbtn = document.querySelector(`.${randcol}`);

  gameSeq.push(randcol);
  console.log(gameSeq);
  gameFlash(randbtn);
}

function checkcol(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
      highScoreDisplay.innerText = `High Score: ${highScore}`;
      localStorage.setItem("highScore", highScore);
    }

    h2.innerHTML = `Game Over! Your Score Was<b> ${level} </b>
 Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let usercol = btn.getAttribute("id");
  userSeq.push(usercol);

  checkcol(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  start = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  h2.innerText = "Press Any Key To Start The Game";
}

if (localStorage.getItem("highScore")) {
  highScore = parseInt(localStorage.getItem("highScore"));
  highScoreDisplay.innerText = `High Score: ${highScore}`;
}
