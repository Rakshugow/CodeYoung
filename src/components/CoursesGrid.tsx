'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  GripHorizontal,
  LayoutGrid,
  SlidersHorizontal,
  Code2,
  Calculator,
  BookOpen,
  Atom,
  Layers,
} from 'lucide-react';

interface Course {
  id: 'coding' | 'math' | 'english' | 'science';
  title: string;
  slug: string;
  age: string;
  price: string;
  badge: string | null;
  badgeColor?: string;
  themeColor: string;
  icon: string;
  description: string;
  topics: string[];
  outcomes: string;
}

const COURSES: Course[] = [
  {
    id: 'coding',
    title: 'Coding',
    slug: '/courses/coding',
    age: 'Ages 5-16',
    price: '$22',
    badge: 'Popular',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    themeColor: '#2E5CFF',
    icon: '/images/coding.png',
    description: 'From block-based logic to Python, web development, and real-world Artificial Intelligence.',
    topics: [
      'Scratch & Block Programming (Ages 5-9)',
      'App Development & MIT App Inventor (Ages 8-12)',
      'HTML, CSS, JavaScript Web Dev (Ages 10-15)',
      'Python Game Dev, AI & Machine Learning (Ages 11-16)',
    ],
    outcomes: 'Build 20+ portfolio apps, games, and web projects',
  },
  {
    id: 'math',
    title: 'Math',
    slug: '/courses/math',
    age: 'Ages 5-18',
    price: '$20',
    badge: null,
    themeColor: '#8A600D',
    icon: '/images/math.png',
    description: 'Shed the fear of math with visual intuition, mental arithmetic, and curriculum alignment.',
    topics: [
      'Early Math & Number Sense (KG-Grade 2)',
      'Mental Math & Vedic Math Shortcuts (Grades 3-5)',
      'Algebra, Geometry & Fractions Mastery (Grades 6-8)',
      'Olympiad, Advanced Calculus & Trigonometry (Grades 9-12)',
    ],
    outcomes: 'Achieve 2x speed in calculations and 90%+ school test scores',
  },
  {
    id: 'english',
    title: 'English',
    slug: '/courses/english',
    age: 'Ages 5-13',
    price: '$18',
    badge: null,
    themeColor: '#12706B',
    icon: '/images/english.png',
    description: 'Expressive writing, structured reading comprehension, and fearless public speaking.',
    topics: [
      'Phonics, Vocabulary & Storytelling (Ages 5-7)',
      'Grammar, Sentence Structure & Comprehension (Ages 8-10)',
      'Creative Writing & Essay Crafting (Ages 10-12)',
      'Debates, Elocution & Confident Public Speaking (Ages 11-13)',
    ],
    outcomes: 'Author own published stories and speak fluently before audiences',
  },
  {
    id: 'science',
    title: 'Science',
    slug: '/courses/science',
    age: 'Ages 5-12',
    price: '$20',
    badge: 'New',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    themeColor: '#0A7A51',
    icon: '/images/science.png',
    description: 'Hands-on kitchen experiments, discovery-based physics, biology, and chemistry fundamentals.',
    topics: [
      'Young Explorers: Everyday Physics & Matter (Ages 5-7)',
      'Living Systems & Nature Wonders (Ages 8-9)',
      'Forces, Energy & Chemical Reactions (Ages 10-11)',
      'Scientific Method, Space & Robotics (Ages 11-12)',
    ],
    outcomes: 'Conduct 40+ guided live experiments and build scientific intuition',
  },
];

type CategoryTab = 'all' | 'coding' | 'math' | 'english' | 'science';

const TABS: { id: CategoryTab; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All Subjects', icon: Layers },
  { id: 'coding', label: 'Coding', icon: Code2 },
  { id: 'math', label: 'Math', icon: Calculator },
  { id: 'english', label: 'English', icon: BookOpen },
  { id: 'science', label: 'Science', icon: Atom },
];

