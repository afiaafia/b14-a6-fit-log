import Link from 'next/link';
import { notFound } from 'next/navigation';
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

  let workout;

  try {
    workout = await getWorkoutById(id);
  } catch {
    notFound();
  }

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
}
