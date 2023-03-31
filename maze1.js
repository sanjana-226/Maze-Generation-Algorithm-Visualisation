const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 10;
const rows = Math.floor(canvas.height / cellSize);
const cols = Math.floor(canvas.width / cellSize);

function removeWall(grid, a, b) {
  if (a.row === b.row) {
    if (a.col < b.col) {
      grid[a.row][a.col + 1] = false;
    } else {
      grid[a.row][a.col - 1] = false;
    }
  } else {
    if (a.row < b.row) {
      grid[a.row + 1][a.col] = false;
    } else {
      grid[a.row - 1][a.col] = false;
    }
  }
}

function getNeighbors(grid, row, col) {
  const neighbors = [];

  if (col > 1 && grid[row][col - 2]) {
    neighbors.push({ row, col: col - 2, wall: "left" });
  }

  if (row > 1 && grid[row - 2][col]) {
    neighbors.push({ row: row - 2, col, wall: "top" });
  }

  if (col < cols - 2 && grid[row][col + 2]) {
    neighbors.push({ row, col: col + 2, wall: "right" });
  }

  if (row < rows - 2 && grid[row + 2][col]) {
    neighbors.push({ row: row + 2, col, wall: "bottom" });
  }

  return neighbors;
}

function drawCell(grid, row, col) {
  const x = col * cellSize;
  const y = row * cellSize;

  if (grid[row][col]) {
    ctx.fillRect(x, y, cellSize, cellSize);
  } else {
    ctx.clearRect(x, y, cellSize, cellSize);
  }
}

function drawMaze(grid) {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      drawCell(grid, row, col);
    }
  }
}

// async function generateMaze() {
//     ctx.fillStyle = "black";
//     ctx.fillRect(0, 0, width, height);

//     let grid = createGrid();
//     let currentCell = grid[0][0];
//     currentCell.visited = true;

//     while (true) {
//       let unvisitedNeighbors = getUnvisitedNeighbors(currentCell, grid);

//       if (unvisitedNeighbors.length > 0) {
//         let randomNeighbor =
//           unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
//         stack.push(currentCell);
//         removeWalls(currentCell, randomNeighbor);
//         currentCell = randomNeighbor;
//         currentCell.visited = true;
//       } else if (stack.length > 0) {
//         currentCell = stack.pop();
//       }

//       drawMaze(grid);

//       if (stack.length === 0) {
//         break;
//       }

//       // Wait for 100 milliseconds before moving to the next step
//       await new Promise((resolve) => setTimeout(resolve, 100));
//     }
//   }
let empty_grid = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
  
function reset() {
  drawMaze(empty_grid);
}

async function generateMaze() {
  reset();
  grid = new Array(rows).fill(null).map(() => new Array(cols).fill(true));
  
  let stack = [{ row: 1, col: 1 }];
  while (stack.length > 0) {
    const currentCell = stack[stack.length - 1];
    grid[currentCell.row][currentCell.col] = false;

    const neighbors = getNeighbors(grid, currentCell.row, currentCell.col);

    if (neighbors.length > 0) {
      const {
        row: nextRow,
        col: nextCol,
        wall,
      } = neighbors[Math.floor(Math.random() * neighbors.length)];
      removeWall(grid, currentCell, { row: nextRow, col: nextCol });
      stack.push({ row: nextRow, col: nextCol });
      drawMaze(grid);
      await new Promise(r => setTimeout(r, 10));
      } else {
      stack.pop();
    }
  }  
}

generateMaze();

// async function generateMazeStepByStep() {
//     await generateMaze();
//     await generateMaze();
//   }
