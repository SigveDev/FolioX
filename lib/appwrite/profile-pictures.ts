import { database, Query, storage, ID, Permission, Role } from "@/lib/appwrite";
import { getCurrentUser } from "./account";

export const uploadNewProfilePicture = async () => {
  try {
    const user = await getCurrentUser();
    if (user) {
      const input = document.getElementById(
        "profile-picture-upload"
      ) as HTMLInputElement | null;
      console.log("Input element:", input);
      if (!input || !input.files || input.files.length === 0) {
        throw new Error("No file selected for upload.");
      }
      const upload = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_PROFILE_PICTURES_ID || "",
        ID.unique(),
        input.files[0],
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

        const avatarUrl = `${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_PROFILE_PICTURES_ID}/files/${upload.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

        const userProfileDocument = userProfileDocuments.documents[0];
        const updatedProfile = await database.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
          process.env
            .NEXT_PUBLIC_APPWRITE_DATABASE_USER_PROFILES_COLLECTION_ID || "",
          userProfileDocument.$id,
          {
            avatar_url: avatarUrl,
          }
        );

        return updatedProfile;
      }
    }
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return null;
  }
};
