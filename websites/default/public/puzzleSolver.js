window.onload = function () {
    puzzCanv = document.getElementById("play-puzz");
    puzzCtx = puzzCanv.getContext("2d");
    cellWidth = puzzCanv.width / 4;
    cellHeight = puzzCanv.height / 4;

    puzzCanv.addEventListener("click", userClick);
}

var puzzStr = "";
var puzzArr = [];

function newPuzz() {
    puzzStr = document.getElementById("newPuzzArr").innerHTML;
    console.log(puzzStr);
    puzzArr = JSON.parse(puzzStr);
    console.log(puzzArr);

    draw();
}

function userClick(e) {
    // Get click coordinates
    let rect = puzzCanv.getBoundingClientRect();
    let row = e.clientY - rect.top;
    let col = e.clientX - rect.left;

    // Get cell coordinates from click coordinates
    let rowCell = Math.floor(row / cellHeight);
    let colCell = Math.floor(col / cellWidth);
    
    perform_move(rowCell, colCell);
}

function draw() {
    // Draw background
    puzzCtx.fillStyle = "black";
    puzzCtx.fillRect(0, 0, puzzCanv.width, puzzCanv.height);

    puzzCtx.fillStyle = "white";
    puzzCtx.strokeStyle = "blue";
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            topLeftX = cellWidth * j;
            topLeftY = cellHeight * i;

            if (puzzArr[i][j] == 1) {
                puzzCtx.fillRect(topLeftX, topLeftY, cellWidth, cellHeight);
                puzzCtx.strokeRect(topLeftX, topLeftY, cellWidth, cellHeight);
            } else {
                puzzCtx.strokeRect(topLeftX, topLeftY, cellWidth, cellHeight);
            }
        }
    }    
}

function perform_move(row, col) {
    toggle(row, col);
    // Check if cell is on top edge; if not, toggle cell above it
    if (row != 0) {
        toggle(row - 1, col);
    }
    // Check if cell is on bottom edge; if not, toggle cell below it
    if (row != 3) {
        toggle(row + 1, col);
    }
    // Check if cell is on left edge; if not, toggle cell to its left
    if (col != 0) {
        toggle(row, col - 1);
    }
    // Check if cell is on right edge; if not, toggle cell to its right
    if (col != 3) {
        toggle(row, col + 1);
    }

    draw();
}

function toggle(row, col) {
    if (puzzArr[row][col] == 0) {
        puzzArr[row][col] = 1;
    } else {
        puzzArr[row][col] = 0;
    }
}