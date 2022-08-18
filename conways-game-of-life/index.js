const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const pauseButton = document.querySelector('button.pause');

const resolution = 10;
canvas.width = 800;
canvas.height = 800;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

var playing = true;

function constructGrid() {
    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}

let grid = constructGrid();
render(grid);
update();


function update() {
    grid = nextGen(grid);
    render(grid);
    requestAnimationFrame(update);
}

function nextGen(grid) {
    const nextGen = grid.map(arr=> [...arr]);
    for (let col = 0; col < grid.length; col ++) {
        for (let row = 0; row < grid[col].length; row ++) {
            const cell = grid[col][row];
            let numNeighbors = 0;
            for (let i = -1; i < 2; i ++) {
                for (let j = -1; j < 2; j ++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const yCell = col + i;
                    const xCell = row + j;

                    //checks if within boundary
                    if (xCell >= 0 && yCell >= 0 && xCell < COLS && yCell < ROWS) {
                        const currentNeighbor = grid[col + i][row + j];
                        numNeighbors += currentNeighbor;
                    }
                }
            }

            //rules
            if (cell === 1 && numNeighbors < 2) {
                nextGen[col][row] = 0;
            } else if (cell === 1 && numNeighbors > 3) {
                nextGen[col][row] = 0;
            } else if (cell === 0 && numNeighbors === 3) {
                nextGen[col][row] = 1;
            }
        }
    }
    return nextGen;
    
}

function render(grid) {
    for (let col = 0; col < grid.length; col ++) {
        for (let row = 0; row < grid[col].length; row ++) {
            const cell = grid[col][row];

            context.beginPath();
            context.rect(col * resolution, row * resolution, resolution, resolution);
            context.fillStyle = cell ? 'black' : 'white'
            context.fill();
            context.stroke();
        }
    }
}

