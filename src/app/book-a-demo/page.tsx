'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Award,
  Globe2,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  Copy,
  ExternalLink,
  Mail,
  AlertCircle,
  RefreshCw,
  Video,
  Phone,
  Sparkles,
  User,
  GraduationCap,
} from 'lucide-react';
import { TimeSlotAvailability, Booking } from '@/lib/bookingEngine';

interface FormData {
  parentName: string;
  email: string;
  countryCode: string;
  phone: string;
  grade: string;
  course: string;
  agreed: boolean;
  selectedDate: string; // YYYY-MM-DD
  selectedSlot: string; // "09:00 AM - 10:00 AM"
}

const COUNTRY_CODES = [
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸', defaultTz: 'America/New_York' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧', defaultTz: 'Europe/London' },
  { code: '+91', country: 'India', flag: '🇮🇳', defaultTz: 'Asia/Kolkata' },
  { code: '+61', country: 'Australia', flag: '🇦🇺', defaultTz: 'Australia/Sydney' },
  { code: '+971', country: 'UAE', flag: '🇦🇪', defaultTz: 'Asia/Dubai' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', defaultTz: 'Asia/Singapore' },
  { code: '+49', country: 'Germany', flag: '🇩🇪', defaultTz: 'Europe/Berlin' },
  { code: '+33', country: 'France', flag: '🇫🇷', defaultTz: 'Europe/Paris' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾', defaultTz: 'Asia/Kuala_Lumpur' },
];

const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'US Eastern Time (EDT/EST - New York)', region: 'US' },
  { value: 'America/Chicago', label: 'US Central Time (CDT/CST - Chicago)', region: 'US' },
  { value: 'America/Denver', label: 'US Mountain Time (MDT/MST - Denver)', region: 'US' },
  { value: 'America/Los_Angeles', label: 'US Pacific Time (PDT/PST - Los Angeles)', region: 'US' },
  { value: 'Europe/London', label: 'UK Time (BST/GMT - London)', region: 'UK' },
  { value: 'America/Toronto', label: 'Canada Eastern Time (Toronto)', region: 'Canada' },
  { value: 'America/Vancouver', label: 'Canada Pacific Time (Vancouver)', region: 'Canada' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST - Dubai)', region: 'Middle East' },
  { value: 'Asia/Singapore', label: 'Singapore Time (SGT)', region: 'Asia' },
  { value: 'Australia/Sydney', label: 'Australian Eastern (AEST/AEDT - Sydney)', region: 'Australia' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST)', region: 'India' },
];

const COURSES_OPTIONS = [
  'Coding (Ages 5-16)',
  'Math (Ages 5-18)',
  'English (Ages 5-13)',
  'Science (Ages 5-12)',
  'Robotics (Ages 8-15)',
  'Financial Literacy (Ages 9-16)',
];

const GRADES = [
  'Kindergarten',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
];

interface DateOption {
  dateStr: string;
  label: string;
  dayName: string;
  formatted: string;
}

