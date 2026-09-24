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
    <main className="min-h-screen bg-[#08090B] text-white">
      {/* Hero */}
      <div className="container-fitlog pt-8">
        <Hero />
      </div>

      {/* Library */}
      <section id="library" className="container-fitlog mt-12 pb-12">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
            The Library
          </h2>

          <p className="mt-1 text-sm text-[#9CA3AF]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-[#1F242D] bg-[#13161B]">
            <div className="flex flex-col items-center gap-3">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#CCFF00] border-t-transparent" />

              <p className="text-xs uppercase tracking-wider text-[#6B7280]">
                Loading workouts...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-lg border border-red-500/20 bg-[#13161B] p-8 text-center">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && sortedWorkouts.length === 0 && (
          <div className="rounded-lg border border-[#1F242D] bg-[#13161B] p-10 text-center">
            <p className="text-sm text-[#6B7280]">No workouts found.</p>
          </div>
        )}

        {/* Workout Grid */}
        {!loading && !error && sortedWorkouts.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
