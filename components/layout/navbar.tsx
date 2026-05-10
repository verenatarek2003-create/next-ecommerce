import Link from "next/link";
import { Heart, House, ShoppingBag } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { CartLink } from "@/components/layout/cart-link";
import { AuthNavActions } from "@/features/auth/components/auth-nav-actions";

const links = [
  { href: ROUTES.products, label: "Shop" },
  { href: ROUTES.wishlist, label: "Wishlist" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgb(27_18_38_/0.06)] bg-[var(--surface)]/70 shadow-[var(--shadow-nav)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-[var(--surface)]/55">
      <div className="mx-auto flex h-[4.125rem] w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          href={ROUTES.home}
          className="group inline-flex items-center gap-3 text-[1.0625rem] font-semibold tracking-tight text-[var(--brand)]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-[#fde9f6] via-white to-[#f5dff0] shadow-[var(--shadow-xs)] ring-1 ring-[rgb(225_29_116_/0.12)] transition duration-300 group-hover:shadow-[var(--shadow-card)]">
            <House size={17} className="text-[var(--accent-strong)] transition group-hover:text-[var(--accent)]" />
          </span>
          <span className="bg-linear-to-r from-[var(--brand)] to-[#5c2f5c] bg-clip-text text-transparent">
            Verina
          </span>
        </Link>
        <nav className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-medium transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-soft)] hover:text-[var(--brand)] hover:shadow-[var(--shadow-xs)]"
            >
              {link.href === ROUTES.products ? <ShoppingBag size={15} strokeWidth={2} /> : null}
              {link.href === ROUTES.wishlist ? <Heart size={15} strokeWidth={2} /> : null}
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
          <CartLink />
          <AuthNavActions />
        </nav>
      </div>
    </header>
  );
}
