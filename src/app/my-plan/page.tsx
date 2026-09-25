'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Bookmark,
  CalendarCheck,
  Clock3,
  Flame,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { useFitLog } from '@/context/FitLogContext';

type Tab = 'plan' | 'saved';

export default function MyPlan() {
  const { plan, saved, removeFromPlan, removeFromSaved } = useFitLog();

  const [activeTab, setActiveTab] = useState<Tab>('plan');

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const activeWorkouts = activeTab === 'plan' ? plan : saved;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container-fitlog py-10 md:py-14">
        {/* Back */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to workouts
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            My Plan
          </p>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            TODAY&apos;S PLAN
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="card-fitlog p-5">
            <p className="text-sm font-medium text-slate-500">Exercises</p>

            <p className="mt-2 text-3xl font-black text-slate-900">
              {plan.length}
            </p>
          </div>

          <div className="card-fitlog p-5">
            <p className="text-sm font-medium text-slate-500">Minutes</p>

            <p className="mt-2 text-3xl font-black text-slate-900">
              {totalMinutes}
            </p>
          </div>

          <div className="card-fitlog p-5">
            <p className="text-sm font-medium text-slate-500">Calories</p>

            <p className="mt-2 text-3xl font-black text-slate-900">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex items-center gap-3 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('plan')}
            className={
              activeTab === 'plan'
                ? 'border-b-2 border-slate-900 px-4 py-3 text-sm font-bold text-slate-900'
                : 'px-4 py-3 text-sm font-semibold text-slate-500 transition hover:text-slate-900'
            }
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={
              activeTab === 'saved'
                ? 'border-b-2 border-slate-900 px-4 py-3 text-sm font-bold text-slate-900'
                : 'px-4 py-3 text-sm font-semibold text-slate-500 transition hover:text-slate-900'
            }
          >
            Saved
          </button>
        </div>

        {/* Empty State */}
        {activeWorkouts.length === 0 && (
          <div className="card-fitlog flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              {activeTab === 'plan' ? (
                <CalendarCheck size={26} />
              ) : (
                <Bookmark size={26} />
              )}
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Nothing here yet
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              {activeTab === 'plan'
                ? 'Your plan is empty'
                : 'Nothing saved yet'}
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              {activeTab === 'plan'
                ? 'Browse the library and add a lift to get today moving.'
                : 'Save workouts from their details page to find them here later.'}
            </p>

            <Link
              href="/#library"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {/* Workout List */}
        {activeWorkouts.length > 0 && (
          <div className="space-y-4">
            {activeWorkouts.map((workout) => (
              <div key={workout.id} className="card-fitlog overflow-hidden">
                <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                  {/* Workout Image */}
                  <Link
                    href={`/workout/${workout.id}`}
                    className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-44"
                  >
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </Link>

                  {/* Workout Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-1.5">
                      {workout.muscleGroups.slice(0, 2).map((muscleGroup) => (
                        <span
                          key={muscleGroup}
                          className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600"
                        >
                          {muscleGroup}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/workout/${workout.id}`}
                      className="mt-2 block"
                    >
                      <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 transition hover:text-blue-600">
                        {workout.name}
                      </h2>
                    </Link>

                    <p className="mt-1 text-sm text-slate-500">
                      {workout.equipment}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={14} />
                        {workout.duration} min
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Flame size={14} />
                        {workout.caloriesBurned} kcal
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() =>
                      activeTab === 'plan'
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
