const calculator = {
  displayValue:'0',
  firstOperand : null,
  waitingForSecondOpe: false,
  operator : null,
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOpe } = calculator;
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    if (waitingForSecondOpe === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOpe = false;
    }else{
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;   
    }
    
    console.log(calculator);
  }

function inputDecimal(dot) {
    if (calculator.waitingForSecondOpe === true) return;
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  

    if (operator && calculator.waitingForSecondOpe)  {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
      }

    if (firstOperand === null) {
      calculator.firstOperand = inputValue;
    } else if(operator){
        //const currentValue = firstOperand || 0;
        const result = performCalculation[operator](firstOperand, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOpe = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  }
  
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
  };

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }
  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }
  //console.log('digit', target.value);
  inputDigit(target.value);
  updateDisplay();
});
