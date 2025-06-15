import {
  Client,
  Account,
  Databases,
  ID,
  Permission,
  Role,
  Query,
  Storage,
} from "node-appwrite";

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

export async function createAdminClient() {
  const adminClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ENDPOINT || "")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
    .setKey(process.env.NEXT_APPWRITE_KEY || "");

  return {
    get databaseAdmin() {
      return new Databases(adminClient);
    },
  };
}
