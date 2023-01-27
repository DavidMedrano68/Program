import GameBoard from "./gameBoard.js";
import { ship } from "./ship.js";
const grid = document.querySelector(".grid");
const form = document.querySelector("form");
const formXval = document.querySelector(".formX").value;
const formYval = document.querySelector(".formY").value;
const formX = document.querySelector("formX");
const formY = document.querySelector("formY");
const gameBoard = new GameBoard();
const shipArray = [];
const shipLengths = [1, 1, 2, 4, 3];
const hasProto = () => {
  Array.prototype.Has = function (arr) {
    return this.some((coord) => {
      return coord[0] == arr[0] && coord[1] == arr[1];
    });
  };
};
hasProto();

shipLengths.forEach((length) => {
  shipArray.push(ship(length));
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const available = gameBoard.available(shipArray[0], formXval, formYval);
  if (available) {
    gameBoard.placeShips(shipArray[0], formXval, formYval);
  }
});
while (shipArray.length) {}

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
