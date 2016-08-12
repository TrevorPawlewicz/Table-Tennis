//
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 0;
var ballSpeedX = 5;

window.onload = function(){
    console.log("window loaded -- javascript!");

    canvas = document.getElementById('gameCanvas'); // index.html
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function(){
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);
}


function drawEverything(){
    // shape order determines the Z axis (first is background, last is front)
    canvasContext.fillStyle = 'black';
    //                     x, y, width,        height
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, 210, 10, 100);
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(ballX, 100, 10, 10);
}

function moveEverything() {
    ballX = ballX + 5;
    ballSpeedX = ballSpeedX + 1;
}
