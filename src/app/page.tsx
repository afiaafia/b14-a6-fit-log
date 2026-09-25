import { ArrowDown, Dumbbell } from 'lucide-react';

import Hero from '@/components/hero/Hero';
import WorkoutCard from '@/components/workout-card/WorkoutCard';
import { getWorkouts } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let workouts = [];
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

        {/* Loading / Error / Empty */}
        {error ? (
          <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-[#30343C] bg-[#101216] px-6 text-center">
            <div>
              <Dumbbell className="mx-auto mb-4 h-7 w-7 text-[#CCFF00]" />

              <p className="text-xs font-bold uppercase tracking-[0.15em] text-white">
                Unable to load workouts
              </p>

              <p className="mt-2 text-xs text-[#737A84]">
                Please refresh the page and try again.
              </p>
            </div>
          </div>
        ) : workouts.length === 0 ? (
          <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-[#30343C] bg-[#101216] px-6 text-center">
            <div>
              <Dumbbell className="mx-auto mb-4 h-7 w-7 text-[#CCFF00]" />

              <p className="text-xs font-bold uppercase tracking-[0.15em] text-white">
                No workouts found
              </p>

              <p className="mt-2 text-xs text-[#737A84]">
                Workout data is currently unavailable.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
