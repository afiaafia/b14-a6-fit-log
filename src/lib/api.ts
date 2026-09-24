import type { Workout } from '@/types/workout';

const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch workouts');
  }

  const data: Workout[] = await response.json();

  return data;
}

export async function getWorkoutById(id: string): Promise<Workout> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch workout');
  }

  const data: Workout = await response.json();

  if (!data || 'error' in data) {
    throw new Error('Workout not found');
  }

  return data;
}
