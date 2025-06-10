import { Models } from "appwrite";

export interface UserProfile extends Models.Document {
  user_id: string;
  username: string;
  full_name?: string;
  professional_title?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  avatar_url?: string;
  cover_image_url?: string;
  email?: string;
}

export interface UserProfileDto {
  username?: string;
  full_name?: string;
  professional_title?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  avatar_url?: string;
  cover_image_url?: string;
  email?: string;
}
