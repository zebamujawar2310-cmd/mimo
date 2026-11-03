import type { Metadata } from "next";
import { SpatialProductShowcase } from "@/components/ui/spatial-product-showcase";
import { SiteProvider } from "@/components/site/site-provider";
import { OrderModal } from "@/components/site/order-modal";
import { TrackModal } from "@/components/site/track-modal";

export const metadata: Metadata = {
  title: "Trimmer Boss Product Showcase",
  description:
    "Explore the Trimmer Boss metal trimmer head, compare it with traditional string heads, and watch the product demonstration.",
};

export default function ProductShowcasePage() {
  return (
    <SiteProvider>
      <SpatialProductShowcase />
      <OrderModal />
      <TrackModal />
    </SiteProvider>
  );
}
