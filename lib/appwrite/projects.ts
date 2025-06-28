import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { ID, Query } from "@/lib/appwrite/client";
import { getCurrentUser, getUserProfileById } from "./account";
import { Project, ProjectViewDto } from "@/types/project";
import { getTemplateById } from "./templates";

export async function getMyProjects() {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const { database } = await createSessionClient();
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PROJECTS_COLLECTION_ID || "",
      [Query.equal("user_id", user.$id)]
    );
    return response.documents as Project[];
  } catch (error) {
    console.error("Error fetching my projects:", error);
    throw error;
  }
}

export async function getProjectByIdForView(projectId: string) {
  const { databaseAdmin } = await createAdminClient();
  const response = (await databaseAdmin.getDocument(
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
    view_count: response.view_count || 0,
    layout: template ? template.data : response.custom_layout || "",
    user: userProfile,
  };

  if (modifiedResponse.is_published === false) {
    throw new Error("Project is not published");
  }

  return modifiedResponse as ProjectViewDto;
}

export async function addViewCountToProject(
  projectId: string,
  ip: string,
  userAgent: string,
  referrer: string
) {
  const { databaseAdmin } = await createAdminClient();

  const checkDate = new Date();

  const checkforExistingView = await databaseAdmin.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PROJECT_VIEWS_COLLECTION_ID || "",
    [
      Query.equal("project_id", projectId),
      Query.equal("viewer_ip", ip),
      Query.equal("viewer_user_agent", userAgent),
      Query.equal("referrer", referrer),
      Query.greaterThan(
        "viewed_at",
        new Date(checkDate.getTime() - 1000 * 60 * 5).toISOString()
      ), // Check for views in the last 5 minutes
    ]
  );

  // If the view already exists, return true
  if (checkforExistingView.documents.length > 0) {
    throw new Error(
      "View already exists for this project from this IP and user agent in the last 5 minutes"
    );
  }

  // Create a new view record
  const newView = await databaseAdmin.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PROJECT_VIEWS_COLLECTION_ID || "",
    ID.unique(),
    {
      project_id: projectId,
      viewer_ip: ip,
      viewer_user_agent: userAgent,
      referrer: referrer,
      viewed_at: checkDate,
    }
  );

  // Get the current project document
  const projectResponse = await databaseAdmin.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PROJECTS_COLLECTION_ID || "",
    projectId
  );

  // Increment view count
  const updatedProject = await databaseAdmin.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PROJECTS_COLLECTION_ID || "",
    projectId,
    { view_count: projectResponse.view_count + 1 }
  );

  if (updatedProject && newView) {
    return true;
  }
  throw new Error("Failed to add view count to project");
}
