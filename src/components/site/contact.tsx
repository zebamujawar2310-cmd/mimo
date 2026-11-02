"use client";

import * as React from "react";
import { Loader2, Mail } from "lucide-react";

import { SITE } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = { name?: string; email?: string; message?: string };

export function Contact() {
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = React.useState<Errors>({});
  const [phase, setPhase] = React.useState<"idle" | "loading" | "done">("idle");

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n: Errors = {};
    if (!form.name.trim()) n.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email.trim()))
      n.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10)
      n.message = "Please write at least 10 characters.";
    setErrors(n);
    if (Object.keys(n).length > 0) return;

    setPhase("loading");
    window.setTimeout(() => setPhase("done"), 1000);
  };

  return (
    <section id="contact" className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <p className="eyebrow mb-4 text-black/50">Contact Us</p>
        <h2 className="text-3xl sm:text-4xl">Questions? We&apos;re here.</h2>
        <p className="mx-auto mt-4 max-w-lg text-black/70">
          Compatibility questions, order help or anything else — send a
          message and our team will get back to you.
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-black/70">
          <Mail className="h-4 w-4" aria-hidden="true" />
          <span>{SITE.supportEmail}</span>
          <span className="text-xs text-black/40">(to be confirmed)</span>
        </div>

        <div className="mt-10 border border-black/15 p-8 text-left">
          {phase === "done" ? (
            <div className="text-center">
              <p className="text-lg">Message captured — demo only</p>
              <p className="mx-auto mt-3 max-w-md text-sm text-black/60">
                This site is a frontend demo, so your message was{" "}
                <strong>not sent</strong> anywhere. Connect a form service
                (such as Formspree or EmailJS) or wire up your own endpoint
                before launch to receive real messages.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setForm({ name: "", email: "", message: "" });
                  setPhase("idle");
                }}
              >
                Write another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  autoComplete="name"
                  value={form.name}
                  onChange={set("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "contact-name-err" : undefined}
                />
                {errors.name && (
                  <p id="contact-name-err" className="text-xs text-black">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={set("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-err" : undefined}
                />
                {errors.email && (
                  <p id="contact-email-err" className="text-xs text-black">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  value={form.message}
                  onChange={set("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-err" : undefined}
                />
                {errors.message && (
                  <p id="contact-message-err" className="text-xs text-black">
                    {errors.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={phase === "loading"}>
                {phase === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </Button>
              <p className="text-center text-xs text-black/40">
                Demo form — nothing is transmitted or stored.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
