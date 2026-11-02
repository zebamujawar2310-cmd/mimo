"use client";

import * as React from "react";
import { Loader2, Star } from "lucide-react";

import {
  loadReviews,
  saveReview,
  type DemoReview,
} from "@/lib/demo-reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function StarRating({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= value ? "fill-black text-black" : "text-black/25"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function Reviews() {
  const [reviews, setReviews] = React.useState<DemoReview[]>([]);
  const [form, setForm] = React.useState({ name: "", comment: "" });
  const [rating, setRating] = React.useState(5);
  const [errors, setErrors] = React.useState<{ name?: string; comment?: string }>({});
  const [phase, setPhase] = React.useState<"idle" | "saving" | "done">("idle");

  React.useEffect(() => {
    setReviews(loadReviews());
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (form.comment.trim().length < 5)
      next.comment = "Please write at least 5 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setPhase("saving");
    window.setTimeout(() => {
      setReviews(
        saveReview({
          id: `rev-${Date.now()}`,
          name: form.name.trim(),
          rating,
          comment: form.comment.trim(),
          createdAt: new Date().toISOString(),
        })
      );
      setForm({ name: "", comment: "" });
      setRating(5);
      setPhase("done");
    }, 700);
  };

  return (
    <section id="reviews" className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <p className="eyebrow mb-4 text-black/50">Reviews</p>
        <h2 className="text-3xl sm:text-4xl">What owners say</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-black/60">
          Reviews come from verified purchases and are checked before they
          are published — no fabricated testimonials, ever.
        </p>

        <div className="mt-10 space-y-4 text-left">
          {reviews.length === 0 && (
            <div className="border border-black/15 p-8 text-center">
              <p className="text-lg">No reviews yet — be the first.</p>
              <p className="mt-2 text-sm text-black/60">
                Share your experience with Trimmer&nbsp;Boss™ using the form
                below.
              </p>
            </div>
          )}
          {reviews.map((review) => (
            <div key={review.id} className="border border-black/15 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-base">{review.name}</p>
                <span className="border border-black/25 px-2 py-0.5 text-[0.65rem] tracking-[0.15em] uppercase text-black/60">
                  Pending verification
                </span>
              </div>
              <div className="mt-2">
                <StarRating value={review.rating} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-black/75">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 border border-black/15 p-8 text-left">
          <h3 className="text-center text-xl">Leave a comment</h3>
          {phase === "done" ? (
            <div className="mt-4 text-center">
              <p className="text-sm text-black/70">
                Thanks! Your review was saved on this device with a
                &quot;pending verification&quot; badge. Connect a moderation
                database before launch so real submissions reach the team.
              </p>
              <Button
                variant="outline"
                className="mt-5"
                onClick={() => setPhase("idle")}
              >
                Write another review
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="review-name">Your name</Label>
                <Input
                  id="review-name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, name: e.target.value }));
                    setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs text-black">{errors.name}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Rating</Label>
                <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      role="radio"
                      aria-checked={rating === i}
                      aria-label={`${i} star${i > 1 ? "s" : ""}`}
                      onClick={() => setRating(i)}
                      className="transition-transform duration-200 hover:scale-110"
                    >
                      <Star
                        className={`h-6 w-6 ${i <= rating ? "fill-black text-black" : "text-black/25"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="review-comment">Your comment</Label>
                <Textarea
                  id="review-comment"
                  value={form.comment}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, comment: e.target.value }));
                    setErrors((p) => ({ ...p, comment: undefined }));
                  }}
                  aria-invalid={!!errors.comment}
                />
                {errors.comment && (
                  <p className="text-xs text-black">{errors.comment}</p>
                )}
              </div>

              <Button type="submit" disabled={phase === "saving"}>
                {phase === "saving" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Saving…
                  </>
                ) : (
                  "Post review"
                )}
              </Button>
              <p className="text-center text-xs text-black/40">
                Demo mode — submissions are stored in this browser only.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}