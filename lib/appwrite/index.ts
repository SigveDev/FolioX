"use server";

import { Account, Databases, Storage } from "node-appwrite";
import { cookies } from "next/headers";
import { client } from "./client";

export async function createSessionClient() {
  const cookieStore = await cookies();
  const session = cookieStore.get(
    process.env.NEXT_PUBLIC_APPWRITE_COOKIE_KEY || "appwrite_session"
  );
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}

export async function createAdminClient() {
  const { Client } = await import("node-appwrite");
  const adminClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ENDPOINT || "")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
    .setKey(process.env.NEXT_APPWRITE_KEY || "");

  console.log("Admin client created with key:", process.env.NEXT_APPWRITE_KEY);

  return {
    get accountAdmin() {
      return new Account(adminClient);
    },
    get databaseAdmin() {
      return new Databases(adminClient);
    },
  };
}
