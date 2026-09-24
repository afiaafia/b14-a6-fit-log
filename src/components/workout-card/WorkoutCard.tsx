import Image from 'next/image';
import Link from 'next/link';
import { Clock3, Flame, Star } from 'lucide-react';
import type { Workout } from '@/types/workout';

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workout/${workout.id}`} className="group block h-full">
      <article className="flex h-full min-h-[350px] flex-col overflow-hidden rounded-lg border border-[#1F242D] bg-[#13161B] transition-colors duration-200 hover:border-[#303744]">
        {/* Image */}
        <div className="relative h-44 w-full shrink-0 overflow-hidden bg-[#1A1D24]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3 brightness-[0.85] contrast-[1.35]"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Tags */}
          <div className="mb-2 flex min-h-5 flex-wrap gap-1.5">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#CCFF00] px-2 py-0.5 text-[10px] font-bold uppercase leading-5 text-black"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Title + Equipment */}
          <div className="mb-4">
            <h2 className="text-base font-bold uppercase leading-snug text-white">
              {workout.name}
            </h2>

            <p className="mt-0.5 text-xs text-[#9CA3AF]">{workout.equipment}</p>
          </div>

          {/* Metadata */}
          <div className="mt-auto flex items-center justify-between border-t border-[#1F242D] pt-3 text-xs font-medium text-[#6B7280]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock3 size={13} />
                {workout.duration} min
              </span>

              <span className="flex items-center gap-1">
                <Flame size={13} />
                {workout.caloriesBurned} kcal
              </span>
            </div>

            <span className="flex items-center gap-1 text-[#9CA3AF]">
              <Star size={12} fill="currentColor" strokeWidth={1.5} />
              {workout.rating}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
