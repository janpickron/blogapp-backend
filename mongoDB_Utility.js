// get data from MongoDB as a client
import { MongoClient } from "mongodb";
import 'dotenv/config'

const client = new MongoClient(process.env.MONGO_URI);
// MongoDB database name 'blog'
export const db = client.db("blog");
