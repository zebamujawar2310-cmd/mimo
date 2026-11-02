"use client";

import * as React from "react";
import { Clapperboard, Gauge, Hammer, Timer } from "lucide-react";

export function VideoShowcase() {
  const [videoFailed, setVideoFailed] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // A missing video 404s BEFORE hydration, so the React onError prop alone
  // can miss it — re-check after mount.
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const check = () => {
      if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        setVideoFailed(true);
      }
    };
    check();
    v.addEventListener("error", check);
    return () => v.removeEventListener("error", check);
  }, []);

  const curiosity = [
    {
      icon: Gauge,
      text: "Watch real cutting power that string lines can't match",
    },
    { icon: Timer, text: "See a full working pass — no line changes, no stalls" },
    {
      icon: Hammer,
      text: "Judge the metal build quality with your own eyes before buying",
    },
  ];

  return (
    <section id="product" className="bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <p className="eyebrow mb-4 text-white/60">Product Demo</p>
        <h2 className="text-3xl sm:text-4xl">
          See it cut. Hear it power. No string required.
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">
          Most trimmer demos hide the hard work. We don&apos;t. Watch the
          metal head take on grass, moss and stubborn weeds — then ask
          yourself when your string line ever did that. Questions after
          watching? Our team is one message away.
        </p>

        <div className="mt-10 border border-white/20 bg-neutral-950">
          {!videoFailed ? (
            <video
              ref={videoRef}
              className="aspect-video w-full"
              controls
              playsInline
              preload="metadata"
              src="/product-video.mp4"
              onError={() => setVideoFailed(true)}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 px-6 text-center">
              <Clapperboard className="h-10 w-10 text-white/60" aria-hidden="true" />
              <p className="text-lg">Product video coming soon.</p>
              <p className="max-w-md text-sm text-white/60">
                The demonstration video will reappear as soon as it is
                re-uploaded. Meanwhile, use the contact form below if you
                would like to see more of the product.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {curiosity.map((item) => (
            <div key={item.text} className="flex flex-col items-center gap-3">
              <item.icon className="h-6 w-6 text-white/70" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-white/70">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-white/40">
          Standard player controls (play, pause, volume, fullscreen).
          Nothing plays automatically.
        </p>
      </div>
    </section>
  );
}