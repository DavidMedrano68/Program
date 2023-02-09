import GameBoard from "./gameBoard.js";
import { ship } from "./ship.js";
import Player from "./player.js";
const grid = document.querySelector(".grid");
const form = document.querySelector("form");
const formXval = document.querySelector(".xCord");
const formYval = document.querySelector(".yCord");
const body = document.querySelector("body");
const gameBoard = new GameBoard();
const enemyGameboard = new GameBoard();
const player1 = new Player(enemyGameboard);
const player2 = new Player(gameBoard);
const shipLengths = [
  [1, "blue"],
  [1, "red"],
  [2, "green"],
  [4, "yellow"],
  [3, "orange"],
];
const shipArray = createShipArr();
const enemyShipArray = createShipArr();

const hasProto = () => {
  Array.prototype.Has = function (arr) {
    return this.some((coord) => {
      return coord[0] == arr[0] && coord[1] == arr[1];
    });
  };
};
hasProto();
function createShipArr() {
  const array = [];
  for (let ships of shipLengths) {
    array.push(ship(ships[0], ships[1]));
  }
  return array;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const shipCoords = gameBoard.placeShips(
    shipArray[0],
    formXval.valueAsNumber,
    formYval.valueAsNumber
  );
  if (shipCoords == false) {
    return;
  }
  shipCoords.forEach((ship) => {
    drawShips(ship[0], ship[1], shipArray[0].color);
  });
  shipArray.shift();
  checkShipArr();
});

//checks ships array
function checkShipArr() {
  if (!shipArray.length) {
    form.remove();
    const enemyGrid = document.createElement("div");
    enemyGrid.classList = "enemyGrid";
    createGrid(enemyGrid);

    body.appendChild(enemyGrid);
    while (enemyShipArray.length) {
      enemyGameboard.autoPlaceShips(enemyShipArray[0]);
      enemyShipArray.shift();
    }
    console.log(enemyGameboard.checkBoard());
    //should put event listeners after the enemys ships have been placed
    deployEventListeners();
  }
}

function drawShips(y, x, shipColor) {
  const ship = document.querySelector(`[data-y="${y}"][data-x="${x}"]`);
  ship.style.backgroundColor = shipColor;
}
// loop to show the form until all ships have been placed
// remove form and add two of the grids with the grids already placed
createGrid(grid);

//function if the attack is doable we check if the game has ended if not we let the computer take a turn
// while (!gameBoard.allShipsSunk() || enemyGameboard.allShipsSunk) {
//   deployEventListeners();
// }

//event listeners that are deployed after the player has placed all ships
function deployEventListeners() {
  const playableCells = document.querySelectorAll(".enemyGrid > .null");
  playableCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      display(player1.attack(e.target.dataset.y, e.target.dataset.x), e);
    });
  });
}

//create event listeners to accept clicks as moves after the player is done placing ships

//create loop of some kind to accept the click as attack check if its doable
// and check if the game ended if it didnt let computer attack

function createCell(x, y, status) {
  const cell = document.createElement("div");
  cell.setAttribute("data-x", x);
  cell.setAttribute("data-y", y);
  cell.id = "cell";
  cell.className = status;
  return cell;
}
function createGrid(playerForm) {
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
    playerForm.appendChild(createCell(x, y, null));
  }
}
function display(attack, e) {
  if (attack) {
    e.target.removeAttribute("style");
    e.target.classList = "hit";
  }
  if (attack == "missed") {
    e.target.classList = "missed";
  }
  if (attack == true || attack == "missed") {
    const enemyAttack = player2.generateAttack();
    if (enemyAttack) {
      e.target.removeAttribute("style");
      e.target.classList = "hit";
    }
    if (enemyAttack == "missed") {
      e.target.classList = "missed";
    }
  }
}
