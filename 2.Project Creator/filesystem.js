const fs = require("fs");
const folderName = process.argv[2] || "Project";

// Async

// fs.mkdir("Dogs", { recursive: true }, (err) => {
//   console.log("Callback!");
//   if (err) throw err;
// });

const data = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Boilerplate</title>
</head>
<body>
    <script src="app.js"></script>
</body>
</html>
`;

// Create a new folder and files for a basic HTML, CSS, and JS project.

try {
  fs.mkdirSync(folderName);

  console.log(`Successfully Created ${folderName} Folder!`);

  fs.writeFileSync(`${folderName}/index.html`, data);

  console.log(`Successfully Created "index.html" File!`);

  fs.writeFileSync(`${folderName}/styles.css`, "");

  console.log(`Successfully Created "styles.css" File!`);

  fs.writeFileSync(`${folderName}/app.js`, "");

  console.log(`Successfully Created "index.js" File!`);
} catch (e) {
  console.log("SOMETHING WENT WRONG!!!!");
  console.log(e);
}
