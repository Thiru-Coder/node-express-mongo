#!/usr/bin/env node

/**
 * Capitalizes the first letter of each word in a string.
 *
 * @param {string} str - The input string to capitalize.
 * @returns {string} The capitalized string.
 */
function capitalize(str) {
  return str
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const nameArg = capitalize(
  process.argv[2] || process.env.USER || process.env.USERNAME || "world"
);

console.log(`Hello ${nameArg}!`);
