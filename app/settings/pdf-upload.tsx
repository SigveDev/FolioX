"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, AlertCircle } from "lucide-react";

interface PdfUploadProps {
  onFileSelect: (file: File) => void;
  maxSize?: number; // in MB
}

const PdfUpload = ({ onFileSelect, maxSize = 10 }: PdfUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (file.type !== "application/pdf") {
      return "Please select a PDF file";
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="w-full h-full">
      <Card
        className={`border-2 border-dashed transition-colors h-full ${
          isDragOver
            ? "border-primary bg-primary/5"
            : error
            ? "border-destructive"
            : "border-muted-foreground/25 hover:border-primary/50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
          <div className="mb-4">
            {error ? (
              <AlertCircle className="h-12 w-12 text-destructive" />
            ) : (
              <Upload className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium">
              {error ? "Upload Error" : "Upload your Resume"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {error ||
                `Drag and drop your resume here, or click to browse (max ${maxSize}MB)`}
            </p>
          </div>
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileInput}
            className="hidden"
            id="pdf-upload"
          />
          <Button asChild variant={error ? "destructive" : "default"}>
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              {error ? "Try Again" : "Choose File"}
            </label>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PdfUpload;
