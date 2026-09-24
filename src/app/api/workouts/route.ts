import { NextResponse } from 'next/server';
import { workouts } from '@/data/workout';

export async function GET() {
  return NextResponse.json(workouts);
}
