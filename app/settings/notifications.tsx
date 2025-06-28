"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import WorkInProgressOverlay from "@/components/wip-overlay";
import { Save } from "lucide-react";
import { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    projectComments: true,
    portfolioViews: false,
    marketingEmails: false,
    securityAlerts: true,
  });
  return (
    <TabsContent value="notifications" className="space-y-6">
      <WorkInProgressOverlay
        isActive={true}
        message="Notifications settings are under development, please check back later"
      >
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Choose what email notifications you'd like to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Product Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified about new features and updates
                </p>
              </div>
              <Switch
                checked={notifications.emailUpdates}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    emailUpdates: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Project Comments</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone comments on your projects
                </p>
              </div>
              <Switch
                checked={notifications.projectComments}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    projectComments: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Portfolio Views</h4>
                <p className="text-sm text-muted-foreground">
                  Weekly summary of portfolio views and engagement
                </p>
              </div>
              <Switch
                checked={notifications.portfolioViews}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    portfolioViews: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Marketing Emails</h4>
                <p className="text-sm text-muted-foreground">
                  Tips, case studies, and design inspiration
                </p>
              </div>
              <Switch
                checked={notifications.marketingEmails}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    marketingEmails: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Security Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Important security and account notifications
                </p>
              </div>
              <Switch
                checked={notifications.securityAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    securityAlerts: checked,
                  })
                }
              />
            </div>

            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Notification Preferences
            </Button>
          </CardContent>
        </Card>
      </WorkInProgressOverlay>
    </TabsContent>
  );
};

export default Notifications;
