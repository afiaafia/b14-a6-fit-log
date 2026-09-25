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
      href={`/workout/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#1F242D] bg-[#121316] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#343A45]"
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#181A1F]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups.slice(0, 2).map((muscleGroup) => (
            <span
              key={muscleGroup}
              className="rounded-full bg-[#CCFF00] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-black"
            >
              {muscleGroup}
            </span>
          ))}
        </div>

        {/* Name */}
        <div className="mb-4">
          <h3 className="text-sm font-black uppercase leading-tight text-white">
            {workout.name}
          </h3>

          <p className="mt-1 text-[11px] text-[#858D98]">{workout.equipment}</p>
        </div>

        {/* Stats */}
        <div className="mt-auto grid grid-cols-3 border-t border-[#1F242D] pt-3 text-[10px] text-[#858D98]">
          <div className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />

            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <Flame className="h-3.5 w-3.5" />

            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center justify-end gap-1">
            <Star className="h-3.5 w-3.5 fill-[#CCFF00] text-[#CCFF00]" />

            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
