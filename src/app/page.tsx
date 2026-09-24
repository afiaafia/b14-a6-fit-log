'use client';

import { useEffect, useMemo, useState } from 'react';
import Hero from '@/components/hero/Hero';
import WorkoutCard from '@/components/workout-card/WorkoutCard';
import { getWorkouts } from '@/lib/api';
import type { Workout } from '@/types/workout';

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getWorkouts();

        if (!cancelled) {
          setWorkouts(data);
        }
      } catch {
        if (!cancelled) {
          setError('Failed to load workouts. Please try again.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchWorkouts();

    return () => {
      cancelled = true;
    };
  }, []);

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => b.rating - a.rating);
  }, [workouts]);

  return (
    <main className="min-h-screen bg-[#101113] text-white">
      <Hero image="/images/hero/banner.png" />

      <section
        id="library"
        className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mb-6 border-b border-[#34373b] pb-4">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            The Library
          </h2>

          <p className="mt-1 text-sm text-[#8d9298]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading && (
          <div className="flex min-h-80 items-center justify-center border border-[#34373b] bg-[#17191c]">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent" />
              <p className="text-sm text-[#8d9298]">Loading workouts...</p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="border border-red-500/30 bg-red-500/10 p-6 text-center">
            <p className="font-medium text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && sortedWorkouts.length === 0 && (
          <div className="border border-[#34373b] bg-[#17191c] p-10 text-center">
            <p className="text-[#8d9298]">No workouts found.</p>
          </div>
        )}

        {!loading && !error && sortedWorkouts.length > 0 && (
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#34373b] bg-[#34373b] sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
