window.onload = function () {
    puzzCanv = document.getElementById("play-puzz");
    puzzCtx = puzzCanv.getContext("2d");
    cellWidth = puzzCanv.width / 4;
    cellHeight = puzzCanv.height / 4;

    solDiv = document.getElementById("solutionDiv");
    puzzCanv.addEventListener("click", userClick);
}

var puzzStr = "";
var puzzArr = [];
var puzzStartStateCopy = [];
var solvedArr = [];
var solvedStats = [];
var solvedCurrState = [];
var playerMove = false;

function newPuzz() {
    puzzStr = document.getElementById("newPuzzArr").innerHTML;
    puzzArr = JSON.parse(puzzStr);

    // Save starting state for use in solution algorithms
    puzzStartStateCopy = JSON.parse(JSON.stringify(puzzArr));

    clearSolution();
    draw();
}

function userClick(e) {
    console.log("userclick");
    // Get click coordinates
    let rect = puzzCanv.getBoundingClientRect();
    let row = e.clientY - rect.top;
    let col = e.clientX - rect.left;

    // Get cell coordinates from click coordinates
    let rowCell = Math.floor(row / cellHeight);
    let colCell = Math.floor(col / cellWidth);

    playerMove = true;
    perform_move(rowCell, colCell);
    playerMove = false;
    draw();
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

    //draw();
}

function toggle(row, col) {
    if (playerMove) {
        console.log("playermove");
        if (puzzArr[row][col] == 0) {
            puzzArr[row][col] = 1;
        } else {
            puzzArr[row][col] = 0;
        }
    } else {
        if (solvedCurrState[row][col] == 0) {
            solvedCurrState[row][col] = 1;
        } else {
            solvedCurrState[row][col] = 0;
        }
    }
}

function showSolution() {
    // Clear solution div, in case solution algorithm has already been run
    clearSolution();

    // Reset solution variables
    solvedCurrState = JSON.parse(JSON.stringify(puzzStartStateCopy));
    solvedStats = [];

    solvedStr = document.getElementById("solvedPuzzArr").innerHTML;
    solvedArr = JSON.parse(solvedStr);

    solvedStats.push(solvedArr.pop());
    solvedStats.push(solvedArr.pop());

    statStr = "Search steps: " + solvedStats[1] + "\n ";
    statStr += "Time: " + solvedStats[0];
    searchStats = document.createTextNode(statStr);

    searchStatsDiv = document.createElement("div");
    searchStatsDiv.style.margin = "10px";
    searchStatsDiv.appendChild(searchStats);
    solDiv.appendChild(searchStatsDiv);

    // Create canvas elements for all solution steps
    for (var move = 0; move < solvedArr.length + 1; move++) {
        moveDiv = document.createElement("div");
        moveDiv.style.display = "inline-block";
        moveDiv.style.margin = "10px";

        thisMove = move + 1;
        if (move < solvedArr.length) {
            detailStr = "Move " + thisMove + ": ";
            thisRow = solvedArr[move][0] + 1;
            thisCol = solvedArr[move][1] + 1;
            detailStr += "Row " + thisRow + ", Column " + thisCol;
        } else {
            detailStr = "Solved!";
        }

        moveDetailDiv = document.createElement("div");
        moveDetail = document.createTextNode(detailStr);

        moveCanv = document.createElement("canvas");
        moveCanv.width = 200;
        moveCanv.height = 200;
        moveCtx = moveCanv.getContext("2d");
        moveCtx.fillStyle = "black";
        moveCtx.fillRect(0, 0, moveCanv.width, moveCanv.height);

        // Draw move
        moveCtx.fillStyle = "white";
        moveCtx.strokeStyle = "blue";
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                topLeftX = cellWidth * j;
                topLeftY = cellHeight * i;

                if (solvedCurrState[i][j] == 1) {
                    moveCtx.fillRect(topLeftX, topLeftY, cellWidth, cellHeight);
                    moveCtx.strokeRect(topLeftX, topLeftY, cellWidth, cellHeight);
                } else {
                    moveCtx.strokeRect(topLeftX, topLeftY, cellWidth, cellHeight);
                }

                
                // Distinguish if cell is current solution step
                if (move < solvedArr.length && (i == solvedArr[move][0] && j == solvedArr[move][1])) {
                    moveCtx.strokeStyle = "red";
                    moveCtx.lineWidth = 3;

                    moveCtx.beginPath();
                    moveCtx.moveTo(topLeftX + 5, topLeftY + 5);
                    moveCtx.lineTo(topLeftX + cellWidth - 5, topLeftY + cellHeight - 5);
                    moveCtx.moveTo(topLeftX + 5, topLeftY + cellHeight - 5);
                    moveCtx.lineTo(topLeftX + cellWidth - 5, topLeftY + 5);
                    moveCtx.stroke();

                    moveCtx.strokeStyle = "blue";
                    moveCtx.lineWidth = 1;
                }
            }
        }    

        moveDiv.appendChild(moveCanv);
        moveDetailDiv.appendChild(moveDetail);
        moveDiv.appendChild(moveDetailDiv);
        solDiv.appendChild(moveDiv);

        if (move < solvedArr.length) {
            perform_move(solvedArr[move][0], solvedArr[move][1]);
        }

        console.log("end of move ", i);
    } // End solution move loop
}

function clearSolution() {
    while (solDiv.firstChild) {
        solDiv.removeChild(solDiv.firstChild);
    }
}