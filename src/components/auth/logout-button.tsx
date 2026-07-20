"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function LogoutButton() {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogout() {
    setErrorMessage("");
    setIsLoggingOut(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signOut();

      if (error) {
        setErrorMessage("Unable to sign out. Please try again.");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setErrorMessage("Something went wrong while signing out.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton
          type="button"
          tooltip="Sign out"
          disabled={isLoggingOut}
          onClick={handleLogout}
        >
          <LogOut />

          <span>
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {errorMessage && (
        <li
          role="alert"
          className="px-2 py-1 text-xs text-destructive group-data-[collapsible=icon]:hidden"
        >
          {errorMessage}
        </li>
      )}
    </>
  );
}