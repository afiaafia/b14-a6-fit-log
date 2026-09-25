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

function readStoredWorkouts(key: string): Workout[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((workout) => ({
      ...workout,
      id: String(workout.id),
    })) as Workout[];
  } catch {
    return [];
  }
}

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  /*
   * Read localStorage only after hydration.
   * This prevents the Plan counter hydration mismatch.
   */
  useEffect(() => {
    setPlan(readStoredWorkouts(PLAN_STORAGE_KEY));
    setSaved(readStoredWorkouts(SAVED_STORAGE_KEY));
    setHydrated(true);
  }, []);

  const addToPlan = useCallback((workout: Workout) => {
    setPlan((current) => {
      const workoutId = String(workout.id);

      if (current.some((item) => String(item.id) === workoutId)) {
        return current;
      }

      if (current.length >= 5) {
        return current;
      }

      return [
        ...current,
        {
          ...workout,
          id: workoutId,
        },
      ];
    });
  }, []);

  const removeFromPlan = useCallback((workoutId: string) => {
    setPlan((current) =>
      current.filter((item) => String(item.id) !== String(workoutId))
    );
  }, []);

  const saveForLater = useCallback((workout: Workout) => {
    setSaved((current) => {
      const workoutId = String(workout.id);

      if (current.some((item) => String(item.id) === workoutId)) {
        return current;
      }

      return [
        ...current,
        {
          ...workout,
          id: workoutId,
        },
      ];
    });
  }, []);

  const removeFromSaved = useCallback((workoutId: string) => {
    setSaved((current) =>
      current.filter((item) => String(item.id) !== String(workoutId))
    );
  }, []);

  const isInPlan = useCallback(
    (workoutId: string) =>
      plan.some((item) => String(item.id) === String(workoutId)),
    [plan]
  );

  const isSaved = useCallback(
    (workoutId: string) =>
      saved.some((item) => String(item.id) === String(workoutId)),
    [saved]
  );

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) {
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
