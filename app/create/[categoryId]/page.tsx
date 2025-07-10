import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getFreeTemplatesByCategory,
  getTemplatesByCategory,
} from "@/lib/appwrite/templates";
import ErrorPage from "@/components/error";
import { getCurrentUserProfile, getLoggedInUser } from "@/lib/appwrite/account";
import DashboardAltHeader from "@/components/dashboard-alt/header";
import { getTemplateTypeFromUrlSlug } from "@/lib/appwrite/template-types";
import Link from "next/link";

export default async function CreateChooseTemplatePage({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = await params;
  const user = await getLoggedInUser();
  const profile = await getCurrentUserProfile();
  const templateType = await getTemplateTypeFromUrlSlug("/" + categoryId);

  if (!user || !profile || !templateType) {
    return <ErrorPage />;
  }

  let templates = [];

  if (profile.pro) {
    templates = await getTemplatesByCategory(categoryId);
  } else {
    templates = await getFreeTemplatesByCategory(categoryId);
  }

  const Oldtemplates = [
    {
      id: 1,
      name: "Professional",
      description:
        "Clean, corporate design perfect for consultants and business professionals",
      image: "/placeholder.svg?height=200&width=300",
      category: "Business",
      features: [
        "Header with contact info",
        "Experience timeline",
        "Skills grid",
        "Project showcase",
        "Testimonials section",
      ],
    },
    {
      id: 2,
      name: "Creative",
      description:
        "Visual-first design ideal for designers, artists, and creative professionals",
      image: "/placeholder.svg?height=200&width=300",
      category: "Creative",
      features: [
        "Full-screen hero",
        "Visual project grid",
        "About section",
        "Creative timeline",
        "Contact form",
      ],
    },
    {
      id: 3,
      name: "Developer",
      description:
        "Tech-focused layout perfect for developers and technical professionals",
      image: "/placeholder.svg?height=200&width=300",
      category: "Technical",
      features: [
        "Code-style design",
        "Tech stack display",
        "GitHub integration",
        "Project repositories",
        "Technical blog",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardAltHeader buttonToName="Template Type" buttonToUrl="/create">
        <Badge variant="secondary">{templateType.title}</Badge>
      </DashboardAltHeader>

      <div className="w-full px-8 pt-16 mb-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Choose Your {templateType.title} Template
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select a template that best represents your vision.{" "}
            {profile.pro && "You can customize everything later."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <Link
              href={`/create${templateType.url_slug}/${template.$id}`}
              key={template.$id}
              className="h-full"
            >
              <Card className="cursor-pointer transition-all hover:shadow-lg h-full">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{template.subcategory}</Badge>
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Includes:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {template.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
