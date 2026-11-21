"use strict";

/**
 * Supported operations:
 * - addition(a, b): adds two numbers
 * - subtraction(a, b): subtracts b from a
 * - multiplication(a, b): multiplies two numbers
 * - division(a, b): divides a by b (b cannot be zero)
 * - modulo(a, b): returns the remainder of a divided by b (b cannot be zero)
 * - power(base, exponent): raises base to exponent
 * - squareRoot(n): returns the square root of n (n cannot be negative)
 */

function validateNumber(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError("Operand must be a finite number");
  }
}

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

function modulo(a, b) {
  validateNumbers(a, b);
  if (b === 0) {
    throw new Error("Cannot calculate modulo by zero");
  }
  return a % b;
}

function power(base, exponent) {
  validateNumbers(base, exponent);
  const result = Math.pow(base, exponent);
  if (!Number.isFinite(result)) {
    throw new RangeError("Power result must be a finite real number");
  }
  return result;
}

function squareRoot(n) {
  validateNumber(n);
  if (n < 0) {
    throw new RangeError("Cannot calculate the square root of a negative number");
  }
  return Math.sqrt(n);
}

function parseOperand(value) {
  const operand = Number(value);
  if (value === undefined || value.trim() === "" || !Number.isFinite(operand)) {
    throw new TypeError(`Invalid number: ${value}`);
  }
  return operand;
}

function runCli(args) {
  const usage =
    "Usage: node src/calculator.js <operation> <number1> [number2]\n" +
    "Operations: addition (+), subtraction (-), multiplication (*), division (/), " +
    "modulo (%), power (^), squareRoot (sqrt)";
  const [operation] = args;
  if (args.length < 2) {
    throw new Error(usage);
  }

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
    modulo: modulo,
    mod: modulo,
    "%": modulo,
    power: power,
    pow: power,
    "^": power,
    "**": power,
    squareroot: squareRoot,
    sqrt: squareRoot,
  };

  const calculate = operations[operation.toLowerCase()];
  if (!calculate) {
    throw new Error(`Unsupported operation: ${operation}`);
  }

  const isUnary = calculate === squareRoot;
  if ((isUnary && args.length !== 2) || (!isUnary && args.length !== 3)) {
    throw new Error(usage);
  }

  if (isUnary) {
    return calculate(parseOperand(args[1]));
  }
  return calculate(parseOperand(args[1]), parseOperand(args[2]));
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
  modulo,
  power,
  squareRoot,
  runCli,
};
