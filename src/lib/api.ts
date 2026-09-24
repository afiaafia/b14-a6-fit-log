import type { Workout } from '@/types/workout';

const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

const localWorkoutImages: Record<string, string> = {
  'Bicycle Crunches': '/images/Bicycle Crunches.jpg',
  'Bodyweight Squats': '/images/Bodyweight Squats.webp',
  Burpees: '/images/Burpees.jpg',
  'Glute Bridge': '/images/Glute Bridge.jpg',
  'High Knees': '/images/High Knees.jpg',
  'Jumping Jacks': '/images/Jumping Jacks.avif',
  'Leg Raises': '/images/Leg Raises.webp',
  Lunges: '/images/Lunges.jpg',
  'Mountain Climbers': '/images/Mountain Climbers.webp',
  Plank: '/images/Plank.jpg',
  'Push-Ups': '/images/Push-Ups.jpg',
  'Russian Twists': '/images/Russian Twists.avif',
};

function applyLocalImages(workouts: Workout[]): Workout[] {
  return workouts.map((workout) => ({
    ...workout,
    image: localWorkoutImages[workout.name] ?? workout.image,
  }));
}

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch workouts');
  }

  const data: Workout[] = await response.json();

  return applyLocalImages(data);
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

  return {
    ...data,
    image: localWorkoutImages[data.name] ?? data.image,
  };
}
