const cluster = require("cluster");
// NodeJS Standard Library

// Round robin (RR) process scheduling is disabled in windows
cluster.schedulingPolicy = cluster.SCHED_RR;

console.log(cluster.isMaster); //true
// Cluster Manager => isMaster = true

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child mode
  cluster.fork(); //set isMaster to false
  //   add more children
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  //Iam a Child
  const express = require("express");
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000); //Wait 5s for every request
    res.send("Hi there!");
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3000);
}
