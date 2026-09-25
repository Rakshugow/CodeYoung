/**
 * Codeyoung Trial Class Appointment Booking Engine
 *
 * Requirements:
 * 1. 10 Mentors available for trial classes
 * 2. 20 Parents booking trial classes per day (10 mentors * 2 classes = 20 max daily capacity)
 * 3. Cross-timezone: Parents in US (EDT/EST, CDT/CST, MDT/MST, PDT/PST) or UK (BST/GMT), Mentors in India (IST - Asia/Kolkata)
 * 4. Automatic Daylight Savings Time (DST) handling using canonical UTC storage and IANA timezones
 * 5. Mentors have at most 2 demo classes per calendar day (computed in mentor's local IST time)
 * 6. Dummy live class link generated for each booking
 * 7. Simulated email dispatch to both parent (local time) and mentor (IST time)
 * 8. Comprehensive error states when slots are full or daily capacity is exhausted
 */

import { dispatchEmail, buildEmailHtml, generateGmailWebComposeUrl } from './mailer';

export interface Mentor {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  timeZone: string; // 'Asia/Kolkata'
  avatar: string;
  qualifications: string;
}

export interface Booking {
  id: string;
  parentName: string;
  parentEmail: string;
  phone: string;
  course: string;
  grade: string;
  parentTimeZone: string;
  slotLocalTime: string; // e.g. "10:00 AM - 11:00 AM"
  dateLocal: string; // "YYYY-MM-DD"
  startTimeUtc: string; // ISO 8601 UTC string
  endTimeUtc: string; // ISO 8601 UTC string
  mentorId: string;
  mentorName: string;
  mentorEmail: string; // 'moyemoye.00143@gmail.com'
  mentorAvatar?: string;
  mentorQualifications?: string;
  mentorDateLocal: string; // YYYY-MM-DD in Asia/Kolkata
  mentorTimeLocal: string; // e.g. "7:30 PM - 8:30 PM IST"
  liveClassLink: string;
  createdAt: string;
  emailsSent: {
    bothGmailComposeUrl: string;
    parentEmail: {
      to: string;
      subject: string;
      scheduledLocalTime: string;
      body: string;
      html: string;
      gmailComposeUrl: string;
      status: { sent: boolean; method: string; error?: string };
    };
    mentorEmail: {
      to: string; // 'moyemoye.00143@gmail.com'
      subject: string;
      scheduledMentorTime: string;
      body: string;
      html: string;
      gmailComposeUrl: string;
      status: { sent: boolean; method: string; error?: string };
    };
  };
}

export interface TimeSlotAvailability {
  slot: string; // e.g. "10:00 AM - 11:00 AM"
  startTime: string; // "10:00 AM"
  startTimeUtc: string;
  endTimeUtc: string;
  mentorTimeLocal: string; // e.g. "7:30 PM IST"
  isAvailable: boolean;
  availableMentorsCount: number;
  reason?: string;
}

