"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";

interface ProductGalleryProps {
  title: string;
  thumbnail: string;
  images: string[];
}

export function ProductGallery({ title, thumbnail, images }: ProductGalleryProps) {
  const galleryImages = useMemo(
    () => [thumbnail, ...images.filter((img) => img !== thumbnail)].slice(0, 8),
    [thumbnail, images],
  );
  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [origin, setOrigin] = useState("50% 50%");
  const [isZoomed, setIsZoomed] = useState(false);
  const activeIndex = Math.max(0, galleryImages.findIndex((img) => img === activeImage));

  return (
    <section className="space-y-3">
      <div
        className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          setOrigin(`${x}% ${y}%`);
        }}
      >
        <Image
          src={activeImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-200 ease-out"
          style={{
            transformOrigin: origin,
            transform: isZoomed ? "scale(1.85)" : "scale(1)",
          }}
          priority
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2 py-1 text-xs text-white">
          Image {activeIndex + 1} / {galleryImages.length}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {galleryImages.slice(0, 8).map((img, idx) => {
          const active = img === activeImage;
          return (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative aspect-square overflow-hidden rounded-md border bg-zinc-100 transition ${
                active
                  ? "border-[var(--accent-strong)] ring-2 ring-[var(--accent-soft)]"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
              aria-label={`View ${title} gallery image`}
              aria-current={active ? "true" : undefined}
              aria-pressed={active}
            >
              <Image src={img} alt={title} fill className="object-cover" />
              {active ? (
                <span className="absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-strong)] text-white">
                  <Check size={12} />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
