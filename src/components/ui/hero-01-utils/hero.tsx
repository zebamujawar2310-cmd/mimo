"use client";

import * as React from "react";
import { Image } from "lucide-react";

export interface AvatarList {
  image: string;
}

interface HeroSectionProps {
  avatarList: AvatarList[];
}

export default function HeroSection({ avatarList }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gray-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <Image className="h-6 w-6 mb-4" strokeWidth={2} />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Build your next big idea
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of teams shipping amazing products with our platform.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="#"
              className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-900"
            >
              Get started
            </a>
            <a
              href="#"
              className="rounded-full border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Learn more
            </a>
          </div>
          <div className="mt-16 flex items-center justify-center gap-8 opacity-60">
            {avatarList.map((avatar, index) => (
              <div
                key={index}
                className="relative flex h-16 w-16 shrink-0 items-center justify-center"
              >
                <img
                  className="h-full w-full rounded-full object-cover border border-white"
                  src={avatar.image}
                  alt={`Avatar ${index + 1}`}
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
