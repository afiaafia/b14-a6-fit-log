'use client';

import { ChevronDown } from 'lucide-react';

export type SortOption = 'Duration' | 'Calories' | 'Rating';

type SortDropdownProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative">
      <label htmlFor="sort-workouts" className="sr-only">
        Sort By
      </label>

      <select
        id="sort-workouts"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="h-10 min-w-[150px] appearance-none rounded-lg border border-[#2A3038] bg-[#13161B] px-3 pr-9 text-xs font-bold text-white outline-none transition focus:border-[#CCFF00]"
      >
        <option value="Duration">Duration</option>
        <option value="Calories">Calories</option>
        <option value="Rating">Rating</option>
      </select>

      <ChevronDown
        size={15}
        strokeWidth={2}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
        aria-hidden="true"
      />
    </div>
  );
}
