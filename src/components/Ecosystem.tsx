'use client';

import React from 'react';
import Image from 'next/image';
import { Apple, Play, ArrowRight, ExternalLink } from 'lucide-react';

export default function Ecosystem() {
  return (
    <section className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Learning Technology Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight pb-2">
            Integrated Platforms for Daily Academic Mastery
          </h2>
          <p className="subtitle-cy mt-2 font-inter text-slate-600">
            Equipping students with modern proprietary tools to practice, test hypotheses, and build lifelong learning habits.
          </p>
        </div>

        {/* Feature 1: AfterSchool App */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-slate-50/60 rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xs mb-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 text-xs font-bold uppercase tracking-wider border border-blue-200/60">
              Mobile Learning Platform
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              The Codeyoung <span className="text-amber-600">AfterSchool</span> App — Included for All Students
            </h3>

            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 relative flex-shrink-0">
                  <Image src="/images/blue_tick.png" alt="Tick" fill className="object-contain" />
                </div>
                <span className="text-sm sm:text-base font-medium text-slate-700">
                  Master school level Math and Science
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 relative flex-shrink-0">
                  <Image src="/images/blue_tick.png" alt="Tick" fill className="object-contain" />
                </div>
                <span className="text-sm sm:text-base font-medium text-slate-700">
                  20k+ quizzes & AI evaluations across all topics
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 relative flex-shrink-0">
                  <Image src="/images/blue_tick.png" alt="Tick" fill className="object-contain" />
                </div>
                <span className="text-sm sm:text-base font-medium text-slate-700">
                  Book live classes real-time when you need assistance
                </span>
              </div>
            </div>

            {/* Store Download Buttons */}
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-950 text-white hover:bg-slate-800 shadow-md transition-all hover:scale-105"
              >
                <div className="w-6 h-6 relative">
                  <Image src="/images/app_store.png" alt="iOS" fill className="object-contain" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Download on</div>
                  <div className="text-xs font-bold leading-none">Apple App Store</div>
                </div>
              </a>

              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-950 text-white hover:bg-slate-800 shadow-md transition-all hover:scale-105"
              >
                <div className="w-6 h-6 relative">
                  <Image src="/images/play_store.png" alt="Android" fill className="object-contain" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Get it on</div>
                  <div className="text-xs font-bold leading-none">Google Play Store</div>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[420px] h-[260px] sm:h-[300px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
              <Image
                src="/images/elevate_img_2.png"
                alt="Codeyoung AfterSchool App Interface"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>

        {/* Feature 2: Sandbox Platform */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-slate-50/60 rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xs">
          <div className="lg:col-span-5 order-2 lg:order-1 flex items-center justify-center">
            <div className="relative w-full max-w-[420px] h-[260px] sm:h-[300px] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white">
              <Image
                src="/images/elevate_img_1.png"
                alt="Codeyoung Sandbox Platform Interface"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-200/60">
              Interactive Web IDE
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              <span className="text-amber-600">Sandbox IDE:</span> Proprietary Coding &amp; Science Workbench
            </h3>

            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 relative flex-shrink-0">
                  <Image src="/images/orange_tick.png" alt="Tick" fill className="object-contain" />
                </div>
                <span className="text-sm sm:text-base font-medium text-slate-700">
                  Everything on the AfterSchool app + learn coding subjects
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 relative flex-shrink-0">
                  <Image src="/images/orange_tick.png" alt="Tick" fill className="object-contain" />
                </div>
                <span className="text-sm sm:text-base font-medium text-slate-700">
                  In-depth interactive exercises to help you master topics
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 relative flex-shrink-0">
                  <Image src="/images/orange_tick.png" alt="Tick" fill className="object-contain" />
                </div>
                <span className="text-sm sm:text-base font-medium text-slate-700">
                  Coding workbench, whiteboard and unlimited cloud storage
                </span>
              </div>
            </div>

            {/* Price tag & CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-xs sm:text-sm font-semibold text-slate-600 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full">
                <strong className="text-amber-700">$60/year value</strong> — comes <strong className="text-emerald-700">FREE</strong> with all live courses
              </span>
              <a
                href="https://sandbox.codeyoung.com/#/login/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 shadow-md transition-all hover:scale-105"
              >
                <span>Try Sandbox now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
