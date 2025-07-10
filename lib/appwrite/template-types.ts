import { createSessionClient } from "@/lib/appwrite";
import { Template_Types } from "@/types/template-types";
import { Query } from "@/lib/appwrite/client";

export async function getTemplateTypes() {
  try {
    const { database } = await createSessionClient();
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_TEMPLATE_TYPES_COLLECTION_ID ||
        "",
      []
    );

    return response.documents as Template_Types[];
  } catch (error) {
    console.error("Error fetching template types:", error);
    throw error;
  }
}

export async function getTemplateTypeFromUrlSlug(urlSlug: string) {
  try {
    const { database } = await createSessionClient();
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_TEMPLATE_TYPES_COLLECTION_ID ||
        "",
      [Query.equal("url_slug", urlSlug)]
    );

    if (response.documents.length > 0) {
      return response.documents[0] as Template_Types;
    }

    return null;
  } catch (error) {
    console.error("Error fetching template type by URL slug:", error);
    throw error;
  }
}
