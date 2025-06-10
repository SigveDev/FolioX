import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { usePrivacy } from "@/hooks/use-privacy";
import {
  UserPrivacySettingsDto,
  UserProfileVisibility,
} from "@/types/user-privacy";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Privacy = () => {
  const { privacySettings, loading, updatePrivacy } = usePrivacy();
  const [editedPrivacy, setEditedPrivacy] = useState<UserPrivacySettingsDto>({
    profile_visibility: UserProfileVisibility.PUBLIC,
    show_email: false,
    show_phone: false,
    show_location: true,
    share_analytics: true,
  });

  useEffect(() => {
    if (privacySettings) {
      setEditedPrivacy({
        profile_visibility:
          (privacySettings.profile_visibility as UserProfileVisibility) ||
          UserProfileVisibility.PUBLIC,
        show_email: privacySettings.show_email || false,
        show_phone: privacySettings.show_phone || false,
        show_location: privacySettings.show_location || true,
        share_analytics: privacySettings.share_analytics || true,
      });
    }
  }, [privacySettings]);

  const handleUpdatePrivacySettings = async () => {
    const status = await updatePrivacy(editedPrivacy);

    if (status) {
      toast("Success", {
        description: "Your privacy settings have been updated.",
        duration: 3000,
      });
      console.log("Privacy settings updated successfully");
    } else {
      console.error("Failed to update privacy settings");
    }
  };

  return (
    <TabsContent value="privacy" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>
            Control who can see your information and how it's used
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profileVisibility">Profile Visibility</Label>
            {loading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select
                value={editedPrivacy.profile_visibility}
                onValueChange={(value) =>
                  setEditedPrivacy({
                    ...editedPrivacy,
                    profile_visibility: value as UserProfileVisibility,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    Public - Anyone can view
                  </SelectItem>
                  <SelectItem value="unlisted">
                    Unlisted - Only with direct link
                  </SelectItem>
                  <SelectItem value="private">
                    Private - Only you can view
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Show Email Address</h4>
              <p className="text-sm text-muted-foreground">
                Display your email on your public profile
              </p>
            </div>
            {loading ? (
              <Skeleton className="h-6 w-12 rounded-3xl" />
            ) : (
              <Switch
                checked={editedPrivacy.show_email}
                onCheckedChange={(checked: boolean) =>
                  setEditedPrivacy({ ...editedPrivacy, show_email: checked })
                }
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Show Phone Number</h4>
              <p className="text-sm text-muted-foreground">
                Display your phone number on your public profile
              </p>
            </div>
            {loading ? (
              <Skeleton className="h-6 w-12 rounded-3xl" />
            ) : (
              <Switch
                checked={editedPrivacy.show_phone}
                onCheckedChange={(checked: boolean) =>
                  setEditedPrivacy({ ...editedPrivacy, show_phone: checked })
                }
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Show Location</h4>
              <p className="text-sm text-muted-foreground">
                Display your location on your public profile
              </p>
            </div>
            {loading ? (
              <Skeleton className="h-6 w-12 rounded-3xl" />
            ) : (
              <Switch
                checked={editedPrivacy.show_location}
                onCheckedChange={(checked: boolean) =>
                  setEditedPrivacy({ ...editedPrivacy, show_location: checked })
                }
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Analytics Sharing</h4>
              <p className="text-sm text-muted-foreground">
                Help improve FolioX by sharing anonymous usage data
              </p>
            </div>
            {loading ? (
              <Skeleton className="h-6 w-12 rounded-3xl" />
            ) : (
              <Switch
                checked={editedPrivacy.share_analytics}
                onCheckedChange={(checked: boolean) =>
                  setEditedPrivacy({
                    ...editedPrivacy,
                    share_analytics: checked,
                  })
                }
              />
            )}
          </div>

          <Button className="w-full" onClick={handleUpdatePrivacySettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Privacy Settings
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Privacy;
