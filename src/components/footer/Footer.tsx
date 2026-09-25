import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#1F242D] bg-[#08090B]">
      <div className="mx-auto flex min-h-16 w-full max-w-[1200px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/icons/logo.png"
            alt="FitLog logo"
            width={22}
            height={22}
            className="h-[22px] w-[22px] object-contain"
          />

          <span className="text-[14px] font-bold uppercase tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-[11px] text-[#6B7280]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
