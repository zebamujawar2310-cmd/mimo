"use client";

import * as React from "react";
import { PlayCircle, Truck } from "lucide-react";

import { PRODUCT, UNIT_PRICE } from "@/lib/config";
import { formatMoney } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { useSite } from "@/components/site/site-provider";

export function Hero() {
  const [bgFailed, setBgFailed] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const { openOrder, openTrack } = useSite();
  const price = formatMoney(UNIT_PRICE.amount, UNIT_PRICE.currency);

  // A missing background 404s before hydration — re-check after mount so
  // the fallback panel still appears if the file is ever removed.
  React.useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setBgFailed(true);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-black text-white"
    >
      {!bgFailed && (
        // Brand background image — automatic dark fallback if it ever goes
        // missing (see public/ASSETS.md).
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src="/hero-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setBgFailed(true)}
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="eyebrow mb-6 text-white/70">Trimmer Boss™</p>
        <h1 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
          {PRODUCT.headline}
        </h1>
        <p className="mt-6 text-xl italic sm:text-2xl">{PRODUCT.subheadline}</p>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80">
          {PRODUCT.description}
        </p>

        <div className="mt-5 text-2xl">
          {price ? (
            <span>
              {price}
              <span className="ml-3 align-middle text-sm font-normal text-white/70">
                for 1 unit
              </span>
            </span>
          ) : (
            <span className="text-sm text-white/60">Price to be announced</span>
          )}
        </div>
        <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/75">
          <Truck className="h-4 w-4" aria-hidden="true" />
          Free worldwide shipping · 30-day money-back guarantee
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            variant="inverse"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => openOrder()}
          >
            Order Now
          </Button>
          <Button
            variant="outlineInverse"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => openTrack()}
          >
            Track Order
          </Button>
          <Button
            variant="outlineInverse"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact Us
          </Button>
        </div>

        <a
          href="#product"
          className="mt-10 inline-flex items-center gap-2 text-sm tracking-[0.25em] uppercase text-white/80 transition-colors hover:text-white"
        >
          <PlayCircle className="h-5 w-5" />
          See it in action
        </a>
      </div>
    </section>
  );
}