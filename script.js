var operatorsArray = ["/", "*", "+", "-"];
var operators = document.querySelectorAll(".operator");

var display = document.querySelector("#display");
var calculation = [];
var hasDecimal = false;
var lastPressed;

var buttons = document.querySelectorAll("button");


// Validate digit and add to current display string
function press(digit) {
    // Start a new display string
    if (display.innerText === "0" || operatorsArray.includes(lastPressed) ) {
        display.innerText = "";
    }

    // Remove active status from last operator
    for (var operatorEl of operators) {
        if (operatorEl.id === "active") {
            operatorEl.id = "";
        }
    }

    // Continue adding digits to current display number
    // Don't allow more than one decimal point
    if (!(digit === "." && hasDecimal === true)) {
        display.innerText += digit;
        lastPressed = digit;
    } else {
        console.log("NICE DECIMAL SYSTEM, DEWEY.");
    }

    if (digit === ".") {
        hasDecimal = true;
    }
}


function setOP(operator, element) {
    // Allow for negative numbers
    lastPressed = operator;
    if (operator === "-" && display.innerText === "0") {
        display.innerText = "-";
    }

    // Add operator to current calculation
    calculation.push(display.innerText);

    // Reset decimal status for next display number
    hasDecimal = false;

    // Add/remove active status
    var alreadyActive = false;

    for (var operatorEl of operators) {
        if (operatorEl.id === "active") {
            alreadyActive = true;
        }
    }

    if (alreadyActive === true) {
        console.log("NOPE. ANOTHER OPERATOR IS ALREADY ACTIVE.")
    } else {
        element.setAttribute("id", "active");
    }

    calculation.push(operator);
}


function calculate () {
    calculation.push(display.innerText);
    var calculated;

    for (var i = 0; i < calculation.length - 2; i += 2) {
        var previousNumber;
        if (calculated) {
            previousNumber = Number.parseFloat(calculated);
        } else {
            previousNumber = Number.parseFloat(calculation[i]);
        }

        var currentOp = calculation[i+1];

        var currentNumber = Number.parseFloat(calculation[i+2]);

        if (currentOp === "/") {
            calculated = previousNumber / currentNumber;
        } else if (currentOp === "*") {
            calculated = previousNumber * currentNumber;
        } else if (currentOp === "+") {
            calculated = previousNumber + currentNumber;
        } else if (currentOp === "-") {
            calculated = previousNumber - currentNumber;
        } else {
            console.log("Error with currentOp:", currentOp);
        }

        display.innerText = Number(calculated.toFixed(8));
    }
}


function clr() {
    display.innerText = "0";
    calculation = [];
    hasDecimal = false;
    lastPressed = undefined;
}
