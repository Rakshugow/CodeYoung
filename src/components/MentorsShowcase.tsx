'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Clock, GraduationCap, Award, Star, Quote } from 'lucide-react';

export default function MentorsShowcase() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Coding' | 'Math' | 'English' | 'Science'>('All');

  const mentors = [
    {
      name: 'Viji Anup',
      subject: 'Coding',
      category: 'Coding',
      degree: 'Masters - Computer Science',
      hours: '7,000+ hrs',
      rating: '4.95',
      image: '/images/co_mentor_1.png',
      quote: 'When kids code they develop analytical thinking skills and the confidence to invent!',
    },
    {
      name: 'Shraddha Shukla',
      subject: 'Coding',
      category: 'Coding',
      degree: 'Masters - Computer Science',
      hours: '7,000+ hrs',
      rating: '4.98',
      image: '/images/co_mentor_2.png',
      quote: 'Coding helps kids express their unbounded creativity through digital creation.',
    },
    {
      name: 'Tarun Mengi',
      subject: 'Math',
      category: 'Math',
      degree: 'M.Sc. Mathematics',
      hours: '5,000+ hrs',
      rating: '4.92',
      image: '/images/math_mentor_01.png',
      quote: 'Math gives us hope that every complex problem has an elegant and simple solution.',
    },
    {
      name: 'Vaibhavi Parab',
      subject: 'Math',
      category: 'Math',
      degree: 'B.E. - Computer Science',
      hours: '5,000+ hrs',
      rating: '4.96',
      image: '/images/math_mentor_02.png',
      quote: "A teacher's influence goes beyond the screen. Proudly, I am a positive guide for them.",
    },
    {
      name: 'Sana Javed',
      subject: 'English',
      category: 'English',
      degree: 'Masters - English Literature',
      hours: '6,000+ hrs',
      rating: '4.97',
      image: '/images/eng_mentor_01.png',
      quote: 'Teaching is the highest form of understanding. We ignite the joy of language in every session.',
    },
    {
      name: 'Lavanya Baid',
      subject: 'Science',
      category: 'Science',
      degree: 'Graduate - STEM Educator',
      hours: '1,200+ hrs',
      rating: '4.90',
      image: '/images/sc_mentor_1.png',
      quote: 'Let’s learn with fun hands-on experiments and discover how the physical world really works!',
    },
    {
      name: 'Suyash Shukla',
      subject: 'Coding',
      category: 'Coding',
      degree: 'Masters - Computer Science',
      hours: '7,000+ hrs',
      rating: '4.94',
      image: '/images/co_mentor_3.png',
      quote: 'Coding teaches children to persevere through errors and cultivate a true growth mindset.',
    },
    {
      name: 'Swapnil',
      subject: 'Science',
      category: 'Science',
      degree: 'B.E. - Mechanical',
      hours: '2,100+ hrs',
      rating: '4.89',
      image: '/images/sc_mentor_4.png',
      quote: 'Curiosity is the spark of engineering. We help kids explore, hypothesize, and construct.',
    },
  ];

  const filtered =
    activeCategory === 'All'
      ? mentors
      : mentors.filter((m) => m.category === activeCategory);

  return (
    <section id="mentors" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-[775px] mx-auto mb-12">
          <h2 className="heading-slate text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.15] lg:leading-[64px] tracking-tight font-satoshi text-center pb-[11px]">
            Personalized expert guidance from highly qualified mentors
          </h2>
          <p className="subtitle-cy mt-4 font-satoshi">
            Mentors add a human touch to complement tech-enabled learning, especially in 1:1 live online classes.
          </p>

          {/* Vetting Highlight */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-slate-700 bg-[#FFFDF7] border border-amber-200 px-5 py-2.5 rounded-2xl shadow-sm">
            <span className="flex items-center gap-1.5 text-amber-700">
              <Award className="w-4 h-4 text-amber-600" />
              <span>&lt; 1% selection rate</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-blue-700">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Masters &amp; Engineering Alumni</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-emerald-700">
              <Star className="w-4 h-4 text-emerald-600 fill-current" />
              <span>Average 4.9+ / 5 rating</span>
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(['All', 'Coding', 'Math', 'English', 'Science'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((mentor, index) => (
            <div
              key={index}
              className="bg-[#FFFDF7] rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                {/* Headshot with Verified Badge */}
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-300 shadow-md group-hover:scale-105 transition-transform bg-amber-50">
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-sm" title="Verified Top 1% Mentor">
                    <Award className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>

                <div className="text-center mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    {mentor.subject}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {mentor.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {mentor.degree}
                  </p>
                </div>

                {/* Quote */}
                <div className="bg-white/80 rounded-2xl p-3 border border-slate-100 text-xs text-slate-600 italic leading-relaxed relative mb-4">
                  <Quote className="w-3.5 h-3.5 text-amber-400 absolute top-2 left-2 opacity-50" />
                  <p className="pl-4">&ldquo;{mentor.quote}&rdquo;</p>
                </div>
              </div>

              {/* Stats & Quick Action */}
              <div>
                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600 mb-3">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {mentor.hours}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    {mentor.rating}
                  </span>
                </div>

                <a
                  href="/book-a-demo"
                  className="w-full block text-center py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 group-hover:bg-[#FFD361] group-hover:text-slate-950 transition-colors shadow-2xs"
                >
                  Book with {mentor.name.split(' ')[0]}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
