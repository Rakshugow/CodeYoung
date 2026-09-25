'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReviewsTrustpilot() {
  const [selectedCountry, setSelectedCountry] = useState<'All' | 'USA' | 'UK' | 'Canada' | 'Australia' | 'India'>('All');

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      location: 'USA',
      flag: '🇺🇸',
      child: 'Ethan (Grade 4)',
      course: 'Python Coding & Game Dev',
      rating: 5,
      date: '2 weeks ago',
      source: 'Google Reviews',
      title: 'Remarkable turnaround in confidence and coding skills!',
      text: 'Ethan used to get bored with screen time, but Codeyoung turned his gaming interest into real programming logic! His mentor connects with him so patiently and adapts every lesson to his questions. He already published his first Flappy Bird clone.',
    },
    {
      name: 'Dr. Alistair MacLeod',
      location: 'UK',
      flag: '🇬🇧',
      child: 'Fiona (Grade 7)',
      course: 'Advanced Math & Algebra',
      rating: 5,
      date: '1 month ago',
      source: 'Trustpilot',
      title: 'Highest quality 1:1 math tutoring we have ever experienced.',
      text: 'The 1:1 attention makes all the difference. Fiona struggled with algebraic equations in school, and within two months of Codeyoung classes, her test scores jumped from 68% to 94%! Highly thorough homework reviews and progress updates.',
    },
    {
      name: 'Priya Ramanathan',
      location: 'Canada',
      flag: '🇨🇦',
      child: 'Aarav (Grade 2)',
      course: 'Junior Scratch Coding',
      rating: 5,
      date: '3 weeks ago',
      source: 'Google Reviews',
      title: 'The mentor is exceptionally patient and engaging!',
      text: 'Finding an engaging educator for a 7-year-old online is difficult, but Codeyoung nailed it. Aarav eagerly looks forward to every Saturday session. The Sandbox platform and interactive quizzes keep him hooked.',
    },
    {
      name: 'Michael O’Connor',
      location: 'Australia',
      flag: '🇦🇺',
      child: 'Liam & Olivia (Grades 5 & 8)',
      course: 'Science & Creative English',
      rating: 5,
      date: '1 month ago',
      source: 'Trustpilot',
      title: 'Both my kids love their classes — truly worth every penny.',
      text: 'We enrolled Liam in Science experiments and Olivia in English public speaking. Olivia just won 1st prize in her school speech contest! The personalized attention from mentors who truly care is unmatched.',
    },
    {
      name: 'Deepak Mehrotra',
      location: 'India',
      flag: '🇮🇳',
      child: 'Ananya (Grade 6)',
      course: 'Vedic Math & Mental Math',
      rating: 5,
      date: '2 months ago',
      source: 'Google Reviews',
      title: 'Speed of mental calculation has improved by leaps and bounds!',
      text: 'Ananya can solve two-digit multiplication in seconds now without touching paper! The mentor builds such a warm rapport that classes feel fun rather than stressful. Very satisfied with our decision.',
    },
    {
      name: 'Emily Watson',
      location: 'USA',
      flag: '🇺🇸',
      child: 'Noah (Grade 5)',
      course: 'Web Development (HTML/CSS)',
      rating: 5,
      date: '3 weeks ago',
      source: 'Trustpilot',
      title: 'Real world skills taught in an age-appropriate format.',
      text: 'Noah built his own portfolio website from scratch! The curriculum is practical, the live portal is intuitive, and the mentor provided detailed bi-weekly reports to keep us aligned.',
    },
  ];

  const filteredReviews =
    selectedCountry === 'All'
      ? testimonials
      : testimonials.filter((t) => t.location === selectedCountry);

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="heading-gold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.15] lg:leading-[64px] tracking-tight font-satoshi text-center pb-[11px]">
            Trusted by parents, loved by students!
          </h2>
          <p className="subtitle-cy mt-4 font-satoshi">
            <span className="font-bold text-[#946b00]">50,000+</span> parents who chose Codeyoung for their children share their experience
          </p>

          {/* Trustpilot & Google Score Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-3 bg-[#FFFDF7] border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="w-8 h-8 relative">
                <Image src="/images/google_review.png" alt="Google" fill className="object-contain" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-sm font-black text-slate-900">
                  <span>4.5</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium">Google Reviews (2,365+)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#FFFDF7] border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="w-8 h-8 relative">
                <Image src="/images/trustpilot_img.png" alt="Trustpilot" fill className="object-contain" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-sm font-black text-slate-900">
                  <span>Trustpilot</span>
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    4.4 ★
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium">Verified Customer Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Country Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(['All', 'USA', 'UK', 'Canada', 'Australia', 'India'] as const).map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                selectedCountry === country
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-[#FFFDF7] text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {country === 'All' ? '🌍 All Countries' : `${country}`}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="relative">
                {/* Background quote watermark */}
                <Quote className="w-12 h-12 text-amber-100/70 absolute -top-2 -right-1 pointer-events-none -z-0" />

                {/* Header with Parent Avatar & Location */}
                <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-200 to-amber-100 border-2 border-white shadow-xs flex items-center justify-center font-black text-amber-900 text-xs flex-shrink-0">
                      {item.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-1.5 leading-tight">
                        <span>{item.name}</span>
                        <span className="text-sm">{item.flag}</span>
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Parent of {item.child}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200/80 px-2.5 py-1 rounded-full shadow-2xs">
                    {item.location}
                  </span>
                </div>

                {/* Stars & Tag */}
                <div className="flex items-center justify-between mb-3.5 relative z-10">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full">
                    {item.course}
                  </span>
                </div>

                {/* Quote Title & Text */}
                <h5 className="font-bold text-sm sm:text-base text-slate-900 mb-2 leading-snug">
                  &ldquo;{item.title}&rdquo;
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-inter">
                  {item.text}
                </p>
              </div>

              {/* Source Footer */}
              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified on {item.source}
                </span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
