import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-300 px-4 pt-6 sm:px-6 md:pt-8">
      <div className="overflow-hidden rounded-[10px] border border-dashed border-[#424852] bg-[#0D0F12]">
        <div className="grid min-h-90 items-center gap-8 px-6 py-10 sm:px-8 md:grid-cols-12 md:px-10 md:py-10">
          <div className="min-w-0 md:col-span-7">
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#CCFF00]">
              Workout Library
            </p>

            <h1
              className="text-[38px] font-black uppercase leading-[0.94] tracking-[-0.055em] text-white sm:text-[46px] md:text-[50px]"
              style={{
                fontFamily:
                  '"Arial Narrow", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif',
              }}
            >
              TRAIN WITH INTENT. LOG
              <br />
              EVERY SET.
            </h1>

            <p className="mt-5 max-w-97.5 text-[13px] leading-[1.65] text-[#8F96A1] sm:max-w-102.5">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="mt-6 inline-flex items-center justify-center rounded-sm bg-[#CCFF00] px-5 py-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#08090B] transition-opacity hover:opacity-90"
            >
              Browse Workouts
            </Link>
          </div>

          <div className="relative min-h-55 md:col-span-5 md:min-h-75">
            <Image
              src="/images/hero/banner.png"
              alt="Workout training"
              fill
              priority
              className="object-contain object-center md:object-right"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
