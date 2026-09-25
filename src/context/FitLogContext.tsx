'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

const PLAN_STORAGE_KEY = 'fitlog-plan';
const SAVED_STORAGE_KEY = 'fitlog-saved';

function getStoredWorkouts(key: string): Workout[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(key);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>(() =>
    getStoredWorkouts(PLAN_STORAGE_KEY)
  );

  const [saved, setSaved] = useState<Workout[]>(() =>
    getStoredWorkouts(SAVED_STORAGE_KEY)
  );

  const addToPlan = useCallback((workout: Workout) => {
    setPlan((currentPlan) => {
      const alreadyExists = currentPlan.some((item) => item.id === workout.id);

      if (alreadyExists) {
        return currentPlan;
      }

      if (currentPlan.length >= 5) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  }, []);

  const removeFromPlan = useCallback((workoutId: string) => {
    setPlan((currentPlan) =>
      currentPlan.filter((item) => item.id !== workoutId)
    );
  }, []);

  const isInPlan = useCallback(
    (workoutId: string) => plan.some((item) => item.id === workoutId),
    [plan]
  );

  const saveForLater = useCallback((workout: Workout) => {
    setSaved((currentSaved) => {
      const alreadySaved = currentSaved.some((item) => item.id === workout.id);

      if (alreadySaved) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  }, []);

  const removeFromSaved = useCallback((workoutId: string) => {
    setSaved((currentSaved) =>
      currentSaved.filter((item) => item.id !== workoutId)
    );
  }, []);

  const isSaved = useCallback(
    (workoutId: string) => saved.some((item) => item.id === workoutId),
    [saved]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  const value = useMemo<FitLogContextType>(
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
    [
      plan,
      saved,
      addToPlan,
      removeFromPlan,
      saveForLater,
      removeFromSaved,
      isInPlan,
      isSaved,
    ]
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
