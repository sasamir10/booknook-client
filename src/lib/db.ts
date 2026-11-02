import "server-only";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/booknook";
const databaseName = process.env.DB_NAME ?? "booknook";

const globalMongo = globalThis as typeof globalThis & { bookNookMongo?: MongoClient };
export const mongoClient = globalMongo.bookNookMongo ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") globalMongo.bookNookMongo = mongoClient;

export const authDb = mongoClient.db(databaseName);
