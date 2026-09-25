'use client';

import React from 'react';
import Image from 'next/image';
import { Trophy, Award, Newspaper } from 'lucide-react';

export default function MediaAndAwards() {
  const mediaLogos = [
    { name: 'Media 1', img: '/images/media_1.png' },
    { name: 'Media 2', img: '/images/media_2.png' },
    { name: 'Media 3', img: '/images/media_3.png' },
    { name: 'Media 4', img: '/images/media_4.png' },
    { name: 'Media 5', img: '/images/media_5.png' },
    { name: 'Media 6', img: '/images/media_6.png' },
    { name: 'Media 7', img: '/images/media_7.png' },
    { name: 'Media 8', img: '/images/media_8.png' },
  ];

  const awards = [
    {
      title: 'GSV Cup Finalists — Elite Top 25',
      desc: 'Selected among top global EdTech innovators across 100+ countries at the ASU+GSV Summit.',
      badgeImg: '/images/rewards_1.svg',
      year: 'Global Finalist',
    },
    {
      title: 'EdTech Startup of the Year - 2023',
      desc: 'Recognized for pioneering mastery-based 1:1 online education at the India Startup Summit.',
      badgeImg: '/images/rewards_2.svg',
      year: 'Winner 2023',
    },
    {
      title: 'Select 200 Companies - Forbes India DGEMS',
      desc: 'Featured in the prestigious Forbes India DGEMS list of high-growth technology enterprises.',
      badgeImg: '/images/rewards_3.svg',
      year: 'Forbes India 2023',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50/70 relative overflow-hidden border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Media Coverage Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Global Press & Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight pb-2">
            Codeyoung in the Global Media
          </h2>
        </div>

        {/* Media Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center justify-items-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs mb-20">
          {mediaLogos.map((m, i) => (
            <div
              key={i}
              className="relative w-28 h-12 grayscale hover:grayscale-0 transition-all opacity-65 hover:opacity-100 flex items-center justify-center"
            >
              <Image
                src={m.img}
                alt={m.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Rewards and Recognitions Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-200/70 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Industry Honors</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight pb-2">
            Awards &amp; Global Recognitions
          </h2>
        </div>

        {/* 3 Awards Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center group"
            >
              {/* Award SVG Badge Container */}
              <div className="relative w-36 h-36 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Image
                  src={award.badgeImg}
                  alt={award.title}
                  fill
                  className="object-contain"
                />
              </div>

              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-3">
                {award.year}
              </span>

              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                {award.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {award.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
