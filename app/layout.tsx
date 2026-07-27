import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Citadelle — Private Bank",
  description: "Citadelle private banking. A fictional educational environment.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
