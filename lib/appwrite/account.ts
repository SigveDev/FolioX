"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { ID, Permission, Role, Query } from "@/lib/appwrite/client";
import { UserProfile, UserProfileDto } from "@/types/user-profiles";

export const createNewUser_Email = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
) => {
  try {
    const { accountAdmin, databaseAdmin } = await createAdminClient();

    const user = await accountAdmin.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (user) {
      const login = await accountAdmin.createEmailPasswordSession(
        email,
        password
      );
      (await cookies()).set(
        process.env.NEXT_PUBLIC_APPWRITE_COOKIE_KEY || "appwrite_session",
        login.secret,
        {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        }
      );
      if (login) {
        const userProfileDocument = await databaseAdmin.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
          process.env
            .NEXT_PUBLIC_APPWRITE_DATABASE_USER_PROFILES_COLLECTION_ID || "",
          ID.unique(),
          {
            user_id: user.$id,
            username: username,
            full_name: `${firstName} ${lastName}`,
            email: email,
          },
          [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
          ]
        );
        if (userProfileDocument) {
          console.log(
            "User profile created successfully:",
            userProfileDocument
          );
          return true;
        } else {
          console.error("Failed to create user profile document.");
        }
      } else {
        console.error("Failed to log in user after creation.");
      }
    } else {
      console.error("Failed to create user.");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return user;
  } catch (error) {
    throw error;
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export const getCurrentUserProfile = async () => {
  try {
    const { database } = await createSessionClient();

    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userProfileDocuments = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USER_PROFILES_COLLECTION_ID ||
        "",
      [Query.equal("user_id", user.$id)]
    );

    if (userProfileDocuments.documents.length === 0) {
      throw new Error("User profile not found");
    }

    const userProfileDocument = userProfileDocuments
      .documents[0] as UserProfile;

    return userProfileDocument;
  } catch (error) {
    console.error("Error fetching current user profile:", error);
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const { accountAdmin } = await createAdminClient();
    const response = await accountAdmin.createEmailPasswordSession(
      email,
      password
    );
    console.log("Login successful:", response);
    (await cookies()).set(
      process.env.NEXT_PUBLIC_APPWRITE_COOKIE_KEY || "appwrite_session",
      response.secret,
      {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error logging in with email:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const updateUserProfile = async (changedUserProfile: UserProfileDto) => {
  try {
    const { database } = await createSessionClient();
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userProfileDocument = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USER_PROFILES_COLLECTION_ID ||
        "",
      [Query.equal("user_id", user.$id)]
    );

    if (userProfileDocument.documents.length === 0) {
      throw new Error("User profile not found");
    }

    const userProfile = userProfileDocument.documents[0] as UserProfile;

    const completedNewProfile = {
      username: changedUserProfile.username || userProfile.username,
      full_name: changedUserProfile.full_name || userProfile.full_name,
      professional_title:
        changedUserProfile.professional_title || userProfile.professional_title,
      bio: changedUserProfile.bio || userProfile.bio,
      location: changedUserProfile.location || userProfile.location,
      phone: changedUserProfile.phone || userProfile.phone,
      website: changedUserProfile.website || userProfile.website,
      email: changedUserProfile.email || userProfile.email,
    } as UserProfileDto;

    const updatedProfile = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USER_PROFILES_COLLECTION_ID ||
        "",
      userProfile.$id,
      completedNewProfile
    );

    if (updatedProfile) {
      return true;
    } else {
      console.error("Failed to update user profile document.");
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  try {
    const { account } = await createSessionClient();
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const response = await account.updatePassword(newPassword, oldPassword);
    return response;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

export const getUserProfileById = async (userId: string) => {
  try {
    const { database } = await createSessionClient();
    const userProfileDocuments = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USER_PROFILES_COLLECTION_ID ||
        "",
      [Query.equal("user_id", userId)]
    );

    if (userProfileDocuments.documents.length === 0) {
      throw new Error("User profile not found");
    }

    const userProfileDocument = userProfileDocuments
      .documents[0] as UserProfile;

    return userProfileDocument;
  } catch (error) {
    console.error("Error fetching user profile by ID:", error);
    throw error;
  }
};
