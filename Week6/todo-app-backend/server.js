// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Creating an instance of Express
const app = express();

// Loading environment variables from a .env file into process.env
require("dotenv").config();

// Importing the Firestore database instance from firebase.js
const db = require("./firebase");

// Middlewares to handle cross-origin requests and to parse the body of incoming requests to JSON
app.use(cors());
app.use(bodyParser.json());

// Your API routes will go here...

// GET: Endpoint to retrieve all tasks
app.get("/tasks", async (req, res) => {
  try {
    // Fetching all documents from the "tasks" collection in Firestore
    const snapshot = await db.collection("tasks").get();

    let tasks = [];
    // Looping through each document and collecting data
    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id, // Document ID from Firestore
        ...doc.data(), // Document data
      });
    });

    // Sending a successful response with the tasks data
    res.status(200).send(tasks);
  } catch (error) {
    // Sending an error response in case of an exception
    res.status(500).send(error.message);
  }
});

// GET: Endpoint to retrieve all tasks for a user
// ...
app.get("/tasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const snapshot = await db
      .collection("tasks")
      .where("userId", "==", userId)
      .get();
    let tasks = [];
    snapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST: Endpoint to add a new task
// ...
app.post("/tasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const task = req.body;
    const taskRef = await db.collection("tasks").add({ ...task, userId });
    res.status(201).send({ id: taskRef.id, ...task });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE: Endpoint to remove a task
// ...
app.delete("/tasks/:userId/:taskId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const taskRef = await db.collection("tasks").doc(taskId).delete();
    res.status(200).send({ id: taskId });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3001;
// Starting the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
