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
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          href={ROUTES.home}
          className="inline-flex items-center gap-2 text-lg font-semibold tracking-wide text-[var(--brand)]"
        >
          <House size={18} className="text-[var(--accent-strong)]" />
          <span>Verina</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-soft)] hover:text-[var(--brand)]"
            >
              {link.href === ROUTES.products ? <ShoppingBag size={15} /> : null}
              {link.href === ROUTES.wishlist ? <Heart size={15} /> : null}
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
