import { ObjectId } from "mongodb";
import { db } from "../mongoDB_Utility.js";
// MongoDB collection 'post'
const post = db.collection("post");

// all post FUNCTIONS
//  GET - reading post data
export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await post.find().toArray();
    res.send(allPosts);
  } catch (error) {
    res.status(500).json({ message: "Error reading all posts" });
  }
};

// get the unique id from API
export const getID = async (req, res) => {
  try {
    const specialId = new ObjectId(req.params.id);
    // find the id and grab the data
    const itemFound = await post.findOne({ _id: specialId });
    res.send(itemFound);
  } catch (error) {
    res.status(500).json({ message: "Error reading ID" });
  }
};

// POST - add new post data
export const addNewPost = async (req, res) => {
  try {
    // add new post document
    const newPost = await post.insertOne(req.body);
    res.status(201).json({ message: "New post added successfully" });

    // something wrong with adding a new post document
  } catch (error) {
    console.error("Error adding new post:", error);
    res.status(500).json({ message: "Error adding new post" });
  }
};

// PUT - update a blog post by id
export const updatePost = async (req, res) => {
  try {
    const specialId = new ObjectId(req.params.id);
    const filter = { _id: specialId };
    const update = { $set: req.body };
    const postFound = await post.findOneAndUpdate(filter, update);

    // use postFound to check if any documents were modified during update process
    if (postFound) {
      res.json("Post updated.");
    }
    // post is not found and  404 response sent
    else {
      res.status(404).json({ message: "Post is not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error update post" });
  }
};

// DELETE  - delete a menu item by title
export const deletePost = async (req, res) => {
  try {
    const specialId = new ObjectId(req.params.id);
    const itemToDelete = await post.findOneAndDelete({
      _id: specialId,
    });

    if (itemToDelete) {
      // The deleted item is available in itemToDelete.value
      res.send("Deleted");
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
};
