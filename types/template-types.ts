import { Models } from "appwrite";

export interface Template_Types extends Models.Document {
  title: string;
  description: string;
  lucide_icon: string;
  color: string;
  features: string[];
  url_slug: string;
  sub_color: string;
}
