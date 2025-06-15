import {
  database,
  Query,
  ID,
  Permission,
  Role,
  createAdminClient,
} from "@/lib/appwrite";
import { getCurrentUser, getUserProfileById } from "./account";
import { Project, ProjectViewDto } from "@/types/project";
import { getTemplateById } from "./templates";

export async function getMyProjects() {
  const user = await getCurrentUser();
  if (!user) return [];

  const response = await database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PROJECTS_COLLECTION_ID || "",
    [Query.equal("user_id", user.$id)]
  );
  return response.documents as Project[];
}

export async function getProjectByIdForView(projectId: string) {
  const { databaseAdmin } = await createAdminClient();
  const response = (await database.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PROJECTS_COLLECTION_ID || "",
    projectId
  )) as Project;

  if (!response) {
    throw new Error("Project not found");
  }

  let template = null;

  if (response.template_id) {
    template = await getTemplateById(response.template_id);

    if (!template) {
      throw new Error("Template not found");
    }
  }

  if (response.template_id && !template) {
    console.warn(
      `Project ${response.$id} has a template_id but no template found.`
    );
  }

  const user = await getUserProfileById(response.user_id);

  if (!user) {
    throw new Error("User not found");
  }

  const userProfile = {
    user_id: user.user_id,
    username: user.username,
    full_name: user.full_name,
    professional_title: user.professional_title,
    bio: user.bio,
    location: user.location,
    phone: user.phone,
    website: user.website,
    avatar_url: user.avatar_url,
    cover_image_url: user.cover_image_url,
    email: user.email,
    resume_url: user.resume_url,
  };

  const modifiedResponse: ProjectViewDto = {
    ...response,
    view_count: response.view_count + 1 || 0,
    layout: template ? template.data : response.custom_layout || "",
    user: userProfile,
  };

  // Increment view count
  await databaseAdmin.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PROJECTS_COLLECTION_ID || "",
    response.$id,
    { view_count: modifiedResponse.view_count }
  );

  return modifiedResponse as ProjectViewDto;
}
