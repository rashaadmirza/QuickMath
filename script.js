let display = document.querySelector('.calc-dsp');
let fullCalculationDisplay = document.querySelector('.calc-full-calc');
let currentInput = '0';
let operator = null;
let operand1 = null;
let shouldResetDisplay = false;

// Event listener for button clicks
document.querySelectorAll('.calc-btn').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText;
    handleButtonPress(value);
  });
});

// Main function to handle button press actions
function handleButtonPress(value) {
  if (isDigit(value)) {
    appendNumber(value);
  } else if (value === '.') {
    appendDecimal();
  } else if (value === 'C') {
    clearDisplay();
  } else if (value === '±') {
    toggleSign();
  } else if (value === '%') {
    calculatePercentage();
  } else if (isOperator(value)) {
    setOperator(value);
  } else if (value === '=') {
    calculateResult();
  }
}

// Check if the value is a digit
function isDigit(value) {
  return !isNaN(value);
}

// Check if the value is an operator
function isOperator(value) {
  return value === '+' || value === '-' || value === '×' || value === '÷';
}

// Append number to the display
function appendNumber(number) {
  if (shouldResetDisplay) {
    display.value = '';
    shouldResetDisplay = false;
  }
  if (display.value === '0') {
    display.value = number;
  } else {
    display.value += number;
  }
  currentInput = display.value;
  updateFullCalculationDisplay();
}

// Append decimal point if not already present
function appendDecimal() {
  if (shouldResetDisplay) {
    display.value = '0';
    shouldResetDisplay = false;
  }
  if (!display.value.includes('.')) {
    display.value += '.';
  }
  updateFullCalculationDisplay();
}

// Clear display and reset all values
function clearDisplay() {
  display.value = '0';
  fullCalculationDisplay.value = '';
  currentInput = '0';
  operator = null;
  operand1 = null;
  shouldResetDisplay = false;
}

// Toggle the sign of the current input
function toggleSign() {
  if (display.value !== '0') {
    display.value = display.value.startsWith('-')
      ? display.value.slice(1)
      : '-' + display.value;
  }
  currentInput = display.value;
  updateFullCalculationDisplay();
}

// Convert current input to a percentage
function calculatePercentage() {
  display.value = (parseFloat(display.value) / 100).toString();
  currentInput = display.value;
  updateFullCalculationDisplay();
}

// Set operator and store the first operand
function setOperator(op) {
  if (operator && !shouldResetDisplay) {
    calculateResult();
  }
  operand1 = parseFloat(display.value);
  operator = op;
  shouldResetDisplay = true;
  updateFullCalculationDisplay();
}

// Calculate the result based on operator
function calculateResult() {
  if (!operator || shouldResetDisplay) return;

  const operand2 = parseFloat(display.value);
  let result;

  switch (operator) {
    case '+':
      result = operand1 + operand2;
      break;
    case '-':
      result = operand1 - operand2;
      break;
    case '×':
      result = operand1 * operand2;
      break;
    case '÷':
      result = operand2 !== 0 ? operand1 / operand2 : 'Error';
      break;
    default:
      return;
  }

  display.value = result.toString();
  fullCalculationDisplay.value = `${operand1} ${operator} ${operand2} =`;
  currentInput = display.value;
  operand1 = result;
  operator = null;
  shouldResetDisplay = true;
}

// Update the full calculation display
function updateFullCalculationDisplay() {
  if (operator && shouldResetDisplay) {
    // Display the first operand and operator only, waiting for the next operand
    fullCalculationDisplay.value = `${operand1} ${operator}`;
  } else {
    // Show full calculation as it progresses
    fullCalculationDisplay.value = operator
      ? `${operand1} ${operator} ${display.value}`
      : display.value;
  }
}
