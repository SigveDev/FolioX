import { database, Query, storage, ID, Permission, Role } from "@/lib/appwrite";
import { getCurrentUser } from "./account";

export const uploadNewResume = async (file: File) => {
  try {
    const user = await getCurrentUser();
    if (user) {
      if (!file) {
        throw new Error("No file selected for upload.");
      }
      const upload = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_PROFILE_RESUME_ID || "",
        ID.unique(),
        file,
        [
          Permission.read(Role.any()),
          Permission.write(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
      if (upload) {
        const userProfileDocuments = await database.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
          process.env
            .NEXT_PUBLIC_APPWRITE_DATABASE_USER_PROFILES_COLLECTION_ID || "",
          [Query.equal("user_id", user.$id)]
        );

        if (userProfileDocuments.documents.length === 0) {
          throw new Error("User profile not found");
        }

        const resumeUrl = `${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_PROFILE_RESUME_ID}/files/${upload.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

        const userProfileDocument = userProfileDocuments.documents[0];
        const updatedProfile = await database.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
          process.env
            .NEXT_PUBLIC_APPWRITE_DATABASE_USER_PROFILES_COLLECTION_ID || "",
          userProfileDocument.$id,
          {
            resume_url: resumeUrl,
          }
        );

        return updatedProfile;
      }
    }
  } catch (error) {
    console.error("Error uploading resume:", error);
    return null;
  }
};

export const deleteMyResume = async () => {
  try {
    const user = await getCurrentUser();
    if (user) {
      const userProfileDocuments = await database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USER_PROFILES_COLLECTION_ID ||
          "",
        [Query.equal("user_id", user.$id)]
      );

      if (userProfileDocuments.documents.length === 0) {
        throw new Error("User profile not found");
      }

      const userProfileDocument = userProfileDocuments.documents[0];
      const resumeUrl = userProfileDocument.resume_url;

      if (!resumeUrl) {
        throw new Error("No resume to delete.");
      }

      const fileId = resumeUrl.split("/files/")[1].split("/view")[0];

      await storage.deleteFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_PROFILE_RESUME_ID || "",
        fileId
      );

      const updatedProfile = await database.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USER_PROFILES_COLLECTION_ID ||
          "",
        userProfileDocument.$id,
        {
          resume_url: null,
        }
      );

      return updatedProfile;
    }
  } catch (error) {
    console.error("Error deleting resume:", error);
    return null;
  }
};
