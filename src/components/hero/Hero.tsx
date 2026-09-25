import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 pt-6 sm:px-6 md:pt-8">
      <div className="overflow-hidden rounded-[10px] border border-dashed border-[#424852] bg-[#0D0F12]">
        <div className="grid min-h-[360px] items-center gap-8 px-6 py-10 sm:px-8 md:grid-cols-12 md:px-10 md:py-10">
          {/* Left Content */}
          <div className="min-w-0 md:col-span-7">
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#CCFF00]">
              Workout Library
            </p>

            <h1
              className="whitespace-nowrap text-[38px] font-black uppercase leading-[0.94] tracking-[-0.055em] text-white sm:text-[46px] md:text-[50px]"
              style={{
                fontFamily:
                  '"Arial Narrow", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif',
              }}
            >
              TRAIN WITH INTENT. LOG
              <br />
              EVERY SET.
            </h1>

            <p className="mt-5 max-w-[390px] text-[13px] leading-[1.65] text-[#8F96A1] sm:max-w-[410px]">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="mt-7 inline-flex h-10 items-center justify-center rounded-[3px] bg-[#CCFF00] px-5 text-[10px] font-extrabold uppercase tracking-[0.12em] !text-black transition-colors hover:bg-[#B8E600]"
            >
              BROWSE WORKOUTS
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex min-h-[240px] items-center justify-center md:col-span-5">
            <div className="relative h-[245px] w-full max-w-[315px] sm:h-[260px] sm:max-w-[330px] md:h-[275px] md:max-w-[350px]">
              <Image
                src="/images/hero/banner.png"
                alt="FitLog workout"
                fill
                priority
                sizes="(max-width: 767px) 315px, (max-width: 1023px) 330px, 350px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
