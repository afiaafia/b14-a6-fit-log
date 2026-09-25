import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getWorkoutById } from '@/lib/api';
import WorkoutActions from '@/components/workout-details/WorkoutActions';

interface WorkoutDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  let workout;

  try {
    workout = await getWorkoutById(id);
  } catch {
    return (
      <main className="min-h-screen bg-[#08090B] px-6 py-10 text-white">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-[#9CA3AF] transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Workouts
          </Link>

          <div className="rounded-xl border border-[#3A2225] bg-[#13161B] p-10 text-center">
            <h1 className="text-xl font-bold text-white">Workout not found</h1>

            <p className="mt-2 text-sm text-[#9CA3AF]">
              The workout you are looking for could not be loaded.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090B] px-6 py-8 text-white">
      <div className="mx-auto max-w-[1200px]">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-[#9CA3AF] transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Workouts
        </Link>

        {/* Details Container */}
        <section className="overflow-hidden rounded-xl border border-[#1F242D] bg-[#13161B]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Workout Image */}
            <div className="relative min-h-[360px] bg-[#1A1D24] lg:min-h-[620px]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Workout Information */}
            <div className="flex flex-col p-6 lg:p-8">
              {/* Heading */}
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#CCFF00]">
                  Workout Details
                </p>

                <h1 className="text-3xl font-black uppercase leading-tight tracking-tight text-white lg:text-4xl">
                  {workout.name}
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-[#9CA3AF]">
                  {workout.description}
                </p>
              </div>

              {/* Muscle Groups */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {workout.muscleGroups.map((muscleGroup) => (
                  <span
                    key={muscleGroup}
                    className="rounded-full bg-[#CCFF00] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black"
                  >
                    {muscleGroup}
                  </span>
                ))}
              </div>

              {/* Workout Stats */}
              <div className="mt-5 overflow-hidden rounded-xl border border-[#252A33] bg-[#1A1D24]">
                <div className="flex items-center justify-between border-b border-[#252A33] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B929D]">
                    Equipment
                  </span>

                  <span className="text-xs text-[#D1D5DB]">
                    {workout.equipment}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#252A33] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B929D]">
                    Difficulty
                  </span>

                  <span className="text-xs capitalize text-[#D1D5DB]">
                    {workout.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#252A33] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B929D]">
                    Sets
                  </span>

                  <span className="text-xs text-[#D1D5DB]">{workout.sets}</span>
                </div>

                <div className="flex items-center justify-between border-b border-[#252A33] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B929D]">
                    Reps
                  </span>

                  <span className="text-xs text-[#D1D5DB]">{workout.reps}</span>
                </div>

                <div className="flex items-center justify-between border-b border-[#252A33] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B929D]">
                    Duration
                  </span>

                  <span className="text-xs text-[#D1D5DB]">
                    {workout.duration} min
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#252A33] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B929D]">
                    Calories
                  </span>

                  <span className="text-xs text-[#D1D5DB]">
                    {workout.caloriesBurned} kcal
                  </span>
                </div>

                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B929D]">
                    Rating
                  </span>

                  <span className="text-xs text-[#D1D5DB]">
                    {workout.rating}
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                  Instructions
                </h2>

                <ol className="mt-3 space-y-3">
                  {workout.instructions.map((instruction, index) => (
                    <li
                      key={`${workout.id}-instruction-${index}`}
                      className="flex gap-3 text-xs leading-5 text-[#9CA3AF]"
                    >
                      <span className="shrink-0 text-[#6B7280]">
                        {index + 1}.
                      </span>

                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Actions */}
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
