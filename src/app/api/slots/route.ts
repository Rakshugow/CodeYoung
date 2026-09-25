import { NextRequest, NextResponse } from 'next/server';
import { getSlotsAvailability } from '@/lib/bookingEngine';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const timeZone = searchParams.get('timezone') || 'America/New_York';
    const course = searchParams.get('course') || 'Coding (Ages 5-16)';

    const slots = getSlotsAvailability(date, timeZone, course);

    return NextResponse.json({
      success: true,
      date,
      timeZone,
      course,
      slots,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch slots' },
      { status: 500 }
    );
  }
}
