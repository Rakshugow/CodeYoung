'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, Users, Award, Sparkles, TrendingUp } from 'lucide-react';

export default function MetricsBar() {
  const [count, setCount] = useState(58000);

  useEffect(() => {
    const target = 61071;
    const duration = 1600;
    const step = 40;
    const increment = (target - 58000) / (duration / step);

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev + increment >= target) {
          clearInterval(timer);
          return target;
        }
        return Math.floor(prev + increment);
      });
    }, step);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      value: `${count.toLocaleString()}+`,
      label: 'Students Enrolled',
      sub: 'Across 15+ countries worldwide',
      bg: 'bg-blue-50/70',
      border: 'border-blue-100',
    },
    {
      icon: <Star className="w-5 h-5 text-amber-500 fill-current" />,
      value: '4.9 / 5',
      label: 'Parent Satisfaction',
      sub: '2,365+ verified Google & Trustpilot reviews',
      bg: 'bg-amber-50/70',
      border: 'border-amber-100',
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      value: '< 1%',
      label: 'Top Mentor Selection',
      sub: 'Masters & engineering university alumni',
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-100',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-purple-600" />,
      value: '2-Sigma',
      label: 'Academic Growth',
      sub: 'Proven Bloom 1:1 mastery pedagogy',
      bg: 'bg-purple-50/70',
      border: 'border-purple-100',
    },
  ];

  return (
    <section className="w-full bg-[#FFFDF7] py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-amber-200/20 blur-3xl -z-10 rounded-full"></div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl bg-white border ${stat.border} shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                {idx === 0 && (
                  <div className="flex -space-x-2 overflow-hidden">
                    {['/images/co_mentor_1.png', '/images/math_mentor_01.png', '/images/eng_mentor_01.png'].map((src, i) => (
                      <div key={i} className="relative w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-xs">
                        <Image src={src} alt="Student / Mentor" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                {idx === 1 && (
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    Top Rated
                  </span>
                )}
                {idx === 2 && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Elite
                  </span>
                )}
                {idx === 3 && (
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    Validated
                  </span>
                )}
              </div>

              <div>
                <div className="font-heading text-3xl sm:text-4xl font-black text-slate-900 leading-tight tabular-nums group-hover:text-amber-600 transition-colors">
                  {stat.value}
                </div>
                <div className="font-heading text-base font-bold text-slate-800 mt-1">
                  {stat.label}
                </div>
                <div className="font-inter text-xs text-slate-500 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

