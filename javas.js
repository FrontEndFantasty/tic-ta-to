const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {cell.addEventListener('click', handleCellClick);});

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (gameBoard[index] !== '' || !gameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!gameBoard.includes('')) {
    statusText.textContent = 'Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'Y' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s play`;
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
  });
}

function resetTheGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s play`;
  cells.forEach(cell => cell.textContent = '');
}