export default function CoursesGrid() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtered courses
  const filteredCourses =
    activeTab === 'all' ? COURSES : COURSES.filter((c) => c.id === activeTab);

  // Keep index within bounds when filtered courses change
  useEffect(() => {
    if (currentIndex >= filteredCourses.length) {
      setCurrentIndex(0);
    }
  }, [filteredCourses.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredCourses.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < filteredCourses.length - 1 ? prev + 1 : 0));
  };

  // Drag slider track state
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(300);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = filteredCourses.length;
  // Calculate knob position percentage (0 to 100)
  const progressRatio = totalItems > 1 ? currentIndex / (totalItems - 1) : 0;
  const knobWidth = 140; // width of draggable scrub pill
  const maxTravel = Math.max(0, trackWidth - knobWidth);
  const knobX = progressRatio * maxTravel;

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || totalItems <= 1) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIdx = Math.round(ratio * (totalItems - 1));
    setCurrentIndex(targetIdx);
  };

  return (
    <section id="curriculum" className="py-16 lg:py-24 bg-[#FFFDF7] relative overflow-hidden">
      {/* Ambient gradient aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-100/25 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Structured Curriculum</span>
          </div>

          <h2 className="heading-slate text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.18] tracking-tight font-heading text-center">
            Online courses for kids of all age groups
          </h2>
          <p className="subtitle-cy mt-3 font-inter text-slate-600 text-base sm:text-lg">
            Well-researched, project-driven, and designed for genuine concept mastery.
          </p>

          {/* Pricing Highlight Pill */}
          <div className="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full bg-[#FFF9E6] border border-[#FFD566] shadow-xs">
            <Sparkles className="w-4 h-4 text-[#946B00]" />
            <span className="text-sm font-semibold text-[#2F4F4F]">
              Starting as low as{' '}
              <strong className="text-[#946B00] font-black text-base">$22</strong> per class
            </span>
          </div>
        </div>

        {/* Tab & View Mode Control Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Satisfying Segmented Pill Tabs with Animated Indicator */}
          <div className="w-full md:w-auto flex items-center justify-center">
            <div className="inline-flex p-1.5 rounded-full bg-slate-200/70 border border-slate-300/80 shadow-inner backdrop-blur-sm max-w-full overflow-x-auto no-scrollbar">
              {TABS.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCurrentIndex(0);
                    }}
                    className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors z-10 whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCourseTab"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        className="absolute inset-0 bg-slate-900 rounded-full shadow-md z-[-1]"
                      />
                    )}
                    <TabIcon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode Switcher: Draggable Carousel vs Grid */}
          <div className="hidden sm:flex items-center gap-1.5 bg-white border border-slate-200 rounded-full p-1 shadow-xs text-xs font-bold text-slate-700">
            <button
              onClick={() => setViewMode('slider')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                viewMode === 'slider'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Draggable View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                viewMode === 'grid'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* Content Section: Slider Mode vs Grid Mode */}
        {viewMode === 'slider' && filteredCourses.length > 1 ? (
          <div>
            {/* Draggable Cards Viewport */}
            <div className="relative overflow-hidden py-2 px-1">
              <motion.div
                className="flex gap-6 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{
                  left: -(filteredCourses.length - 1) * 340,
                  right: 0,
                }}
                dragElastic={0.15}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipeThreshold = 50;
                  if (offset.x < -swipeThreshold && currentIndex < filteredCourses.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                  } else if (offset.x > swipeThreshold && currentIndex > 0) {
                    setCurrentIndex((prev) => prev - 1);
                  }
                }}
                animate={{
                  x: -currentIndex * (typeof window !== 'undefined' && window.innerWidth < 640 ? 300 : 360),
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              >
                {filteredCourses.map((course, idx) => {
                  const isCurrent = idx === currentIndex;
                  return (
                    <motion.div
                      key={course.id}
                      animate={{
                        scale: isCurrent ? 1 : 0.96,
                        opacity: isCurrent ? 1 : 0.75,
                      }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-[300px] sm:w-[360px] md:w-[420px] flex-shrink-0 bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all flex flex-col justify-between shadow-md ${
                        isCurrent
                          ? 'border-slate-900 shadow-xl'
                          : 'border-slate-200/80 hover:border-slate-400'
                      }`}
                    >
                      <div>
                        {/* Header with Icon, Title, Badge & Price */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-2xl bg-amber-50 p-2.5 flex items-center justify-center border border-amber-100">
                              <Image
                                src={course.icon}
                                alt={course.title}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-extrabold text-slate-900">
                                  {course.title}
                                </h3>
                                {course.badge && (
                                  <span
                                    className={`text-xs font-bold px-2 py-0.5 rounded-full border ${course.badgeColor}`}
                                  >
                                    {course.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs font-semibold text-slate-500">
                                {course.age}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs text-slate-400 block font-medium">From</span>
                            <span className="text-2xl font-black text-slate-900">{course.price}</span>
                            <span className="text-xs text-slate-500 font-medium">/class</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-600 mb-5 leading-relaxed font-inter line-clamp-2">
                          {course.description}
                        </p>

                        {/* Topics covered */}
                        <div className="space-y-2 mb-5 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                            Key Grade Modules
                          </span>
                          {course.topics.slice(0, 3).map((t, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span className="truncate">{t}</span>
                            </div>
                          ))}
                        </div>

                        {/* Outcomes Pill */}
                        {course.outcomes && (
                          <div className="mb-6 px-3.5 py-2 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs font-semibold text-amber-900 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span className="truncate">{course.outcomes}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                        <Link
                          href={course.slug}
                          className="w-full sm:w-1/2 text-center py-2.5 rounded-full font-bold text-xs sm:text-sm border-2 border-slate-800 text-slate-900 hover:bg-slate-900 hover:text-white transition-all"
                        >
                          Curriculum
                        </Link>
                        <Link
                          href="/book-a-demo"
                          className="w-full sm:w-1/2 text-center py-2.5 rounded-full font-bold text-xs sm:text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 font-satoshi group"
                        >
                          <span>Book Free Trial</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* SATISFYING DRAG BUTTON / SCRUB BAR CONTROLS */}
            <div className="mt-8 max-w-2xl mx-auto bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-slate-200/90 shadow-md">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 flex items-center justify-center transition-all flex-shrink-0"
                  aria-label="Previous course"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Draggable Track & Drag Handle */}
                <div
                  ref={trackRef}
                  onClick={handleTrackClick}
                  className="relative flex-1 h-12 bg-slate-100/90 hover:bg-slate-100 rounded-full border border-slate-200/80 p-1 flex items-center cursor-pointer select-none overflow-hidden"
                >
                  {/* Subtle track background grid dots */}
                  <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none opacity-40">
                    {filteredCourses.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === currentIndex ? 'bg-amber-500 scale-125' : 'bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Physical Draggable Scrub Button / Pill */}
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: maxTravel }}
                    dragElastic={0.08}
                    dragMomentum={false}
                    onDrag={(e, info) => {
                      if (maxTravel > 0) {
                        const currentX = Math.max(0, Math.min(maxTravel, knobX + info.delta.x));
                        const ratio = currentX / maxTravel;
                        const targetIdx = Math.round(ratio * (totalItems - 1));
                        if (targetIdx !== currentIndex) {
                          setCurrentIndex(targetIdx);
                        }
                      }
                    }}
                    animate={{ x: knobX }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    style={{ width: `${knobWidth}px` }}
                    className="relative z-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center gap-1.5 px-3 shadow-lg cursor-grab active:cursor-grabbing font-bold text-xs select-none border border-slate-700"
                  >
                    <GripHorizontal className="w-4 h-4 text-amber-400 flex-shrink-0 animate-pulse" />
                    <span className="tracking-tight whitespace-nowrap">
                      {filteredCourses[currentIndex]?.title || 'Drag to Slide'}
                    </span>
                  </motion.div>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 flex items-center justify-center transition-all flex-shrink-0"
                  aria-label="Next course"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Status Hint */}
              <div className="flex items-center justify-between mt-2.5 px-3 text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                  Card {currentIndex + 1} of {filteredCourses.length}
                </span>
                <span className="text-slate-400">💡 Drag cards or the black button to slide</span>
              </div>
            </div>
          </div>
        ) : (
          /* Grid View Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="card-modern bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 flex flex-col justify-between group hover:border-[#5C7CFF] transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <div>
                    {/* Header with Icon, Title, Badge & Price */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 p-2.5 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
                          <Image
                            src={course.icon}
                            alt={course.title}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                              {course.title}
                            </h3>
                            {course.badge && (
                              <span
                                className={`text-xs font-bold px-2 py-0.5 rounded-full border ${course.badgeColor}`}
                              >
                                {course.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-slate-500">
                            {course.age}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block font-medium">From</span>
                        <span className="text-2xl font-black text-slate-900">{course.price}</span>
                        <span className="text-xs text-slate-500 font-medium">/class</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#475569] mb-6 leading-relaxed font-inter">
                      {course.description}
                    </p>

                    {/* Topics covered */}
                    <div className="space-y-2.5 mb-5 bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                        Key Grade Modules
                      </span>
                      {course.topics.map((t, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#475569] font-inter"
                        >
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>

                    {/* Outcome Pill */}
                    {course.outcomes && (
                      <div className="mb-6 px-3.5 py-2 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs font-semibold text-amber-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>{course.outcomes}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href={course.slug}
                      className="w-full sm:w-1/2 text-center py-3 rounded-full font-bold text-sm border-2 border-slate-800 text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-xs"
                    >
                      Curriculum Details
                    </Link>
                    <Link
                      href="/book-a-demo"
                      className="w-full sm:w-1/2 text-center py-3 rounded-full font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 font-satoshi group"
                    >
                      <span>Book Free Trial</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
