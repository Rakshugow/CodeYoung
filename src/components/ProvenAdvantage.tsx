'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function ProvenAdvantage() {
  const cards = [
    {
      title: 'Live 1:1 online classes',
      description: "Dedicated attention from mentor who adapts lessons to kid's pace and style",
      icon: '/images/online-class.webp',
      badge: 'Personalized',
    },
    {
      title: 'Mastery-based progress tracking',
      description: 'We help students fully understand each concept before moving on',
      icon: '/images/growth.webp',
      badge: 'Deep Learning',
    },
    {
      title: 'Real-time feedback & guidance',
      description: 'Immediate support accelerates learning and builds confidence',
      icon: '/images/feedback.png',
      badge: 'Continuous',
    },
  ];

  return (
    <section id="pedagogy" className="py-16 lg:py-24 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Pedagogical Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight pb-2">
            The Proven 2-Sigma Advantage of 1:1 Mentorship
          </h2>
          <p className="subtitle-cy mt-2 font-inter text-slate-600">
            Backed by educational psychologist Benjamin Bloom&apos;s landmark research on mastery-based learning.
          </p>
        </div>

        {/* Top Research & Graph Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-16">
          {/* Research Text & Flow Chart */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-slate-50 border border-slate-200/90 p-6 sm:p-7 rounded-3xl shadow-xs">
              <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
                Research Insight
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-3 font-heading">
                Bloom&apos;s 2-Sigma Effect: Tutored students outperform 98% of classroom peers.
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-inter">
                Research conducted at the University of Chicago established that an average student tutored one-to-one using mastery learning techniques performed two standard deviations above students educated in conventional classrooms.
              </p>
            </div>

            {/* Flow Chart image container */}
            <div className="bg-[#FFFDF7] border border-slate-200/80 rounded-3xl p-6 flex justify-center items-center shadow-xs">
              <div className="relative w-full max-w-[420px] h-[220px] sm:h-[260px]">
                <Image
                  src="/images/flow-chart.png"
                  alt="1:1 Learning Flow Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Graph visual */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-xs">
            <div className="w-full text-left mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Statistical Evidence
              </span>
              <h4 className="text-base font-bold text-slate-900">
                Distribution of Academic Achievement
              </h4>
            </div>
            <div className="relative w-full h-[260px] sm:h-[320px]">
              <Image
                src="/images/graph.webp"
                alt="Achievement Distribution 2-Sigma Bell Curve Graph"
                fill
                className="object-contain rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* 3 Core Pedagogy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50/80 border border-amber-100 p-2.5 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <div className="relative w-full h-full">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="inline-block text-[11px] font-bold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full mb-2">
                  {card.badge}
                </div>
                <h4 className="text-xl font-bold text-slate-900 leading-snug mb-2 font-heading group-hover:text-amber-600 transition-colors">
                  {card.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-inter">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
