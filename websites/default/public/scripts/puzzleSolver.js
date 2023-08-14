window.onload = function () {
    puzzCanv = document.getElementById("play-puzz");
    puzzCtx = puzzCanv.getContext("2d");

    puzzCanv.addEventListener("click", userClick)

    //drawLoop = setInterval(draw, 1000 / 15);
    draw();
}

function userClick() {
    alert("test");
}

function draw() {
    // Draw background
    puzzCtx.fillStyle = "black";
    puzzCtx.fillRect(0, 0, puzzCanv.width, puzzCanv.height);

    cellWidth = puzzCanv.width / 4;
    cellHeight = puzzCanv.height / 4;
}