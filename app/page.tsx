import Link from "next/link";
import { ArrowRight, CircleDollarSign, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import { DummyJsonProductRepository } from "@/core/infrastructure/repositories/dummyjson-repositories";
import { ProductCard } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";

const productRepo = new DummyJsonProductRepository();

export default async function Home() {
  const [featured, categories, trending] = await Promise.all([
    productRepo.list({ limit: 8, skip: 0, sortBy: "rating", order: "desc" }),
    productRepo.categories(),
    productRepo.list({ limit: 4, skip: 8, sortBy: "price", order: "desc" }),
  ]);

  const subtleCard =
    "rounded-2xl border border-[rgb(27_18_38_/0.06)] bg-[var(--surface-muted)] shadow-[var(--shadow-xs)]";

  return (
    <main className="mx-auto w-full max-w-7xl space-y-16 px-4 py-11 md:space-y-20 md:px-6 md:py-14">
      <section className="animate-fade-up relative overflow-hidden rounded-[1.75rem] border border-[rgb(255_255_255_/0.18)] bg-linear-to-br from-[#502345] via-[#8f3f6b] to-[#ea4d93] p-8 shadow-[0_28px_80px_-28px_rgb(84_35_71_/0.55)] ring-1 ring-inset ring-white/15 md:p-14">
        <div className="animate-float-soft pointer-events-none absolute -right-24 -top-28 h-[22rem] w-[22rem] rounded-full bg-[#ffd6eb]/35 blur-[100px]" />
        <div className="animate-float-soft delay-200 pointer-events-none absolute -bottom-32 left-[8%] h-56 w-56 rounded-full bg-[#fdf4ff]/25 blur-[80px]" />
        <div className="animate-pulse-soft pointer-events-none absolute right-[18%] top-1/2 h-3 w-3 rounded-full bg-white/55 shadow-[0_0_28px_rgb(255_255_255_/0.55)] md:right-[28%]" />
        <p className="animate-fade-up delay-100 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[rgb(255_255_255_/0.1)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-100 backdrop-blur-sm">
          <Sparkles size={14} className="text-pink-200" strokeWidth={2} />
          Verina Feminine Edit
        </p>
        <h1 className="animate-fade-up delay-200 mt-6 max-w-2xl font-semibold tracking-tight text-[2.125rem] leading-[1.12] text-white md:text-[3.35rem] md:leading-[1.05]">
          Soft luxury for modern women.
        </h1>
        <p className="animate-fade-up delay-300 mt-5 max-w-xl text-[15px] leading-relaxed text-rose-100/95 md:text-base">
          Curated fashion-forward essentials with elegant tones, tactile finishes, and a calm, confident silhouette.
        </p>
        <div className="animate-fade-up delay-400 mt-9 flex flex-wrap items-center gap-3">
          <Link href="/products">
            <Button className="gap-2 rounded-2xl border-0 bg-white px-7 text-[#6b2f55] shadow-[0_14px_40px_-14px_rgb(255_255_255_/0.55)] hover:bg-[#fff5fa] hover:shadow-[0_18px_48px_-12px_rgb(255_255_255_/0.45)]">
              Shop collection <ArrowRight size={15} strokeWidth={2} />
            </Button>
          </Link>
          <Link href="/wishlist">
            <Button
              className="gap-2 rounded-2xl border border-white/30 bg-[rgb(255_255_255_/0.1)] px-6 text-white shadow-none backdrop-blur-sm hover:bg-[rgb(255_255_255_/0.19)] hover:shadow-[var(--shadow-xs)]"
              variant="secondary"
            >
              Save favorites
            </Button>
          </Link>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <div className={`${subtleCard} border-white/25 bg-[rgb(255_255_255_/0.12)] p-4 text-white backdrop-blur-md`}>
            <p className="font-semibold tracking-tight">Fast delivery</p>
            <p className="mt-1 text-sm text-violet-100/90">2–5 business days</p>
          </div>
          <div className={`${subtleCard} border-white/25 bg-[rgb(255_255_255_/0.12)] p-4 text-white backdrop-blur-md`}>
            <p className="font-semibold tracking-tight">Premium curation</p>
            <p className="mt-1 text-sm text-violet-100/90">Top-rated feminine picks</p>
          </div>
          <div className={`${subtleCard} border-white/25 bg-[rgb(255_255_255_/0.12)] p-4 text-white backdrop-blur-md`}>
            <p className="font-semibold tracking-tight">Secure checkout</p>
            <p className="mt-1 text-sm text-violet-100/90">Encrypted payment flow</p>
          </div>
        </div>
      </section>

      <section className="animate-fade-up delay-100 grid gap-5 md:grid-cols-[1.38fr_1fr] md:gap-6">
        <article className="group relative min-h-[360px] overflow-hidden rounded-[1.65rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)] shadow-[var(--shadow-card)]">
          <Image
            src={featured.products[0]?.images?.[0] ?? featured.products[0]?.thumbnail ?? "/vercel.svg"}
            alt={featured.products[0]?.title ?? "Featured product"}
            fill
            className="object-cover transition-[transform] duration-[1.05s] ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-[#2f1528]/82 via-[#6b3960]/42 to-transparent" />
          <div className="relative z-10 flex h-full max-w-md flex-col justify-end p-7 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-200/90">
              Brand statement
            </p>
            <h2 className="mt-3 font-semibold tracking-tight text-[1.875rem] leading-tight md:text-[2rem]">
              Designed for her modern lifestyle.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/82">
              Feminine tones, clean silhouettes, and premium details across every capsule.
            </p>
          </div>
        </article>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1">
          {featured.products.slice(1, 3).map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="group relative min-h-[174px] overflow-hidden rounded-[1.35rem] border border-[rgb(27_18_38_/0.06)] shadow-[var(--shadow-card)] ring-1 ring-transparent transition duration-300 hover:ring-[rgb(225_29_116_/0.12)]"
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover transition duration-[1.05s] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#2b152a]/78 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 space-y-0.5 p-5 text-white">
                <p className="line-clamp-1 text-[15px] font-semibold tracking-tight">{item.title}</p>
                <p className="text-sm tabular-nums text-white/80">${item.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="animate-fade-up delay-200 grid gap-4 md:grid-cols-3 md:gap-5">
        {[
          {
            icon: Truck,
            title: "Express shipping",
            desc: "Optimized logistics for faster arrivals.",
          },
          {
            icon: ShieldCheck,
            title: "Trusted quality",
            desc: "Only reliable high-rated products shown.",
          },
          {
            icon: CircleDollarSign,
            title: "Smart value",
            desc: "Luxury feel with practical pricing.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="group rounded-[1.35rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#fce9f4] to-[#fdf0fa] shadow-[var(--shadow-xs)] ring-1 ring-[rgb(225_29_116_/0.08)]">
              <item.icon size={19} strokeWidth={2} className="text-[var(--accent-strong)]" />
            </span>
            <h3 className="mt-4 font-semibold tracking-tight text-[var(--brand)]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
          </article>
        ))}
      </section>

      <section className="animate-fade-up delay-300 space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
              Browse by mood
            </p>
            <h2 className="text-[1.75rem] font-semibold tracking-tight text-[var(--brand)] md:text-[2rem]">
              Categories
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {categories.slice(0, 10).map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="rounded-full border border-[rgb(27_18_38_/0.08)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--brand)] shadow-[var(--shadow-xs)] transition duration-200 hover:-translate-y-0.5 hover:border-[rgb(225_29_116_/0.28)] hover:bg-[var(--accent-soft)] hover:shadow-[var(--shadow-card)]"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="animate-fade-up delay-300 grid gap-5 md:grid-cols-3">
        {featured.products.slice(3, 6).map((item, idx) => (
          <Link
            key={item.id}
            href={`/products/${item.id}`}
            className="group rounded-[1.35rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)] ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:ring-[rgb(225_29_116_/0.08)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-linear-to-br from-[#fdf4fa] to-[#efe4f5] shadow-inner">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover transition duration-[1s] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
              Edition {idx + 1}
            </p>
            <h3 className="mt-1 line-clamp-1 text-[17px] font-semibold tracking-tight text-[var(--brand)]">
              {item.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-[15px] leading-relaxed text-[var(--muted)]">
              {item.description}
            </p>
          </Link>
        ))}
      </section>

      <section className="animate-fade-up delay-400 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
              Handpicked
            </p>
            <h2 className="text-[1.75rem] font-semibold tracking-tight text-[var(--brand)] md:text-[2rem]">
              Trending products
            </h2>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-[var(--accent-strong)] shadow-[var(--shadow-xs)] transition hover:bg-[var(--accent-soft)] hover:underline"
          >
            View all <ArrowRight size={14} strokeWidth={2} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {featured.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="animate-fade-up delay-400 rounded-[1.65rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)] p-7 shadow-[var(--shadow-card)] ring-1 ring-[rgb(225_29_116_/0.06)] md:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
              Investment edits
            </p>
            <h2 className="text-[1.75rem] font-semibold tracking-tight text-[var(--brand)] md:text-[2rem]">
              High-end picks
            </h2>
          </div>
          <Link
            href="/products"
            className="rounded-full px-5 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--brand)]"
          >
            Explore catalog
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {trending.products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group rounded-[1.25rem] border border-[rgb(27_18_38_/0.06)] bg-linear-to-br from-[#fff8fc] to-[#fdeef7] p-5 shadow-[var(--shadow-xs)] transition duration-300 hover:border-[rgb(225_29_116_/0.2)] hover:bg-[var(--surface)] hover:shadow-[var(--shadow-card-hover)]"
            >
              <p className="text-sm font-medium text-[var(--accent-strong)]">{product.category}</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--brand)] transition group-hover:text-[var(--accent-strong)]">
                {product.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[var(--muted)]">{product.description}</p>
              <p className="mt-4 text-base font-semibold tabular-nums text-[var(--foreground)]">${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
