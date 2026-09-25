'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type WorkoutItem = {
  id: string;
  title?: string;
  name?: string;
  [key: string]: unknown;
};

type FitLogContextType = {
  plan: WorkoutItem[];
  saved: WorkoutItem[];

  planCount: number;
  savedCount: number;

  addToPlan: (workout: WorkoutItem) => void;
  removeFromPlan: (id: string) => void;
  isInPlan: (id: string) => boolean;

  saveWorkout: (workout: WorkoutItem) => void;
  removeFromSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
};

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<WorkoutItem[]>([]);
  const [saved, setSaved] = useState<WorkoutItem[]>([]);

  const addToPlan = useCallback((workout: WorkoutItem) => {
    setPlan((currentPlan) => {
      const alreadyExists = currentPlan.some((item) => item.id === workout.id);

      if (alreadyExists) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  }, []);

  const removeFromPlan = useCallback((id: string) => {
    setPlan((currentPlan) => currentPlan.filter((item) => item.id !== id));
  }, []);

  const isInPlan = useCallback(
    (id: string) => plan.some((item) => item.id === id),
    [plan]
  );

  const saveWorkout = useCallback((workout: WorkoutItem) => {
    setSaved((currentSaved) => {
      const alreadyExists = currentSaved.some((item) => item.id === workout.id);

      if (alreadyExists) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  }, []);

  const removeFromSaved = useCallback((id: string) => {
    setSaved((currentSaved) => currentSaved.filter((item) => item.id !== id));
  }, []);

  const isSaved = useCallback(
    (id: string) => saved.some((item) => item.id === id),
    [saved]
  );

  const value = useMemo<FitLogContextType>(
    () => ({
      plan,
      saved,

      planCount: plan.length,
      savedCount: saved.length,

      addToPlan,
      removeFromPlan,
      isInPlan,

      saveWorkout,
      removeFromSaved,
      isSaved,
    }),
    [
      plan,
      saved,
      addToPlan,
      removeFromPlan,
      isInPlan,
      saveWorkout,
      removeFromSaved,
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
    throw new Error('useFitLog must be used within a FitLogProvider');
  }

  return context;
}
