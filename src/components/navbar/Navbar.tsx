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
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
          >
            <Image
              src="/icons/logo.png"
              alt="FitLog logo"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
              priority
            />

            <span className="text-base font-bold uppercase tracking-tight text-white">
              FITLOG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 md:flex">
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
                      ? 'rounded-full bg-[#1A2112] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#CCFF00] transition-colors'
                      : 'rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] transition-colors hover:text-white'
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Counters */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] transition-colors hover:text-white"
            >
              <span>PLAN</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1A2112] px-1.5 text-[10px] font-bold text-[#CCFF00]">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] transition-colors hover:text-white"
            >
              <span>SAVED</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1A2112] px-1.5 text-[10px] font-bold text-[#CCFF00]">
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
            className="rounded-md p-2 text-[#9CA3AF] transition-colors hover:bg-[#16191E] hover:text-white md:hidden"
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
                        ? 'rounded-full bg-[#1A2112] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#CCFF00]'
                        : 'rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]'
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-2 flex gap-4 border-t border-[#1F242D] pt-4">
                <Link
                  href="/my-plan"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]"
                >
                  PLAN
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1A2112] px-1.5 text-[10px] font-bold text-[#CCFF00]">
                    {planCount}
                  </span>
                </Link>

                <Link
                  href="/my-plan"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]"
                >
                  SAVED
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1A2112] px-1.5 text-[10px] font-bold text-[#CCFF00]">
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
