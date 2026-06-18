import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

const options = {};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri?.trim()) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export default getClientPromise;

export async function getDb(): Promise<Db> {
  const connected = await getClientPromise();
  return connected.db();
}

export function isMongoConfigured(): boolean {
  return Boolean(uri?.trim());
}
