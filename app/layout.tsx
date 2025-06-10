import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "FolioX - Professional Portfolio Builder",
  description: "Create stunning portfolios with ease",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
