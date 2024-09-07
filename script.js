// Select the display and buttons
const display = document.getElementById('display');
let currentInput = '';   // Tracks the current input
let previousInput = '';  // Tracks the previous input
let operator = '';       // Tracks the selected operator

// Add event listeners to each button
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        const buttonValue = this.textContent;

        if (buttonValue === 'C') {
            clearDisplay();
        } else if (buttonValue === '←') {
            deleteLastChar();
        } else if (buttonValue === '=') {
            calculateResult();
        } else if (['+', '-', '*', '/'].includes(buttonValue)) {
            chooseOperator(buttonValue);
        } else {
            appendNumber(buttonValue);
        }
    });
});

// Function to clear the display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.textContent = '0';
}

// Function to delete the last character
function deleteLastChar() {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || '0';
}

// Function to append numbers or decimal to the display
function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    display.textContent = currentInput;
}

// Function to choose an operator
function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Function to calculate the result
function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result;
    operator = '';
    previousInput = '';
    display.textContent = result;
}
