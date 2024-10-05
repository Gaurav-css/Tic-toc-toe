document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetBtn = document.getElementById('reset-btn');
    const pvpBtn = document.getElementById('pvp-btn');
    const pvcBtn = document.getElementById('pvc-btn');
  
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let isPvC = false;
  
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
  
    pvpBtn.addEventListener('click', () => {
      isPvC = false;
      resetGame();
    });
  
    pvcBtn.addEventListener('click', () => {
      isPvC = true;
      resetGame();
    });
  
    cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
  
    function handleCellClick(event) {
      const clickedCell = event.target;
      const cellIndex = parseInt(clickedCell.getAttribute('data-index'));
  
      if (board[cellIndex] !== '' || !gameActive) return;
  
      updateCell(clickedCell, cellIndex);
  
      checkResult();
  
      if (isPvC && currentPlayer === 'O' && gameActive) {
        setTimeout(computerMove, 500);
      }
    }
  
    function updateCell(cell, index) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
    }
  
   
    function checkResult() {
      let roundWon = false;
      for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
  
        if (a === '' || b === '' || c === '') continue;
  
        if (a === b && b === c) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
      } else if (!board.includes('')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
      } else {
        changePlayer();
      }
    }
  
 
    function changePlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  
   
    function computerMove() {
      let availableCells = [];
      board.forEach((cell, index) => {
        if (cell === '') availableCells.push(index);
      });
  
      const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
      const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
  
      updateCell(cell, randomIndex);
      checkResult();
    }
  
    
    function resetGame() {
      board = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;
      statusText.textContent = 'Player X\'s Turn';
      cells.forEach((cell) => {
        cell.textContent = '';
      });
    }
 
    resetBtn.addEventListener('click', resetGame);
  });
  