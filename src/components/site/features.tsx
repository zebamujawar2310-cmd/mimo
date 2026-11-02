import {
  BadgePercent,
  Leaf,
  Recycle,
  Shield,
  Timer,
} from "lucide-react";

const features = [
  {
    icon: BadgePercent,
    title: "More Powerful Than Any Traditional String Head",
    body: "Metal doesn't stretch, snap or stall. It cuts where plastic line gives up — driveways, patios and overgrown edges included.",
  },
  {
    icon: Recycle,
    title: "Plastic Free Eco Friendly Design — Help The Planet",
    body: "No spools. No wasted line. No plastic left behind in your yard — one reusable head does it all.",
  },
  {
    icon: Shield,
    title: "Free Adapter Kit Fits 99% Of Trimmers On The Market",
    body: "Your trimmer already has the power. The free adapter kit puts metal behind it — confirm your model with us in seconds.",
  },
  {
    icon: Timer,
    title: "Saves Up To 8 Hours A Year On Line Replacement",
    body: "Stop buying, spooling and swapping. The head stays mounted and keeps cutting, weekend after weekend.",
  },
  {
    icon: Leaf,
    title: "Durable & Sturdy To Make Lawn & Yard Care Fast & Easy",
    body: "One solid metal head, built to survive years of hard use — not one season of weekends.",
  },
];

export function Features() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 text-black/50">Features</p>
          <h2 className="text-3xl sm:text-4xl">
            Engineered to outwork — and outlast — string.
          </h2>
          <p className="mt-4 text-black/70">
            Five reasons Trimmer&nbsp;Boss™ replaces disposable plastic for
            good.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col border border-black/15 p-8 text-center transition-all duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:-translate-y-0.5"
            >
              <feature.icon
                className="mx-auto h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-lg leading-snug">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/70">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}