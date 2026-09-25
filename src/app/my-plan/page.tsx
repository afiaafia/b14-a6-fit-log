'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, Clock3, Flame, Star, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { useFitLog } from '@/context/FitLogContext';

type ViewMode = 'plan' | 'saved';
type SortOption = 'duration' | 'calories' | 'rating';

export default function MyPlanPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    isCompleted,
    markAsDone,
    markAsUndone,
  } = useFitLog();

  const activeTab: ViewMode =
    searchParams.get('tab') === 'saved' ? 'saved' : 'plan';

  const [sortBy, setSortBy] = useState<SortOption>('duration');

  const activeWorkouts = activeTab === 'plan' ? plan : saved;

  const sortedWorkouts = useMemo(() => {
    return [...activeWorkouts].sort((a, b) => {
      if (sortBy === 'duration') {
        return a.duration - b.duration;
      }

      if (sortBy === 'calories') {
        return a.caloriesBurned - b.caloriesBurned;
      }

      return b.rating - a.rating;
    });
  }, [activeWorkouts, sortBy]);

  const currentMinutes = activeWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const currentCalories = activeWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const handleTabChange = (tab: ViewMode) => {
    if (tab === 'saved') {
      router.push('/my-plan?tab=saved');
    } else {
      router.push('/my-plan');
    }
  };

  const handleRemove = (id: string, workoutName: string) => {
    if (activeTab === 'plan') {
      removeFromPlan(id);
      toast.success(`${workoutName} removed from your plan.`);
    } else {
      removeFromSaved(id);
      toast.success(`${workoutName} removed from saved.`);
    }
  };

  const handleDoneToggle = (id: string, workoutName: string) => {
    if (isCompleted(id)) {
      markAsUndone(id);
      toast.info(`${workoutName} marked as not done.`);
    } else {
      markAsDone(id);
      toast.success(`${workoutName} marked as done.`);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0C0E] px-4 pb-16 pt-10 text-white sm:px-6">
      <div className="mx-auto w-full max-w-300">
        {/* Page Header */}
        <section className="mb-8">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#CCFF00]">
            FitLog
          </p>

          <h1 className="text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
            MY PLAN
          </h1>

          <p className="mt-3 text-sm text-[#858B95]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-8 overflow-hidden rounded-xl border border-dashed border-[#343941] bg-[#121316]">
          <div className="grid grid-cols-3">
            <div className="px-4 py-5 sm:px-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#777E89]">
                Exercises
              </p>

              <p className="mt-2 text-3xl font-black leading-none text-[#CCFF00]">
                {activeWorkouts.length}
              </p>
            </div>

            <div className="border-l border-[#292D34] px-4 py-5 sm:px-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#777E89]">
                Minutes
              </p>

              <p className="mt-2 text-3xl font-black leading-none text-white">
                {currentMinutes}
              </p>
            </div>

            <div className="border-l border-[#292D34] px-4 py-5 sm:px-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#777E89]">
                Calories
              </p>

              <p className="mt-2 text-3xl font-black leading-none text-white">
                {currentCalories}
              </p>
            </div>
          </div>
        </section>

        {/* Tabs + Sort */}
        <section className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit rounded-full border border-[#292D34] bg-[#121316] p-1">
            <button
              type="button"
              onClick={() => handleTabChange('plan')}
              className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition ${
                activeTab === 'plan'
                  ? 'bg-[#1F2024] text-white'
                  : 'text-[#777E89] hover:text-white'
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('saved')}
              className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition ${
                activeTab === 'saved'
                  ? 'bg-[#1F2024] text-white'
                  : 'text-[#777E89] hover:text-white'
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#777E89]">
              Sort By
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="appearance-none rounded-full border border-[#343941] bg-[#121316] py-2 pl-4 pr-9 text-xs font-semibold text-white outline-none transition focus:border-[#CCFF00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8A909A]">
                ˅
              </span>
            </div>
          </div>
        </section>

        {/* Workout List */}
        <section>
          {sortedWorkouts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#343941] bg-[#121316] px-6 py-16 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#777E89]">
                NOTHING HERE YET
              </p>

              <p className="mt-2 text-sm text-[#555C67]">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex rounded-sm bg-[#CCFF00] px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-widest text-black transition hover:bg-[#B8E600]"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedWorkouts.map((workout) => {
                const isDone = isCompleted(workout.id);

                return (
                  <article
                    key={workout.id}
                    className={`rounded-xl border bg-[#121316] p-3 transition ${
                      isDone
                        ? 'border-[#CCFF00]/40 opacity-70'
                        : 'border-[#292D34]'
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      {/* Image */}
                      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg bg-[#1A1D21] sm:h-32 sm:w-55">
                        <Image
                          src={workout.image}
                          alt={workout.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 220px"
                          className="object-cover"
                        />
                      </div>

                      {/* Workout Info */}
                      <div className="min-w-0 flex-1 px-1 py-1">
                        <div className="mb-2 flex items-center gap-2">
                          {workout.muscleGroups
                            .slice(0, 2)
                            .map((muscleGroup) => (
                              <span
                                key={muscleGroup}
                                className="rounded-full bg-[#CCFF00] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black"
                              >
                                {muscleGroup}
                              </span>
                            ))}

                          {isDone && (
                            <span className="text-[9px] font-bold uppercase tracking-wide text-[#CCFF00]">
                              Done
                            </span>
                          )}
                        </div>

                        <h2
                          className={`text-base font-black uppercase leading-tight tracking-tight ${
                            isDone
                              ? 'text-[#7D838C] line-through'
                              : 'text-white'
                          }`}
                        >
                          {workout.name}
                        </h2>

                        <p className="mt-1 text-xs text-[#777E89]">
                          {workout.equipment}
                        </p>

                        {/* Meta */}
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] font-medium text-[#8B929D]">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 className="h-3.5 w-3.5" />
                            {workout.duration} min
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Flame className="h-3.5 w-3.5" />
                            {workout.caloriesBurned} kcal
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 fill-[#CCFF00] text-[#CCFF00]" />
                            {workout.rating}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center gap-2 sm:flex-col lg:flex-row">
                        <Link
                          href={`/workout/${workout.id}`}
                          className="inline-flex items-center justify-center rounded-full border border-[#3A3F47] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-white transition hover:border-white"
                        >
                          View Details
                        </Link>

                        {activeTab === 'plan' && (
                          <button
                            type="button"
                            onClick={() =>
                              handleDoneToggle(workout.id, workout.name)
                            }
                            className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${
                              isDone
                                ? 'bg-[#262A30] text-[#CCFF00]'
                                : 'bg-[#CCFF00] text-black hover:bg-[#B8E600]'
                            }`}
                          >
                            <Check className="h-3.5 w-3.5" />
                            {isDone ? 'Done' : 'Mark as Done'}
                          </button>
                        )}

                        <button
                          type="button"
                          aria-label={`Remove ${workout.name}`}
                          onClick={() => handleRemove(workout.id, workout.name)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-[#6F7680] transition hover:bg-[#1F2024] hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
