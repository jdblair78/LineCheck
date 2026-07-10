import type { ReactNode } from "react";

import AppSidebar from "@/components/layout/app-sidebar";
import DashboardHeader from "@/components/layout/dashboard-header";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader />

          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}