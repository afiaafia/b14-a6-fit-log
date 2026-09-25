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

  completedPlanIds: string[];

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (workoutId: string) => void;

  saveForLater: (workout: Workout) => void;
  removeFromSaved: (workoutId: string) => void;

  isInPlan: (workoutId: string) => boolean;
  isSaved: (workoutId: string) => boolean;

  markAsDone: (workoutId: string) => void;
  markAsUndone: (workoutId: string) => void;
  isCompleted: (workoutId: string) => boolean;
};

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

const PLAN_STORAGE_KEY = 'fitlog-plan';
const SAVED_STORAGE_KEY = 'fitlog-saved';
const COMPLETED_STORAGE_KEY = 'fitlog-completed';

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
      ...(workout as Workout),
      id: String((workout as Workout).id),
    })) as Workout[];
  } catch {
    return [];
  }
}

function readCompletedIds(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = localStorage.getItem(COMPLETED_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((id) => String(id));
  } catch {
    return [];
  }
}

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completedPlanIds, setCompletedPlanIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(readStoredWorkouts(PLAN_STORAGE_KEY));
    setSaved(readStoredWorkouts(SAVED_STORAGE_KEY));
    setCompletedPlanIds(readCompletedIds());
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

    setCompletedPlanIds((current) =>
      current.filter((id) => id !== String(workout.id))
    );
  }, []);

  const removeFromPlan = useCallback((workoutId: string) => {
    const id = String(workoutId);

    setPlan((current) => current.filter((item) => String(item.id) !== id));

    setCompletedPlanIds((current) =>
      current.filter((completedId) => completedId !== id)
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

  const markAsDone = useCallback((workoutId: string) => {
    const id = String(workoutId);

    setCompletedPlanIds((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  }, []);

  const markAsUndone = useCallback((workoutId: string) => {
    const id = String(workoutId);

    setCompletedPlanIds((current) =>
      current.filter((completedId) => completedId !== id)
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

  const isCompleted = useCallback(
    (workoutId: string) => completedPlanIds.includes(String(workoutId)),
    [completedPlanIds]
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

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(
      COMPLETED_STORAGE_KEY,
      JSON.stringify(completedPlanIds)
    );
  }, [completedPlanIds, hydrated]);

  const value = useMemo<FitLogContextType>(
    () => ({
      plan,
      saved,

      planCount: plan.length,
      savedCount: saved.length,

      completedPlanIds,

      addToPlan,
      removeFromPlan,

      saveForLater,
      removeFromSaved,

      isInPlan,
      isSaved,

      markAsDone,
      markAsUndone,
      isCompleted,
    }),
    [
      plan,
      saved,
      completedPlanIds,

      addToPlan,
      removeFromPlan,

      saveForLater,
      removeFromSaved,

      isInPlan,
      isSaved,

      markAsDone,
      markAsUndone,
      isCompleted,
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
