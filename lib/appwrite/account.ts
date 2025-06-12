import { account, database, ID, Permission, Role, Query } from "@/lib/appwrite";
import { UserProfile, UserProfileDto } from "@/types/user-profiles";

export const createNewUser_Email = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
) => {
  try {
    const user = await account.create(ID.unique(), email, password, username);
    if (user) {
      const login = await account.createEmailPasswordSession(email, password);
      if (login) {
        const userProfileDocument = await database.createDocument(
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
    const user = await account.get();
    return user;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserProfile = async () => {
  try {
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
    const response = await account.createEmailPasswordSession(email, password);
    return response;
  } catch (error) {
    console.error("Error logging in with email:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const updateUserProfile = async (changedUserProfile: UserProfileDto) => {
  try {
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
