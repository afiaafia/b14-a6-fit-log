'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useFitLog } from '@/context/FitLogContext';

const navItems = [
  {
    label: 'Workout',
    href: '/',
  },
  {
    label: 'My Plan',
    href: '/my-plan',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = useFitLog();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="border-b border-[#1F242D] bg-[#0D0F12]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/icons/logo.png"
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

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive
                      ? 'rounded-full !bg-[#1A2112] px-3 py-1.5 text-[10px] !font-bold uppercase !tracking-[0.12em] !text-[#CCFF00] shadow-[0_0_0_1px_rgba(204,255,0,0.03),0_2px_8px_rgba(0,0,0,0.35)]'
                      : 'rounded-full px-3 py-1.5 text-[10px] !font-semibold uppercase !tracking-[0.12em] !text-[#A3AAB7] transition-colors hover:!text-white'
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Counters */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Plan */}
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 text-[10px] !font-semibold uppercase !tracking-[0.12em] !text-[#A3AAB7] transition-colors hover:!text-white"
            >
              <span>PLAN</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full !bg-[#CCFF00] px-1.5 text-[10px] !font-bold leading-none !text-black">
                {planCount}
              </span>
            </Link>

            {/* Saved */}
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 text-[10px] !font-semibold uppercase !tracking-[0.12em] !text-[#A3AAB7] transition-colors hover:!text-white"
            >
              <span>SAVED</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full !bg-[#16191E] px-1.5 text-[10px] !font-bold leading-none !text-[#A3AAB7]">
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
            className="rounded-md p-2 !text-[#A3AAB7] transition-colors hover:!bg-[#16191E] hover:!text-white md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-[#1F242D] py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={
                      isActive
                        ? 'rounded-full !bg-[#1A2112] px-3 py-2 text-xs !font-bold uppercase !tracking-wider !text-[#CCFF00]'
                        : 'rounded-full px-3 py-2 text-xs !font-semibold uppercase !tracking-wider !text-[#A3AAB7]'
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Mobile Counters */}
              <div className="mt-2 flex gap-4 border-t border-[#1F242D] pt-4">
                {/* Plan */}
                <Link
                  href="/my-plan"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 text-xs !font-semibold uppercase !tracking-wider !text-[#A3AAB7]"
                >
                  <span>PLAN</span>

                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full !bg-[#CCFF00] px-1.5 text-[10px] !font-bold leading-none !text-black">
                    {planCount}
                  </span>
                </Link>

                {/* Saved */}
                <Link
                  href="/my-plan"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 text-xs !font-semibold uppercase !tracking-wider !text-[#A3AAB7]"
                >
                  <span>SAVED</span>

                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full !bg-[#16191E] px-1.5 text-[10px] !font-bold leading-none !text-[#A3AAB7]">
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
