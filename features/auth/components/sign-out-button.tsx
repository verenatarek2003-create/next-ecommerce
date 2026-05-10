"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export function SignOutButton() {
  return (
    <Button
      variant="secondary"
      className="gap-2 rounded-2xl px-6"
      onClick={() => signOut({ callbackUrl: ROUTES.home })}
    >
      <LogOut size={14} strokeWidth={2} />
      Sign out
    </Button>
  );
}
