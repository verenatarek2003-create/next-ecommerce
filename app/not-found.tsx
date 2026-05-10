import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4.125rem)] w-full max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">404</span>
      <h1 className="mt-3 text-[2.25rem] font-semibold tracking-tight text-[var(--brand)]">Page not found</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">
        The page you requested does not exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center rounded-2xl border border-transparent bg-linear-to-r from-[#e11d74] to-[#aa1a5f] px-10 py-3 text-sm font-semibold text-white shadow-[0_10px_32px_-10px_rgb(225_29_116_/0.52)] transition hover:-translate-y-0.5"
      >
        Back home
      </Link>
    </main>
  );
}
