import Image from 'next/image';
import Link from 'next/link';
import { Clock3, Flame, Star } from 'lucide-react';
import type { Workout } from '@/types/workout';

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workout/${workout.id}`} className="group block">
      <article className="card-fitlog h-full overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {workout.muscleGroups.slice(0, 2).map((muscleGroup) => (
              <span
                key={muscleGroup}
                className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur"
              >
                {muscleGroup}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 transition group-hover:text-blue-600">
              {workout.name}
            </h2>

            <div className="flex shrink-0 items-center gap-1 text-sm font-bold text-slate-700">
              <Star size={15} fill="currentColor" />
              {workout.rating}
            </div>
          </div>

          <p className="text-sm text-slate-500">{workout.equipment}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={15} />
              {workout.duration} min
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Flame size={15} />
              {workout.caloriesBurned} kcal
            </span>

            <span className="font-semibold capitalize text-slate-700">
              {workout.difficulty}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
