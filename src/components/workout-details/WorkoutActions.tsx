'use client';

import { Bookmark, CalendarCheck, CalendarPlus, Check } from 'lucide-react';
import { useFitLog } from '@/context/FitLogContext';
import type { Workout } from '@/types/workout';

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const {
    addToPlan,
    removeFromPlan,
    saveForLater,
    removeFromSaved,
    isInPlan,
    isSaved,
  } = useFitLog();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  const handlePlanClick = () => {
    if (inPlan) {
      removeFromPlan(workout.id);
      return;
    }

    addToPlan(workout);
  };

  const handleSaveClick = () => {
    if (saved) {
      removeFromSaved(workout.id);
      return;
    }

    saveForLater(workout);
  };

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handlePlanClick}
        className={
          inPlan
            ? 'inline-flex items-center gap-2 rounded-lg border border-[#CCFF00] bg-[#1A2112] px-4 py-2.5 text-xs font-bold text-[#CCFF00] transition hover:bg-[#222D15]'
            : 'inline-flex items-center gap-2 rounded-lg bg-[#CCFF00] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#B8E600]'
        }
      >
        {inPlan ? (
          <CalendarCheck className="h-4 w-4" />
        ) : (
          <CalendarPlus className="h-4 w-4" />
        )}

        {inPlan ? "Added to today's plan" : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={handleSaveClick}
        className={
          saved
            ? 'inline-flex items-center gap-2 rounded-lg border border-[#CCFF00] bg-[#1A2112] px-4 py-2.5 text-xs font-bold text-[#CCFF00] transition hover:border-[#B8E600]'
            : 'inline-flex items-center gap-2 rounded-lg border border-[#303743] bg-transparent px-4 py-2.5 text-xs font-medium text-[#D1D5DB] transition hover:border-[#4B5563] hover:text-white'
        }
      >
        {saved ? (
          <Check className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}

        {saved ? 'Saved' : 'Save for later'}
      </button>
    </div>
  );
}
