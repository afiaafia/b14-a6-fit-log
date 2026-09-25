import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { getWorkoutById } from '@/lib/api';
import WorkoutDetails from '@/components/workout-details/WorkoutDetails';

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  try {
    const workout = await getWorkoutById(id);

    return (
      <main className="min-h-screen bg-[#08090B] px-4 pb-16 pt-8 text-white sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#737A84] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Workouts
          </Link>

          <WorkoutDetails workout={workout} />
        </div>
      </main>
    );
  } catch {
    return (
      <main className="min-h-screen bg-[#08090B] px-4 pb-16 pt-8 text-white sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#737A84] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Workouts
          </Link>

          <section className="rounded-xl border border-dashed border-[#30343C] bg-[#101216] px-6 py-16 text-center">
            <h1 className="text-xl font-black uppercase text-white">
              Workout Not Found
            </h1>

            <p className="mt-2 text-xs text-[#737A84]">
              The requested workout could not be loaded.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-sm bg-[#CCFF00] px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-black"
            >
              Back to Library
            </Link>
          </section>
        </div>
      </main>
    );
  }
}
