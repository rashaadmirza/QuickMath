// Get all the buttons and the display
const display = document.querySelector('.calc-dsp');
const buttons = document.querySelectorAll('.calc-btn');

// Variable to store the current input value
let currentInput = '0';

// Function to update the display
function updateDisplay(value) {
    display.value = value;
}

// Function to handle button clicks
function handleButtonClick(e) {
    const buttonValue = e.target.innerText;

    // If 'C' is clicked, reset the calculator
    if (buttonValue === 'C') {
        currentInput = '0';
    } 
    
    // If '=' is clicked, evaluate the expression
    else if (buttonValue === '=') {
        try {
            currentInput = eval(currentInput).toString();
        } catch (error) {
            currentInput = 'Error'; // In case of an invalid expression
        }
    } 
    
    // Handle the '±' button for changing sign
    else if (buttonValue === '+/-') {
        if (currentInput[0] === '-') {
            currentInput = currentInput.slice(1); // Remove the negative sign
        } else {
            currentInput = '-' + currentInput; // Add the negative sign
        }
    } 
    
    // Handle percentage button (%)
    else if (buttonValue === '%') {
        currentInput = (parseFloat(currentInput) / 100).toString();
    } 
    
    // If a number or operator is clicked, append it to current input
    else {
        if (currentInput === '0') {
            currentInput = buttonValue;
        } else {
            currentInput += buttonValue;
        }
    }

    // Update the display
    updateDisplay(currentInput);
}

// Attach event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
