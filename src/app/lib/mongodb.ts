import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

async function connectToDatabase() {
  if (typeof MONGODB_URI !== 'string') {
    throw new Error("MONGODB_URI must be a string");
  }
  return mongoose.connect(MONGODB_URI);
}

export default connectToDatabase;