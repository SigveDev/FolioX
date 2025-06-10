import {
  Client,
  Account,
  Databases,
  ID,
  Permission,
  Role,
  Query,
  Storage,
} from "appwrite";

export const client = new Client();

client
  .setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ENDPOINT ||
      "https://cloud.appwrite.io/v1"
  )
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export { ID, Permission, Role, Query };
