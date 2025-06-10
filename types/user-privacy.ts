import { Models } from "appwrite";

export enum UserProfileVisibility {
  PUBLIC = "public",
  UNLISTED = "unlisted",
  PRIVATE = "private",
}

export interface UserPrivacySettings extends Models.Document {
  user_id: string;
  profile_visibility: UserProfileVisibility;
  show_email: boolean;
  show_phone: boolean;
  show_location: boolean;
  share_analytics: boolean;
}

export interface UserPrivacySettingsDto {
  profile_visibility?: UserProfileVisibility;
  show_email?: boolean;
  show_phone?: boolean;
  show_location?: boolean;
  share_analytics?: boolean;
}
