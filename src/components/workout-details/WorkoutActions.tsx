'use client';

import { Bookmark, CalendarCheck, CalendarPlus, Check } from 'lucide-react';
import { toast } from 'react-toastify';

import { useFitLog } from '@/context/FitLogContext';
import type { Workout } from '@/types/workout';

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const { addToPlan, saveForLater, isInPlan, isSaved } = useFitLog();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  const handlePlanClick = () => {
    if (inPlan) {
      toast.warning("This workout is already in today's plan.", {
        toastId: `action-plan-duplicate-${workout.id}`,
      });

      return;
    }

    addToPlan(workout);

    toast.success("Added to today's plan.", {
      toastId: `action-plan-success-${workout.id}`,
    });
  };

  const handleSaveClick = () => {
    if (saved) {
      toast.warning('This workout is already saved.', {
        toastId: `action-save-duplicate-${workout.id}`,
      });

      return;
    }

    saveForLater(workout);

    toast.success('Saved for later.', {
      toastId: `action-save-success-${workout.id}`,
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* Add to Plan */}
      <button
        type="button"
        onClick={handlePlanClick}
        className={
          inPlan
            ? 'inline-flex items-center gap-2 rounded-lg border border-[#CCFF00] bg-[#1A2112] px-4 py-2.5 text-xs font-bold text-[#CCFF00] transition hover:bg-[#202A14]'
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

      {/* Save for Later */}
      <button
        type="button"
        onClick={handleSaveClick}
        className={
          saved
            ? 'inline-flex items-center gap-2 rounded-lg border border-[#CCFF00] bg-[#1A2112] px-4 py-2.5 text-xs font-bold text-[#CCFF00] transition hover:bg-[#202A14]'
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
