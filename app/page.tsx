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

  return (
    <main className="mx-auto w-full max-w-7xl space-y-14 px-4 py-10 md:px-6">
      <section className="animate-fade-up relative overflow-hidden rounded-3xl border border-[#F4D8E7] bg-gradient-to-br from-[#6E3D5A] via-[#9C4F77] to-[#E86DA5] p-8 text-white shadow-xl md:p-12">
        <div className="animate-float-soft pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#FFD3E6]/40 blur-3xl" />
        <div className="animate-float-soft delay-200 pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-[#FFF7FB]/20 blur-3xl" />
        <p className="animate-fade-up delay-100 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-pink-50">
          <Sparkles size={14} />
          Verina Feminine Edit
        </p>
        <h1 className="animate-fade-up delay-200 mt-5 max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">
          Soft luxury for modern women.
        </h1>
        <p className="animate-fade-up delay-300 mt-4 max-w-xl text-pink-100">
          Curated fashion-forward essentials with elegant colors, premium textures, and modern confidence.
        </p>
        <div className="animate-fade-up delay-400 mt-7 flex flex-wrap items-center gap-3">
          <Link href="/products">
            <Button className="gap-2 bg-white text-[#7D3F62] hover:bg-[#FFE8F3]">
              Shop collection <ArrowRight size={15} />
            </Button>
          </Link>
          <Link href="/wishlist">
            <Button className="gap-2 border-white/25 bg-white/10 text-white hover:bg-white/20" variant="secondary">
              Save favorites
            </Button>
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/15 bg-white/5 p-3 text-sm">
            <p className="font-medium">Fast delivery</p>
            <p className="text-pink-100">2-5 business days</p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-3 text-sm">
            <p className="font-medium">Premium curation</p>
            <p className="text-pink-100">Top-rated feminine picks</p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-3 text-sm">
            <p className="font-medium">Secure checkout</p>
            <p className="text-pink-100">Encrypted payment flow</p>
          </div>
        </div>
      </section>

      <section className="animate-fade-up delay-100 grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <article className="group relative min-h-[350px] overflow-hidden rounded-3xl border border-[#F4D8E7] bg-white">
          <Image
            src={featured.products[0]?.images?.[0] ?? featured.products[0]?.thumbnail ?? "/vercel.svg"}
            alt={featured.products[0]?.title ?? "Featured product"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3F2134]/60 via-[#8A4A6A]/30 to-transparent" />
          <div className="relative z-10 flex h-full max-w-md flex-col justify-end p-6 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-200">Brand statement</p>
            <h2 className="mt-2 text-3xl font-semibold">Designed for her modern lifestyle.</h2>
            <p className="mt-2 text-sm text-zinc-200">
              Feminine tones, clean silhouettes, and premium details in every collection.
            </p>
          </div>
        </article>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
          {featured.products.slice(1, 3).map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="group relative min-h-[168px] overflow-hidden rounded-2xl border border-[#F4D8E7]"
            >
              <Image src={item.thumbnail} alt={item.title} fill className="object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4B2740]/65 to-black/10" />
              <div className="absolute bottom-0 p-4 text-white">
                <p className="line-clamp-1 text-sm font-medium">{item.title}</p>
                <p className="text-xs text-zinc-200">${item.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="animate-fade-up delay-200 grid gap-4 md:grid-cols-3">
        {[
          { icon: Truck, title: "Express shipping", desc: "Optimized logistics for faster arrivals." },
          { icon: ShieldCheck, title: "Trusted quality", desc: "Only reliable high-rated products shown." },
          { icon: CircleDollarSign, title: "Smart value", desc: "Luxury feel with practical pricing." },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-[#F4D8E7] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <item.icon size={18} className="text-[#D85795]" />
            <h3 className="mt-3 font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm text-[#6F5F73]">{item.desc}</p>
          </article>
        ))}
      </section>

      <section className="animate-fade-up delay-300 space-y-5">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.slice(0, 10).map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="rounded-full border border-[#F4D8E7] bg-white px-4 py-2 text-sm shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#FDE6F1]"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="animate-fade-up delay-300 grid gap-4 md:grid-cols-3">
        {featured.products.slice(3, 6).map((item, idx) => (
          <Link
            key={item.id}
            href={`/products/${item.id}`}
            className="group rounded-2xl border border-[#F4D8E7] bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100">
              <Image src={item.thumbnail} alt={item.title} fill className="object-cover transition group-hover:scale-105" />
            </div>
            <p className="mt-3 text-xs uppercase tracking-wider text-[#8A6E88]">
              Edition {idx + 1}
            </p>
            <h3 className="mt-1 line-clamp-1 text-base font-semibold">{item.title}</h3>
            <p className="line-clamp-2 text-sm text-[#6F5F73]">{item.description}</p>
          </Link>
        ))}
      </section>

      <section className="animate-fade-up delay-400 space-y-5">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Trending products</h2>
          <Link href="/products" className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {featured.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="animate-fade-up delay-400 rounded-3xl border border-[#F4D8E7] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">High-end picks</h2>
          <Link href="/products" className="text-sm text-[#6F5F73] hover:text-[#1F1722]">
            Explore catalog
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {trending.products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group rounded-2xl border border-[#F4D8E7] bg-[#FFF4FA] p-4 transition hover:border-[#EFC3DA] hover:bg-white"
            >
              <p className="text-sm text-[#8A6E88]">{product.category}</p>
              <h3 className="mt-1 font-semibold group-hover:text-[#B54A86]">{product.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-[#6F5F73]">{product.description}</p>
              <p className="mt-3 text-sm font-medium">${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
