"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSite } from "@/components/site/site-provider";

type FormState = "idle" | "submitting" | "success";

type Fields = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  requirements: string;
};

type FieldErrors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: BUDGET_OPTIONS[0],
  requirements: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,}$/;

function validate(values: Fields): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your business email address.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "That email address doesn't look right. Please check it.";
  }

  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number, or leave it blank.";
  }

  if (!values.service) {
    errors.service = "Please choose the service you're interested in.";
  }

  if (!values.requirements.trim()) {
    errors.requirements = "Please tell us a little about your project.";
  } else if (values.requirements.trim().length < 20) {
    errors.requirements =
      "Please add a bit more detail (at least 20 characters).";
  }

  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-start gap-1.5 text-[13px] font-medium text-red-600"
    >
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function InquiryForm({ className }: { className?: string }) {
  const uid = React.useId();
  const id = (suffix: string) => `${uid}-${suffix}`;
  const { preselectedService } = useSite();
  const [values, setValues] = React.useState<Fields>(EMPTY);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [state, setState] = React.useState<FormState>("idle");
  const [submittedName, setSubmittedName] = React.useState("");

  // Pre-select a service when opened from an "Explore Service" CTA.
  React.useEffect(() => {
    if (preselectedService) {
      setValues((v) => ({ ...v, service: preselectedService }));
    }
  }, [preselectedService]);

  const set =
    (key: keyof Fields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const next = { ...values, [key]: e.target.value };
      setValues(next);
      // Clear the error as soon as the field becomes valid.
      if (errors[key]) setErrors(validate(next));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    const firstError = Object.keys(found)[0];
    if (firstError) {
      // Move focus to the first invalid control for keyboard users.
      // (Errors are keyed to the `name` attribute of each control.)
      const form = e.currentTarget;
      const invalid = form.querySelector<HTMLElement>(
        `[name="${firstError}"]`
      );
      invalid?.focus();
      return;
    }

    // ---- DEMO SUBMISSION -------------------------------------------
    // This site is frontend-only. Nothing is sent to, or stored on,
    // any server. The state below simply confirms the demo flow.
    // ----------------------------------------------------------------
    setState("submitting");
    window.setTimeout(() => {
      setSubmittedName(values.fullName.trim());
      setState("success");
    }, 700);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setState("idle");
  };

  if (state === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-teal/40 bg-teal/5 p-6 text-center sm:p-8",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal/15">
          <CheckCircle2 className="h-6 w-6 text-teal-600" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-lg font-bold text-navy">
          Thank you{submittedName ? `, ${submittedName.split(" ")[0]}` : ""} —
          your details look good.
        </h3>
        <div className="mx-auto mt-3 max-w-md rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-left">
          <p className="flex gap-2 text-[13px] leading-relaxed text-amber-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              <strong className="font-semibold">Demo only — nothing was sent.</strong>{" "}
              This website is frontend-only, so your enquiry has not been
              transmitted or stored anywhere. Connect a form service or
              backend endpoint to start receiving submissions.
            </span>
          </p>
        </div>
        <Button type="button" variant="outline" className="mt-5" onClick={reset}>
          Start over
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
      aria-describedby={id("demo-note")}
    >
      {/* Demo notice */}
      <p
        id={id("demo-note")}
        className="flex gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-[13px] leading-relaxed text-sky-900"
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          <strong className="font-semibold">Demo form:</strong> validation runs
          in your browser only — submissions are not sent or stored until a
          backend or form service is connected.
        </span>
      </p>


      {/* Full Name */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={id("fullName")}>
            Full Name <span className="text-red-600">*</span>
          </Label>
          <Input
            id={id("fullName")}
            name="fullName"
            autoComplete="name"
            placeholder="Jane Doe"
            className="mt-1.5"
            required
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? id("err-fullName") : undefined}
            value={values.fullName}
            onChange={set("fullName")}
          />
          <FieldError id={id("err-fullName")} message={errors.fullName} />
        </div>

        {/* Business Email */}
        <div>
          <Label htmlFor={id("email")}>
            Business Email <span className="text-red-600">*</span>
          </Label>
          <Input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            className="mt-1.5"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? id("err-email") : undefined}
            value={values.email}
            onChange={set("email")}
          />
          <FieldError id={id("err-email")} message={errors.email} />
        </div>

        {/* Phone Number */}
        <div>
          <Label htmlFor={id("phone")}>Phone Number</Label>
          <Input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            className="mt-1.5"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? id("err-phone") : undefined}
            value={values.phone}
            onChange={set("phone")}
          />
          <FieldError id={id("err-phone")} message={errors.phone} />
        </div>

        {/* Company Name */}
        <div>
          <Label htmlFor={id("company")}>Company Name</Label>
          <Input
            id={id("company")}
            name="company"
            autoComplete="organization"
            placeholder="Acme Inc."
            className="mt-1.5"
            value={values.company}
            onChange={set("company")}
          />
        </div>
      </div>

      {/* Service Required */}
      <div>
        <Label htmlFor={id("service")}>
          Service Required <span className="text-red-600">*</span>
        </Label>
        <Select
          id={id("service")}
          name="service"
          className="mt-1.5"
          required
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? id("err-service") : undefined}
          value={values.service}
          onChange={set("service")}
        >
          <option value="">Select a service…</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
        <FieldError id={id("err-service")} message={errors.service} />
      </div>

      {/* Estimated Project Budget */}
      <div>
        <Label htmlFor={id("budget")}>Estimated Project Budget</Label>
        <Select
          id={id("budget")}
          name="budget"
          className="mt-1.5"
          value={values.budget}
          onChange={set("budget")}
        >
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      </div>

      {/* Project Requirements */}
      <div>
        <Label htmlFor={id("requirements")}>
          Project Requirements <span className="text-red-600">*</span>
        </Label>
        <Textarea
          id={id("requirements")}
          name="requirements"
          placeholder="Tell us about your goals, timeline, and what you'd like to achieve…"
          className="mt-1.5"
          required
          aria-invalid={!!errors.requirements}
          aria-describedby={
            errors.requirements
              ? id("err-requirements")
              : id("hint-requirements")
          }
          value={values.requirements}
          onChange={set("requirements")}
        />
        <p id={id("hint-requirements")} className="mt-1.5 text-xs text-charcoal/55">
          At least 20 characters.
        </p>
        <FieldError id={id("err-requirements")} message={errors.requirements} />
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-charcoal/60">
          We&apos;ll only use your details to respond to this enquiry.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={state === "submitting"}
          className="w-full sm:w-auto"
        >
          {state === "submitting" ? "Checking…" : "Send Enquiry"}
        </Button>
      </div>
    </form>
  );
}


