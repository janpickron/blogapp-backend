import { ObjectId } from "mongodb";
import { db } from "../mongoDB_Utility.js";
// MongoDB collection 'users'
const users = db.collection("users");

// all user FUNCTIONS

// Get - find user and password to match
export const getFindUser = async (req, res) => {
  try {
    console.log("begin looking for provided user/password");
    const userFound = await users.findOne({ email: req.body.email })
    // a user with provided email and password

    console.log("findUser is:" , userFound)
    if (userFound && (req.body.password === userFound.password)) {
       console.log("User / password matched")
       res.send({isAuthenticated:true})
    } else {
        // not matching email and password
        res.send('User is not allowed')
    }
  } catch (error) {
    res.status(500).json({ message: "Error finding an user" });
  }
};

// POST - adding user
export const addNewUser = async (req, res) => {
  // add new user document
  try {
    const newUser = await users.insertOne(req.body);
    console.log("Added user")
    // res.send(newUser)
    res.status(201).json({ message: "Added user successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Did not add user" });
  }
};
