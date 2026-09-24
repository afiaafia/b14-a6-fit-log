import { NextResponse } from 'next/server';
import { workouts } from '@/data/workouts';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const workout = workouts.find((item) => item.id === id);

  if (!workout) {
    return NextResponse.json({ message: 'Workout not found' }, { status: 404 });
  }

  return NextResponse.json(workout);
}
