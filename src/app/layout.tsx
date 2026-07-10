import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "LineCheck",
  description: "Digital Food Safety Platform",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}