import { Models } from "appwrite";

export interface UserSocialLink extends Models.Document {
  user_id: string;
  platform: string;
  url: string;
}

export interface UserSocialLinkDto {
  platform: string;
  url: string;
}
