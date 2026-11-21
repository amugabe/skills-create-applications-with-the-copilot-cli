"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  runCli,
} = require("../calculator");

test("addition adds two numbers", () => {
  assert.equal(addition(7, 8), 15);
});

test("subtraction subtracts the second number", () => {
  assert.equal(subtraction(9, 4), 5);
});

test("multiplication multiplies two numbers", () => {
  assert.equal(multiplication(6, 7), 42);
});

test("division divides the first number by the second", () => {
  assert.equal(division(15, 3), 5);
});

test("division by zero throws a helpful error", () => {
  assert.throws(() => division(10, 0), /Cannot divide by zero/);
});

test("modulo returns the remainder as in the example", () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(modulo(20, 6), 2);
  assert.equal(modulo(-20, 6), -2);
});

test("modulo by zero throws a helpful error", () => {
  assert.throws(() => modulo(10, 0), /Cannot calculate modulo by zero/);
});

test("power raises the base to the exponent", () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(2, -2), 0.25);
});

test("power rejects results that are not finite real numbers", () => {
  assert.throws(() => power(0, -1), /finite real number/);
  assert.throws(() => power(-2, 0.5), /finite real number/);
});

test("squareRoot returns the square root", () => {
  assert.equal(squareRoot(16), 4);
  assert.equal(squareRoot(25), 5);
  assert.equal(squareRoot(0), 0);
});

test("squareRoot rejects negative numbers", () => {
  assert.throws(() => squareRoot(-1), /negative number/);
});

test("CLI supports modulo, power, and square root", () => {
  assert.equal(runCli(["%", "5", "2"]), 1);
  assert.equal(runCli(["^", "2", "3"]), 8);
  assert.equal(runCli(["sqrt", "16"]), 4);
  assert.equal(runCli(["%", "20", "6"]), 2);
  assert.equal(runCli(["sqrt", "25"]), 5);
});

test("operations reject non-numeric operands", () => {
  assert.throws(() => addition("1", 2), /finite numbers/);
});
