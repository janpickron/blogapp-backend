// communicate with Node Express API
import express from "express";
// node.js package for providing a Connect/Express middleware that communicate with a browser
import cors from "cors";
// get data from MongoDB as a client
import { MongoClient } from "mongodb";
// variable for MongoDB URI with SRV Connection Format
const MONGO_URI =
  "mongodb+srv://janpickron:12345@cluster0.cki3lkd.mongodb.net/";
const client = new MongoClient(MONGO_URI);
// MongoDB database name 'blog'
const db = client.db("blog");
// MongoDB collection name 'post'
const post = db.collection("post");

// ENVIRONMENT VARIABLE
const port = process.env.PORT || 4040;

const app = express();
// browser can interact with API
app.use(cors());
// allows us to receive JSON objects
app.use(express.json());

app.listen(port, () => {
  console.log(`API listening on port ${port}.`);
});

//  GET - reading data
app.get("/post", async (req, res) => {
  try {
    const allPosts = await post.find().toArray();
    res.send(allPosts);
    console.log(allPosts);
  } catch (error) {
    res.status(500).json({ message: "Error reading all posts" });
  }
});

// POST - add new post data
app.post("/post", async (req, res) => {
  console.log(req.body);
  try {
    // add new post document
    const newPost = await post.insertOne(req.body);
    res.status(201).json({ message: "New post created successfully" });

    console.log("Post added", newPost);
    // something wrong with adding a new post document
  } catch (error) {
    console.error("Error adding new post:", error);
    res.status(500).json({ message: "Error adding new post" });
  }
});

// PUT - update a menu item by title
app.put("/", (req, res) => {
  // get the title from req query and find item on array
  const itemFound = post.find(
    (eachItem) => eachItem.title === req.query.title
  );
  // find the index of selected menu item
  const indexOfItem = post.indexOf(itemFound);
  // replace the selected menu item with new update in the req.body of ThunderClient
  menuData.splice(indexOfItem, 1, req.body);
  handleJsonFileUpdate();
  res.send(post);
  console.log("Thank you for updating menu item");
});

// DELETE  - delete a menu item by title
app.delete("/post", async (req, res) => {
  try {
    const itemToDelete = await post.findOneAndDelete({
      title: req.query.title,
    });

    if (itemToDelete.value) {
      // The deleted item is available in itemToDelete.value
      console.log("Deleted:", itemToDelete.value);
      res.send("Deleted");
    } else {
      console.log("Item not found");
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Error deleting item" });
  }
});

// // DELETE all menu items
// app.delete("/deleteAll", (req, res) => {
//   // convert to JSON
//   const jsonMenuData = JSON.stringify([]);
//   fs.writeFile("menu-items.json", jsonMenuData, (err) => console.log(err));
//   res.sendStatus(menuData);
//   console.log("All menu items are empty.");
// });
