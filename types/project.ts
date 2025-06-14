import { Models } from "appwrite";

export interface Project extends Models.Document {
  user_id: string;
  title: string;
  description?: string;
  portfolio_slug?: string;
  type: string;
  category?: string;
  template_id?: string;
  custom_layout?: string;
  cover_image_url?: string;
  live_url?: string;
  github_url?: string;
  client?: string;
  duration?: string;
  team_size?: string;
  user_role?: string;
  is_published: boolean;
  is_featured: boolean;
  view_count: number;
  like_count: number;
  published_at?: Date;
  taggs: string[];
  replacements: string;
  share_count: number;
}
