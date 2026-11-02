/* ==========================================================================
   data.js — Centralized content & copy.
   EDIT THIS FILE to change business name, contact details and modal text.
   Frontend-only prototype: nothing here is sent to any server.
   ========================================================================== */

window.SITE = (function () {
  "use strict";

  /* ------------------------------------------------------------------
     1. BUSINESS IDENTITY  — replace these placeholders with your own
     ------------------------------------------------------------------ */
  var brand = {
    name: "Your Name",
    full: "Your Name Astrology & Numerology",
    tagline: "Astrology & Numerology",
    since: 2026,
    phoneDisplay: "+91 00000 00000",
    phoneHref: "tel:+910000000000",
    email: "consultations@example.com",
    location: "Available for consultations across India & worldwide (online)",
    hours: "Mon – Sat · 10:00 AM – 7:00 PM IST",
    social: [
      { label: "Facebook",  icon: "i-facebook",  href: "#", note: "Placeholder social profile" },
      { label: "Instagram", icon: "i-instagram", href: "#", note: "Placeholder social profile" },
      { label: "YouTube",   icon: "i-youtube",   href: "#", note: "Placeholder social profile" },
      { label: "WhatsApp",  icon: "i-whatsapp",  href: "#", note: "Placeholder contact link" }
    ]
  };

  /* ------------------------------------------------------------------
     2. SERVICE DETAIL MODALS — opened by each "Learn More" button
     ------------------------------------------------------------------ */
  var services = {
    "astrology-consultation": {
      eyebrow: "Service 01",
      title: "Astrology Consultation",
      duration: "60–90 minutes · Online or in person",
      summary:
        "A detailed interpretation of your natal chart, based on the exact date, time and place of your birth.",
      includes: [
        "Chart preparation from your birth date, time and place",
        "Interpretation of your Sun, Moon and Ascendant placements",
        "Analysis of major life areas — career, relationships, health patterns and finances",
        "Identification of recurring themes and patterns worth reflecting upon",
        "A one-to-one discussion with practical, respectful guidance"
      ],
      note:
        "Astrological interpretation is offered as guidance and perspective, not as a guarantee of future events."
    },
    "numerology-consultation": {
      eyebrow: "Service 02",
      title: "Numerology Consultation",
      duration: "45–60 minutes · Online or in person",
      summary:
        "Name and date-based numerological analysis that highlights your core numbers, strengths and recurring challenges.",
      includes: [
        "Life Path, Birth Day, Expression and Soul Urge numbers",
        "Analysis of the meaning embedded in your full name",
        "Personal strengths, tendencies and areas requiring balance",
        "Numerological timing indications for decision-making",
        "Clear, plain-language explanation of every number discussed"
      ],
      note:
        "Numerology is presented as a reflective tool for self-understanding rather than a scientific prediction."
    },
    "career-guidance": {
      eyebrow: "Service 03",
      title: "Career Guidance",
      duration: "60 minutes · Online or in person",
      summary:
        "Astrology and numerology-based perspectives on professional direction, timing and suitability of choices.",
      includes: [
        "Analysis of career-relevant planetary placements",
        "Strengths and work style indicated by your chart",
        "Suitable directions, roles and working environments",
        "Timing considerations for job changes, interviews or new ventures",
        "Practical suggestions for aligning work with your natural strengths"
      ],
      note:
        "Career guidance supports informed decisions. Final professional choices remain entirely yours."
    },
"relationship-guidance": {
      eyebrow: "Service 04",
      title: "Relationship Guidance",
      duration: "60–90 minutes · Confidential",
      summary:
        "A thoughtful, confidential discussion about relationship patterns, compatibility and communication.",
      includes: [
        "Understanding of your relationship tendencies and needs",
        "Compatibility themes explored through chart and number analysis",
        "Insights into communication patterns and recurring conflicts",
        "Guidance on emotional expression and expectations",
        "A calm, unbiased space to think through your situation"
      ],
      note:
        "Relationship consultations offer perspective. They do not replace open, honest communication between people."
    },
    "life-path-consultation": {
      eyebrow: "Service 05",
      title: "Life Path Consultation",
      duration: "45–60 minutes · Online or in person",
      summary:
        "Guidance centred on your personal strengths, recurring lessons and the direction your journey may take.",
      includes: [
        "Your core Life Path and the themes it carries",
        "Natural talents, preferences and inner motivations",
        "Patterns that may repeatedly appear in your life",
        "Practical reflections for personal growth and balance",
        "A structured summary of the themes discussed"
      ],
      note:
        "This consultation is intended to support personal reflection and informed choices."
    }
  };

  /* ------------------------------------------------------------------
     3. "KNOW MORE" ABOUT THE CONSULTANT
     ------------------------------------------------------------------ */
  var expert = {
    eyebrow: "About the Expert",
    title: "Your Name",
    role: "Astrology & Numerology Consultant",
    photoAlt:
      "Professional portrait placeholder of Your Name, Astrology and Numerology Consultant",
    philosophy:
      "Every consultation begins with listening, understanding and interpreting the unique patterns reflected through astrology and numerology.",
    detail: {
      paragraphs: [
        "Your Name is a consultant in astrology and numerology offering personalised consultations to individuals seeking greater clarity about their personal, professional and relational journeys. This entire profile is placeholder copy, written so the tone of a real consultancy is visible — replace every sentence with your own professional background.",
        "The approach is deliberately measured and ethical. Rather than making dramatic promises, the work focuses on interpreting the symbolic language of a birth chart or a set of numbers so that patterns become understandable and decisions become more informed.",
        "Sessions are conducted one-to-one, in a confidential setting, either online or in person. Every consultation is structured — birth details are reviewed, themes are discussed in plain language, and practical reflections are summarised at the end."
      ],
      bullets: [
        "Vedic and Western astrology perspectives",
        "Numerology with an emphasis on Life Path and Expression",
        "Career, relationship and life-direction consultations",
        "Clear, jargon-free explanations of every interpretation"
      ]
    }
  };
/* ------------------------------------------------------------------
     4. "REASON FOR CONSULTATION" OPTIONS
     ------------------------------------------------------------------ */
  var reasons = [
    "Career",
    "Marriage / Relationship",
    "Business",
    "Personal Growth",
    "Future Guidance",
    "Other"
  ];

  /* ------------------------------------------------------------------
     5. AUTHENTICATION SCREEN COPY (prototype only)
     ------------------------------------------------------------------ */
  var auth = {
    signupSuccess: {
      title: "Account Setup Completed",
      body:
        "Your details were validated and stored locally in this browser only. " +
        "This frontend demo does not create a real account on any server."
    },
    loginSuccess: {
      title: "Prototype Sign-In Complete",
      body:
        "You are signed in for this browser session using locally stored demo data. " +
        "No authentication service or server is involved in this demonstration."
    },
    forgot: {
      title: "Password Reset (Frontend Demo)",
      body:
        "In a live website this form would trigger a secure reset email. " +
        "This frontend demonstration does not send email, store credentials or contact any server, so no reset has been performed.",
      hint: "Please use the Forgot Password option on your real website to receive a reset link."
    }
  };

  /* ------------------------------------------------------------------
     6. APPOINTMENT CONFIRMATION COPY
     ------------------------------------------------------------------ */
  var bookingConfirm = {
    title: "Appointment Request Prepared",
    body:
      "Thank you. Your consultation details have been captured in this frontend demonstration.",
    note:
      "This frontend demo does not submit data to a server, so no real appointment has been created. Your details were validated and are held only in this browser.",
    refs: ["Name", "Mobile", "Email", "Date of Birth", "Time of Birth", "Reason for Consultation"]
  };

  return {
    brand: brand,
    services: services,
    expert: expert,
    reasons: reasons,
    auth: auth,
    bookingConfirm: bookingConfirm
  };
})();