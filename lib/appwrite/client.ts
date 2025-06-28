import { Client, ID, Permission, Role, Query } from "node-appwrite";

export const client = new Client();

client
  .setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ENDPOINT ||
      "https://cloud.appwrite.io/v1"
  )
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

export { ID, Permission, Role, Query };
