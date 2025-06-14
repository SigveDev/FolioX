"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAccount } from "@/hooks/use-account";
import { useBilling } from "@/hooks/use-billing";
import { Crown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfileCard = () => {
  const { profile } = useAccount();
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    const calculateProfileCompletion = () => {
      if (!profile) return 0;

      let completion = 0;
      if (profile.username) completion += 10;
      if (profile.full_name) completion += 10;
      if (profile.professional_title) completion += 10;
      if (profile.bio) completion += 10;
      if (profile.location) completion += 10;
      if (profile.phone) completion += 10;
      if (profile.website) completion += 10;
      if (profile.avatar_url) completion += 10;
      if (profile.cover_image_url) completion += 10;
      if (profile.email) completion += 10;

      return completion;
    };

    setProfileCompletion(calculateProfileCompletion());
  }, [profile]);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={profile?.avatar_url} alt="User" />
            <AvatarFallback>
              {profile?.full_name
                ? (profile.full_name.split(" ")[0]?.[0] || "") +
                  (profile.full_name.split(" ")[1]?.[0] || "")
                : "User"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{profile?.full_name || ""}</h3>
            <p className="text-sm text-muted-foreground">
              {profile?.professional_title || ""}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Profile completion</span>
          <span className="text-sm font-medium">{profileCompletion}%</span>
        </div>
        <Progress value={profileCompletion} className="h-2" />

        <div className="flex items-center justify-between">
          <span className="text-sm">Plan</span>
          {profile && (
            <Badge variant={profile.pro ? "default" : "secondary"}>
              {profile.pro ? (
                <>
                  <Crown className="mr-1 h-3 w-3" />
                  Pro
                </>
              ) : (
                "Free"
              )}
            </Badge>
          )}
        </div>

        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/portfolio/johndoe">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Portfolio
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
