'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, Clock3, Flame, Star, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import { useFitLog } from '@/context/FitLogContext';
import SortDropdown, {
  type SortOption,
} from '@/components/sort-dropdown/SortDropdown';

type ActiveTab = 'plan' | 'saved';

export default function MyPlan() {
  const { plan, saved, planCount, removeFromPlan, removeFromSaved } =
    useFitLog();

  const [activeTab, setActiveTab] = useState<ActiveTab>('plan');
  const [sortBy, setSortBy] = useState<SortOption>('Duration');

  const planMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const planCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const sortedPlan = useMemo(() => {
    return [...plan].sort((a, b) => {
      if (sortBy === 'Duration') {
        return a.duration - b.duration;
      }

      if (sortBy === 'Calories') {
        return a.caloriesBurned - b.caloriesBurned;
      }

      return a.rating - b.rating;
    });
  }, [plan, sortBy]);

  const sortedSaved = useMemo(() => {
    return [...saved].sort((a, b) => {
      if (sortBy === 'Duration') {
        return a.duration - b.duration;
      }

      if (sortBy === 'Calories') {
        return a.caloriesBurned - b.caloriesBurned;
      }

      return a.rating - b.rating;
    });
  }, [saved, sortBy]);

  const workouts = activeTab === 'plan' ? sortedPlan : sortedSaved;

  return (
    <main className="min-h-screen bg-[#08090B] px-4 pb-12 pt-8 text-white sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        {/* Page Header */}
        <section className="mb-7">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#CCFF00]">
            FITLOG
          </p>

          <h1 className="text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
            MY PLAN
          </h1>

          <p className="mt-3 max-w-md text-xs leading-5 text-[#7F8792]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-7 overflow-hidden rounded-xl border border-[#292D35] bg-[#121316]">
          <div className="grid grid-cols-3">
            {/* Exercises */}
            <div className="border-r border-[#292D35] px-4 py-5 sm:px-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#737A84]">
                Exercises
              </p>

              <p className="mt-2 text-2xl font-black leading-none text-[#CCFF00] sm:text-3xl">
                {planCount}
              </p>
            </div>

            {/* Minutes */}
            <div className="border-r border-[#292D35] px-4 py-5 sm:px-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#737A84]">
                Minutes
              </p>

              <p className="mt-2 text-2xl font-black leading-none text-white sm:text-3xl">
                {planMinutes}
              </p>
            </div>

            {/* Calories */}
            <div className="px-4 py-5 sm:px-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#737A84]">
                Calories
              </p>

              <p className="mt-2 text-2xl font-black leading-none text-white sm:text-3xl">
                {planCalories}
              </p>
            </div>
          </div>
        </section>

        {/* Tabs + Sort */}
        <section className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit items-center rounded-full border border-[#292D35] bg-[#101216] p-1">
            <button
              type="button"
              onClick={() => setActiveTab('plan')}
              className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-all ${
                activeTab === 'plan'
                  ? 'bg-[#1F2024] text-white'
                  : 'text-[#777F8A] hover:text-white'
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-all ${
                activeTab === 'saved'
                  ? 'bg-[#1F2024] text-white'
                  : 'text-[#777F8A] hover:text-white'
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#666E79]">
              Sort By
            </span>

            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </section>

        {/* Workout List */}
        <section>
          {workouts.length === 0 ? (
            <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-[#30343C] bg-[#101216] px-6 text-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#737A84]">
                  {activeTab === 'plan'
                    ? 'Your plan is empty'
                    : 'No saved workouts'}
                </p>

                <p className="mt-2 text-sm text-[#969DA7]">
                  {activeTab === 'plan'
                    ? 'Add workouts from the library to build today&apos;s plan.'
                    : 'Save workouts from their details page to find them here later.'}
                </p>

                <Link
                  href="/"
                  className="mt-5 inline-flex rounded-sm bg-[#CCFF00] px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-black transition hover:bg-[#B8E600]"
                >
                  Browse Workouts
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {workouts.map((workout) => (
                <article
                  key={workout.id}
                  className="group rounded-xl border border-[#292D35] bg-[#121316] p-3 transition-colors hover:border-[#3A3F48] sm:p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* Image */}
                    <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-lg bg-[#191B20] sm:w-[210px]">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 210px"
                        className="object-cover"
                      />

                      <div className="absolute left-2 top-2 rounded-full bg-[#CCFF00] px-2 py-0.5">
                        <span className="text-[8px] font-black uppercase tracking-wide text-black">
                          {workout.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Information */}
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-sm font-black uppercase tracking-tight text-white sm:text-base">
                        {workout.name}
                      </h2>

                      <p className="mt-1 text-xs text-[#747C87]">
                        {workout.equipment}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-medium text-[#858D98]">
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
                    <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch">
                      <Link
                        href={`/workout/${workout.id}`}
                        className="inline-flex h-9 items-center justify-center rounded-full border border-[#3A3F48] px-4 text-[9px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:border-[#666E79] hover:bg-[#1A1D22]"
                      >
                        View Details
                      </Link>

                      {activeTab === 'plan' && (
                        <button
                          type="button"
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#CCFF00] px-4 text-[9px] font-extrabold uppercase tracking-[0.1em] text-black transition-colors hover:bg-[#B8E600]"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          Mark as Done
                        </button>
                      )}

                      <button
                        type="button"
                        aria-label={`Remove ${workout.name}`}
                        onClick={() =>
                          activeTab === 'plan'
                            ? removeFromPlan(workout.id)
                            : removeFromSaved(workout.id)
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#626A75] transition-colors hover:bg-[#1A1D22] hover:text-white sm:absolute sm:ml-[calc(100%+9999px)]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
