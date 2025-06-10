"use client";

import { useEffect, useState } from "react";
import { User, Bell, Shield, Globe, FileUser } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardAltHeader from "@/components/dashboard-alt/header";
import LoadingSpinner from "@/components/loading";
import ErrorPage from "@/components/login-error";
import { useAccount } from "@/hooks/use-account";
import { useRouter } from "next/navigation";
import Profile from "./profile";
import Notifications from "./notifications";
import Privacy from "./privacy";
import Account from "./account";

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading, profile } = useAccount();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!user) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardAltHeader />

      <div className="py-8 w-full px-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger
                value="profile"
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center space-x-2"
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="flex items-center space-x-2"
              >
                <Shield className="h-4 w-4" />
                <span>Privacy</span>
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="flex items-center space-x-2"
              >
                <Globe className="h-4 w-4" />
                <span>Account</span>
              </TabsTrigger>
              <TabsTrigger
                value="resume"
                className="flex items-center space-x-2"
              >
                <FileUser className="h-4 w-4" />
                <span>Resume</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <Profile profile={profile} />

            {/* Notifications Tab */}
            <Notifications />

            {/* Privacy Tab */}
            <Privacy />

            {/* Account Tab */}
            <Account />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
