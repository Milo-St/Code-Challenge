function CreateSudoku() {
    const mainGridContainer = document.getElementsByClassName('grid-grid-container')[0];

    for (let i = 1; i <= 9; i++) {
        const secondGridContainer = document.createElement('div');
        secondGridContainer.classList.add('grid-container');

        for (let j = 1; j <= 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.textContent = ''; // You can set initial value here if needed
            secondGridContainer.appendChild(cell);
        }

        mainGridContainer.appendChild(secondGridContainer);
    }
}
