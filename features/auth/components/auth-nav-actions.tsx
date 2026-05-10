"use client";

import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ROUTES } from "@/lib/constants";

export function AuthNavActions() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-9 w-20 animate-pulse rounded-full bg-[var(--accent-soft)]" aria-hidden />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href={ROUTES.login}
        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--brand)]"
      >
        <UserRound size={15} />
        <span className="hidden sm:inline">Account</span>
      </Link>
    );
  }

  return (
    <div className="inline-flex items-center gap-1">
      <Link
        href={ROUTES.profile}
        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--brand)]"
      >
        <UserRound size={15} />
        <span className="hidden sm:inline">Account</span>
      </Link>
      <button
        type="button"
        aria-label="Sign out"
        onClick={() => signOut({ callbackUrl: ROUTES.home })}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--brand)]"
      >
        <LogOut size={15} />
      </button>
    </div>
  );
}
