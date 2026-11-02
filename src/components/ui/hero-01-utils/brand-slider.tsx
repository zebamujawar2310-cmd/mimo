"use client";

import * as React from "react";

export interface BrandList {
  image: string;
  lightimg: string;
  name: string;
}

interface BrandSliderProps {
  brandList: BrandList[];
}

export default function BrandSlider({ brandList }: BrandSliderProps) {
  return (
    <section className="py-12 border-y border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Trusted by leading brands
          </p>
          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between overflow-hidden">
            {brandList.map((brand, index) => (
              <div
                key={brand.name || index}
                className="flex h-12 items-center justify-center opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="h-8 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
