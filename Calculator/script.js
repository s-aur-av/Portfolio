const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let expression = "";

function updateDisplay(value) {
  display.textContent = value || "0";
}

function appendValue(value) {
  const lastChar = expression.slice(-1);
  const operators = ["+", "-", "*", "/", "%"];

  if (operators.includes(value) && operators.includes(lastChar)) {
    expression = expression.slice(0, -1) + value;
  } else if (value === "." && expression.split(/[+\-*/%]/).pop().includes(".")) {
    return;
  } else {
    expression += value;
  }

  updateDisplay(expression);
}

function calculate() {
  if (!expression) return;

  try {
    const percentExpression = expression.replace(
      /(\d+\.?\d*)%(\d+\.?\d*)/g,
      "(($1/100)*$2)"
    );
    const result = Function('"use strict"; return (' + percentExpression + ')')();
    expression = Number.isInteger(result) ? String(result) : String(Number(result.toFixed(8)));
    updateDisplay(expression);
  } catch {
    expression = "";
    updateDisplay("Error");
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "clear") {
      expression = "";
      updateDisplay(expression);
      return;
    }

    if (action === "delete") {
      expression = expression.slice(0, -1);
      updateDisplay(expression);
      return;
    }

    if (action === "calculate") {
      calculate();
      return;
    }

    appendValue(value);
  });
});

document.addEventListener("keydown", (event) => {
  const allowedKeys = "0123456789+-*/%.";

  if (allowedKeys.includes(event.key)) {
    appendValue(event.key);
  } else if (event.key === "Enter") {
    calculate();
  } else if (event.key === "Backspace") {
    expression = expression.slice(0, -1);
    updateDisplay(expression);
  } else if (event.key === "Escape") {
    expression = "";
    updateDisplay(expression);
  }
});
