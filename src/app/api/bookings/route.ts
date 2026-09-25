import { NextRequest, NextResponse } from 'next/server';
import { createBooking, getAllBookings, clearBookings, INITIAL_MENTORS } from '@/lib/bookingEngine';

export async function GET() {
  const bookings = getAllBookings();
  return NextResponse.json({
    success: true,
    totalBookings: bookings.length,
    totalMentors: INITIAL_MENTORS.length,
    maxDailyCapacity: INITIAL_MENTORS.length * 2, // 20 demo classes per day
    bookings,
  });
}

export async function DELETE() {
  clearBookings();
  return NextResponse.json({
    success: true,
    message: 'All trial class bookings have been cleared.',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { parentName, parentEmail, phone, course, grade, dateLocal, slotLocal, parentTimeZone } = body;

    if (!parentName || !parentEmail || !phone || !course || !dateLocal || !slotLocal || !parentTimeZone) {
      return NextResponse.json(
        { success: false, error: 'All fields are required to book a trial class.' },
        { status: 400 }
      );
    }

    const result = await createBooking({
      parentName,
      parentEmail,
      phone,
      course,
      grade: grade || 'Grade 4',
      dateLocal,
      slotLocal,
      parentTimeZone,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          isFull: true,
          message: 'All 10 mentors are either booked for this slot or reached their daily limit of 2 demo classes.',
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: result.booking,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
