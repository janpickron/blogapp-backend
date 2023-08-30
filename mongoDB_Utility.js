// get data from MongoDB as a client
import { MongoClient } from "mongodb";

// variable for MongoDB URI with SRV Connection Format
import mongo_connectionString from "./mongo_pwd.js"; // export default

// import {mongo_connectionString} from "./mongo_pwd.js";  // named export
// export from mongo_pwdÏ.js
const client = new MongoClient(mongo_connectionString);
// MongoDB database name 'blog'
export const db = client.db("blog");
