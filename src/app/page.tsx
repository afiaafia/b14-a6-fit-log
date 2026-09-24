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
    <main className="min-h-screen bg-slate-50">
      <Hero image="/images/hero/banner.png" />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore workouts
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Find Your Next Workout
          </h2>

          <p className="mt-2 max-w-2xl text-slate-600">
            Browse exercises and choose a workout that matches your goals,
            experience, and available equipment.
          </p>
        </div>

        {loading && (
          <div className="flex min-h-80 items-center justify-center rounded-2xl bg-white">
            <p className="text-slate-500">Loading workouts...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && sortedWorkouts.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center">
            <p className="text-slate-500">No workouts found.</p>
          </div>
        )}

        {!loading && !error && sortedWorkouts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
