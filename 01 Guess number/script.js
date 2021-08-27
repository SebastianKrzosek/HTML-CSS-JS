"use-script";

let answer = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let high = 0;

document.querySelector(".again").addEventListener("click", function () {
  answer = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".score").textContent = 20;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".guess").value = "";
  directMessage("Start guessing...");
});

const directMessage = (message) => {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  let num = Number(document.querySelector(".guess").value);
  if (!num) {
    document.querySelector(".message").textContent = "No number🤷‍♂️";
  } else {
    if (Number(document.querySelector(".score").textContent) > 0) {
      if (answer != num) {
        answer > num
          ? directMessage("Too low 🤷‍♀️!")
          : directMessage("Too high 🤷‍♂️!");
        document.querySelector(".score").textContent =
          Number(document.querySelector(".score").textContent) - 1;
      } else if (answer === num) {
        directMessage("Great! You guess it ✨!");
        document.querySelector(".number").textContent = answer;
        document.querySelector(".score").textContent =
          Number(document.querySelector(".score").textContent) - 1;
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "20rem";
        if (
          Number(document.querySelector(".score").textContent) >
          Number(document.querySelector(".highscore").textContent)
        ) {
          document.querySelector(".highscore").textContent =
            document.querySelector(".score").textContent;
        }
      }
    } else if (Number(document.querySelector(".score").textContent) === 0) {
      document.querySelector(".message").textContent = "You lose 🤣!";
      document.querySelector(".score").textContent = 0;
      document.querySelector(".number").textContent = answer;
    }
  }
});
