/* Demo-only order storage (browser localStorage). No backend involved. */

export type DemoOrder = {
  id: string;
  qty: number;
  discountPercent: number;
  total: number | null;
  currency: string;
  createdAt: string;
  status: "received";
};

const STORAGE_KEY = "tb_demo_orders_v1";

export function generateDemoOrderId(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `TB-DEMO-${n}`;
}

export function saveDemoOrder(order: DemoOrder): void {
  if (typeof window === "undefined") return;
  try {
    const existing = loadDemoOrders();
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([order, ...existing].slice(0, 20))
    );
  } catch {
    // Storage unavailable (private mode etc.) — demo order simply won't persist.
  }
}

export function loadDemoOrders(): DemoOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DemoOrder[]) : [];
  } catch {
    return [];
  }
}

export type TrackResult =
  | { kind: "sample" }
  | { kind: "stored"; order: DemoOrder }
  | { kind: "not-found" };

export function resolveTracking(orderId: string): TrackResult {
  const id = orderId.trim().toUpperCase();
  if (id === "TB-DEMO-0001") return { kind: "sample" };
  const stored = loadDemoOrders().find((o) => o.id.toUpperCase() === id);
  if (stored) return { kind: "stored", order: stored };
  return { kind: "not-found" };
}
