"use client";

import * as React from "react";

import { PRODUCT, SITE } from "@/lib/config";
import { useSite } from "@/components/site/site-provider";

const productLinks = [
  { label: "Product", href: "#product" },
  { label: "Benefits", href: "#benefits" },
  { label: "Our Mission", href: "#mission" },
  { label: "Bundles", href: "#bundles" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const policyLinks = [
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Returns & Refunds", href: "/returns-refunds" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export function Footer() {
  const { openOrder, openTrack } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <p className="text-lg tracking-[0.25em] uppercase">
              Trimmer&nbsp;Boss
              <span className="align-super text-[0.6em]">™</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70 mx-auto sm:mx-0">
              {PRODUCT.shortName} — a durable metal trimmer head for smarter,
              tougher yard care. Serving homeowners and gardening enthusiasts
              at {SITE.domain}.
            </p>
          </div>

          <nav aria-label="Footer product links">
            <p className="text-sm tracking-[0.2em] uppercase">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => openOrder()}
                  className="transition-colors hover:text-white"
                >
                  Order Now
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openTrack()}
                  className="transition-colors hover:text-white"
                >
                  Track Order
                </button>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer policy links">
            <p className="text-sm tracking-[0.2em] uppercase">Policies</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="transition-colors hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8 text-center">
          <p className="text-xs text-white/50">
            Demo storefront — orders, tracking and messages are simulated in
            the browser and no payment is processed.
          </p>
          <p className="mt-3 text-sm text-white/70">
            © {year} {SITE.legalName}. All rights reserved. · {SITE.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}
