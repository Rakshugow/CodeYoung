'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function GettingStarted() {
  const steps = [
    {
      step: '01',
      title: 'Select Course',
      subtitle: "Choose the subject and grade bracket tailored to your kid's curiosity",
      image: '/images/select_course.png',
      tag: 'Step 1',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      step: '02',
      title: 'Book a FREE Trial Class',
      subtitle: 'Pick your preferred date, time, and mentor in less than 60 seconds',
      image: '/images/book_free_trail.png',
      tag: 'Step 2',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      step: '03',
      title: 'Enroll & Accelerate',
      subtitle: 'Experience live 1:1 individualized learning and watch your child thrive',
      image: '/images/enroll.png',
      tag: 'Step 3',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Simple 3-Step Journey</span>
          </div>
          <h2 className="heading-slate text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.15] lg:leading-[64px] tracking-tight font-satoshi text-center pb-[11px]">
            Getting started is super easy
          </h2>
          <p className="subtitle-cy mt-4 font-satoshi">
            Take a demo session for FREE and experience the difference — a fun-filled personalized class is waiting for your child!
          </p>
        </div>

        {/* 3 Step Cards Wrapper */}
        <div className="relative">
          {/* Connecting Line on Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[18%] right-[18%] h-[2px] border-t-2 border-dashed border-slate-200 -z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {steps.map((item, idx) => (
              <div
                key={item.step}
                className="bg-[#FFFDF7] rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center text-center group"
              >
                {/* Step Pill */}
                <div className="w-full flex items-center justify-between mb-4">
                  <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${item.badgeColor}`}>
                    {item.tag}
                  </span>
                  <span className="font-heading text-2xl font-black text-slate-300 group-hover:text-amber-500 transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Step Illustration */}
                <div className="relative w-48 h-40 my-2 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Step Title */}
                <h3 className="font-satoshi text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors mt-3 mb-2">
                  {item.title}
                </h3>

                {/* Step Subtitle */}
                <p className="font-satoshi text-sm text-slate-600 leading-relaxed max-w-[260px] mx-auto">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Action Callout Below Steps */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-[16px] font-semibold text-base sm:text-lg bg-gradient-to-b from-[#FFD361] to-[#FFC52E] text-[#943000] border-b-4 border-[#FBB600] active:border-b-0 active:translate-y-1 hover:brightness-105 shadow-md hover:shadow-pill-hover transition-all font-satoshi group"
            style={{
              boxShadow: '0 8px 20px -4px rgba(245, 158, 11, 0.4)',
            }}
          >
            <span>Book a FREE trial class today</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>No credit card required • Zero commitment</span>
          </div>
        </div>
      </div>
    </section>
  );
}

