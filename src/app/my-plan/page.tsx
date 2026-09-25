'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Dumbbell, Trash2 } from 'lucide-react';

import { useFitLog } from '@/context/FitLogContext';

export default function MyPlan() {
  const {
    plan,
    saved,
    planCount,
    savedCount,
    removeFromPlan,
    removeFromSaved,
  } = useFitLog();

  const planMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const planCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <main className="min-h-screen bg-[#08090B] px-6 py-10 text-white">
      <section className="mx-auto w-full max-w-[1200px]">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-[#9CA3AF] transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to workouts
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#CCFF00]">
            My Plan
          </p>

          <h1 className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
            TODAY&apos;S PLAN
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#9CA3AF]">
            Build your workout plan with up to five exercises and save workouts
            for later.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#1F242D] bg-[#13161B] p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B929D]">
              Exercises
            </p>

            <p className="mt-2 text-3xl font-black text-white">{planCount}</p>
          </div>

          <div className="rounded-xl border border-[#1F242D] bg-[#13161B] p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B929D]">
              Minutes
            </p>

            <p className="mt-2 text-3xl font-black text-white">{planMinutes}</p>
          </div>

          <div className="rounded-xl border border-[#1F242D] bg-[#13161B] p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B929D]">
              Calories
            </p>

            <p className="mt-2 text-3xl font-black text-white">
              {planCalories}
            </p>
          </div>
        </div>

        {/* Today's Plan */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between border-b border-[#1F242D] pb-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Today&apos;s Plan
              </h2>

              <p className="mt-1 text-xs text-[#6B7280]">
                {planCount}/5 exercises
              </p>
            </div>
          </div>

          {plan.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-[#1F242D] bg-[#13161B] px-6 py-12 text-center">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1D24] text-[#8B929D]">
                <Dumbbell className="h-6 w-6" />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                Nothing here yet
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                Your plan is empty
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#9CA3AF]">
                Browse the workout library and add exercises to today&apos;s
                plan.
              </p>

              <Link
                href="/#library"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#CCFF00] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#B8E600]"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {plan.map((workout) => (
                <article
                  key={workout.id}
                  className="overflow-hidden rounded-xl border border-[#1F242D] bg-[#13161B]"
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#1A1D24]">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#CCFF00]">
                        {workout.difficulty}
                      </p>

                      <h3 className="mt-1 truncate text-base font-bold uppercase text-white">
                        {workout.name}
                      </h3>

                      <p className="mt-2 text-xs text-[#9CA3AF]">
                        {workout.duration} min · {workout.caloriesBurned} kcal
                      </p>

                      <button
                        type="button"
                        onClick={() => removeFromPlan(workout.id)}
                        className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] transition hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Saved */}
        <section>
          <div className="mb-4 flex items-center justify-between border-b border-[#1F242D] pb-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Saved
              </h2>

              <p className="mt-1 text-xs text-[#6B7280]">
                {savedCount} saved workout{savedCount === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          {saved.length === 0 ? (
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-[#1F242D] bg-[#13161B] px-6 py-10 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1D24] text-[#8B929D]">
                <Bookmark className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-bold text-white">
                No saved workouts
              </h3>

              <p className="mt-2 text-sm text-[#9CA3AF]">
                Save workouts from their details page to find them here later.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {saved.map((workout) => (
                <article
                  key={workout.id}
                  className="overflow-hidden rounded-xl border border-[#1F242D] bg-[#13161B]"
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#1A1D24]">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#CCFF00]">
                        {workout.difficulty}
                      </p>

                      <h3 className="mt-1 truncate text-base font-bold uppercase text-white">
                        {workout.name}
                      </h3>

                      <p className="mt-2 text-xs text-[#9CA3AF]">
                        {workout.duration} min · {workout.caloriesBurned} kcal
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <Link
                          href={`/workout/${workout.id}`}
                          className="text-[10px] font-bold uppercase tracking-wider text-[#CCFF00] transition hover:text-[#B8E600]"
                        >
                          View workout
                        </Link>

                        <button
                          type="button"
                          onClick={() => removeFromSaved(workout.id)}
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] transition hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
