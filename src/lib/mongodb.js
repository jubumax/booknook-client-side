import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing. Add it to your .env.local file.");
}

let client;

if (process.env.NODE_ENV === "development") {
  
  if (!globalThis._booknookMongoClient) {
    globalThis._booknookMongoClient = new MongoClient(uri);
  }
  client = globalThis._booknookMongoClient;
} else {
  client = new MongoClient(uri);
}

export const db = client.db(process.env.MONGODB_DB);