// 1. Initial 10 Mentors in India (Asia/Kolkata)
// All assigned demo classes route to default mentor Gmail: moyemoye.00143@gmail.com
export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Viji Anup',
    email: 'moyemoye.00143@gmail.com',
    subjects: ['Coding (Ages 5-16)', 'Robotics (Ages 8-15)'],
    timeZone: 'Asia/Kolkata',
    avatar: '/images/co_mentor_1.png',
    qualifications: 'M.S. Computer Science • 7,000+ hrs taught',
  },
  {
    id: 'mentor-2',
    name: 'Shraddha Shukla',
    email: 'moyemoye.00143@gmail.com',
    subjects: ['Coding (Ages 5-16)', 'Financial Literacy (Ages 9-16)'],
    timeZone: 'Asia/Kolkata',
    avatar: '/images/co_mentor_2.png',
    qualifications: 'M.S. Computer Science • 7,000+ hrs taught',
  },
  {
    id: 'mentor-3',
    name: 'Tarun Mengi',
    email: 'moyemoye.00143@gmail.com',
    subjects: ['Math (Ages 5-18)', 'Financial Literacy (Ages 9-16)'],
    timeZone: 'Asia/Kolkata',
    avatar: '/images/math_mentor_01.png',
    qualifications: 'M.Sc. Mathematics • 5,000+ hrs taught',
  },
  {
    id: 'mentor-4',
    name: 'Vaibhavi Parab',
    email: 'moyemoye.00143@gmail.com',
    subjects: ['Math (Ages 5-18)', 'Coding (Ages 5-16)'],
    timeZone: 'Asia/Kolkata',
    avatar: '/images/math_mentor_02.png',
    qualifications: 'B.E. Computer Science • 5,000+ hrs taught',
  },
  {
    id: 'mentor-5',
    name: 'Sana Javed',
    email: 'moyemoye.00143@gmail.com',
    subjects: ['English (Ages 5-13)'],
    timeZone: 'Asia/Kolkata',
    avatar: '/images/eng_mentor_01.png',
    qualifications: 'M.A. English Literature • 6,000+ hrs taught',
  },
  {
    id: 'mentor-6',
    name: 'Lavanya Baid',
    email: 'moyemoye.00143@gmail.com',
    subjects: ['Science (Ages 5-12)', 'Robotics (Ages 8-15)'],
    timeZone: 'Asia/Kolkata',
    avatar: '/images/sc_mentor_1.png',
    qualifications: 'Graduate STEM Educator • 1,200+ hrs taught',
  },
  {
    id: 'mentor-7',
    name: 'Suyash Shukla',
    email: 'moyemoye.00143@gmail.com',
    subjects: ['Coding (Ages 5-16)', 'Science (Ages 5-12)'],
    timeZone: 'Asia/Kolkata',
    avatar: '/images/co_mentor_3.png',
    qualifications: 'M.S. Software Engineering • 7,000+ hrs taught',
  },
  {
    id: 'mentor-8',
    name: 'Swapnil Deshmukh',
    email: 'moyemoye.00143@gmail.com',
    subjects: ['Science (Ages 5-12)', 'Robotics (Ages 8-15)'],
    timeZone: 'Asia/Kolkata',
    avatar: '/images/sc_mentor_4.png',
    qualifications: 'B.E. Mechanical & Robotics • 2,100+ hrs taught',
  },
  {
    id: 'mentor-9',
    name: 'Ananya Sharma',
    email: 'moyemoye.00143@gmail.com',
    subjects: ['Math (Ages 5-18)', 'English (Ages 5-13)'],
    timeZone: 'Asia/Kolkata',
    avatar: '/images/math_mentor_01.png',
    qualifications: 'M.Sc. Applied Statistics • 3,500+ hrs taught',
  },
  {
    id: 'mentor-10',
    name: 'Rajesh Nair',
    email: 'moyemoye.00143@gmail.com',
    subjects: ['Coding (Ages 5-16)', 'English (Ages 5-13)', 'Financial Literacy (Ages 9-16)'],
    timeZone: 'Asia/Kolkata',
    avatar: '/images/co_mentor_1.png',
    qualifications: 'B.Tech IT • 4,200+ hrs taught',
  },
];

// Standard slots offered to parents in their local time
export const STANDARD_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:30 AM - 11:30 AM',
  '01:00 PM - 02:00 PM',
  '02:30 PM - 03:30 PM',
  '04:00 PM - 05:00 PM',
  '05:30 PM - 06:30 PM',
  '07:00 PM - 08:00 PM',
  '08:30 PM - 09:30 PM',
];

// 2. Global in-memory persistent store for Node.js runtime
declare global {
  var __codeyoungBookings: Booking[] | undefined;
}

if (!global.__codeyoungBookings) {
  global.__codeyoungBookings = [];
}

export function getAllBookings(): Booking[] {
  return global.__codeyoungBookings || [];
}

export function clearBookings(): void {
  global.__codeyoungBookings = [];
}

