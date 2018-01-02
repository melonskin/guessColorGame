var colorNum = 6;
var colors;

var pickedColor;
var squares = document.getElementsByClassName("square");
var colorDisplayed = document.getElementById("color-displayed");
var messageDisplayed = document.querySelector("#message");
var headH1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");

resetGame();
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
            resetButton.textContent = "New Game";
        } else {
            this.style.backgroundColor = "#232323";
            messageDisplayed.textContent = "Try Again";
        }
    });
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    colors = generateRandColors(colorNum);
    pickedColor = pickColor();
    colorDisplayed.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
    resetButton.textContent = "New Colors";
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
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