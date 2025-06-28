import { createSessionClient } from "@/lib/appwrite";
import { Query } from "appwrite";
import { Template } from "@/types/template";

export async function getTemplates() {
  try {
    const { database } = await createSessionClient();
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_TEMPLATES_COLLECTION_ID || "",
      [Query.orderAsc("name")]
    );

    return response.documents as Template[];
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
}

export async function getTemplateById(templateId: string) {
  try {
    const { database } = await createSessionClient();
    const response = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_TEMPLATES_COLLECTION_ID || "",
      templateId
    );

    return response as Template;
  } catch (error) {
    console.error("Error fetching template by ID:", error);
    throw error;
  }
}
