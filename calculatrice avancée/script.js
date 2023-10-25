const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let result = '';

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        switch (value) {
            case 'C':
                clearDisplay();
                break;
            case '⌫':
                backspace();
                break;
            case '=':
                calculateResult();
                break;
            case '√':
                calculateSquareRoot();
                break;
            case 'log':
                calculateLog();
                break;
            case 'sin':
                calculateSin();
                break;
            case 'cos':
                calculateCos();
                break;
            case 'tan':
                calculateTan();
                break;
            default:
                addToCurrentInput(value);
                break;
        }
    });
});

function clearDisplay() {
    currentInput = '';
    result = '';
    display.value = '';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function addToCurrentInput(value) {
    currentInput += value;
    display.value = currentInput;
}

function calculateResult() {
    try {
        result = eval(currentInput);
        display.value = result;
    } catch (error) {
        display.value = 'Erreur';
    }
}

function calculateSquareRoot() {
    const number = parseFloat(currentInput);
    if (!isNaN(number)) {
        if (number >= 0) {
            result = Math.sqrt(number);
            display.value = result;
        } else {
            display.value = 'Erreur';
        }
    }
}


function calculateLog() {
    const number = parseFloat(currentInput);
    if (!isNaN(number) && number > 0) {
        result = Math.log10(number);
        display.value = result;
    } else {
        display.value = 'Erreur';
    }
}

function calculateSin() {
    const radians = parseFloat(currentInput);
    if (!isNaN(radians)) {
        result = Math.sin(radians);
        display.value = result;
    } else {
        display.value = 'Erreur';
    }
}

function calculateCos() {
    const radians = parseFloat(currentInput);
    if (!isNaN(radians)) {
        result = Math.cos(radians);
        display.value = result;
    } else {
        display.value = 'Erreur';
    }
}

function calculateTan() {
    const radians = parseFloat(currentInput);
    if (!isNaN(radians)) {
        result = Math.tan(radians);
        display.value = result;
    } else {
        display.value = 'Erreur';
    }
}

// Écoute de la touche "Enter" pour calculer le résultat
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        calculateResult();
    }
});
