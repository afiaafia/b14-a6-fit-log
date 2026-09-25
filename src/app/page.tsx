import { Dumbbell } from 'lucide-react';

import Hero from '@/components/hero/Hero';
import WorkoutCard from '@/components/workout-card/WorkoutCard';
import { getWorkouts } from '@/lib/api';
import type { Workout } from '@/types/workout';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let workouts: Workout[] = [];
  let error = false;

  try {
    workouts = await getWorkouts();
  } catch {
    error = true;
  }

  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <Hero />

      <section
        id="library"
        className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8"
      >
        {/* Library Header */}
        <div className="mb-6">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#CCFF00]">
            TRAIN SMART
          </p>

          <h2 className="text-2xl font-black uppercase leading-none tracking-tight text-white sm:text-3xl">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-xs text-[#7F8792]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {error ? (
          <div className="rounded-xl border border-[#292D34] bg-[#121316] px-6 py-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1A2112]">
              <Dumbbell className="h-5 w-5 text-[#CCFF00]" />
            </div>

            <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-white">
              Couldn&apos;t load workouts
            </h3>

            <p className="mt-2 text-xs text-[#777E89]">
              Please check the API and try again.
            </p>
          </div>
        ) : workouts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#343941] bg-[#121316] px-6 py-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#777E89]">
              No workouts found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
