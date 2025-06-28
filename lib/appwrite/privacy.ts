import { createSessionClient } from "@/lib/appwrite";
import { ID, Permission, Query, Role } from "@/lib/appwrite/client";
import { getCurrentUser } from "./account";
import {
  UserPrivacySettings,
  UserPrivacySettingsDto,
} from "@/types/user-privacy";

export const getUserPrivacySettings = async () => {
  try {
    const { database } = await createSessionClient();
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const privacySettingsDocuments = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env
        .NEXT_PUBLIC_APPWRITE_DATABASE_USER_PRIVACY_SETTINGS_COLLECTION_ID ||
        "",
      [Query.equal("user_id", user.$id)]
    );

    if (privacySettingsDocuments.documents.length === 0) {
      const newPrivacySettings = await database.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
        process.env
          .NEXT_PUBLIC_APPWRITE_DATABASE_USER_PRIVACY_SETTINGS_COLLECTION_ID ||
          "",
        ID.unique(),
        {
          user_id: user.$id,
        },
        [
          Permission.read(Role.any()),
          Permission.write(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
      console.warn(
        "No privacy settings found for the user, creating new document."
      );
      return newPrivacySettings as UserPrivacySettings;
    }
    const privacySettingsDocument = privacySettingsDocuments
      .documents[0] as UserPrivacySettings;
    return privacySettingsDocument;
  } catch (error) {
    console.error("Error fetching user privacy settings:", error);
    throw error;
  }
};

export const updateUserPrivacySettings = async (
  privacySettings: UserPrivacySettingsDto
) => {
  try {
    const { database } = await createSessionClient();
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const privacySettingsDocuments = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env
        .NEXT_PUBLIC_APPWRITE_DATABASE_USER_PRIVACY_SETTINGS_COLLECTION_ID ||
        "",
      [Query.equal("user_id", user.$id)]
    );

    if (privacySettingsDocuments.documents.length === 0) {
      throw new Error("Privacy settings not found");
    }

    const privacySettingsDocument = privacySettingsDocuments
      .documents[0] as UserPrivacySettings;

    const updatedPrivacySettings = {
      user_id: user.$id,
      profile_visibility:
        privacySettings.profile_visibility ||
        privacySettingsDocument.profile_visibility,
      show_email:
        privacySettings.show_email !== undefined
          ? privacySettings.show_email
          : privacySettingsDocument.show_email,
      show_phone:
        privacySettings.show_phone !== undefined
          ? privacySettings.show_phone
          : privacySettingsDocument.show_phone,
      show_location:
        privacySettings.show_location !== undefined
          ? privacySettings.show_location
          : privacySettingsDocument.show_location,
      share_analytics:
        privacySettings.share_analytics !== undefined
          ? privacySettings.share_analytics
          : privacySettingsDocument.share_analytics,
    } as UserPrivacySettingsDto;

    const request = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env
        .NEXT_PUBLIC_APPWRITE_DATABASE_USER_PRIVACY_SETTINGS_COLLECTION_ID ||
        "",
      privacySettingsDocument.$id,
      updatedPrivacySettings
    );

    return request as UserPrivacySettings;
  } catch (error) {
    console.error("Error updating user privacy settings:", error);
    throw error;
  }
};
