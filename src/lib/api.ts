import type { Workout } from '@/types/workout';

const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch workouts');
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid workout data');
  }

  return data as Workout[];
}

export async function getWorkoutById(id: string): Promise<Workout> {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch workout');
  }

  const data = await response.json();

  return data as Workout;
}
