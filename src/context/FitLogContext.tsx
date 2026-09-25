'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
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

const STORAGE_EVENT = 'fitlog-storage-change';

const EMPTY_STORAGE_VALUE = '[]';

function getStorageValue(key: string): string {
  if (typeof window === 'undefined') {
    return EMPTY_STORAGE_VALUE;
  }

  return localStorage.getItem(key) ?? EMPTY_STORAGE_VALUE;
}

function subscribeToStorage(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === null || event.key === 'fitlog-clear-all') {
      callback();
      return;
    }

    if (
      event.key === PLAN_STORAGE_KEY ||
      event.key === SAVED_STORAGE_KEY ||
      event.key === COMPLETED_STORAGE_KEY
    ) {
      callback();
    }
  };

  const handleCustomChange = () => {
    callback();
  };

  window.addEventListener('storage', handleStorageChange);
  window.addEventListener(STORAGE_EVENT, handleCustomChange);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener(STORAGE_EVENT, handleCustomChange);
  };
}

function parseWorkouts(raw: string): Workout[] {
  try {
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

function parseCompletedIds(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((id) => String(id));
  } catch {
    return [];
  }
}

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function useStoredValue(key: string, hydrated: boolean) {
  const getSnapshot = useCallback(() => {
    if (!hydrated) {
      return EMPTY_STORAGE_VALUE;
    }

    return getStorageValue(key);
  }, [key, hydrated]);

  const getServerSnapshot = useCallback(() => {
    return EMPTY_STORAGE_VALUE;
  }, []);

  return useSyncExternalStore(
    subscribeToStorage,
    getSnapshot,
    getServerSnapshot
  );
}

function writeStorage(key: string, value: unknown) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));

  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function FitLogProvider({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();

  const planRaw = useStoredValue(PLAN_STORAGE_KEY, hydrated);
  const savedRaw = useStoredValue(SAVED_STORAGE_KEY, hydrated);
  const completedRaw = useStoredValue(COMPLETED_STORAGE_KEY, hydrated);

  const plan = useMemo(() => parseWorkouts(planRaw), [planRaw]);

  const saved = useMemo(() => parseWorkouts(savedRaw), [savedRaw]);

  const completedPlanIds = useMemo(
    () => parseCompletedIds(completedRaw),
    [completedRaw]
  );

  const addToPlan = useCallback((workout: Workout) => {
    const current = parseWorkouts(getStorageValue(PLAN_STORAGE_KEY));
    const workoutId = String(workout.id);

    if (current.some((item) => String(item.id) === workoutId)) {
      return;
    }

    if (current.length >= 5) {
      return;
    }

    const updated = [
      ...current,
      {
        ...workout,
        id: workoutId,
      },
    ];

    writeStorage(PLAN_STORAGE_KEY, updated);

    const completed = parseCompletedIds(getStorageValue(COMPLETED_STORAGE_KEY));

    const updatedCompleted = completed.filter((id) => id !== workoutId);

    writeStorage(COMPLETED_STORAGE_KEY, updatedCompleted);
  }, []);

  const removeFromPlan = useCallback((workoutId: string) => {
    const id = String(workoutId);

    const current = parseWorkouts(getStorageValue(PLAN_STORAGE_KEY));

    const updated = current.filter((item) => String(item.id) !== id);

    writeStorage(PLAN_STORAGE_KEY, updated);

    const completed = parseCompletedIds(getStorageValue(COMPLETED_STORAGE_KEY));

    const updatedCompleted = completed.filter(
      (completedId) => completedId !== id
    );

    writeStorage(COMPLETED_STORAGE_KEY, updatedCompleted);
  }, []);

  const saveForLater = useCallback((workout: Workout) => {
    const current = parseWorkouts(getStorageValue(SAVED_STORAGE_KEY));
    const workoutId = String(workout.id);

    if (current.some((item) => String(item.id) === workoutId)) {
      return;
    }

    const updated = [
      ...current,
      {
        ...workout,
        id: workoutId,
      },
    ];

    writeStorage(SAVED_STORAGE_KEY, updated);
  }, []);

  const removeFromSaved = useCallback((workoutId: string) => {
    const id = String(workoutId);

    const current = parseWorkouts(getStorageValue(SAVED_STORAGE_KEY));

    const updated = current.filter((item) => String(item.id) !== id);

    writeStorage(SAVED_STORAGE_KEY, updated);
  }, []);

  const markAsDone = useCallback((workoutId: string) => {
    const id = String(workoutId);

    const current = parseCompletedIds(getStorageValue(COMPLETED_STORAGE_KEY));

    if (current.includes(id)) {
      return;
    }

    writeStorage(COMPLETED_STORAGE_KEY, [...current, id]);
  }, []);

  const markAsUndone = useCallback((workoutId: string) => {
    const id = String(workoutId);

    const current = parseCompletedIds(getStorageValue(COMPLETED_STORAGE_KEY));

    const updated = current.filter((completedId) => completedId !== id);

    writeStorage(COMPLETED_STORAGE_KEY, updated);
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
