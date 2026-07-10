import type { Metadata } from "next";
import type { ReactNode } from "react";

import ThemeProvider from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}