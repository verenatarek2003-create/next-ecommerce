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
    <section className="space-y-4">
      <div
        className="relative aspect-square overflow-hidden rounded-[1.35rem] border border-[rgb(27_18_38_/0.06)] bg-linear-to-br from-[#fdf6fb] to-[#ede4f2] shadow-[var(--shadow-card)] ring-1 ring-[rgb(225_29_116_/0.06)]"
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
        <span className="absolute left-3 top-3 inline-flex rounded-full border border-[rgb(255_255_255_/0.35)] bg-[rgb(0_0_0_/0.38)] px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          Image {activeIndex + 1} / {galleryImages.length}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5">
        {galleryImages.slice(0, 8).map((img, idx) => {
          const active = img === activeImage;
          return (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative aspect-square overflow-hidden rounded-xl bg-linear-to-br from-[#fef6fb] to-[#ede4f2] transition duration-200 ${
                active
                  ? "border-[1.5px] border-[var(--accent-strong)] shadow-[var(--shadow-card)] ring-2 ring-[var(--accent-soft)]"
                  : "border border-[rgb(27_18_38_/0.06)] hover:border-[rgb(225_29_116_/0.25)] hover:shadow-[var(--shadow-xs)]"
              }`}
              aria-label={`View ${title} gallery image`}
              aria-current={active ? "true" : undefined}
              aria-pressed={active}
            >
              <Image src={img} alt={title} fill className="object-cover" />
              {active ? (
                <span className="absolute right-1.5 top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-br from-[#e11d74] to-[#aa1a5f] text-white shadow-[0_4px_12px_rgb(225_29_116_/0.45)]">
                  <Check size={12} strokeWidth={2.5} />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
