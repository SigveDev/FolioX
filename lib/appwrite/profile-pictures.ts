import { database, Query, storage, ID, Permission, Role } from "@/lib/appwrite";
import { getCurrentUser } from "./account";

export const uploadNewProfilePicture = async (fileString: string) => {
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

      if (userProfileDocument.avatar_url) {
        const urlParts = userProfileDocument.avatar_url.split("/");
        const fileId =
          urlParts.length >= 2 ? urlParts[urlParts.length - 2] : "";
        const deleteResult = await storage.deleteFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_PROFILE_PICTURES_ID || "",
          fileId
        );
        if (!deleteResult) {
          throw new Error("Failed to delete existing profile picture");
        }
      }

      const matches = fileString.match(/^data:(.+);base64,(.+)$/);
      if (!matches) {
        throw new Error("Invalid image data format.");
      }
      const mimeType = matches[1];
      const base64Data = matches[2];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const fileExtension = mimeType.split("/")[1] || "png";
      if (!["png", "jpg", "jpeg", "gif"].includes(fileExtension)) {
        throw new Error("Invalid image file type.");
      }
      const fileName = `profile_picture.${fileExtension}`;
      const file = new File([byteArray], fileName, {
        type: mimeType,
      });
      if (!file) {
        throw new Error("No file selected for upload.");
      }
      const upload = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_PROFILE_PICTURES_ID || "",
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
        const avatarUrl = `${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_PROFILE_PICTURES_ID}/files/${upload.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

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
