const bcrypt = require("bcrypt");

/**
 * Hashes a password using bcrypt with a salt of 12 rounds
 * @async
 * @param {string} pw - The password to hash
 * @returns {Promise<void>} - A Promise that resolves with no value
 * @throws {Error} - If there is an error generating the hash or salt
 */
const hashPassword = async (pw) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hash);
  } catch (error) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
};

// /**
//  * Hashes the given plain text password with bcrypt.
//  *
//  * @async
//  * @param {string} pw - The plain text password to be hashed.
//  * @returns {Promise<void>} - A Promise that resolves with the hashed password.
//  */
// const hashPassword = async (pw) => {
//   const hash = await bcrypt.hash(pw, 12);
//   console.log(hash);
// };

// /**
//  * Compares the given plain text password with the hashed password.
//  *
//  * @async
//  * @param {string} pw - The plain text password to be compared.
//  * @param {string} hashedPw - The hashed password to compare against.
//  * @returns {Promise<void>} - A Promise that resolves with a log indicating whether the passwords match.
//  */
// const login = async (pw, hashedPw) => {
//   const result = await bcrypt.compare(pw, hashedPw);
//   if (result) {
//     console.log("LOGGED YOU IN! SUCCESSFUL MATCH!");
//   } else {
//     console.log("INCORRECT!");
//   }
// };

hashPassword("monkey");
// login("monkey", "$2b$12$gwF1pPXRll1gDUiLISu1texEpVnw5zM0DQyAp1jRvMuyNSOl7HeAy");
