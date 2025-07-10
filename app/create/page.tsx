import Link from "next/link";
import { Crown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardAltHeader from "@/components/dashboard-alt/header";
import { getCurrentUserProfile, getLoggedInUser } from "@/lib/appwrite/account";
import { getTemplateTypes } from "@/lib/appwrite/template-types";
import { Template_Types } from "@/types/template-types";
import LucideIconFromString from "@/components/lucide-icon-from-string";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getCurrentUserProfile();
  const templateTypes = await getTemplateTypes();

  return (
    <div className="min-h-screen bg-background">
      <DashboardAltHeader>
        <Badge
          variant={profile.pro === true ? "default" : "secondary"}
          className={
            profile.pro === true
              ? "bg-gradient-to-r from-blue-600 to-purple-600"
              : ""
          }
        >
          {profile.pro === true && <Crown className="mr-1 h-3 w-3" />}
          {profile.pro === true ? "Pro Plan" : "Free Plan"}
        </Badge>
      </DashboardAltHeader>

      <div className="w-full px-8 pt-16 mb-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            What would you like to create?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the type of content you want to create. Each option is
            designed for different purposes and storytelling approaches.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {templateTypes.map((templateType: Template_Types) => {
            return (
              <Link
                href={`/create${templateType.url_slug}`}
                key={templateType.$id}
                className="h-full"
              >
                <Card
                  key={templateType.id}
                  className="cursor-pointer transition-all hover:shadow-lg border-2 h-full"
                >
                  <CardHeader className="text-center">
                    <div
                      className="h-16 w-16 rounded-lg flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: templateType.sub_color }}
                    >
                      <LucideIconFromString
                        iconName={templateType.lucide_icon}
                        size={32}
                        color={templateType.color}
                      />
                    </div>
                    <CardTitle className="text-xl">
                      {templateType.title}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {templateType.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Includes:</p>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {templateType.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div
                              className="h-1.5 w-1.5 rounded-full mr-2"
                              style={{ backgroundColor: templateType.color }}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          {profile.pro === false && (
            <p className="text-sm text-muted-foreground mt-4">
              Want unlimited projects and advanced features?{" "}
              <Link href="/pricing" className="text-blue-600 hover:underline">
                Upgrade to Pro
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
