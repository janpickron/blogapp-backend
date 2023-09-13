// communicate with Node Express API
import express from "express";
// node.js package for providing a Connect/Express middleware that communicate with a browser
import cors from "cors";
// get all functions from post.js file
import {
  getAllPosts,
  getID,
  addNewPost,
  updatePost,
  deletePost,
} from "./collections/post.js";

// get all function from user-auth.js file
import { getFindUser, addNewUser } from "./collections/user-auth.js";

// ENVIRONMENT VARIABLE
const port = process.env.PORT || 4040;

const app = express();
// browser can interact with API
app.use(cors());
// allows us to receive JSON objects
app.use(express.json());

// API endpoints for User Authentication CRUD
app.post("/login", getFindUser);
app.post("/add-user", addNewUser);

// API endpoints for Blog posts CRUD
app.get("/", getAllPosts);
app.get("/single-post/:id", getID);
app.post("/", addNewPost);
app.put("/single-post/:id", updatePost);
app.delete("/single-post/:id", deletePost);

app.listen(port, () => {
  console.log(`API listening on port ${port}.`);
});
