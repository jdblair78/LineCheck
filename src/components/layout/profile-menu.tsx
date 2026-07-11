"use client";

import Link from "next/link";
import {
  Bell,
  Building2,
  CreditCard,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-10 gap-3 rounded-full px-2 sm:rounded-xl sm:pr-3"
            aria-label="Open user menu"
          />
        }
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          JB
        </span>

        <span className="hidden text-left sm:block">
          <span className="block text-sm font-medium leading-none">
            Joshua Blair
          </span>

          <span className="mt-1 block text-xs text-muted-foreground">
            General Manager
          </span>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-3 py-1">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                JB
              </span>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Joshua Blair</p>

                <p className="truncate text-xs text-muted-foreground">
                  General Manager · Your Restaurant
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/profile" />}>
            <User className="size-4" />
            <span>My profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem render={<Link href="/settings" />}>
            <Building2 className="size-4" />
            <span>Restaurant settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Bell className="size-4" />
            <span>Notifications</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCard className="size-4" />
            <span>Billing</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <LogOut className="size-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
