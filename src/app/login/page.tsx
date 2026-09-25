'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Lock,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  Copy,
  RefreshCw,
  Trash2,
  Search,
  Users,
  Award,
  AlertCircle,
  LogOut,
  Mail,
  UserCheck,
  Check,
  Filter,
} from 'lucide-react';
import type { Booking, Mentor } from '@/lib/bookingEngine';

export default function LoginPage() {
  const [role, setRole] = useState<'student' | 'parent' | 'mentor'>('student');
  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [studentLoggedIn, setStudentLoggedIn] = useState(false);

  // Mentor / Admin auth state
  const [mentorUser, setMentorUser] = useState('admin');
  const [mentorPass, setMentorPass] = useState('admin');
  const [mentorAuthError, setMentorAuthError] = useState<string | null>(null);
  const [isMentorLoggedIn, setIsMentorLoggedIn] = useState(false);

  // Mentor dashboard data
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [fleetData, setFleetData] = useState<{
    totalMentors: number;
    totalClassesToday: number;
    maxFleetCapacity: number;
    remainingFleetCapacity: number;
    mentors: (Mentor & {
      bookingsToday: number;
      totalAssignedAllDates?: number;
      isAvailableToday: boolean;
      assignedBookings?: any[];
    })[];
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'trials' | 'fleet'>('trials');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fleetDateFilter, setFleetDateFilter] = useState<string>('all');

  // Fetch bookings & mentors when mentor is logged in + auto-refresh every 5s
  useEffect(() => {
    if (isMentorLoggedIn) {
      loadBookings();
      loadFleet();

      const timer = setInterval(() => {
        loadBookings();
        loadFleet();
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isMentorLoggedIn]);

  const loadBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const loadFleet = async () => {
    try {
      const res = await fetch('/api/mentors');
      const data = await res.json();
      if (data.success) {
        setFleetData(data);
      }
    } catch (err) {
      console.error('Failed to load fleet:', err);
    }
  };

  const handleResetBookings = async () => {
    if (!confirm('Are you sure you want to clear all booked demo trials? All 10 mentors will reset to 0/2 classes.')) return;
    try {
      await fetch('/api/bookings', { method: 'DELETE' });
      await loadBookings();
      await loadFleet();
    } catch (err) {
      console.error('Failed to clear bookings:', err);
    }
  };

  const handleCopyClassroomLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentLoggedIn(true);
  };

  const handleMentorLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMentorAuthError(null);

    // Validate default admin credentials
    if (
      (mentorUser.trim().toLowerCase() === 'admin' && mentorPass.trim() === 'admin') ||
      (mentorUser.trim().toLowerCase() === 'mentor' && mentorPass.trim() === 'admin') ||
      (mentorUser.trim().toLowerCase() === 'moyemoye' && mentorPass.trim() === 'admin')
    ) {
      setIsMentorLoggedIn(true);
    } else {
      setMentorAuthError('Invalid credentials. Default mentor login: admin / admin');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.parentName.toLowerCase().includes(q) ||
      b.parentEmail.toLowerCase().includes(q) ||
      b.course.toLowerCase().includes(q) ||
      b.mentorName.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q)
    );
  });

  // Extract all unique dates where classes are scheduled
  const activeDates = Array.from(new Set(bookings.map((b) => b.mentorDateLocal))).sort();

  // Compute live assigned mentor metrics
  const distinctMentorsBooked = new Set(bookings.map((b) => b.mentorId)).size;
  const mentorsList = fleetData?.mentors || [];

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-slate-900 font-sans flex flex-col justify-between selection:bg-amber-200">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 py-4 px-4 sm:px-8 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="relative block w-36 sm:w-44 h-10">
            <Image
              src="/images/primary_logo.png"
              alt="Codeyoung"
              fill
              priority
              className="object-contain"
            />
          </Link>

          <div className="flex items-center gap-3">
            {isMentorLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700 bg-amber-100/80 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Mentor: Lead Admin (IST)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsMentorLoggedIn(false)}
                  className="px-3.5 py-1.5 rounded-full font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <>
                <span className="text-xs text-slate-500 hidden sm:inline">New to Codeyoung?</span>
                <Link
                  href="/book-a-demo"
                  className="px-4 py-2 rounded-full font-bold text-xs bg-[#FFB800] text-slate-950 hover:bg-[#F59E0B] shadow-sm transition-all"
                >
                  Book Free Trial
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* MENTOR / ADMIN PORTAL DASHBOARD (When logged in as Mentor) */}
          {isMentorLoggedIn ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Dashboard Hero Banner */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-0.5 rounded-full">
                      Mentor Portal
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Default Email: moyemoye.00143@gmail.com
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    Booked Free Trials &amp; Class Schedules
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                    Live overview of student appointments and mentor fleet allocation. When parents book, mentors and daily quotas update dynamically in real time.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      loadBookings();
                      loadFleet();
                    }}
                    disabled={loadingBookings}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingBookings ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                  <Link
                    href="/book-a-demo"
                    target="_blank"
                    className="px-4 py-2.5 rounded-xl bg-[#FFB800] hover:bg-[#F59E0B] text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>+ Book New Trial</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </Link>
                  <button
                    type="button"
                    onClick={handleResetBookings}
                    className="px-3.5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset Bookings</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Capacity & Quota Summary Cards (Updated live upon assignment) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                    Total Booked Trials
                  </span>
                  <span className="text-2xl font-black text-slate-900 block">
                    {bookings.length}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
                    {bookings.length > 0 ? '✓ Live appointments active' : 'No active sessions'}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                    Mentor Fleet Size
                  </span>
                  <span className="text-2xl font-black text-slate-900 block">
                    10 Mentors
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">
                    Max 2 demo classes/day each
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                    Active Mentors
                  </span>
                  <span className="text-2xl font-black text-amber-700 block">
                    {distinctMentorsBooked} / 10
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">
                    {distinctMentorsBooked} assigned with students
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                    Daily Fleet Capacity
                  </span>
                  <span className="text-2xl font-black text-emerald-700 block">
                    {Math.max(0, 20 - bookings.length)} / 20
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
                    Slots remaining today
                  </span>
                </div>
              </div>

              {/* View Switcher Tabs & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex rounded-2xl bg-slate-200/70 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('trials')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'trials'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📅 Booked Free Trials ({filteredBookings.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('fleet');
                      loadFleet();
                      loadBookings();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'fleet'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>👨‍🏫 10-Mentor Fleet &amp; Live Load</span>
                    {bookings.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                  </button>
                </div>

                {activeTab === 'trials' && (
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search student, course, mentor..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                )}
              </div>

              {/* TAB 1: Booked Free Trials & Schedules */}
              {activeTab === 'trials' && (
                <div className="space-y-4">
                  {filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
                      <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                        <Calendar className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-900">
                          No Booked Trials Found
                        </h3>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">
                          {searchQuery
                            ? `No bookings matching "${searchQuery}".`
                            : 'There are currently no free trial bookings scheduled.'}
                        </p>
                      </div>
                      <Link
                        href="/book-a-demo"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs bg-[#FFB800] text-slate-950 hover:bg-[#F59E0B] shadow-xs transition-all"
                      >
                        <span>Book a Trial Session</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredBookings.map((b) => (
                        <div
                          key={b.id}
                          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-amber-400/80 transition-all space-y-4"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-black text-slate-900">
                                Ref #{b.id}
                              </span>
                              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                                {b.course}
                              </span>
                              <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                                {b.grade}
                              </span>
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                <span>SMTP Delivered</span>
                              </span>
                            </div>

                            {/* Action Buttons for Mentor */}
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleCopyClassroomLink(b.id, b.liveClassLink)}
                                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                {copiedId === b.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-emerald-700">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Copy Link</span>
                                  </>
                                )}
                              </button>
                              <a
                                href={b.liveClassLink}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                              >
                                <Video className="w-3.5 h-3.5" />
                                <span>Launch Classroom (Mentor)</span>
                                <ExternalLink className="w-3 h-3 opacity-80" />
                              </a>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            {/* Student / Parent Details */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                Student &amp; Parent
                              </span>
                              <div className="font-black text-slate-900 text-sm">
                                {b.parentName}
                              </div>
                              <div className="text-slate-600 flex items-center gap-1">
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span>{b.parentEmail}</span>
                              </div>
                              <div className="text-slate-600">
                                📞 {b.phone}
                              </div>
                            </div>

                            {/* Time Synchronized (Parent local & Mentor IST) */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                Schedule (Dual Timezone)
                              </span>
                              <div className="text-slate-900 font-bold">
                                📅 {b.emailsSent.parentEmail.scheduledLocalTime}
                              </div>
                              <div className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                                🇮🇳 IST: {b.mentorTimeLocal}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                Parent Timezone: {b.parentTimeZone}
                              </div>
                            </div>

                            {/* Assigned Mentor */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                Assigned Mentor
                              </span>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <Award className="w-3.5 h-3.5 text-amber-600" />
                                <span>{b.mentorName}</span>
                              </div>
                              <div className="text-slate-500 text-[11px]">
                                {b.mentorQualifications}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                Notification sent to: <strong>{b.mentorEmail}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: 10-Mentor Fleet & Dynamic Load (Updates immediately after assigning!) */}
              {activeTab === 'fleet' && (
                <div className="space-y-5">
                  {/* Fleet Date Filter & Status Banner */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-amber-600" />
                        <span className="font-black text-sm text-slate-900">
                          10-Mentor Dynamic Fleet Load
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Quota rule: at most <strong>2 demo classes/day per mentor</strong>. Mentors automatically update upon booking!
                      </p>
                    </div>

                    {/* Date Filter selector */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Filter className="w-3 h-3" />
                        <span>Filter:</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setFleetDateFilter('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          fleetDateFilter === 'all'
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        All Dates ({bookings.length} assigned)
                      </button>
                      {activeDates.map((dateStr) => {
                        const countForDate = bookings.filter((b) => b.mentorDateLocal === dateStr).length;
                        return (
                          <button
                            type="button"
                            key={dateStr}
                            onClick={() => setFleetDateFilter(dateStr)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              fleetDateFilter === dateStr
                                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            📅 {dateStr} ({countForDate})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 10 Mentors Grid with Live Dynamic Load */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mentorsList.map((m) => {
                      // Live calculation from bookings state!
                      const allAssigned = bookings.filter((b) => b.mentorId === m.id);
                      const filteredAssigned =
                        fleetDateFilter === 'all'
                          ? allAssigned
                          : allAssigned.filter((b) => b.mentorDateLocal === fleetDateFilter);
                      const currentCount = filteredAssigned.length;

                      return (
                        <div
                          key={m.id}
                          className={`bg-white p-5 rounded-2xl border transition-all shadow-xs ${
                            currentCount > 0
                              ? 'border-amber-400/90 ring-1 ring-amber-400/30 shadow-sm'
                              : 'border-slate-200/90'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3.5">
                              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 relative overflow-hidden flex-shrink-0">
                                <Image
                                  src={m.avatar || '/images/math_mentor_01.png'}
                                  alt={m.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-sm font-black text-slate-900 block">
                                  {m.name}
                                </span>
                                <span className="text-[11px] text-slate-500 block truncate max-w-[200px]">
                                  {m.qualifications.split('•')[0]}
                                </span>
                                <span className="text-[10px] text-amber-800 font-semibold block">
                                  {m.subjects.join(', ')}
                                </span>
                                <span className="text-[10px] text-slate-400 block">
                                  Email: {m.email}
                                </span>
                              </div>
                            </div>

                            {/* Live Dynamic Quota Badge */}
                            <div className="text-right flex flex-col items-end">
                              <span
                                className={`text-xs font-black px-2.5 py-1 rounded-full inline-block ${
                                  currentCount >= 2
                                    ? 'bg-red-100 text-red-800'
                                    : currentCount === 1
                                    ? 'bg-amber-100 text-amber-900 font-extrabold'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {currentCount} / 2 classes
                              </span>
                              <span className="text-[10px] text-slate-500 mt-1 block">
                                {currentCount >= 2
                                  ? '🔴 Daily Quota Met'
                                  : currentCount === 1
                                  ? '🟡 1 Class Booked'
                                  : '🟢 Available'}
                              </span>
                            </div>
                          </div>

                          {/* Real-time Assigned Student Trial Classes (Updates immediately upon assignment) */}
                          {filteredAssigned.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                                Assigned Trial Sessions ({filteredAssigned.length}):
                              </span>
                              {filteredAssigned.map((b) => (
                                <div
                                  key={b.id}
                                  className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/80 flex items-center justify-between gap-2"
                                >
                                  <div className="text-xs">
                                    <span className="font-extrabold text-slate-900 block">
                                      👤 {b.parentName} ({b.grade})
                                    </span>
                                    <span className="text-[11px] text-amber-900 block">
                                      {b.course} • 📅 {b.mentorDateLocal} ({b.mentorTimeLocal})
                                    </span>
                                  </div>

                                  <a
                                    href={b.liveClassLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-1 transition-colors flex-shrink-0"
                                  >
                                    <Video className="w-3 h-3" />
                                    <span>Classroom</span>
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* STANDARD LOGIN FORM (Student / Parent / Mentor) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Portal Perks & Illustration */}
              <div className="lg:col-span-6 space-y-8 font-satoshi">
                <div>
                  <h1 className="heading-slate text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight leading-tight pb-2 font-satoshi">
                    Welcome to the Codeyoung Learning Portal
                  </h1>
                  <p className="mt-3 text-base sm:text-lg text-[#2F4F4F] leading-relaxed font-satoshi">
                    Join your 1:1 live classroom, view trial class schedules, and track detailed progress milestones all in one place.
                  </p>
                </div>

                {/* Portal Features */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Live 1:1 Classroom
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Launch your interactive session with your dedicated mentor at your scheduled slot.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Class Schedules &amp; Free Trials
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        View upcoming classes, demo allocations, or reschedule with 1-click ease.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Student Progress &amp; Evaluation
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        In-depth concept mastery analytics and personalized mentor recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Sign In Card */}
              <div className="lg:col-span-6">
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl max-w-md mx-auto">
                  {studentLoggedIn ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Welcome back!
                      </h2>
                      <p className="text-sm text-slate-600">
                        Redirecting you to your active student dashboard...
                      </p>
                      <a
                        href="https://studentportal.codeyoung.com/#/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                      >
                        <span>Continue to Classroom</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ) : (
                    <div>
                      {/* Role Selector Tabs (Student / Parent / Mentor) */}
                      <div className="flex rounded-2xl bg-slate-100 p-1 mb-6">
                        <button
                          type="button"
                          onClick={() => setRole('student')}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                            role === 'student'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Student
                        </button>
                        <button
                          type="button"
                          onClick={() => setRole('parent')}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                            role === 'parent'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Parent
                        </button>
                        <button
                          type="button"
                          onClick={() => setRole('mentor')}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                            role === 'mentor'
                              ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          👨‍🏫 Mentor / Admin
                        </button>
                      </div>

                      {/* MENTOR / ADMIN LOGIN VIEW */}
                      {role === 'mentor' ? (
                        <div>
                          <div className="mb-5">
                            <div className="flex items-center justify-between">
                              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                                Mentor &amp; Admin Login
                              </h2>
                              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                                Trial Schedules Hub
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              View all booked free trials, schedules, and mentor fleet loads.
                            </p>
                          </div>

                          {/* Quick Default Notice */}
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 mb-4 flex items-start gap-2">
                            <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                            <div>
                              <span>Default Mentor Credentials:</span>
                              <div className="font-mono font-bold text-slate-900 mt-0.5">
                                Username: <strong>admin</strong> • Password: <strong>admin</strong>
                              </div>
                            </div>
                          </div>

                          {mentorAuthError && (
                            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 mb-4 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                              <span>{mentorAuthError}</span>
                            </div>
                          )}

                          <form onSubmit={handleMentorLoginSubmit} className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Username
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  required
                                  value={mentorUser}
                                  onChange={(e) => setMentorUser(e.target.value)}
                                  placeholder="admin"
                                  className="w-full pl-4 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                                />
                                <UserCheck className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Password
                              </label>
                              <div className="relative">
                                <input
                                  type="password"
                                  required
                                  value={mentorPass}
                                  onChange={(e) => setMentorPass(e.target.value)}
                                  placeholder="admin"
                                  className="w-full pl-4 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                                />
                                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="w-full py-4 rounded-full font-black text-sm sm:text-base bg-[#FFB800] hover:bg-[#F59E0B] text-slate-950 shadow-md hover:shadow-pill-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
                            >
                              <span>Enter Mentor Dashboard</span>
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          </form>
                        </div>
                      ) : (
                        /* STUDENT & PARENT LOGIN VIEW */
                        <div>
                          <div className="mb-6">
                            <h2 className="text-2xl font-black text-slate-900">
                              Sign in
                            </h2>
                            <p className="text-xs text-slate-500 mt-1">
                              Enter your registered phone number or email ID
                            </p>
                          </div>

                          {/* Auth Method Selector */}
                          <div className="flex gap-4 text-xs font-semibold mb-4 text-slate-500">
                            <button
                              type="button"
                              onClick={() => {
                                setAuthMethod('otp');
                                setOtpSent(false);
                              }}
                              className={`pb-1 border-b-2 transition-all cursor-pointer ${
                                authMethod === 'otp'
                                  ? 'border-amber-500 text-slate-900 font-bold'
                                  : 'border-transparent hover:text-slate-700'
                              }`}
                            >
                              Login with OTP
                            </button>
                            <button
                              type="button"
                              onClick={() => setAuthMethod('password')}
                              className={`pb-1 border-b-2 transition-all cursor-pointer ${
                                authMethod === 'password'
                                  ? 'border-amber-500 text-slate-900 font-bold'
                                  : 'border-transparent hover:text-slate-700'
                              }`}
                            >
                              Login with Password
                            </button>
                          </div>

                          {/* Form */}
                          <form onSubmit={handleStudentLogin} className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Phone Number or Email ID
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g. +91 98765 43210 or parent@gmail.com"
                                  value={identifier}
                                  onChange={(e) => setIdentifier(e.target.value)}
                                  className="w-full pl-4 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                                />
                                <Smartphone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                              </div>
                            </div>

                            {/* Password field if password mode */}
                            {authMethod === 'password' && (
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                  Password
                                </label>
                                <div className="relative">
                                  <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-4 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                                  />
                                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                                </div>
                              </div>
                            )}

                            {/* Submit Button */}
                            <button
                              type="submit"
                              className="w-full py-4 rounded-full font-black text-sm sm:text-base bg-[#FFB800] hover:bg-[#F59E0B] text-slate-950 shadow-md hover:shadow-pill-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                            >
                              <span>Sign In to Learning Portal</span>
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-500 bg-white">
        <p>Copyright &copy; 2024 Smart Owl Education Pvt Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}
