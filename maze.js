// Set up the canvas and get the 2D drawing context
const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

// Set the size of the canvas and the maze cells
const cellSize = 20;
const canvasWidth = 400;
const canvasHeight = 400;
const numCols = Math.floor(canvasWidth / cellSize);
const numRows = Math.floor(canvasHeight / cellSize);
canvas.width = numCols * cellSize;
canvas.height = numRows * cellSize;

// Set up the maze data structure
let maze = new Array(numRows);
for (let i = 0; i < numRows; i++) {
  maze[i] = new Array(numCols).fill(true);
}

// Define the direction arrays
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

// Define the recursive backtracking algorithm
function recursiveBacktracking(x, y) {
  // Mark the current cell as visited
  maze[y][x] = false;

  // Shuffle the direction array
  let directions = [0, 1, 2, 3];
  for (let i = 0; i < directions.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [directions[i], directions[j]] = [directions[j], directions[i]];
  }

  // For each neighbor cell in a random order
  for (let i = 0; i < directions.length; i++) {
    let nx = x + dx[directions[i]];
    let ny = y + dy[directions[i]];

    // If the neighbor is within the maze bounds and unvisited
    if (nx >= 0 && nx < numCols && ny >= 0 && ny < numRows && maze[ny][nx]) {
      // Remove the wall between the current cell and the neighbor
      let wallX = x * cellSize + (dx[directions[i]] == 1 ? cellSize : 0);
      let wallY = y * cellSize + (dy[directions[i]] == 1 ? cellSize : 0);
      ctx.clearRect(wallX, wallY, cellSize, cellSize);

      // Recursively visit the neighbor
      recursiveBacktracking(nx, ny);
    }
  }
}

// Call the recursive backtracking algorithm with a starting cell
recursiveBacktracking(0, 0);
