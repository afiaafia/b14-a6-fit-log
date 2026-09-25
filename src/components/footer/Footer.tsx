import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1F242D] bg-[#08090B]">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#CCFF00] text-[#08090B]">
            <Dumbbell className="h-4 w-4" strokeWidth={2.5} />
          </div>

          <span className="text-sm font-black tracking-widest text-white">
            FITLOG
          </span>
        </div>

        <p className="text-xs text-[#6B7280]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
