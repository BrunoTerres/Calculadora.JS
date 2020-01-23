let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".display");

/**document.querySelector('keyboard-keys').addEventListener("click", function(event){
    console.log("here");
    buttonClick(event.target.value);
});**/

document
    .querySelector(".keyboard-key")
    .addEventListener("click", function(event) {
        console.log(event.target);
        buttonClick(event.target.innerText);
    });

function  buttonClick(value) {
    if (isNaN(parseInt(value))){
        handleSymbol(value);
    }else {
        handleNumber(value);
    }
}

function handleNumber(value) {
    if (buffer === 0) {
        buffer = value;
    }else {
        buffer += value;
    }
    rerender();
}

function handleSymbol(value) {

}

function rerender() {
    screen.innerText = buffer;
}
