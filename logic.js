const board = document.getElementById('game-board');
const restartButton = document.querySelector('.restart-button');
const playerXNameInput = document.getElementById('playerX');
const playerONameInput = document.getElementById('playerO');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

function startGame() {
  const playerXName = playerXNameInput.value.trim();
  const playerOName = playerONameInput.value.trim();

  if (playerXName !== '' && playerOName !== '') {
    gameActive = true;
    initializeGame();
  } else {
    alert('Please enter names for both players.');
  }
}

function initializeGame() {
  // Clear player input section
  const playerInputs = document.getElementById('player-inputs');
  playerInputs.style.display = 'none';

  // Check if the board already exists, and create it only if it doesn't
  if (board.children.length === 0) {
    // Create the board
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
    }
  }
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const index = clickedCell.dataset.index;

  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkWinner();
    togglePlayer();
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      const winner = currentPlayer === 'X' ? playerXNameInput.value : playerONameInput.value;
      alert(`Player ${currentPlayer} (${winner}) wins! Congrats!`);
      gameActive = false;
      break;
    }
  }

  if (!gameBoard.includes('') && gameActive) {
    alert('It\'s a draw!');
    gameActive = false;
  }
}

function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = false;
  currentPlayer = 'X';
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.textContent = '';
  });

  // Clear player names and show player input section
  playerXNameInput.value = '';
  playerONameInput.value = '';
  const playerInputs = document.getElementById('player-inputs');
  playerInputs.style.display = 'flex';
}
