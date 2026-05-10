"use client";

import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ROUTES } from "@/lib/constants";

export function AuthNavActions() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-10 w-[5.25rem] animate-pulse rounded-full bg-[var(--accent-soft)]/90 ring-1 ring-[rgb(27_18_38_/0.05)]" aria-hidden />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href={ROUTES.login}
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-[var(--muted)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-soft)] hover:text-[var(--brand)] hover:shadow-[var(--shadow-xs)]"
      >
        <UserRound size={15} strokeWidth={2} />
        <span className="hidden sm:inline">Account</span>
      </Link>
    );
  }

  return (
    <div className="inline-flex items-center gap-1">
      <Link
        href={ROUTES.profile}
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-[var(--muted)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-soft)] hover:text-[var(--brand)] hover:shadow-[var(--shadow-xs)]"
      >
        <UserRound size={15} strokeWidth={2} />
        <span className="hidden sm:inline">Account</span>
      </Link>
      <button
        type="button"
        aria-label="Sign out"
        onClick={() => signOut({ callbackUrl: ROUTES.home })}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition-all duration-200 hover:bg-[var(--accent-soft)] hover:text-[var(--brand)] hover:shadow-[var(--shadow-xs)]"
      >
        <LogOut size={15} strokeWidth={2} />
      </button>
    </div>
  );
}
