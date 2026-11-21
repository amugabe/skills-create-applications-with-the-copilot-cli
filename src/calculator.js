"use strict";

/**
 * Supported operations:
 * - addition(a, b): adds two numbers
 * - subtraction(a, b): subtracts b from a
 * - multiplication(a, b): multiplies two numbers
 * - division(a, b): divides a by b (b cannot be zero)
 */

function validateNumbers(a, b) {
  if (typeof a !== "number" || typeof b !== "number" ||
      !Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError("Both operands must be finite numbers");
  }
}

function addition(a, b) {
  validateNumbers(a, b);
  return a + b;
}

function subtraction(a, b) {
  validateNumbers(a, b);
  return a - b;
}

function multiplication(a, b) {
  validateNumbers(a, b);
  return a * b;
}

function division(a, b) {
  validateNumbers(a, b);
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

function parseOperand(value) {
  const operand = Number(value);
  if (value === undefined || value.trim() === "" || !Number.isFinite(operand)) {
    throw new TypeError(`Invalid number: ${value}`);
  }
  return operand;
}

function runCli(args) {
  if (args.length !== 3) {
    throw new Error(
      "Usage: node src/calculator.js <operation> <number1> <number2>\n" +
      "Operations: addition (+), subtraction (-), multiplication (*), division (/)"
    );
  }

  const [operation, leftValue, rightValue] = args;
  const operations = {
    addition: addition,
    add: addition,
    "+": addition,
    subtraction: subtraction,
    subtract: subtraction,
    "-": subtraction,
    multiplication: multiplication,
    multiply: multiplication,
    "*": multiplication,
    division: division,
    divide: division,
    "/": division,
  };

  const calculate = operations[operation.toLowerCase()];
  if (!calculate) {
    throw new Error(`Unsupported operation: ${operation}`);
  }

  return calculate(parseOperand(leftValue), parseOperand(rightValue));
}

if (require.main === module) {
  try {
    console.log(runCli(process.argv.slice(2)));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  runCli,
};
