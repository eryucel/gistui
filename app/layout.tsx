import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gist UI - GitHub Gist Manager",
  description: "Manage your GitHub gists locally",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
