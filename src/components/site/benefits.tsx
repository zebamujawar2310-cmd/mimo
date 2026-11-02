import { BrickWall, Car, Fence, Flower2, Footprints, LayoutGrid } from "lucide-react";

const perfectFor = [
  { icon: BrickWall, label: "Concrete" },
  { icon: Car, label: "Driveways" },
  { icon: LayoutGrid, label: "Patios" },
  { icon: Fence, label: "Hedges" },
  { icon: Footprints, label: "Sidewalks" },
  { icon: Flower2, label: "Edges" },
];

export function Benefits() {
  return (
    <section id="benefits" className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 text-black/50">Benefits</p>
          <h2 className="text-3xl sm:text-4xl">
            One head. Every surface. Zero excuses.
          </h2>
          <p className="mt-4 text-black/70">
            Grass, moss, weeds, dirt, dust — if it doesn&apos;t belong on
            your yard, patio or driveway, Trimmer&nbsp;Boss™ erases it.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl space-y-5 text-center leading-relaxed text-black/80">
          <p>
            Trimmer&nbsp;Boss™ easily removes grass, moss, weeds, dirt, dust,
            and any pesky weeds you want to remove from the yard, patio and
            driveway.
          </p>
          <p>
            It cleans deep with ease and is made to be durable and last for a
            long time, unlike your average string trimmer.
          </p>
          <p>
            Removes dirt and weeds fast &amp; easy even in hard to reach
            areas, which makes it the new standard for trimming.
          </p>
        </div>

        <h3 className="mt-16 text-center text-xl sm:text-2xl">
          Trimmer&nbsp;Boss™ Is Perfect For:
        </h3>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {perfectFor.map((item) => (
            <div
              key={item.label}
              className="group flex flex-col items-center gap-3 border border-black/15 p-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]"
            >
              <item.icon
                className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              <p className="text-xs tracking-[0.18em] uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}