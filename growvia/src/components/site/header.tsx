"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { useSite } from "@/components/site/site-provider";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const { openConsultation } = useSite();

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setOpen(false);

  const handleConsult = () => {
    closeMenu();
    openConsultation();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#home"
          onClick={closeMenu}
          aria-label="Growvia — back to top"
          className="transition-opacity hover:opacity-80"
        >
          <Logo />
        </a>

        <nav
          className="hidden items-center gap-5 lg:flex"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-charcoal transition-colors hover:text-teal-600"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" onClick={() => openConsultation()}>
            Book a Free Consultation
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy transition-colors hover:bg-mist lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-slate-line bg-white lg:hidden"
        >
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-mist hover:text-teal-600"
              >
                {link.label}
              </a>
            ))}
            <Button className="mt-3 w-full" onClick={handleConsult}>
              Book a Free Consultation
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
