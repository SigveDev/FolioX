import { Models } from "appwrite";

export interface Template extends Models.Document {
  name: string;
  description?: string;
  category: string;
  subcategory?: string;
  data: string;
  preview_image_url?: string;
  is_active: boolean;
  is_pro_only: boolean;
  features: string[];
  color: string;
  lucide_icon: string;
}
