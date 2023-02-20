import GameBoard from "./gameBoard.js";
import { ship } from "./ship.js";
import Player from "./player.js";
const grid = document.querySelector(".grid");
const form = document.querySelector("form");
const formXval = document.querySelector(".xCord");
const formYval = document.querySelector(".yCord");
const playerSide = document.querySelector(".player");
const enemySide = document.querySelector(".enemy");
const playerMessage = document.querySelector('.playerMessage')
const enemyMessage = document.querySelector('.enemyMessage')

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
    enemySide.appendChild(enemyGrid);
    createGrid(enemyGrid, enemySide);

    while (enemyShipArray.length) {
      enemyGameboard.autoPlaceShips(enemyShipArray[0]);
      enemyShipArray.shift();
    }
    //should put event listeners after the enemys ships have been placed
    deployEventListeners();
  }
}

function drawShips(y, x, shipColor) {
  const ship = document.querySelector(`[data-y="${y}"][data-x="${x}"]`);
  ship.style.backgroundColor = shipColor;
}
function markOnBoard(y, x, status) {
  const cell = document.querySelector(`.grid > [data-y="${y}"][data-x="${x}"]`);
  if (status) {
    cell.removeAttribute("style");
    cell.classList = "hit";
  }
  if (status == "missed") {
    cell.classList = "missed";
  }
}
// loop to show the form until all ships have been placed
// remove form and add two of the grids with the grids already placed
createGrid(grid, playerSide);

//function if the attack is doable we check if the game has ended if not we let the computer take a turn
// while (!gameBoard.allShipsSunk() || enemyGameboard.allShipsSunk) {
//   deployEventListeners();
// }

//event listeners that are deployed after the player has placed all ships
function deployEventListeners() {
  const playableCells = document.querySelectorAll(".enemyGrid > .null");
  console.log(enemyGameboard.checkBoard());
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
function createGrid(playerGrid, parent) {
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
    playerGrid.appendChild(createCell(x, y, null));
  }
  const vertNums = createElem("div", "numbers");
  const horNums = createElem("div", "horNumbers");
  let number = 9;
  let horNumber = 0;
  for (let i = 0; i != 10; i++) {
    const num = document.createElement("div");
    num.innerText = number;
    vertNums.appendChild(num);
    number--;
  }
  for (let i = 0; i != 10; i++) {
    const Hor = document.createElement("div");
    Hor.innerText = horNumber;
    horNums.appendChild(Hor);
    horNumber++;
  }
  const seperationDiv = document.createElement("div");
  parent.insertBefore(vertNums, playerGrid);
  parent.appendChild(seperationDiv);
  parent.appendChild(horNums);
}
//reverse the player side message
function display(attack, e) {
  playerMessage.textContent = ''
  if (attack) {
    e.target.removeAttribute("style");
    e.target.classList = "hit";
    playerMessage.textContent = 'you have landed an atttack'
  }
  if (attack == "missed") {
    e.target.classList = "missed";
    playerMessage.textContent = 'you have missed an attack'
  }
  if (attack == true || attack == "missed") {
    if (allShipsSunk(gameBoard, enemyGameboard)) {
      deleteGrid();
      console.log("game Over");
    } else {
      const enemyAttack = player2.generateAttack();
      if (enemyAttack == true || enemyAttack == "missed") {
        const [y, x] = player2.getMoves().at(-1);
        markOnBoard(y, x, enemyAttack);
        if (allShipsSunk(gameBoard, enemyGameboard)) {
          deleteGrid();
          console.log("gameover");
        }
      }
    }
  }
}
function deleteGrid() {
 enemySide.remove()
 playerSide.remove()
 console.log('gameOver')
}
function allShipsSunk(playerBoard, enemyBoard) {
  if (playerBoard.allShipsSunk() || enemyBoard.allShipsSunk()) {
    return true;
  }
  return false;
}
function createElem(type, id) {
  const elem = document.createElement(type);
  elem.classList = id;
  return elem;
}
