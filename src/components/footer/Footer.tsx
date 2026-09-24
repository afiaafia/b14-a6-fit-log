import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#292b2f] bg-[#0d0f10]">
      <div className="container-fitlog flex min-h-14 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-1.5">
          <Image
            src="/icons/logo.png"
            alt="FitLog logo"
            width={15}
            height={15}
            className="h-[15px] w-[15px] object-contain"
          />

          <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-white">
            FitLog
          </span>
        </Link>

        <p className="text-right text-[6px] text-[#555a60] sm:text-[7px]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
