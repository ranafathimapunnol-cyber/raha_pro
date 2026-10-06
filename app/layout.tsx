import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RAHA — Find your comfort",
  description: "A calm, thoughtful property discovery experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
