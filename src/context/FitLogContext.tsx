'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Workout } from '@/types/workout';

type FitLogContextType = {
  plan: Workout[];
  saved: Workout[];

  planCount: number;
  savedCount: number;

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (workoutId: string) => void;

  saveForLater: (workout: Workout) => void;
  removeFromSaved: (workoutId: string) => void;

  isInPlan: (workoutId: string) => boolean;
  isSaved: (workoutId: string) => boolean;
};

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const addToPlan = (workout: Workout) => {
    setPlan((currentPlan) => {
      if (currentPlan.some((item) => item.id === workout.id)) {
        return currentPlan;
      }

      if (currentPlan.length >= 5) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  };

  const removeFromPlan = (workoutId: string) => {
    setPlan((currentPlan) =>
      currentPlan.filter((item) => item.id !== workoutId)
    );
  };

  const saveForLater = (workout: Workout) => {
    setSaved((currentSaved) => {
      if (currentSaved.some((item) => item.id === workout.id)) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  };

  const removeFromSaved = (workoutId: string) => {
    setSaved((currentSaved) =>
      currentSaved.filter((item) => item.id !== workoutId)
    );
  };

  const isInPlan = (workoutId: string) => {
    return plan.some((item) => item.id === workoutId);
  };

  const isSaved = (workoutId: string) => {
    return saved.some((item) => item.id === workoutId);
  };

  const value = useMemo(
    () => ({
      plan,
      saved,

      planCount: plan.length,
      savedCount: saved.length,

      addToPlan,
      removeFromPlan,

      saveForLater,
      removeFromSaved,

      isInPlan,
      isSaved,
    }),
    [plan, saved]
  );

  return (
    <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error('useFitLog must be used inside FitLogProvider');
  }

  return context;
}
