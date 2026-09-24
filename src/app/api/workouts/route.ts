import { NextResponse } from 'next/server';
import { workouts } from '@/data/workouts';

export async function GET() {
  return NextResponse.json(workouts);
}
