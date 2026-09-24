export type Workout = {
  id: string;
  name: string;
  image: string;
  description: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  caloriesBurned: number;
  rating: number;
  sets: number;
  reps: string;
  rest: number;
  instructions: string[];
};
