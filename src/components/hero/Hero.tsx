import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-xl border border-[#1F242D] bg-[#0D0F12]">
      <div className="grid items-center gap-8 p-6 sm:p-8 md:grid-cols-12 md:gap-6 md:p-10 lg:p-12">
        {/* Text */}
        <div className="flex flex-col items-start md:col-span-7">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#CCFF00]">
            Workout Library
          </p>

          <h1 className="mb-4 max-w-130 text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Train with intent. Log
            <br />
            every set.
          </h1>

          <p className="mb-7 max-w-md text-sm leading-6 text-[#9CA3AF] sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="inline-flex h-11 items-center rounded bg-[#CCFF00] px-5 text-xs font-extrabold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-[#b8e600] focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:ring-offset-2 focus:ring-offset-[#0D0F12]"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Image */}
        <div className="flex items-center justify-center md:col-span-5">
          <div className="relative h-55 w-full max-w-65 sm:h-65 sm:max-w-70 md:h-70 md:max-w-75 lg:h-80 lg:max-w-80">
            <Image
              src="/images/hero/banner.png"
              alt="FitLog workout"
              fill
              priority
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 300px, 320px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
