'use client';

import Link from 'next/link';
import { ArrowLeft, Dumbbell } from 'lucide-react';

export default function MyPlan() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container-fitlog py-10 md:py-14">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to workouts
        </Link>

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

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="card-fitlog p-5">
            <p className="text-sm font-medium text-slate-500">Exercises</p>
            <p className="mt-2 text-3xl font-black text-slate-900">0</p>
          </div>

          <div className="card-fitlog p-5">
            <p className="text-sm font-medium text-slate-500">Minutes</p>
            <p className="mt-2 text-3xl font-black text-slate-900">0</p>
          </div>

          <div className="card-fitlog p-5">
            <p className="text-sm font-medium text-slate-500">Calories</p>
            <p className="mt-2 text-3xl font-black text-slate-900">0</p>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3 border-b border-slate-200">
          <button
            type="button"
            className="border-b-2 border-slate-900 px-4 py-3 text-sm font-bold text-slate-900"
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            className="px-4 py-3 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            Saved
          </button>
        </div>

        <div className="card-fitlog flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <Dumbbell size={26} />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Nothing here yet
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-900">
            Your plan is empty
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/#library"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Go to workouts
          </Link>
        </div>
      </section>
    </main>
  );
}
