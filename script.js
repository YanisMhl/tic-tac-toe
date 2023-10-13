let cells = document.getElementsByClassName("grid-cell");
let result = document.getElementById("winner");
let restart = document.getElementById("restart");
let grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

function gridIsFull(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function checkWinner(grid) {
    // Vérifiez les lignes, les colonnes et les diagonales pour un gagnant
    for (let i = 0; i < 3; i++) {
        // Vérifiez les lignes
        if (grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2] && grid[i][0] !== 0) {
            return grid[i][0];
        }

        // Vérifiez les colonnes
        if (grid[0][i] === grid[1][i] && grid[0][i] === grid[2][i] && grid[0][i] !== 0) {
            return grid[0][i];
        }
    }

    // Vérifiez les diagonales
    if ((grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) || (grid[0][2] === grid[1][1] && grid[0][2] === grid[2][0])) {
        return grid[1][1];
    }

    return 0; // Aucun gagnant
}

function isFinished(grid) {
    // Vérifiez si le jeu est terminé (gagnant ou égalité)
    const winner = checkWinner(grid);
    if (winner === 1) {
        result.innerHTML = "Player 1 wins !";
        result.classList.remove("hidden");
    } 
    else if (winner === 2) {
        result.innerHTML = "Player 2 wins !";
        result.classList.remove("hidden");

    } 
    else if (gridIsFull(grid)) {
        result.innerHTML = "Draw !";
        result.classList.remove("hidden");
    }
}

let clics = 0;

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
        if (!cells[i].classList.contains("clique")) {
            cells[i].classList.add("clique");
            clics++;
            if (clics % 2 === 0) {
                cells[i].querySelector(".circle").classList.remove("hidden");
                grid[Math.floor(i / 3)][Math.floor(i % 3)] = 2;
            } else {
                cells[i].querySelector(".cross").classList.remove("hidden");
                grid[Math.floor(i / 3)][Math.floor(i % 3)] = 1;
            }
            isFinished(grid);
        }
    });
}

restart.addEventListener("click", function () {
       grid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    result.innerHTML = "";
    result.classList.add("hidden");

    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("clique");
        cells[i].querySelector(".circle").classList.add("hidden");
        cells[i].querySelector(".cross").classList.add("hidden");
    }

    clics = 0;
})


