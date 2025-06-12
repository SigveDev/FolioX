import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useSocialLinks } from "@/hooks/use-sociallinks";
import { UserProfile, UserProfileDto } from "@/types/user-profiles";
import { UserSocialLinkDto } from "@/types/user-social-links";
import {
  Camera,
  ExternalLink,
  Github,
  Linkedin,
  Save,
  Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";
import ProfilePictureUpload from "./image-cropper";
import { useProfilePictures } from "@/hooks/use-profile-pictures";
import { useAccount } from "@/hooks/use-account";
import { toast } from "sonner";

const Profile = ({ profile }: { profile: UserProfile | null }) => {
  const { socialLinks, loading, updateSocialLinks } = useSocialLinks();
  const { uploadProfilePicture, uploadProfileCover } = useProfilePictures();
  const { updateProfile } = useAccount();
  const [fullNames, setFullNames] = useState<{
    firstName: string;
    lastName: string;
  }>({
    firstName: profile?.full_name?.split(" ")[0] || "",
    lastName: profile?.full_name?.split(" ")[1] || "",
  });
  const [editedProfile, setEditedProfile] = useState<UserProfileDto>({
    username: profile?.username || "",
    full_name: profile?.full_name || "",
    professional_title: profile?.professional_title || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    phone: profile?.phone || "",
    website: profile?.website || "",
    avatar_url: profile?.avatar_url || "",
    cover_image_url: profile?.cover_image_url || "",
    email: profile?.email || "",
  });
  const [socialLinksState, setSocialLinksState] = useState<UserSocialLinkDto[]>(
    []
  );
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [canUpdateProfile, setCanUpdateProfile] = useState(true);

  useEffect(() => {
    if (fullNames.firstName.includes(" ") || fullNames.lastName.includes(" ")) {
      setCanUpdateProfile(false);
    } else {
      setCanUpdateProfile(true);
    }
  }, [fullNames]);

  useEffect(() => {
    if (socialLinks && socialLinks.length > 0) {
      setSocialLinksState(socialLinks);
    } else {
      setSocialLinksState([
        { platform: "twitter", url: "" },
        { platform: "linkedin", url: "" },
        { platform: "github", url: "" },
      ]);
    }
  }, [socialLinks]);

  const handleProfilePictureChange = (image: string | null) => {
    setProfilePicture(image);
  };

  const handleProfileCoverChange = (image: string | null) => {
    setCoverImage(image);
  };

  const handleProfileUpdate = async () => {
    if (profilePicture) {
      uploadProfilePicture({ fileString: profilePicture });
    }

    if (coverImage) {
      uploadProfileCover({ fileString: coverImage });
    }

    const fullName = `${fullNames.firstName} ${fullNames.lastName}`.trim();

    const updateStatus = await updateProfile({
      ...editedProfile,
      full_name: fullName,
    } as UserProfileDto);

    const socialLinksStatus = await updateSocialLinks(socialLinksState);

    if (updateStatus && socialLinksStatus) {
      toast("Success", {
        description: "Your profile and social links have been updated.",
        duration: 3000,
      });
      console.log("Profile and social links updated successfully");
    } else {
      console.error("Failed to update profile or social links");
    }
  };

  return (
    <TabsContent value="profile" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and public profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <section className="relative">
            {/* Cover Image */}
            <div className="h-fit">
              <ProfilePictureUpload
                onSave={handleProfileCoverChange}
                cropShape="rect"
                aspect={3 / 1}
                identifier="profile-cover-upload"
                className="w-full group"
              >
                <img
                  src={
                    coverImage
                      ? coverImage
                      : profile?.cover_image_url &&
                        profile.cover_image_url.startsWith("http")
                      ? profile.cover_image_url
                      : "/placeholder.svg"
                  }
                  alt="Cover"
                  className="w-full object-cover rounded-lg"
                />
                <div className="absolute top-0 left-0 hidden group-hover:flex items-center justify-center w-full aspect-[3/1] bg-black/25 text-white cursor-pointer rounded-lg">
                  <Camera className="h-12 w-12" />
                </div>
              </ProfilePictureUpload>
            </div>

            {/* Profile Info */}
            <div className="container relative">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 md:-mt-20">
                <ProfilePictureUpload
                  onSave={handleProfilePictureChange}
                  className="relative group"
                >
                  <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                    <AvatarImage
                      src={profilePicture || profile?.avatar_url}
                      alt="User"
                    />
                    <AvatarFallback>
                      {profile?.full_name
                        ? (profile.full_name.split(" ")[0]?.[0] || "") +
                          (profile.full_name.split(" ")[1]?.[0] || "")
                        : "User"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 left-0 hidden group-hover:flex items-center justify-center w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)] bg-black/25 text-white rounded-full cursor-pointer m-1">
                    <Camera className="h-10 w-10" />
                  </div>
                </ProfilePictureUpload>

                <div className="flex-1 bg-background/95 backdrop-blur rounded-lg p-6 shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold">
                        {profile?.full_name}
                      </h1>
                      <p className="text-xl text-muted-foreground">
                        {profile?.professional_title}
                      </p>
                      <p className="text-muted-foreground mt-2">
                        {profile?.location}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {socialLinksState.find(
                        (link) => link.platform === "linkedin"
                      )?.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`https://${
                              socialLinksState.find(
                                (link) => link.platform === "linkedin"
                              )?.url
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {socialLinksState.find(
                        (link) => link.platform === "twitter"
                      )?.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`https://${
                              socialLinksState.find(
                                (link) => link.platform === "twitter"
                              )?.url
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {socialLinksState.find(
                        (link) => link.platform === "github"
                      )?.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`https://${
                              socialLinksState.find(
                                (link) => link.platform === "github"
                              )?.url
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {profile?.website && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`https://${profile?.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground max-w-2xl">
                    {profile?.bio}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={fullNames.firstName}
                onChange={(e) => {
                  const value = e.target.value;
                  setFullNames({
                    ...fullNames,
                    firstName: value,
                  });
                }}
              />
              {fullNames.firstName.includes(" ") && (
                <p className="text-xs text-red-500">
                  First name should not contain spaces.
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={fullNames.lastName}
                onChange={(e) => {
                  const value = e.target.value;
                  setFullNames({
                    ...fullNames,
                    lastName: value,
                  });
                }}
              />
              {fullNames.lastName.includes(" ") && (
                <p className="text-xs text-red-500">
                  Last name should not contain spaces.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={editedProfile.professional_title || ""}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  professional_title: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={editedProfile.bio || ""}
              onChange={(e) =>
                setEditedProfile({ ...editedProfile, bio: e.target.value })
              }
              rows={4}
            />
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editedProfile.email || ""}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={editedProfile.phone || ""}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, Country"
                value={editedProfile.location || ""}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    location: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="yourwebsite.com"
                value={editedProfile.website || ""}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    website: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <Separator />

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Social Links</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Input
                    id="twitter"
                    placeholder="twitter.com/username"
                    disabled={loading}
                    value={
                      socialLinksState.find(
                        (link) => link.platform === "twitter"
                      )?.url || ""
                    }
                    onChange={(e) =>
                      setSocialLinksState((prev) =>
                        prev.map((link) =>
                          link.platform === "twitter"
                            ? { ...link, url: e.target.value }
                            : link
                        )
                      )
                    }
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Input
                    id="linkedin"
                    placeholder="linkedin.com/in/username"
                    disabled={loading}
                    value={
                      socialLinksState.find(
                        (link) => link.platform === "linkedin"
                      )?.url || ""
                    }
                    onChange={(e) =>
                      setSocialLinksState((prev) =>
                        prev.map((link) =>
                          link.platform === "linkedin"
                            ? { ...link, url: e.target.value }
                            : link
                        )
                      )
                    }
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Input
                    id="github"
                    placeholder="github.com/username"
                    value={
                      socialLinksState.find(
                        (link) => link.platform === "github"
                      )?.url || ""
                    }
                    onChange={(e) =>
                      setSocialLinksState((prev) =>
                        prev.map((link) =>
                          link.platform === "github"
                            ? { ...link, url: e.target.value }
                            : link
                        )
                      )
                    }
                  />
                )}
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleProfileUpdate}
            disabled={!canUpdateProfile}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Profile;
