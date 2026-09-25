'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export default function CheckoutCallout() {
  return (
    <section className="py-8 bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 rounded-3xl p-8 sm:p-10 shadow-xl border border-amber-300/80 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle background ambient circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/30 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center gap-5 text-center lg:text-left relative z-10">
            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-slate-950 text-[#FFD361] items-center justify-center flex-shrink-0 shadow-lg">
              <Zap className="w-8 h-8 fill-current" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/10 text-slate-950 text-xs font-extrabold uppercase tracking-wider mb-2">
                <span>Fast & Flexible Enrollment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 font-satoshi leading-tight">
                Pick a learning track, book in 60s, and start learning!
              </h3>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-3 text-xs sm:text-sm font-bold text-slate-900/90 font-satoshi">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                  100% Satisfaction Guarantee
                </span>
                <span>•</span>
                <span>Free Rescheduling</span>
                <span>•</span>
                <span>Masters-Accredited Mentors</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto justify-center flex-shrink-0 relative z-10">
            <Link
              href="/book-a-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base bg-orange-500 text-white hover:bg-orange-600 shadow-xl hover:shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-satoshi group"
            >
              <span>Book Your Free Trial</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
