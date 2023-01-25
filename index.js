import GameBoard from "./gameBoard.js";
import { ship } from "./ship.js";
const grid = document.querySelector(".grid");
const form = document.querySelector("form");
const formX = document.querySelector(".formX").value;
const formY = document.querySelector(".formY").value;
const hasProto = () => {
  Array.prototype.Has = function (arr) {
    return this.some((coord) => {
      return coord[0] == arr[0] && coord[1] == arr[1];
    });
  };
};
hasProto();

const shipArray = [];
const shipLengths = [1, 1, 2, 4, 3];
shipLengths.forEach((length) => {
  shipArray.push(ship(length));
});

while (shipArray.length) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    gameBoard.placeShips(shipArray[0], formX, formY);
  });
}

const gameBoard = new GameBoard();
function createCell(x, y, status) {
  const cell = document.createElement("div");
  cell.setAttribute("data-x", x);
  cell.setAttribute("data-y", y);
  cell.id = "cell";
  cell.className = status;
  return cell;
}
function findCell(y, x) {
  let found = document.querySelector(`[data-y="${y}"][data-x="${x}"]`);
  found.classList = "ship";
  found.style.backgroundColor = "red";
}
let x = 0;
let y = 9;
for (let i = 0; i < 100; i++) {
  if (x >= 9) {
    y--;
    x = 0;
  } else if (y == 9 && i == 0) {
    x = 0;
  } else {
    x++;
  }
  grid.appendChild(createCell(x, y, null));
}
