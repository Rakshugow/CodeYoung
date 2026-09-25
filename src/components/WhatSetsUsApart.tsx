'use client';

import React from 'react';
import Image from 'next/image';

export default function WhatSetsUsApart() {
  const cards = [
    {
      title: 'Quality of curriculum',
      subtitle: 'Personalized curriculum focused on mastery through depth and practice',
      image: '/images/set_us_apart_1.png',
      tag: 'Academic Rigor',
    },
    {
      title: 'Progress monitoring',
      subtitle: 'Highly detailed personalized progress reports and mentor feedback',
      image: '/images/set_us_apart_2.png',
      tag: 'Visibility',
    },
    {
      title: 'Quality of teachers',
      subtitle: 'Highly passionate and qualified teachers with relevant background and STEM certifications',
      image: '/images/set_us_apart_3.png',
      tag: 'Top 1% Mentors',
    },
    {
      title: 'In-class & outside class engagement',
      subtitle: 'Student centric fun environment - community events, webinars, hackathons & more',
      image: '/images/set_us_apart_4.png',
      tag: 'Global Community',
    },
    {
      title: 'Adaptive AI based learning',
      subtitle: 'Learning journey aided by AI ensuring better learning outcomes and tailored exercises',
      image: '/images/set_us_apart_5.png',
      tag: 'Smart Technology',
    },
    {
      title: 'Hands-on learning',
      subtitle: 'Rigorous hands-on practice enabled through 1k+ of exercises & worksheets',
      image: '/images/set_us_apart_6.png',
      tag: 'Practical Projects',
    },
  ];

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="heading-slate text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.15] lg:leading-[64px] tracking-tight font-satoshi text-center pb-[11px]">
            What really sets us apart
          </h2>
        </div>

        {/* 6 Cards 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 hover:-translate-y-1 flex items-start gap-5 group"
            >
              {/* Icon Left with Soft Container */}
              <div className="relative w-14 h-14 rounded-2xl bg-amber-50/80 border border-amber-100 p-2.5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Title & Subtitle Right */}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full">
                    {card.tag}
                  </span>
                </div>
                <h3 className="font-satoshi text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-1.5">
                  {card.title}
                </h3>
                <p className="font-satoshi text-sm text-slate-600 leading-relaxed font-inter">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
