'use client';

import { useEffect, useState } from 'react';
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

  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <Hero />

      <section
        id="library"
        className="mx-auto w-full max-w-[1200px] px-6 py-12"
      >
        {/* Library Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
            THE LIBRARY
          </h2>

          <p className="mt-1 text-sm text-[#9CA3AF]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-[#1F242D] bg-[#13161B]">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#303743] border-t-[#CCFF00]" />
              <p className="text-xs text-[#9CA3AF]">Loading workouts...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-lg border border-[#3A2225] bg-[#171113] p-6 text-center">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && workouts.length === 0 && (
          <div className="rounded-lg border border-[#1F242D] bg-[#13161B] p-10 text-center">
            <p className="text-sm text-[#9CA3AF]">No workouts found.</p>
          </div>
        )}

        {/* Workout Grid */}
        {!loading && !error && workouts.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
