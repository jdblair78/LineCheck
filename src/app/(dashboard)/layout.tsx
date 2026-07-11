import type { ReactNode } from "react";

import DashboardHeader from "@/components/layout/dashboard-header";
import AppSidebar from "@/components/layout/sidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <DashboardHeader />

        <main className="flex-1 bg-muted/30 p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-360">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}