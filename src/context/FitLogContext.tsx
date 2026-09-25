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

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed) ? (parsed as Workout[]) : [];
  } catch {
    return [];
  }
}

export function FitLogProvider({ children }: { children: ReactNode }) {
  /*
   * Start with empty arrays on both server and first client render.
   * This prevents the server/client hydration mismatch caused by
   * reading localStorage during useState initialization.
   */
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  /*
   * Load localStorage only after the first client render.
   */
  useEffect(() => {
    setPlan(getStoredWorkouts(PLAN_STORAGE_KEY));
    setSaved(getStoredWorkouts(SAVED_STORAGE_KEY));
    setHydrated(true);
  }, []);

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

  const isInPlan = useCallback(
    (workoutId: string) => plan.some((item) => item.id === workoutId),
    [plan]
  );

  const isSaved = useCallback(
    (workoutId: string) => saved.some((item) => item.id === workoutId),
    [saved]
  );

  /*
   * Don't write anything to localStorage until the initial
   * localStorage read has completed.
   */
  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

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
