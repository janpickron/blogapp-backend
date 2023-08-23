import { db } from "../mongoDB_Utility.js"
// MongoDB collection 'post'
const post = db.collection("post");

// all post FUNCTIONS
//  GET - reading post data
export const getAllPosts = async (req, res) => {
    try {
      const allPosts = await post.find().toArray();
      res.send(allPosts);
      console.log(allPosts);
    } catch (error) {
      res.status(500).json({ message: "Error reading all posts" });
    }
  };
  
  // POST - add new post data
 export const addNewPost = async (req, res) => {
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
    // res.send(newPost)
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
        console.log("Post title is found and content/date updated", req.body);
        res.send("Post updated.");
      }
      // modifiedCount is 0, title was not found and  404 response sent
      else {
        console.log("Title is not found and it is not updated");
        res.status(404).json({ message: "Title is not found" });
      }
    } catch (error) {
      console.log("Error update post", error);
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
  };
  