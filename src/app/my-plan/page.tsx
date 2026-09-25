'use client';

import {
  createContext,
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

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_STORAGE_KEY);
      const storedSaved = localStorage.getItem(SAVED_STORAGE_KEY);

      if (storedPlan) {
        const parsedPlan = JSON.parse(storedPlan);

        if (Array.isArray(parsedPlan)) {
          setPlan(parsedPlan);
        }
      }

      if (storedSaved) {
        const parsedSaved = JSON.parse(storedSaved);

        if (Array.isArray(parsedSaved)) {
          setSaved(parsedSaved);
        }
      }
    } catch {
      localStorage.removeItem(PLAN_STORAGE_KEY);
      localStorage.removeItem(SAVED_STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const addToPlan = (workout: Workout) => {
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
  };

  const removeFromPlan = (workoutId: string) => {
    setPlan((currentPlan) =>
      currentPlan.filter((item) => item.id !== workoutId)
    );
  };

  const saveForLater = (workout: Workout) => {
    setSaved((currentSaved) => {
      const alreadySaved = currentSaved.some((item) => item.id === workout.id);

      if (alreadySaved) {
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

  const isInPlan = (workoutId: string) =>
    plan.some((item) => item.id === workoutId);

  const isSaved = (workoutId: string) =>
    saved.some((item) => item.id === workoutId);

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
