'use client';

import Link from 'next/link';
import { Dumbbell, Menu, X } from 'lucide-react';
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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-fitlog">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Dumbbell size={19} strokeWidth={2.5} />
            </span>

            <span className="text-lg font-bold tracking-tight text-slate-900">
              FitLog
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
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Counters */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/my-plan"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Plan{' '}
              <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Saved{' '}
              <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold">
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
            className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-slate-100 py-3 md:hidden">
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
                    className={`rounded-lg px-4 py-3 text-sm font-medium ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                <Link
                  href="/my-plan"
                  onClick={closeMobileMenu}
                  className="rounded-lg border border-slate-200 px-3 py-3 text-center text-sm font-medium text-slate-700"
                >
                  Plan{' '}
                  <span className="ml-1 font-bold text-slate-900">
                    {planCount}
                  </span>
                </Link>

                <Link
                  href="/my-plan"
                  onClick={closeMobileMenu}
                  className="rounded-lg border border-slate-200 px-3 py-3 text-center text-sm font-medium text-slate-700"
                >
                  Saved{' '}
                  <span className="ml-1 font-bold text-slate-900">
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
