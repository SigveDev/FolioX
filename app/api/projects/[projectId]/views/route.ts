import { addViewCountToProject } from "@/lib/appwrite/projects";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { referrer, userAgent } = await req.json();
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "not available";
    const projectId = (await params).projectId;

    const request = await addViewCountToProject(
      projectId,
      ip,
      userAgent,
      referrer
    );

    if (!request) {
      return NextResponse.json(
        { success: false, error: "Something went wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, data: request }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
