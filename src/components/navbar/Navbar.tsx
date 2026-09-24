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
    <header className="sticky top-0 z-50 border-b border-[#292b2f] bg-[#111214]">
      <div className="container-fitlog">
        <div className="relative flex h-10 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-1.5"
          >
            <Image
              src="/icons/logo.png"
              alt="FitLog logo"
              width={16}
              height={16}
              className="h-4 w-4 object-contain"
              priority
            />

            <span className="text-[8px] font-bold uppercase tracking-[0.08em] text-white">
              FitLog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1 text-[7px] font-semibold uppercase tracking-[0.04em] ${
                    isActive
                      ? 'bg-[#ccff00] text-[#111214]'
                      : 'text-[#777b82] hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Status */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/my-plan"
              className="flex items-center gap-1 text-[7px] font-semibold uppercase text-[#777b82]"
            >
              Plan
              <span className="flex h-3 min-w-3 items-center justify-center rounded-full bg-[#ccff00] px-1 text-[6px] font-bold text-[#111214]">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-1 rounded-full border border-[#34373b] px-2 py-0.5 text-[7px] font-semibold uppercase text-[#777b82]"
            >
              Saved
              <span className="flex h-3 min-w-3 items-center justify-center rounded-full border border-[#45494f] px-1 text-[6px] text-[#777b82]">
                {savedCount}
              </span>
            </Link>
          </div>

          {/* Mobile */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded p-1 text-[#777b82] md:hidden"
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[#292b2f] py-2 md:hidden">
            <nav className="flex flex-col gap-1">
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
                    className={`rounded-md px-3 py-2 text-[8px] font-semibold uppercase ${
                      isActive
                        ? 'bg-[#ccff00] text-[#111214]'
                        : 'text-[#777b82]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-1 flex gap-2 border-t border-[#292b2f] pt-2">
                <Link
                  href="/my-plan"
                  onClick={closeMobileMenu}
                  className="flex flex-1 items-center justify-center gap-1 rounded-md border border-[#34373b] py-2 text-[8px] font-semibold uppercase text-[#8d9298]"
                >
                  Plan
                  <span className="rounded-full bg-[#ccff00] px-1 text-[6px] font-bold text-[#111214]">
                    {planCount}
                  </span>
                </Link>

                <Link
                  href="/my-plan"
                  onClick={closeMobileMenu}
                  className="flex flex-1 items-center justify-center gap-1 rounded-md border border-[#34373b] py-2 text-[8px] font-semibold uppercase text-[#8d9298]"
                >
                  Saved
                  <span className="rounded-full border border-[#45494f] px-1 text-[6px]">
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
