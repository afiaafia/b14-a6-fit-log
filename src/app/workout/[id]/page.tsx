import Link from 'next/link';
import type { Workout } from '@/types/workout';

interface WorkoutDetailsProps {
  workout: Workout;
}

export default function WorkoutDetails({ workout }: WorkoutDetailsProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">
          Workout Details
        </p>

        <h1 className="text-3xl font-bold text-gray-900">{workout.name}</h1>
      </div>

      <div className="space-y-5">
        <div>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Description
          </h2>

          <p className="leading-7 text-gray-600">{workout.description}</p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Duration</h2>

          <p className="text-gray-600">{workout.duration}</p>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Back to Workouts
        </Link>
      </div>
    </section>
  );
}
