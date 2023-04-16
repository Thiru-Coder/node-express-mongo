# NodeJS

A collection of simple Node.js applications suitable for beginners. Each app demonstrates a different aspect of Node.js, such as working with Express, MongoDB, or third-party APIs. The code is well-commented and easy to follow, making it a great resource for learning and practicing basic Node.js skills. Whether you're a complete beginner or looking to refresh your Node.js knowledge, this repository provides a variety of useful examples to get you started.

## AuthDemo

This Node.js application is a simple login system built with Express.js and MongoDB. The app allows users to register and login securely using hashed passwords. Sessions are used to maintain user authentication across requests, and middleware functions are implemented to protect certain routes from unauthorized access.

Features:
Register new users with a unique username and password.
Hashed passwords for security and privacy.
Login with a registered username and password.
Protect certain routes using middleware.
Logout and destroy user sessions.
This application is a great example of how to implement basic user authentication and session management in a Node.js application using popular packages such as Express, Mongoose, and bcrypt.

---

## BcryptDemo

This app has a function called hashPassword that accepts a password string as input, and returns a Promise that resolves with no value after hashing the input password using bcrypt with a salt of 12 rounds. The function first generates a salt using the bcrypt.genSalt() method, and then uses the salt to hash the password using the bcrypt.hash() method. The generated salt and hash are then logged to the console. If there is an error generating the hash or salt, the function throws an error with a message indicating the cause of the error.

---

## Console

This is a Node.js app that takes a name as an argument or falls back to the current user's username or "world". It then capitalizes the first letter of each word in the name and outputs a personalized greeting in the console. This script can be used as a simple template for building command-line interfaces that accept input arguments.

---

## Enchanced Performance

This is an Express app that sets up two routes, "/" and "/fast". The first route starts a new worker thread and sends its message as the response. The second route simply responds with a message. The app listens on port 3000.

---

## ExMonMoose

This is a Node.js app that creates a basic CRUD (Create, Read, Update, Delete) web application using the Express framework and MongoDB. The script defines a server using Express, sets up the connection to a MongoDB database, and creates routes for handling CRUD operations on a "Product" resource. The web application allows users to create new products, view a list of all products or filter by category, view individual product details, edit existing products, and delete products. The views are rendered using the EJS template engine. The script listens for incoming requests on port 3000.

---

## Express

This is an Express application that handles HTTP requests for uploading files. The application uses the "formidable" middleware to parse uploaded file data and render a form with the file data. The application also serves static assets and listens on a specified port number.

---

## ExpressAsyncErrors

This is a Node.js application that uses the Express web framework and Mongoose library for MongoDB to create a simple CRUD (Create, Read, Update, Delete) application for a farm products store.

It defines routes for displaying all products or products within a certain category, creating a new product, viewing a single product, editing a single product, and deleting a single product. The app also defines an async function to connect to the MongoDB database, middleware for handling URL-encoded form data and spoofed HTTP methods, and a utility function for wrapping async functions so that any errors are passed to Express's next() function.

The app renders views using the EJS templating engine and uses the AppError module to create custom error objects.

---

## ExpressBasicErrors

This app provides a good introduction to error handling and middleware in ExpressJS, as well as implementing a simple authentication method using a fake query parameter for demonstration purposes. It also shows how to use the morgan middleware to log requests to the console. Beginners can learn a lot by studying and experimenting with this code.
But it is not suitable for production use as the authentication method is not secure and there is no real error handling or logging implemented.

---

## FileSystem

This app creates a new folder with the given name (or "Project" if no name is provided), and then creates three files inside the folder: index.html, styles.css, and app.js. The index.html file contains the basic HTML structure, along with a reference to the styles.css and app.js files. The styles.css and app.js files are initially empty.

The code uses synchronous file system methods (fs.mkdirSync and fs.writeFileSync) to create the folder and files. If any errors occur during the creation process, the catch block is executed and an error message is logged to the console.

---

## Modules

This app demonstrates how to use the module system in Node.js to import functions and data from other modules.

---

## Mongoose

A small Movie app that uses Mongoose Model and Mongoose Schema with MongoDB and Express.

---

## Mongoose Relationships

This an example of using Mongoose to define relationship between models.

---

## Mongoose Relationships Express

This is an example of how you can use Mongoose to establish relationships between two models in an Express application.

---

## Rest API

This is a simple Express.js server that allows users to Create, Read, Update and Delete comments. It uses a fake database, an array of comments, to store and retrieve data. The server also has a couple of additional routes to demonstrate how to handle GET and POST requests with Express.js.

---

## Router and Cookies

### CookiesDemo

This is an example Express app with cookie handling functionality. It uses the cookie-parser middleware to handle cookies, and defines four routes.

### RouterDemo

An example of setting up a simple Express application that mounts three sets of routes: shelters, dogs, and admin.

---

## Server

This is a simple Node.js server that listens for incoming HTTP requests and responds with a greeting message. The server listens on a given port or a default port of 3000 if none is provided. The greeting message is personalized with the name passed as a parameter in the URL. The server also has a helper function called "capitalize" that capitalizes the first letter of each word in a given string.

---

## Session and Flash

### FlashDemo

It uses the "connect-flash" middleware to display flash messages on the web pages. When a message is flashed, it is stored in the session and is only displayed once, usually on the next page that is rendered.

### SessionDemo

It uses sessions to count page views and greet registered users.
