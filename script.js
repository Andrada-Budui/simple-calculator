let calculator = {
    displayValue: "0",
    firstOperand: 0,
    // secondOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    error: null,
};

let keys = document.querySelectorAll(".key");
keys.forEach((key) => {
    key.addEventListener("click", (event) => {
        const { target } = event;
        if (target.classList.contains("number")) {
            inputDigit(target.innerHTML);
            updateDisplay();
            return;
        }
        if (target.classList.contains("decimal")) {
            inputDecimal(target.innerHTML);
            updateDisplay();
            return;
        }
        if (target.classList.contains("operation")) {
            handleOperation(target.innerHTML);
            updateDisplay();
            return;
        }
        if (target.classList.contains("clear")) {
            resetCalculator();
            updateDisplay();
            return;
        }
        if (target.classList.contains("delete")) {
            backspace();
            updateDisplay();
            return;
        }
    });
});

function updateDisplay() {
    const display = document.querySelector(".display");
    display.innerHTML = calculator.displayValue;
}

updateDisplay();

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue =
            displayValue === "0" ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = "0.";
        calculator.waitingForSecondOperand = false;
        return;
    }
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperation(nextOperator) {
    // let { firstOperand, secondOperand, displayValue, operator } = calculator;
    let { firstOperand, displayValue, operator } = calculator;
    const input = parseFloat(displayValue);
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }
    if (firstOperand === 0 && !isNaN(input)) {
        calculator.firstOperand = input;
    } else if (operator) {
        // secondOperand = input;
        const result = calculate(firstOperand, input, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === "+") {
        return firstOperand + secondOperand;
    } else if (operator === "-") {
        return firstOperand - secondOperand;
    } else if (operator === "x") {
        return firstOperand * secondOperand;
    } else if (operator === "/") {
        return firstOperand / secondOperand;
    }
    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstOperand = 0;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    calculator.error = null;
}

function backspace() {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (displayValue.length > 1) {
        calculator.displayValue = displayValue.slice(0, -1);
    } else {
        calculator.displayValue = "0";
    }
}
