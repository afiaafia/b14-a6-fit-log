import type { Workout, WorkoutApiResponse } from '@/types/workout';

const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

function normalizeWorkout(workout: Workout): Workout {
  return {
    ...workout,

    id: String(workout.id),

    image: workout.image,

    name: workout.name,

    description: workout.description,

    muscleGroups: Array.isArray(workout.muscleGroups)
      ? workout.muscleGroups
      : [],

    equipment: workout.equipment,

    difficulty: workout.difficulty,

    duration: Number(workout.duration),

    caloriesBurned: Number(workout.caloriesBurned),

    rating: Number(workout.rating),

    sets: Number(workout.sets),

    reps: String(workout.reps),

    rest: Number(workout.rest),

    instructions: Array.isArray(workout.instructions)
      ? workout.instructions
      : [],
  };
}

function extractWorkouts(data: WorkoutApiResponse): Workout[] {
  if (Array.isArray(data)) {
    return data.map(normalizeWorkout);
  }

  if (Array.isArray(data.data)) {
    return data.data.map(normalizeWorkout);
  }

  if (Array.isArray(data.workouts)) {
    return data.workouts.map(normalizeWorkout);
  }

  return [];
}

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch workouts: ${response.status}`);
  }

  const data: WorkoutApiResponse = await response.json();

  return extractWorkouts(data);
}

export async function getWorkoutById(id: string): Promise<Workout> {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch workout: ${response.status}`);
  }

  const data: Workout = await response.json();

  return normalizeWorkout(data);
}
