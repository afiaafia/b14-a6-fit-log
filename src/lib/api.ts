import type { Workout } from '@/types/workout';

const workoutImages: Record<string, string> = {
  'Bicycle Crunches': '/images/general/Bicycle Crunches.jpg',
  'Bodyweight Squats': '/images/general/Bodyweight Squats.webp',
  Burpees: '/images/general/Burpees.jpg',
  'Glute Bridge': '/images/general/Glute Bridge.jpg',
  'High Knees': '/images/general/High Knees.jpg',
  'Jumping Jacks': '/images/general/Jumping Jacks.avif',
  'Leg Raises': '/images/general/Leg Raises.webp',
  Lunges: '/images/general/Lunges.jpg',
  'Mountain Climbers': '/images/general/Mountain Climbers.webp',
  Plank: '/images/general/Plank.jpg',
  'Push-Ups': '/images/general/Push-Ups.jpg',
  'Russian Twists': '/images/general/Russian Twists.avif',
};

const getLocalWorkoutImage = (name: string): string => {
  return workoutImages[name] ?? '/images/general/Plank.jpg';
};

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch('/api/workouts');

  if (!response.ok) {
    throw new Error('Failed to fetch workouts');
  }

  const data: Workout[] = await response.json();

  return data.map((workout) => ({
    ...workout,
    image: getLocalWorkoutImage(workout.name),
  }));
}

export async function getWorkoutById(id: string): Promise<Workout> {
  const response = await fetch(`/api/workouts/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch workout');
  }

  const workout: Workout = await response.json();

  return {
    ...workout,
    image: getLocalWorkoutImage(workout.name),
  };
}
