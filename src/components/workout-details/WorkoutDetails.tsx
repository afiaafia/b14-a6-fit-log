import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock3, Dumbbell, Flame, Star, Target } from 'lucide-react';
import type { Workout } from '@/types/workout';

interface WorkoutDetailsProps {
  workout: Workout;
}

export default function WorkoutDetails({ workout }: WorkoutDetailsProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Workouts
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {workout.name}
          </h1>

          <p className="mt-4 leading-7 text-gray-600">{workout.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 p-4">
              <Clock3 className="mb-2 h-5 w-5 text-gray-700" />
              <p className="text-sm text-gray-500">Duration</p>
              <p className="mt-1 font-semibold text-gray-900">
                {workout.duration} min
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <Flame className="mb-2 h-5 w-5 text-gray-700" />
              <p className="text-sm text-gray-500">Calories</p>
              <p className="mt-1 font-semibold text-gray-900">
                {workout.caloriesBurned}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <Dumbbell className="mb-2 h-5 w-5 text-gray-700" />
              <p className="text-sm text-gray-500">Equipment</p>
              <p className="mt-1 font-semibold text-gray-900">
                {workout.equipment}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <Target className="mb-2 h-5 w-5 text-gray-700" />
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="mt-1 font-semibold capitalize text-gray-900">
                {workout.difficulty}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-current text-yellow-500" />
              <span className="font-semibold text-gray-900">
                {workout.rating}
              </span>
              <span className="text-sm text-gray-500">rating</span>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Workout Info
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Sets</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {workout.sets}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Reps</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {workout.reps}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Instructions
            </h2>

            <ol className="mt-4 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={`${index}-${instruction}`}
                  className="flex gap-3 text-sm leading-6 text-gray-600"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                    {index + 1}
                  </span>

                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <button
            type="button"
            className="mt-8 w-full rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Add to My Plan
          </button>
        </div>
      </div>
    </section>
  );
}
