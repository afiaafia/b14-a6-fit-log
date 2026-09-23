import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library and Planning App",
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
