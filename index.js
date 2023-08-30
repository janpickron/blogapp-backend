// communicate with Node Express API
import express from "express";
// node.js package for providing a Connect/Express middleware that communicate with a browser
import cors from "cors";
// get all functions from post.js file
import {
  getAllPosts,
  addNewPost,
  updatePost,
  deletePost,
} from "./collections/post.js";

// ENVIRONMENT VARIABLE
const port = process.env.PORT || 4040;

const app = express();
// browser can interact with API
app.use(cors());
// allows us to receive JSON objects
app.use(express.json());

app.get("/", getAllPosts);
app.post("/", addNewPost);
app.put("/", updatePost);
app.delete("/", deletePost);

app.listen(port, () => {
  console.log(`API listening on port ${port}.`);
});