// 3. Timezone & DST Calculation Utilities
export function getUtcFromLocal(dateStr: string, timeStr: string, timeZone: string): Date {
  let hours = 0;
  let minutes = 0;
  if (timeStr.includes('AM') || timeStr.includes('PM')) {
    const [t, mod] = timeStr.trim().split(/\s+/);
    const [h, m] = t.split(':').map(Number);
    hours = h;
    minutes = m;
    if (mod === 'PM' && hours < 12) hours += 12;
    if (mod === 'AM' && hours === 12) hours = 0;
  } else {
    const [h, m] = timeStr.trim().split(':').map(Number);
    hours = h;
    minutes = m;
  }

  const pad = (n: number) => String(n).padStart(2, '0');
  const targetIso = `${dateStr}T${pad(hours)}:${pad(minutes)}:00`;
  let d = new Date(targetIso + 'Z');

  // Iterative projection to converge on exact UTC considering DST
  for (let i = 0; i < 4; i++) {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const parts = formatter.formatToParts(d);
    const p: Record<string, string> = {};
    parts.forEach(({ type, value }) => {
      p[type] = value;
    });
    const formattedHour = Number(p.hour) === 24 ? 0 : Number(p.hour);
    const localFormatted = `${p.year}-${p.month}-${p.day}T${pad(formattedHour)}:${p.minute}:00Z`;
    const diff = new Date(localFormatted).getTime() - new Date(targetIso + 'Z').getTime();
    if (diff === 0) break;
    d = new Date(d.getTime() - diff);
  }
  return d;
}

export function formatInTimeZone(
  date: Date,
  timeZone: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOpts: Intl.DateTimeFormatOptions = {
    timeZone,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
    ...options,
  };
  return new Intl.DateTimeFormat('en-US', defaultOpts).format(date);
}

export function getDateStringInTz(date: Date, timeZone: string): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(date);
  const p: Record<string, string> = {};
  parts.forEach(({ type, value }) => {
    p[type] = value;
  });
  return `${p.year}-${p.month}-${p.day}`;
}

export function getTimeZoneAbbr(date: Date, timeZone: string): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'short',
  });
  const parts = formatter.formatToParts(date);
  const tzPart = parts.find((p) => p.type === 'timeZoneName');
  return tzPart ? tzPart.value : timeZone;
}

// 4. Mentor Daily Capacity Checker
// Enforces: Mentors have at most 2 demo classes a day (computed in Asia/Kolkata date)
export function getMentorBookingsCountOnDate(mentorId: string, mentorDateIST: string): number {
  const bookings = getAllBookings();
  return bookings.filter(
    (b) => b.mentorId === mentorId && b.mentorDateLocal === mentorDateIST
  ).length;
}

// Check if mentor is busy at exact time slot
export function isMentorBusyAtTime(mentorId: string, startUtc: Date, endUtc: Date): boolean {
  const bookings = getAllBookings();
  return bookings.some((b) => {
    if (b.mentorId !== mentorId) return false;
    const bStart = new Date(b.startTimeUtc).getTime();
    const bEnd = new Date(b.endTimeUtc).getTime();
    const qStart = startUtc.getTime();
    const qEnd = endUtc.getTime();
    // Overlap condition
    return qStart < bEnd && qEnd > bStart;
  });
}

// 5. Mentor Assignment Algorithm
export function findAvailableMentor(
  startUtc: Date,
  endUtc: Date,
  course: string
): { mentor: Mentor | null; reason?: string } {
  // 1. Get mentor's date in IST
  const mentorDateIST = getDateStringInTz(startUtc, 'Asia/Kolkata');

  // 2. Filter mentors who teach the course (or all if general)
  const qualifiedMentors = INITIAL_MENTORS.filter(
    (m) => m.subjects.length === 0 || m.subjects.some((s) => s.toLowerCase().includes(course.toLowerCase().split(' ')[0]))
  );

  const pool = qualifiedMentors.length > 0 ? qualifiedMentors : INITIAL_MENTORS;

  // 3. Filter mentors who:
  // a) Have strictly < 2 bookings on this IST date
  // b) Are not already booked during this exact time slot
  const eligibleMentors: { mentor: Mentor; bookingsToday: number }[] = [];

  for (const mentor of pool) {
    const bookingsCount = getMentorBookingsCountOnDate(mentor.id, mentorDateIST);
    if (bookingsCount >= 2) {
      continue; // Exceeded daily limit of 2 demo classes
    }
    if (isMentorBusyAtTime(mentor.id, startUtc, endUtc)) {
      continue; // Collision on this time slot
    }
    eligibleMentors.push({ mentor, bookingsToday: bookingsCount });
  }

  if (eligibleMentors.length === 0) {
    // Check if total daily capacity for the fleet is exhausted
    const totalBookingsToday = getAllBookings().filter(
      (b) => b.mentorDateLocal === mentorDateIST
    ).length;

    if (totalBookingsToday >= 20) {
      return {
        mentor: null,
        reason: 'Daily trial capacity (20/20 classes) has been reached across our entire mentor fleet for this date.',
      };
    }

    return {
      mentor: null,
      reason: 'No mentors are available for this specific time slot. Mentors are either booked or reached their daily limit of 2 classes.',
    };
  }

  // 4. Load balance: Pick mentor with fewest bookings on this IST date (fair distribution)
  eligibleMentors.sort((a, b) => a.bookingsToday - b.bookingsToday);

  return { mentor: eligibleMentors[0].mentor };
}

