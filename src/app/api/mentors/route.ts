import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_MENTORS, getAllBookings, getDateStringInTz } from '@/lib/bookingEngine';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');
  const allBookings = getAllBookings();

  // If no specific date specified, use today in Asia/Kolkata
  const todayIST = getDateStringInTz(new Date(), 'Asia/Kolkata');
  const targetDateIST = dateParam ? dateParam : todayIST;

  // Extract all distinct dates that have bookings
  const activeDates = Array.from(new Set(allBookings.map((b) => b.mentorDateLocal))).sort();

  const mentorsWithLoad = INITIAL_MENTORS.map((m) => {
    // All bookings assigned to this mentor
    const mentorAllBookings = allBookings.filter((b) => b.mentorId === m.id);
    
    // Bookings on the target date
    const mentorDateBookings = mentorAllBookings.filter((b) => b.mentorDateLocal === targetDateIST);

    return {
      ...m,
      dateIST: targetDateIST,
      bookingsToday: mentorDateBookings.length,
      totalAssignedAllDates: mentorAllBookings.length,
      maxDailyLimit: 2,
      isAvailableToday: mentorDateBookings.length < 2,
      assignedBookings: mentorAllBookings.map((b) => ({
        id: b.id,
        parentName: b.parentName,
        course: b.course,
        grade: b.grade,
        dateLocal: b.dateLocal,
        mentorDateLocal: b.mentorDateLocal,
        mentorTimeLocal: b.mentorTimeLocal,
        scheduledLocalTime: b.emailsSent?.parentEmail?.scheduledLocalTime,
        liveClassLink: b.liveClassLink,
      })),
    };
  });

  const totalClassesTargetDate = mentorsWithLoad.reduce((acc, m) => acc + m.bookingsToday, 0);
  const totalClassesAllTime = allBookings.length;

  return NextResponse.json({
    success: true,
    dateIST: targetDateIST,
    todayIST,
    activeDates,
    totalMentors: INITIAL_MENTORS.length,
    totalClassesToday: totalClassesTargetDate,
    totalClassesAllTime,
    maxFleetCapacity: INITIAL_MENTORS.length * 2, // 20 demo classes daily
    remainingFleetCapacity: Math.max(0, INITIAL_MENTORS.length * 2 - totalClassesTargetDate),
    mentors: mentorsWithLoad,
  });
}
