import "server-only";
import { configureDevelopmentDns } from "./development-dns";
import { MongoClient } from "mongodb";
import { serverEnvironment } from "./server-config";

if (configureDevelopmentDns(process.env.NODE_ENV, process.env.MONGODB_DNS_SERVERS)) {
  console.info("BookNook development DNS override enabled.");
}

const globalMongo = globalThis as typeof globalThis & { bookNookMongo?: MongoClient };
export const mongoClient = globalMongo.bookNookMongo ?? new MongoClient(serverEnvironment.MONGODB_URI);
if (process.env.NODE_ENV !== "production") globalMongo.bookNookMongo = mongoClient;

export const authDb = mongoClient.db(serverEnvironment.DB_NAME);