// 6. Slots Availability Query
export function getSlotsAvailability(
  dateLocal: string,
  parentTimeZone: string,
  course: string
): TimeSlotAvailability[] {
  return STANDARD_SLOTS.map((slot) => {
    const [startStr] = slot.split(' - ');
    const startUtc = getUtcFromLocal(dateLocal, startStr, parentTimeZone);
    const endUtc = new Date(startUtc.getTime() + 60 * 60 * 1000); // 1 hour duration

    const mentorDateIST = getDateStringInTz(startUtc, 'Asia/Kolkata');
    const mentorTimeLocal = formatInTimeZone(startUtc, 'Asia/Kolkata', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    });

    // Count how many mentors are available for this slot
    let availableCount = 0;
    for (const mentor of INITIAL_MENTORS) {
      const count = getMentorBookingsCountOnDate(mentor.id, mentorDateIST);
      if (count < 2 && !isMentorBusyAtTime(mentor.id, startUtc, endUtc)) {
        availableCount++;
      }
    }

    return {
      slot,
      startTime: startStr,
      startTimeUtc: startUtc.toISOString(),
      endTimeUtc: endUtc.toISOString(),
      mentorTimeLocal,
      isAvailable: availableCount > 0,
      availableMentorsCount: availableCount,
      reason: availableCount === 0 ? 'Fully booked (max 2 classes/mentor reached)' : undefined,
    };
  });
}

