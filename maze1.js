const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 30;
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

let empty_grid = new Array(rows)
  .fill(null)
  .map(() => new Array(cols).fill(false));

function reset() {
  drawMaze(empty_grid);
}

async function generateMaze() {
  // highlightStep(0);
  reset();
  
  grid = new Array(rows).fill(null).map(() => new Array(cols).fill(true));
  // highlightStep(0);
  let stack = [{ row: 1, col: 1 }];
  // highlightStep(1);
  while (stack.length > 0) {
    const currentCell = stack[stack.length - 1];
    grid[currentCell.row][currentCell.col] = false;
    // highlightStep(2);
    const neighbors = getNeighbors(grid, currentCell.row, currentCell.col);

    if (neighbors.length > 0) {
      // highlightStep(3);
      const {
        row: nextRow,
        col: nextCol,
        wall,
      } = neighbors[Math.floor(Math.random() * neighbors.length)];
      removeWall(grid, currentCell, { row: nextRow, col: nextCol });
      stack.push({ row: nextRow, col: nextCol });
      drawMaze(grid);
      await new Promise((r) => setTimeout(r, 1000));
    } else {
      // highlightStep(4);
      stack.pop();
    }
  }
  highlightStep(6);
}

let steps = ["1", "2", "3", "4", "5", "6", "7"];

function highlightStep(stepId){
  steps.forEach((stepId) => document.getElementById(stepId).style.color = "black");
  document.getElementById(steps[stepId]).style.color = "blue";
}

generateMaze();
// highlightStep(2);