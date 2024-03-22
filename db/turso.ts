import 'dotenv/config';
import { ResultSet, createClient } from "@libsql/client";

if (!process.env.TURSO_DB_URI) {
  throw new Error("Turso DB URI not found; check .env");
}
if (!process.env.TURSO_DB_TOKEN) {
  throw new Error("Turso DB TOKEN not found; check .env");
}

const client = createClient({
  url: process.env.TURSO_DB_URI || "",
  authToken: process.env.TURSO_DB_TOKEN,
});

const testConnection = async (): Promise<ResultSet | null> => {
  try {
    const queryResult = await client.execute("SELECT * FROM users");
    console.log(queryResult);
    console.log("> Client Connected To SQLite DB");
    return queryResult;
  }
  catch (e: any) {
    console.error(e);
    return null;
  }
}

export { testConnection, client };

// const DB_URI: string | undefined = process.env.ATLAS_DB_URI;
// const DB_NAME: string | undefined = process.env.ATLAS_DB_NAME;


// type MDBConnection = {
//   client: MongoClient;
//   db: Db;
//   collections: Record<string, Collection<Document>>;
// }

// let _client: MongoClient | null = null;
// let _db: Db | null = null;
// let _collections: Record<string, Collection<Document>> | null = null;

// const connectToDatabase = async (): Promise<MDBConnection> => {
//   if (DB_URI === undefined) {
//     throw new Error("No DB string defined");
//   }

//   if (_client && _db && _collections) {
//     return {
//       client: _client,
//       db: _db,
//       collections: _collections
//     };
//   }

//   try {
//     // establish connection
//     const client = await MongoClient.connect(DB_URI);

//     // connect to specific database
//     const db = client.db(DB_NAME);

//     console.log({ db });

//     // get records
//     const collections = {
//       comments: db.collection("comments"),
//       movies: db.collection("movies")
//     };

//     // set cache
//     _client = client;
//     _db = db;
//     _collections = collections;

//     return { client, db, collections };
//   }
//   catch (e: any) {
//     throw new Error(e?.message ?? e.toString());
//   }

// }

// const getDb = (): Db | null => {
//   return _db;
// }

// export { connectToDatabase, getDb };
