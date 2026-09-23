'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type FitLogContextType = {
  planCount: number;
  savedCount: number;
};

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [planCount] = useState(0);
  const [savedCount] = useState(0);

  const value = useMemo(
    () => ({
      planCount,
      savedCount,
    }),
    [planCount, savedCount]
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
