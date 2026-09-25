'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useFitLog } from '@/context/FitLogContext';

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { planCount, savedCount } = useFitLog();

  const [mobileOpen, setMobileOpen] = useState(false);

  const isWorkoutActive = pathname === '/' || pathname.startsWith('/workout/');

  const isSavedActive =
    pathname === '/my-plan' && searchParams.get('tab') === 'saved';

  const isPlanActive = pathname === '/my-plan' && !isSavedActive;

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const mainNavActiveClass =
    'rounded-full bg-[#1A2112] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#CCFF00] shadow-[0_0_0_1px_rgba(204,255,0,0.03),0_2px_8px_rgba(0,0,0,0.35)]';

  const mainNavInactiveClass =
    'rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A3AAB7] transition-colors hover:text-white';

  const mobileNavActiveClass =
    'rounded-full bg-[#1A2112] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#CCFF00]';

  const mobileNavInactiveClass =
    'rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#A3AAB7] transition-colors hover:text-white';

  return (
    <header className="border-b border-[#1F242D] bg-[#0D0F12]">
      <div className="mx-auto w-full max-w-300 px-5 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/images/icons/logo.png"
              alt="FitLog logo"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
              priority
            />

            <span className="text-[15px] font-bold uppercase tracking-tight text-white">
              FITLOG
            </span>
          </Link>

          {/* Desktop Main Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              aria-current={isWorkoutActive ? 'page' : undefined}
              className={
                isWorkoutActive ? mainNavActiveClass : mainNavInactiveClass
              }
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              aria-current={isPlanActive ? 'page' : undefined}
              className={
                isPlanActive ? mainNavActiveClass : mainNavInactiveClass
              }
            >
              My Plan
            </Link>
          </nav>

          {/* Desktop Counters */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/my-plan"
              aria-current={isPlanActive ? 'page' : undefined}
              className={
                isPlanActive
                  ? 'flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#CCFF00]'
                  : 'flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A3AAB7] transition-colors hover:text-white'
              }
            >
              <span>PLAN</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#CCFF00] px-1.5 text-[10px] font-bold leading-none text-black">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan?tab=saved"
              aria-current={isSavedActive ? 'page' : undefined}
              className={
                isSavedActive
                  ? 'flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#CCFF00]'
                  : 'flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A3AAB7] transition-colors hover:text-white'
              }
            >
              <span>SAVED</span>

              <span
                className={
                  isSavedActive
                    ? 'flex h-5 min-w-5 items-center justify-center rounded-full bg-[#CCFF00] px-1.5 text-[10px] font-bold leading-none text-black'
                    : 'flex h-5 min-w-5 items-center justify-center rounded-full bg-[#16191E] px-1.5 text-[10px] font-bold leading-none text-[#A3AAB7]'
                }
              >
                {savedCount}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-md p-2 text-[#A3AAB7] transition-colors hover:bg-[#16191E] hover:text-white md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-[#1F242D] py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={closeMobileMenu}
                aria-current={isWorkoutActive ? 'page' : undefined}
                className={
                  isWorkoutActive
                    ? mobileNavActiveClass
                    : mobileNavInactiveClass
                }
              >
                Workout
              </Link>

              <Link
                href="/my-plan"
                onClick={closeMobileMenu}
                aria-current={isPlanActive ? 'page' : undefined}
                className={
                  isPlanActive ? mobileNavActiveClass : mobileNavInactiveClass
                }
              >
                My Plan
              </Link>

              <div className="mt-2 flex gap-4 border-t border-[#1F242D] pt-4">
                <Link
                  href="/my-plan"
                  onClick={closeMobileMenu}
                  aria-current={isPlanActive ? 'page' : undefined}
                  className={
                    isPlanActive
                      ? 'flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#CCFF00]'
                      : 'flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A3AAB7]'
                  }
                >
                  <span>PLAN</span>

                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#CCFF00] px-1.5 text-[10px] font-bold leading-none text-black">
                    {planCount}
                  </span>
                </Link>

                <Link
                  href="/my-plan?tab=saved"
                  onClick={closeMobileMenu}
                  aria-current={isSavedActive ? 'page' : undefined}
                  className={
                    isSavedActive
                      ? 'flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#CCFF00]'
                      : 'flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A3AAB7]'
                  }
                >
                  <span>SAVED</span>

                  <span
                    className={
                      isSavedActive
                        ? 'flex h-5 min-w-5 items-center justify-center rounded-full bg-[#CCFF00] px-1.5 text-[10px] font-bold leading-none text-black'
                        : 'flex h-5 min-w-5 items-center justify-center rounded-full bg-[#16191E] px-1.5 text-[10px] font-bold leading-none text-[#A3AAB7]'
                    }
                  >
                    {savedCount}
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
