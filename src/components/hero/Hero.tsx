import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-xl border border-[#1F242D] bg-[#0D0F12]">
      <div className="grid items-center gap-8 p-7 md:grid-cols-12 md:p-10">
        {/* Text */}
        <div className="flex flex-col items-start md:col-span-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            Workout Library
          </p>

          <h1 className="mb-3 max-w-[520px] text-4xl font-black uppercase leading-[1.05] tracking-tight text-white">
            Train with intent. Log
            <br />
            every set.
          </h1>

          <p className="mb-6 max-w-md text-sm leading-6 text-[#9CA3AF]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="inline-flex h-10 items-center rounded bg-[#CCFF00] px-5 text-xs font-extrabold uppercase tracking-wider text-black transition hover:bg-[#b8e600]"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Image */}
        <div className="flex items-center justify-center md:col-span-5">
          <div className="relative h-[220px] w-full max-w-[260px]">
            <Image
              src="/images/hero/banner.png"
              alt="FitLog workout"
              fill
              priority
              sizes="260px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
