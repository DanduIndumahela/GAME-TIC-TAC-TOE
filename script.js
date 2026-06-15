const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        statusText.textContent = `${currentPlayer} Wins!`;
        return;
    }

    if (board.every(cell => cell !== '')) {
        gameActive = false;
        statusText.textContent = "It's a Draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] === board[b] && board[b] === board[c] && board[a] !== '';
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);