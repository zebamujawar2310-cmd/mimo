import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ARFA | Considered Hotel Management", template: "%s | ARFA" },
  description: "A refined hotel operations workspace for thoughtful stays, attentive service, and seamless daily management.",
  keywords: ["ARFA", "hotel management", "hospitality", "room operations"],
  icons: { icon: "/arfa-mark.svg" },
  robots: { index: true, follow: true },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#171814" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased"><Providers>{children}</Providers></body></html>;
}
