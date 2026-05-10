import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-2 text-zinc-600">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-6 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium"
      >
        Go home
      </Link>
    </main>
  );
}
