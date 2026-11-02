/* Demo-only review storage (browser localStorage). No backend involved.
 * Reviews are labelled "pending verification" — wire up a real moderation
 * database before launch. */

export type DemoReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

const STORAGE_KEY = "tb_demo_reviews_v1";

export function loadReviews(): DemoReview[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DemoReview[]) : [];
  } catch {
    return [];
  }
}

export function saveReview(review: DemoReview): DemoReview[] {
  const next = [review, ...loadReviews()].slice(0, 50);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable (private mode etc.) — review stays in memory only.
    }
  }
  return next;
}
