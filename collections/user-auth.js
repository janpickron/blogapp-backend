import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { db } from "../mongoDB_Utility.js";
// MongoDB collection 'users'
const users = db.collection("users");

// all user FUNCTIONS

// Get - Login email and password to match?
export const getFindUser = async (req, res) => {
  try {
    // a user with provided email and password
    const userFound = await users.findOne({ email: req.body.email });
    //
    // if (userFound && req.body.password === userFound.password) {
    if (userFound) {
      bcrypt.compare(
        req.body.password,
        userFound.password,
        (error, passwordOk) => {
          if (!error && passwordOk) {
            // res.send(userFound)
            console.log("User / password matched");
            res.send({ isAuthenticated: true });
          } else {
            console.log(error);
            // res.send({error: "User not found or incorrect password"})
            // not matching email and password
            res.send({ isAuthenticated: false });
          }
        }
      );
    } else {
      res.send({ error: "User not found or incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error finding an user" });
  }
};

// POST - adding user
export const addNewUser = async (req, res) => {
  // check if email has an '@' and '.com' or '.net'
  // also check if password has more than 8 complex characters
  if (req.body.email && req.body.password) {
    // add new user document
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await users.insertOne({
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
      });
      res.status(201).json({ message: "Added user successfully" });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ message: "Did not add user" });
    }
  }
};
