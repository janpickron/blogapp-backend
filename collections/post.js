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

// POST - add new post data
export const addNewPost = async (req, res) => {
  try {
    // add new post document
    const newPost = await post.insertOne(req.body);
    res.status(201).json({ message: "New post created successfully" });

    // something wrong with adding a new post document
  } catch (error) {
    console.error("Error adding new post:", error);
    res.status(500).json({ message: "Error adding new post" });
  }
};

// PUT - update a blog post by title
export const updatePost = async (req, res) => {
  try {
    // filter the title from req query and get body from req.body
    const filter = { title: req.query.title };
    const update = { $set: req.body };

    const postFound = await post.updateOne(filter, update);
    // use postFound.modifiedCount to check if any documents were modified during update process
    // If modifiedCount is greater than 0, post was found and updated
    if (postFound.modifiedCount > 0) {
      res.send("Post updated.");
    }
    // modifiedCount is 0, title was not found and  404 response sent
    else {
      res.status(404).json({ message: "Title is not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error update post" });
  }
};

// DELETE  - delete a menu item by title
export const deletePost = async (req, res) => {
  try {
    const itemToDelete = await post.findOneAndDelete({
      title: req.query.title,
    });

    if (itemToDelete.value) {
      // The deleted item is available in itemToDelete.value
      res.send("Deleted");
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
};
