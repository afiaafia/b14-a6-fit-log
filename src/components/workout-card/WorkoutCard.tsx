'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock3, Flame, Star } from 'lucide-react';
import type { Workout } from '@/types/workout';

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#1F242D] bg-[#13161B] transition-colors hover:border-[#303743]"
    >
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-[#1A1D24]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Tags */}
        <div className="mb-2 flex flex-wrap gap-1.5">
          {workout.muscleGroups.slice(0, 2).map((muscleGroup) => (
            <span
              key={muscleGroup}
              className="rounded-full bg-[#CCFF00] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black"
            >
              {muscleGroup}
            </span>
          ))}
        </div>

        {/* Workout Info */}
        <div className="mb-4">
          <h3 className="text-base font-bold uppercase leading-snug text-white">
            {workout.name}
          </h3>

          <p className="mt-0.5 text-xs text-[#9CA3AF]">{workout.equipment}</p>
        </div>

        {/* Stats */}
        <div className="mt-auto flex items-center justify-between border-t border-[#1F242D] pt-3 text-xs font-medium text-[#9CA3AF]">
          <div className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
