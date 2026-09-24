import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Dumbbell } from 'lucide-react';

type HeroProps = {
  image?: string;
};

export default function Hero({ image }: HeroProps) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="container-fitlog grid items-center gap-10 py-14 md:grid-cols-2 md:py-20 lg:gap-16">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Workout Library
          </p>

          <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link href="#library" className="btn-primary mt-8">
            Browse workouts
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
          <div className="aspect-4/3">
            {image ? (
              <Image
                src={image}
                alt="Workout"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-blue-950">
                <Dumbbell size={96} strokeWidth={1} className="text-white/30" />
              </div>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-6 pt-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              FitLog
            </p>

            <p className="mt-1 text-lg font-bold text-white">
              Train hard. Log honest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
