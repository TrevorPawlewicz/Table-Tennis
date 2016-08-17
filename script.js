//
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
const PADDLE_HEIGHT = 100;

function calculateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    }
}

window.onload = function(){
    console.log("window loaded -- javascript!");

    canvas = document.getElementById('gameCanvas'); // index.html
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function(){
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', function(event){
        var mousePos = calculateMousePos(event);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2); // center pointer to paddle
    });
}

function moveEverything() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if ((ballX >= canvas.width) || (ballX < 0)) {
        ballSpeedX = - ballSpeedX;
    }
    if ((ballY >= canvas.height) || (ballY < 0)) {
        ballSpeedY = - ballSpeedY;
    }
};

function drawEverything(){
    // shape order determines the Z axis (first is background, last is front)
    //-----------------------------------------------------------------------
    //        x, y, width,        height,         color
    colorRect(0, 0, canvas.width, canvas.height, 'black'); // canvas
    colorRect(0, paddle1Y, 10, PADDLE_HEIGHT, 'white'); // left paddle
    colorCircle(ballX, ballY, 10, 'white'); // draw circle
};

function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
};

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
};