function getUpcomingDates(): DateOption[] {
  const dates: DateOption[] = [];
  const now = new Date();
  for (let i = 0; i < 5; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    let label = '';
    if (i === 0) label = 'Today';
    else if (i === 1) label = 'Tomorrow';
    else {
      label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }

    dates.push({
      dateStr,
      label,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      formatted: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
  }
  return dates;
}

export default function BookADemoPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [dateOptions] = useState<DateOption[]>(getUpcomingDates());
  const [parentTimeZone, setParentTimeZone] = useState<string>('America/New_York');

  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    grade: 'Grade 4',
    course: 'Coding (Ages 5-16)',
    agreed: true,
    selectedDate: dateOptions[1]?.dateStr || dateOptions[0].dateStr, // Default to Tomorrow
    selectedSlot: '09:00 AM - 10:00 AM',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Dynamic slots state
  const [slots, setSlots] = useState<TimeSlotAvailability[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Auto-detect browser timezone on mount
  useEffect(() => {
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTz) {
        setParentTimeZone(userTz);
        if (userTz.includes('London')) {
          setFormData((prev) => ({ ...prev, countryCode: '+44' }));
        } else if (userTz.includes('Kolkata')) {
          setFormData((prev) => ({ ...prev, countryCode: '+91' }));
        }
      }
    } catch {
      // fallback
    }
  }, []);

  // Fetch slots whenever selectedDate, parentTimeZone, or course changes
  useEffect(() => {
    if (step === 2 && formData.selectedDate) {
      fetchSlots(formData.selectedDate, parentTimeZone, formData.course);
    }
  }, [step, formData.selectedDate, parentTimeZone, formData.course]);

  const fetchSlots = async (date: string, tz: string, course: string) => {
    setLoadingSlots(true);
    setBookingError(null);
    try {
      const res = await fetch(
        `/api/slots?date=${encodeURIComponent(date)}&timezone=${encodeURIComponent(
          tz
        )}&course=${encodeURIComponent(course)}`
      );
      const data = await res.json();
      if (data.success && data.slots) {
        setSlots(data.slots);
        const currentSlotObj = data.slots.find((s: TimeSlotAvailability) => s.slot === formData.selectedSlot);
        if (!currentSlotObj || !currentSlotObj.isAvailable) {
          const firstAvailable = data.slots.find((s: TimeSlotAvailability) => s.isAvailable);
          if (firstAvailable) {
            setFormData((prev) => ({ ...prev, selectedSlot: firstAvailable.slot }));
          }
        }
      }
    } catch (err) {
      console.error('Error fetching slots:', err);
    } finally {
      setLoadingSlots(false);
    }
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.parentName.trim()) {
      errs.parentName = 'Parent name is required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid parent email is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      errs.phone = 'Valid phone number is required';
    }
    if (!formData.course) {
      errs.course = 'Please choose a course';
    }
    if (!formData.agreed) {
      errs.agreed = 'Please accept terms to continue';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.selectedSlot) {
      setErrors({ slot: 'Please choose a time slot' });
      return;
    }

    setIsSubmitting(true);
    setBookingError(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: formData.parentName,
          parentEmail: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          course: formData.course,
          grade: formData.grade,
          dateLocal: formData.selectedDate,
          slotLocal: formData.selectedSlot,
          parentTimeZone: parentTimeZone,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setBookingError(
          result.error ||
            'No mentors are currently available for this slot. All mentors are either booked or have completed their daily class allocation. Please select another slot.'
        );
        fetchSlots(formData.selectedDate, parentTimeZone, formData.course);
        return;
      }

      // Booking confirmed successfully!
      setConfirmedBooking(result.booking);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (err: any) {
      setBookingError(err.message || 'Network error occurred while booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    if (confirmedBooking?.liveClassLink) {
      navigator.clipboard.writeText(confirmedBooking.liveClassLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF7] via-white to-[#F8FAFC] text-slate-900 font-sans flex flex-col justify-between selection:bg-amber-200">
      {/* Top Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 px-4 sm:px-8 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="relative w-44 sm:w-52 h-11 sm:h-12 flex-shrink-0">
              <Image
                src="/images/primary_logo.png"
                alt="Codeyoung"
                fill
                priority
                className="object-contain object-left"
              />
            </Link>
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200 text-xs font-semibold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Official 1:1 Live Trial Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href="tel:+14088092244"
              className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>Questions? Call: +1 (408) 809-2244</span>
            </a>

            <Link
              href="/"
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1.5 transition-colors bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-xs hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Split Screen */}
      <main className="flex-1 py-8 sm:py-12 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-100/25 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Panel: Trust & Parent Proof Column */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-3 bg-white border border-amber-200/90 px-4 py-2 rounded-full shadow-xs">
                <div className="relative w-16 h-6 flex-shrink-0">
                  <Image
                    src="/images/parents.png"
                    alt="Happy Parents"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  30,000+ Happy Parents Worldwide
                </span>
              </div>

              {/* Title & Headline */}
              <div className="space-y-3 font-satoshi">
                <h1 className="heading-slate text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.18] text-slate-900">
                  Unlock your child&apos;s potential with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                    1:1 live mentorship.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-inter">
                  Book a free 60-minute trial session with a verified STEM educator. Experience personalized 1:1 attention mapped precisely to your child&apos;s goals.
                </p>
              </div>

              {/* 4 Value Pillars with Elevated Modern Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <GraduationCap className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      1:1 Personalized Live Coaching
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-inter">
                      Top 1% STEM educators customize every class to match your child&apos;s unique pace and curiosity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Real Hands-On Project in Session 1
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-inter">
                      Students build functional apps, code real games, or solve interactive math puzzles right away.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe2 className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Frictionless Local Scheduling
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-inter">
                      Slots automatically convert to your timezone so lessons fit seamlessly into family routines.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Comprehensive Skill Evaluation
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-inter">
                      Get a detailed mentor evaluation report and personalized roadmap following the trial session.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviews & STEM Badges Row */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-9 h-9 relative flex-shrink-0">
                    <Image
                      src="/images/review.png"
                      alt="Google Reviews"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs font-black text-slate-900">
                      <span>4.8 / 5.0</span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Over 2,500+ Verified Parent Reviews</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-9 h-9 relative flex-shrink-0">
                    <Image
                      src="/images/stem.png"
                      alt="STEM.org Seal"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">STEM.ORG</div>
                    <span className="text-[10px] text-slate-500 font-medium">Globally Accredited Curriculum</span>
                  </div>
                </div>
              </div>

              {/* Key Quantitative Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-center">
                <div>
                  <span className="text-xl font-black text-slate-900 block">30K+</span>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Students</span>
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 block">750K+</span>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Classes</span>
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 block">4.8★</span>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Satisfaction</span>
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 block">1:1</span>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Dedicated</span>
                </div>
              </div>

              {/* Zero-Risk Guarantee Callout */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold">
                  100% Free Trial Class • No credit card required • Zero commitment
                </span>
              </div>
            </div>

            {/* Right Panel: Interactive Multi-Step Booking Wizard */}
            <div className="lg:col-span-7">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-xl relative">
                
                {/* Step Progress Indicator Header */}
                <div className="mb-8 pb-5 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        {step === 1 && 'Book a Free Trial Session'}
                        {step === 2 && 'Select Date & Comfortable Slot'}
                        {step === 3 && 'Trial Class Confirmed!'}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1 font-inter">
                        {step === 1 && 'Step 1 of 2: Parent details and course preference'}
                        {step === 2 && 'Step 2 of 2: Choose your preferred day and local time slot'}
                        {step === 3 && 'Your session is confirmed and classroom link is ready'}
                      </p>
                    </div>

                    {/* Step Badges */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                          step >= 1 ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {step > 1 ? <Check className="w-4 h-4 text-emerald-400" /> : '1'}
                      </div>
                      <div className={`w-6 h-0.5 ${step >= 2 ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                          step >= 2 ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {step > 2 ? <Check className="w-4 h-4 text-emerald-400" /> : '2'}
                      </div>
                      <div className={`w-6 h-0.5 ${step === 3 ? 'bg-emerald-600' : 'bg-slate-200'}`}></div>
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                          step === 3 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {step === 3 ? <Check className="w-4 h-4" /> : '3'}
                      </div>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-orange-500 h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: step === 1 ? '33%' : step === 2 ? '66%' : '100%',
                      }}
                    ></div>
                  </div>
                </div>

                {/* STEP 1: Registration Form */}
                {step === 1 && (
                  <form onSubmit={handleStep1Submit} className="space-y-4.5">
                    {/* Timezone Preference Banner */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <Globe2 className="w-4 h-4 text-amber-700" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Your Local Timezone
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Class slots will be displayed in your local time
                          </span>
                        </div>
                      </div>
                      <select
                        value={parentTimeZone}
                        onChange={(e) => setParentTimeZone(e.target.value)}
                        aria-label="Select Parent Time Zone"
                        className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer shadow-2xs"
                      >
                        {TIMEZONE_OPTIONS.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Parent's Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Parent&apos;s Full Name</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.parentName}
                        onChange={(e) =>
                          setFormData({ ...formData, parentName: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all ${
                          errors.parentName ? 'border-red-400 bg-red-50/30' : 'border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white'
                        }`}
                      />
                      {errors.parentName && (
                        <p className="text-xs text-red-500 mt-1">{errors.parentName}</p>
                      )}
                    </div>

                    {/* Parent's Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>Parent&apos;s Email Address</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. parent@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all ${
                          errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone Number with Country Code Dropdown */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>Mobile Number</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={formData.countryCode}
                          onChange={(e) =>
                            setFormData({ ...formData, countryCode: e.target.value })
                          }
                          aria-label="Country Code"
                          className="w-36 px-2.5 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer shadow-2xs"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code} ({c.country})
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className={`flex-1 px-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all ${
                            errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Child's Grade & Choose Course */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                          <span>Child&apos;s Grade</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.grade}
                          onChange={(e) =>
                            setFormData({ ...formData, grade: e.target.value })
                          }
                          aria-label="Child Grade"
                          className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer shadow-2xs"
                        >
                          {GRADES.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                          <span>Choose Course</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.course}
                          onChange={(e) =>
                            setFormData({ ...formData, course: e.target.value })
                          }
                          aria-label="Course Preference"
                          className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer shadow-2xs"
                        >
                          {COURSES_OPTIONS.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.agreed}
                          onChange={(e) =>
                            setFormData({ ...formData, agreed: e.target.checked })
                          }
                          className="mt-0.5 rounded text-orange-500 focus:ring-orange-400 cursor-pointer"
                        />
                        <span>
                          I agree to Codeyoung&apos;s{' '}
                          <Link href="/terms" className="text-orange-600 underline font-semibold hover:text-orange-700">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-orange-600 underline font-semibold hover:text-orange-700">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                      {errors.agreed && (
                        <p className="text-xs text-red-500 mt-1">{errors.agreed}</p>
                      )}
                    </div>

                    {/* Proceed Button - VIBRANT ORANGE BACKGROUND */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full font-bold text-base bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer font-satoshi group"
                    >
                      <span>Proceed to Slot Selection</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                )}

                {/* STEP 2: Date & Local Slot Selection */}
                {step === 2 && (
                  <form onSubmit={handleStep2Submit} className="space-y-5">
                    {/* Header Summary & Timezone Switcher */}
                    <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/90 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-700">
                          Selected Course:{' '}
                          <strong className="text-slate-950 font-extrabold">{formData.course}</strong>{' '}
                          <span className="text-slate-500">({formData.grade})</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-amber-800 font-bold hover:underline cursor-pointer text-xs"
                        >
                          Change
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-amber-200/70 text-xs">
                        <span className="text-slate-700 flex items-center gap-1.5 font-medium">
                          <Globe2 className="w-3.5 h-3.5 text-amber-700" />
                          <span>Showing available slots in:</span>
                        </span>
                        <select
                          value={parentTimeZone}
                          onChange={(e) => setParentTimeZone(e.target.value)}
                          aria-label="Change Time Zone"
                          className="px-2.5 py-1 rounded-lg border border-amber-300 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer shadow-2xs"
                        >
                          {TIMEZONE_OPTIONS.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Booking Error State Banner */}
                    {bookingError && (
                      <div className="p-3.5 rounded-2xl bg-red-50 border border-red-300 text-xs text-red-900 flex items-start gap-2.5 animate-in fade-in duration-200">
                        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <strong className="font-bold block">Notice:</strong>
                          <p>{bookingError}</p>
                          <p className="text-[11px] text-red-700">
                            Please pick a different available slot below.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Select Preferred Day */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4 text-amber-600" />
                        <span>Select Class Date</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {dateOptions.map((opt) => (
                          <button
                            type="button"
                            key={opt.dateStr}
                            onClick={() =>
                              setFormData({ ...formData, selectedDate: opt.dateStr })
                            }
                            className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                              formData.selectedDate === opt.dateStr
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                          >
                            <span className="block text-[11px] uppercase font-bold tracking-wider opacity-80">
                              {opt.dayName}
                            </span>
                            <span className="block text-sm font-black mt-0.5">
                              {opt.formatted}
                            </span>
                            <span
                              className={`text-[10px] block mt-1 font-semibold ${
                                formData.selectedDate === opt.dateStr
                                  ? 'text-amber-400'
                                  : 'text-slate-400'
                              }`}
                            >
                              {opt.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Available Slots Grid */}
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Select Comfortable Time Slot</span>
                        </span>
                        {loadingSlots && (
                          <span className="text-[11px] text-amber-700 flex items-center gap-1 animate-pulse font-medium">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Updating live slots...</span>
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {slots.length === 0 && !loadingSlots ? (
                          <p className="text-xs text-slate-500 p-6 text-center border rounded-2xl bg-slate-50">
                            Loading available slots...
                          </p>
                        ) : (
                          slots.map((s) => {
                            const isSelected = formData.selectedSlot === s.slot;
                            const isAvailable = s.isAvailable;

                            return (
                              <button
                                type="button"
                                key={s.slot}
                                disabled={!isAvailable}
                                onClick={() =>
                                  setFormData({ ...formData, selectedSlot: s.slot })
                                }
                                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                                  !isAvailable
                                    ? 'bg-slate-50/80 border-slate-200 opacity-60 cursor-not-allowed'
                                    : isSelected
                                    ? 'bg-amber-50 border-orange-500 shadow-sm ring-2 ring-orange-500 text-slate-950 font-bold'
                                    : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 text-slate-800 cursor-pointer'
                                }`}
                              >
                                <div>
                                  <div className="text-xs sm:text-sm font-extrabold flex items-center gap-2">
                                    <span>{s.slot}</span>
                                    <span className="text-[11px] font-medium text-slate-500">
                                      (Local time)
                                    </span>
                                  </div>
                                </div>

                                <div className="text-right">
                                  {isAvailable ? (
                                    <span
                                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                                        isSelected
                                          ? 'bg-orange-500 text-white'
                                          : 'bg-emerald-100 text-emerald-800'
                                      }`}
                                    >
                                      ✓ Available
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                                      Fully Booked
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3.5 rounded-full border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Back
                      </button>

                      {/* Confirm Button - VIBRANT ORANGE BACKGROUND */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-4 rounded-full font-bold text-sm sm:text-base bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 font-satoshi group"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span>Confirming Your Slot...</span>
                          </>
                        ) : (
                          <>
                            <span>Confirm &amp; Book Trial Class</span>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: Client Confirmation Screen */}
                {step === 3 && confirmedBooking && (
                  <div className="py-2 space-y-6 animate-in zoom-in-95 duration-200">
                    {/* Confirmation Header Badge */}
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full inline-block">
                        Booking Confirmed • Ref #{confirmedBooking.id}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        You&apos;re All Set for Live Learning!
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-inter">
                        We have reserved your child&apos;s 1:1 spot and assigned an expert mentor.
                      </p>
                    </div>

                    {/* Hero Live Classroom Card */}
                    <div className="bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-amber-500/10 border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Video className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-slate-900">
                              1:1 Live Demo Classroom
                            </h4>
                            <span className="text-[11px] text-emerald-800 font-semibold">
                              Ready for your scheduled class
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-900 bg-emerald-200/70 px-3 py-1 rounded-full">
                          Live Link Active
                        </span>
                      </div>

                      {/* Classroom URL display & Copy */}
                      <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-emerald-200 shadow-xs">
                        <span className="flex-1 text-xs font-mono text-slate-700 truncate select-all">
                          {confirmedBooking.liveClassLink}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyLink}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer flex-shrink-0"
                        >
                          {copiedLink ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Join Classroom Button */}
                      <a
                        href={confirmedBooking.liveClassLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-4 rounded-2xl font-black text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
                      >
                        <Video className="w-4 h-4" />
                        <span>Enter Live Classroom</span>
                        <ExternalLink className="w-4 h-4 opacity-80" />
                      </a>

                      <p className="text-[11px] text-slate-500 text-center">
                        Works seamlessly on Google Chrome browser on any laptop or desktop computer.
                      </p>
                    </div>

                    {/* Session Details & Assigned Mentor Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Session Details */}
                      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                          <CalendarIcon className="w-4 h-4 text-amber-600" />
                          <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                            Session Details
                          </h5>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Date &amp; Local Time</span>
                            <span className="text-slate-900 font-black text-sm block">
                              {confirmedBooking.emailsSent.parentEmail.scheduledLocalTime}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Course &amp; Grade</span>
                            <span className="text-slate-900 font-bold block">
                              {confirmedBooking.course} • {confirmedBooking.grade}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Student / Parent</span>
                            <span className="text-slate-900 font-semibold block">
                              {confirmedBooking.parentName}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Assigned Mentor Card */}
                      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                          <Award className="w-4 h-4 text-amber-600" />
                          <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                            Your Assigned Mentor
                          </h5>
                        </div>
                        <div className="flex items-start gap-3.5 pt-1">
                          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 relative overflow-hidden flex-shrink-0">
                            <Image
                              src={confirmedBooking.mentorAvatar || '/images/math_mentor_01.png'}
                              alt={confirmedBooking.mentorName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-sm font-black text-slate-900 block">
                              {confirmedBooking.mentorName}
                            </span>
                            <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md inline-block">
                              Certified STEM Educator
                            </span>
                            <p className="text-[11px] text-slate-500 leading-tight">
                              {confirmedBooking.mentorQualifications}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Email Confirmation Status Card */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="text-xs space-y-0.5">
                        <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                          <span>Confirmation Email Sent</span>
                          <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                            Delivered to Inbox
                          </span>
                        </div>
                        <p className="text-emerald-800 leading-relaxed">
                          We sent your trial class confirmation, classroom link, and calendar invite to{' '}
                          <strong>{confirmedBooking.parentEmail}</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Session Preparation Checklist */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
                      <span className="font-bold uppercase tracking-wider text-slate-700 block text-[11px]">
                        Classroom Preparation Checklist:
                      </span>
                      <ul className="space-y-1.5 text-slate-600">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>Join 5 minutes before the scheduled start time.</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>Use a laptop or desktop computer with Google Chrome.</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>Ensure stable internet, working camera, and microphone.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Return & Book Another */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Link
                        href="/"
                        className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 transition-colors text-center shadow-xs"
                      >
                        Return to Homepage
                      </Link>
                      <button
                        onClick={() => {
                          setStep(1);
                          setConfirmedBooking(null);
                        }}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-xs border border-slate-300 text-slate-700 hover:bg-white transition-colors cursor-pointer"
                      >
                        Book Another Session
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-500 bg-white">
        <p>Copyright &copy; {new Date().getFullYear()} Codeyoung (Smart Owl Education Pvt Ltd). All rights reserved.</p>
      </footer>
    </div>
  );
}
