//
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 0;
var ballSpeedX = 10;

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

function moveEverything() {
    ballX = ballX + ballSpeedX;

    if ((ballX >= canvas.width) || (ballX < 0)) {
        ballSpeedX = - ballSpeedX;
    }
};


function drawEverything(){
    // shape order determines the Z axis (first is background, last is front)
    //-----------------------------------------------------------------------
    //        x, y, width,        height,         color
    colorRect(0, 0, canvas.width, canvas.height, 'black'); // canvas
    colorRect(0, 210, 10, 100, 'white'); // left paddle
    colorRect(ballX, 100, 10, 10, 'red'); // ball
};

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
};
