import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // In development/build without ENV set, allow graceful error handling
  console.warn("MONGODB_URI is not defined in environment variables.");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cache = (global.mongooseCache ??= {
  conn: null,
  promise: null,
});

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("YOUR_USER") || uri.includes("YOUR_CLUSTER")) {
    throw new Error("MongoDB URI is a placeholder. Please configure valid credentials in .env.local.");
  }

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  try {
    cache.conn = await cache.promise;
    return cache.conn;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
}
