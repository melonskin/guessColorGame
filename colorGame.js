var colorNum = 6;
var backgroundColor = "#232323";
var h1bgColor = "steelblue";
var colors;
var pickedColor;

var squares = document.getElementsByClassName("square");
var colorDisplayed = document.getElementById("color-displayed");
var messageDisplayed = document.querySelector("#message");
var headH1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.getElementById("easy");
var hardButton = document.getElementById("hard");

resetGame();
hardButton.classList.toggle("selected");

addSquareListener();

resetButton.addEventListener("click", resetGame);

easyButton.addEventListener("click", function () {
    changeMode(3);
  });

hardButton.addEventListener("click", function () {
    changeMode(6);
  });

function changeMode(num) {
    if (colorNum != num) {
        toggleLast3Display();
        colorNum = num;
        easyButton.classList.toggle("selected");
        hardButton.classList.toggle("selected");
        resetGame();
    }
}

function resetGame() {
    colors = generateRandColors(colorNum);
    pickedColor = pickColor();
    colorDisplayed.textContent = pickedColor;
    for (var i = 0; i < colorNum; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
    messageDisplayed.textContent = "";
    resetButton.textContent = "New Colors";
    headH1.style.backgroundColor = h1bgColor;
}

function addSquareListener() {
    for (var i = 0; i < squares.length; i++) {
        // listener
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor == pickedColor) {
                for (var j = 0; j < squares.length; j++) {
                    squares[j].style.backgroundColor = clickedColor;
                }
                messageDisplayed.textContent = "Correct";
                headH1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again";
            } else {
                this.style.backgroundColor = backgroundColor;
                messageDisplayed.textContent = "Try Again";
            }
        });
    }
}

function toggleLast3Display() {
    for (var i = 3; i < squares.length; i++) {
        squares[i].classList.toggle("displayed");
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colorNum);
    return colors[random];
}

function generateRandColors(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        var randCol = randColor();
        while (arr.includes(randCol)) {
            randCol = randColor();
        }
        arr.push(randCol);
    }

    return arr;
}

function randColor() {
    var ans = "rgb(";
    ans += pickInt(255);
    ans += ", " + pickInt(255);
    ans += ", " + pickInt(255) + ")";
    return ans;
}

function pickInt(upperBound) {
    return Math.floor(Math.random() * (upperBound + 1));
}