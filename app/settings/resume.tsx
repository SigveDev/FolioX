"use client";

import { Alert } from "@/components/ui/alert";
import { CheckCircle, Save, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import PdfUpload from "./pdf-upload";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserProfile } from "@/types/user-profiles";
import { deleteMyResume, uploadNewResume } from "@/lib/appwrite/resume";

const Resume = ({ profile }: { profile: UserProfile | null }) => {
  const [edited, setEdited] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (profile && profile.resume_url) {
      fetch(profile.resume_url)
        .then(async (res) => {
          const blob = await res.blob();
          const filename = profile.user_id + "-resume.pdf";
          const file = new File([blob], filename, { type: blob.type });
          setSelectedFile(file);
        })
        .catch(() => {
          setSelectedFile(null);
        });
    }
  }, [profile]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setEdited(true);
  };

  const handleResumeEdit = async () => {
    if (selectedFile) {
      const result = await uploadNewResume(selectedFile);
      if (result) {
        setEdited(false);
        setSelectedFile(null);
        toast("Success", {
          description: "Your resume has been uploaded.",
          duration: 3000,
        });
      } else {
        toast("Error", {
          description:
            "There was an error uploading your resume. Please try again later.",
          duration: 3000,
        });
      }
    } else {
      const result = await deleteMyResume();
      if (result) {
        setEdited(false);
        setSelectedFile(null);
        toast("Success", {
          description: "Your resume has been removed.",
          duration: 3000,
        });
      } else {
        toast("Error", {
          description:
            "There was an error removing your resume. Please try again later.",
          duration: 3000,
        });
      }
    }
  };

  const removeResume = async () => {
    setSelectedFile(null);
    if (!edited) {
      setEdited(true);
    }
  };

  return (
    <TabsContent value="resume" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Resume</CardTitle>
          <CardDescription>
            Upload a PDF of your resume. It can be viewed and downloaded by
            potential employers from your projects and profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            {!selectedFile ? (
              <div className="mx-auto h-96 w-full">
                <PdfUpload onFileSelect={handleFileSelect} maxSize={10} />
              </div>
            ) : (
              <>
                <Alert className="flex items-center gap-4">
                  <CheckCircle className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">{selectedFile.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                      {" · "}
                      <a
                        href={URL.createObjectURL(selectedFile)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline ml-2"
                      >
                        Open in new tab
                      </a>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline" onClick={removeResume}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Alert>
              </>
            )}
            <Button
              className="w-full"
              onClick={handleResumeEdit}
              disabled={!edited}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Resume;
