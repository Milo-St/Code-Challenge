function CreateSudoku() {
    // sets up the main grid container
    const mainGridContainer = document.getElementsByClassName('grid-grid-container')[0];

    // hides the button when pressed
    const button = document.getElementById('button');
    if (button) {
        button.style.display = 'none';
    }

    // checks if a number can be placed in a cell
    function canPlaceNumber(board, row, col, num) {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) {
                return false;
            }
        }

        // checks columns
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) {
                return false;
            }
        }

        // checks the 3x3 grids
        const subgridRowStart = Math.floor(row / 3) * 3;
        const subgridColStart = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[subgridRowStart + i][subgridColStart + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    // checks if the created sudoku can be solved
    function solveSudoku(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (canPlaceNumber(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveSudoku(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    // copies the sudoku board
    function copyBoard(board) {
        return board.map(row => row.slice());
    }

    // creates a solved sudoku grid
    const board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
    solveSudoku(board);

    // removes random numbers so only 25 stay on the board
    const cellsToRemove = 81 - 25; 
    let removedCount = 0;
    while (removedCount < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            const removedNum = board[row][col];
            board[row][col] = 0;

            // check if the puzzle is still solvable
            const boardCopy = copyBoard(board);
            if (!solveSudoku(boardCopy)) {
                // if removing the number makes it unsolvable, undo it
                board[row][col] = removedNum;
            } else {
                removedCount++;
            }
        }
    }

    // creates a 9x9 grid
    for (let i = 0; i < 9; i++) {
        // sets up the 3x3 grid containers
        const secondGridContainer = document.createElement('div');
        secondGridContainer.classList.add('grid-container');

        // creates a 9x9 grid in each 3x3 container
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            if (board[i][j] !== 0) {
                cell.textContent = board[i][j];
            }
            secondGridContainer.appendChild(cell);
        }

        mainGridContainer.appendChild(secondGridContainer);
    }
}
