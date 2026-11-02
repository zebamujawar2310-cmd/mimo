"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { useSite } from "@/components/site/site-provider";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const { openOrder, openTrack } = useSite();

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#home"
          onClick={closeMenu}
          className="text-lg tracking-[0.25em] uppercase hover:opacity-70 transition-opacity"
        >
          Trimmer&nbsp;Boss<span className="align-super text-[0.6em]">™</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-[0.12em] uppercase transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => openTrack()}
            className="text-sm tracking-[0.12em] uppercase transition-opacity hover:opacity-60"
          >
            Track Order
          </button>
          <Button size="sm" onClick={() => openOrder()}>
            Order Now
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/10 bg-white lg:hidden">
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="py-3 text-center text-sm tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                closeMenu();
                openTrack();
              }}
              className="py-3 text-center text-sm tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
            >
              Track Order
            </button>
            <Button
              className="mt-2 w-full"
              onClick={() => {
                closeMenu();
                openOrder();
              }}
            >
              Order Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
