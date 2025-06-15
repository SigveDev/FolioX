import { getProjectByIdForView } from "@/lib/appwrite/projects";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  const projectId = (await params).projectId;

  if (!projectId) {
    return new Response("Project ID is required", { status: 400 });
  }

  // Fetch project data from database or external API
  const project = await getProjectByIdForView(projectId);

  if (!project) {
    return new Response("Project not found", { status: 404 });
  }

  return new Response(JSON.stringify(project), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
