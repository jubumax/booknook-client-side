import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error("MONGODB_URI is missing.");
}

if (!dbName) {
  throw new Error("MONGODB_DB is missing.");
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

export const db = client.db(dbName);