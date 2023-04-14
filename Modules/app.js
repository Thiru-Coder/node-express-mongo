/**
 * This is the main file of the project.
 * It imports the add and subtract functions from the math module,
 * and the cats array from the cats module.
 * It then uses those imported functions and array to log some output to the console.
 */

const { add, subtract } = require("./math");
const cats = require("./cats");

/**
 * Adds two numbers.
 *
 * @param {number} a - The first number to add.
 * @param {number} b - The second number to add.
 * @returns {number} The sum of `a` and `b`.
 */
console.log(add(1, 2));

/**
 * Subtracts two numbers.
 *
 * @param {number} a - The number to subtract from.
 * @param {number} b - The number to subtract.
 * @returns {number} The difference of `a` and `b`.
 */
console.log(subtract(5, 2));

/**
 * Array of cat names.
 *
 * @type {string[]}
 */
console.log(cats);
