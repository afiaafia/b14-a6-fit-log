export type WorkoutDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type Workout = {
  id: string;
  name: string;
  image: string;
  description: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: WorkoutDifficulty;
  duration: number;
  caloriesBurned: number;
  rating: number;
  sets: number;
  reps: string;
  rest: number;
  instructions: string[];
};

export type WorkoutApiResponse =
  | Workout[]
  | {
      data?: Workout[];
      workouts?: Workout[];
    };
