import { database, Query, ID, Permission, Role } from "@/lib/appwrite";
import { getCurrentUser } from "./account";
import { Project } from "@/types/project";

export async function getMyProjects() {
  const user = await getCurrentUser();
  if (!user) return [];

  const response = await database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PROJECTS_COLLECTION_ID || "",
    [Query.equal("user_id", user.$id)]
  );
  return response.documents as Project[];
}
