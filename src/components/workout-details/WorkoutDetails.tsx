'use client';

import Image from 'next/image';
import {
  Clock3,
  Dumbbell,
  Flame,
  Gauge,
  Layers3,
  Repeat2,
  Star,
} from 'lucide-react';

import type { Workout } from '@/types/workout';
import WorkoutActions from './WorkoutActions';

interface WorkoutDetailsProps {
  workout: Workout;
}

export default function WorkoutDetails({ workout }: WorkoutDetailsProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#1F242D] bg-[#121316]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative min-h-[320px] bg-[#181A1F] sm:min-h-[420px] lg:min-h-[620px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col p-5 sm:p-7 lg:p-8">
          {/* Heading */}
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#CCFF00]">
              WORKOUT DETAILS
            </p>

            <h1 className="text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-4 max-w-xl text-xs leading-5 text-[#8A929D]">
              {workout.description}
            </p>
          </div>

          {/* Muscle Groups */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((muscleGroup) => (
              <span
                key={muscleGroup}
                className="rounded-full bg-[#CCFF00] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-black"
              >
                {muscleGroup}
              </span>
            ))}
          </div>

          {/* Specs */}
          <div className="mt-6 overflow-hidden rounded-xl border border-[#292D35] bg-[#181A1F]">
            <SpecRow
              icon={<Dumbbell />}
              label="Equipment"
              value={workout.equipment}
            />

            <SpecRow
              icon={<Gauge />}
              label="Difficulty"
              value={workout.difficulty}
            />

            <SpecRow
              icon={<Layers3 />}
              label="Sets"
              value={String(workout.sets)}
            />

            <SpecRow icon={<Repeat2 />} label="Reps" value={workout.reps} />

            <SpecRow
              icon={<Clock3 />}
              label="Duration"
              value={`${workout.duration} min`}
            />

            <SpecRow
              icon={<Flame />}
              label="Calories"
              value={`${workout.caloriesBurned} kcal`}
            />

            <SpecRow
              icon={<Star />}
              label="Rating"
              value={String(workout.rating)}
              last
            />
          </div>

          {/* Instructions */}
          <div className="mt-7">
            <h2 className="text-[11px] font-black uppercase tracking-[0.15em] text-white">
              INSTRUCTIONS
            </h2>

            <ol className="mt-4 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={`${workout.id}-${index}`}
                  className="flex gap-3 text-xs leading-5 text-[#8A929D]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1F2024] text-[9px] font-bold text-[#CCFF00]">
                    {index + 1}
                  </span>

                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="mt-7">
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecRow({
  icon,
  label,
  value,
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 ${
        !last ? 'border-b border-[#292D35]' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-[#666E79]">
          <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>
        </span>

        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#747C87]">
          {label}
        </span>
      </div>

      <span className="text-right text-xs text-[#D1D5DB]">{value}</span>
    </div>
  );
}
