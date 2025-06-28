import { createSessionClient } from "@/lib/appwrite";
import { ID, Permission, Query, Role } from "@/lib/appwrite/client";
import { getCurrentUser } from "./account";
import { UserSocialLink, UserSocialLinkDto } from "@/types/user-social-links";

export const getUserSocialLinks = async () => {
  try {
    const { database } = await createSessionClient();
    const user = await getCurrentUser();
    const socialLinks = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env
        .NEXT_PUBLIC_APPWRITE_DATABASE_USER_SOCIAL_LINKS_COLLECTION_ID || "",
      [Query.equal("user_id", user.$id)]
    );

    if (socialLinks.documents.length === 0) {
      console.warn("No social links found for the user.");
      return [];
    }

    return socialLinks.documents as UserSocialLink[];
  } catch (error) {
    console.error("Error fetching user social links:", error);
    throw error;
  }
};

export const updateUserSocialLinks = async (
  socialLinks: UserSocialLinkDto[]
) => {
  try {
    const { database } = await createSessionClient();
    const user = await getCurrentUser();

    const existingLinksRes = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env
        .NEXT_PUBLIC_APPWRITE_DATABASE_USER_SOCIAL_LINKS_COLLECTION_ID || "",
      [Query.equal("user_id", user.$id)]
    );
    const existingLinks = existingLinksRes.documents as UserSocialLink[];

    const promises = socialLinks.map(async (link) => {
      const existing = existingLinks.find((l) => l.platform === link.platform);
      if (existing) {
        return database.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
          process.env
            .NEXT_PUBLIC_APPWRITE_DATABASE_USER_SOCIAL_LINKS_COLLECTION_ID ||
            "",
          existing.$id,
          {
            user_id: user.$id,
            platform: link.platform,
            url: link.url,
          }
        );
      } else {
        return database.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
          process.env
            .NEXT_PUBLIC_APPWRITE_DATABASE_USER_SOCIAL_LINKS_COLLECTION_ID ||
            "",
          ID.unique(),
          {
            user_id: user.$id,
            platform: link.platform,
            url: link.url,
          },
          [
            Permission.read(Role.any()),
            Permission.write(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
          ]
        );
      }
    });

    await Promise.all(promises);
    return true;
  } catch {
    return false;
  }
};