// 7. Booking Creation & Real/Simulated Dual Gmail Dispatch
export async function createBooking(data: {
  parentName: string;
  parentEmail: string;
  phone: string;
  course: string;
  grade: string;
  dateLocal: string;
  slotLocal: string;
  parentTimeZone: string;
}): Promise<{ success: boolean; booking?: Booking; error?: string }> {
  const [startStr] = data.slotLocal.split(' - ');
  const startUtc = getUtcFromLocal(data.dateLocal, startStr, data.parentTimeZone);
  const endUtc = new Date(startUtc.getTime() + 60 * 60 * 1000);

  // Check mentor availability
  const { mentor, reason } = findAvailableMentor(startUtc, endUtc, data.course);
  if (!mentor) {
    return {
      success: false,
      error: reason || 'Sorry, no mentor is available for the selected time slot.',
    };
  }

  const bookingId = `CY-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const liveClassLink = `${baseUrl}/classroom/demo-${bookingId}`;

  const mentorDateLocal = getDateStringInTz(startUtc, 'Asia/Kolkata');
  const mentorTimeLocal = formatInTimeZone(startUtc, 'Asia/Kolkata', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });

  const parentScheduledLocal = formatInTimeZone(startUtc, data.parentTimeZone, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });

  const mentorClassCount = getMentorBookingsCountOnDate(mentor.id, mentorDateLocal) + 1;

  // Plain Text & HTML Email for Parent / Client
  const parentEmailSubject = `Confirmed: 1:1 ${data.course} Trial Class for ${data.parentName} - Codeyoung`;
  const parentEmailBody = `Hello ${data.parentName},

Your child's 1:1 ${data.course} trial class has been confirmed!

📅 Date & Time: ${parentScheduledLocal} (your local time)
👨‍🏫 Mentor Assigned: ${mentor.name} (${mentor.qualifications})
📧 Mentor Contact: ${mentor.email}
🔗 Live Demo Classroom Link: ${liveClassLink}

Please join the link 5 minutes prior on a laptop/desktop with Google Chrome. Your mentor is ready to welcome your child!`;

  const parentEmailHtml = buildEmailHtml({
    recipientType: 'parent',
    recipientName: data.parentName,
    course: data.course,
    grade: data.grade,
    scheduledTime: parentScheduledLocal,
    timeZoneLabel: data.parentTimeZone,
    liveClassLink,
    otherPartyName: mentor.name,
    otherPartyEmail: mentor.email,
  });

  const parentGmailComposeUrl = generateGmailWebComposeUrl(
    data.parentEmail,
    parentEmailSubject,
    parentEmailBody
  );

  // Plain Text & HTML Email for Mentor (All 10 mentors default to moyemoye.00143@gmail.com)
  const mentorEmailSubject = `New Demo Class Scheduled: ${data.course} with ${data.parentName}`;
  const mentorEmailBody = `Hi ${mentor.name},

You have been assigned a new 1:1 demo class.

📅 Scheduled Time (IST): ${mentorTimeLocal}
👤 Student/Parent: ${data.parentName} (${data.grade})
📱 Parent Mobile: ${data.phone}
📧 Parent Email: ${data.parentEmail}
📚 Subject Track: ${data.course}
🔗 Classroom Link: ${liveClassLink}

Note: This is class ${mentorClassCount} of 2 for your daily demo allocation.`;

  const mentorEmailHtml = buildEmailHtml({
    recipientType: 'mentor',
    recipientName: mentor.name,
    course: data.course,
    grade: data.grade,
    scheduledTime: mentorTimeLocal,
    timeZoneLabel: 'IST (Asia/Kolkata)',
    liveClassLink,
    otherPartyName: data.parentName,
    otherPartyEmail: data.parentEmail,
    notes: `Class ${mentorClassCount} of 2 (Daily Quota Active)`,
  });

  const mentorGmailComposeUrl = generateGmailWebComposeUrl(
    mentor.email, // moyemoye.00143@gmail.com
    mentorEmailSubject,
    mentorEmailBody
  );

  // Combined 1-click URL: TO client, CC mentor (moyemoye.00143@gmail.com)
  const bothGmailComposeUrl = generateGmailWebComposeUrl(
    data.parentEmail,
    parentEmailSubject,
    parentEmailBody,
    mentor.email
  );

  // Real or simulated dispatch via Gmail
  const [parentDispatch, mentorDispatch] = await Promise.all([
    dispatchEmail({
      to: data.parentEmail,
      subject: parentEmailSubject,
      body: parentEmailBody,
      html: parentEmailHtml,
    }),
    dispatchEmail({
      to: mentor.email,
      subject: mentorEmailSubject,
      body: mentorEmailBody,
      html: mentorEmailHtml,
    }),
  ]);

  const newBooking: Booking = {
    id: bookingId,
    parentName: data.parentName,
    parentEmail: data.parentEmail,
    phone: data.phone,
    course: data.course,
    grade: data.grade,
    parentTimeZone: data.parentTimeZone,
    slotLocalTime: data.slotLocal,
    dateLocal: data.dateLocal,
    startTimeUtc: startUtc.toISOString(),
    endTimeUtc: endUtc.toISOString(),
    mentorId: mentor.id,
    mentorName: mentor.name,
    mentorEmail: mentor.email, // moyemoye.00143@gmail.com
    mentorAvatar: mentor.avatar,
    mentorQualifications: mentor.qualifications,
    mentorDateLocal,
    mentorTimeLocal,
    liveClassLink,
    createdAt: new Date().toISOString(),
    emailsSent: {
      bothGmailComposeUrl,
      parentEmail: {
        to: data.parentEmail,
        subject: parentEmailSubject,
        scheduledLocalTime: parentScheduledLocal,
        body: parentEmailBody,
        html: parentEmailHtml,
        gmailComposeUrl: parentGmailComposeUrl,
        status: {
          sent: parentDispatch.sent,
          method: parentDispatch.method,
          error: parentDispatch.error,
        },
      },
      mentorEmail: {
        to: mentor.email, // moyemoye.00143@gmail.com
        subject: mentorEmailSubject,
        scheduledMentorTime: mentorTimeLocal,
        body: mentorEmailBody,
        html: mentorEmailHtml,
        gmailComposeUrl: mentorGmailComposeUrl,
        status: {
          sent: mentorDispatch.sent,
          method: mentorDispatch.method,
          error: mentorDispatch.error,
        },
      },
    },
  };

  // Save to in-memory store
  if (!global.__codeyoungBookings) {
    global.__codeyoungBookings = [];
  }
  global.__codeyoungBookings.push(newBooking);

  return {
    success: true,
    booking: newBooking,
  };
}
