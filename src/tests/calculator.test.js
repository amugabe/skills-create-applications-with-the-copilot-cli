"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const {
  addition,
  subtraction,
  multiplication,
  division,
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

test("operations reject non-numeric operands", () => {
  assert.throws(() => addition("1", 2), /finite numbers/);
});
