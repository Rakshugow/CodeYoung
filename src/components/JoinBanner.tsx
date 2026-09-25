'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

export default function JoinBanner() {
  return (
    <section className="py-12 lg:py-16 bg-[#FFF9EB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Section Heading */}
        <h2 className="heading-gold text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-bold leading-[1.2] lg:leading-[64px] tracking-tight font-satoshi text-center pb-[11px] max-w-4xl mx-auto">
          Join thousands of happy parents to provide quality, effective learning to your kid today
        </h2>

        {/* Banner with Group of Kids Image */}
        <div className="relative w-full max-w-[1128px] h-[240px] sm:h-[340px] md:h-[400px] rounded-[32px] overflow-hidden mt-8 shadow-sm">
          <Image
            src="/images/student_group_mobile.png"
            alt="Join happy parents at Codeyoung"
            fill
            className="object-cover object-center"
          />

          {/* Centered CTA Overlay with Glass Tag */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/25 backdrop-blur-[1px] p-6 text-center">
            <span className="text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-4 bg-white/25 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/40 shadow-md">
              50,000+ Happy Families Worldwide
            </span>
            <Link
              href="/book-a-demo"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-2xl font-bold text-base sm:text-lg bg-gradient-to-b from-[#FFD361] to-[#FFC52E] text-[#943000] border-b-4 border-[#FBB600] active:border-b-0 active:translate-y-1 hover:brightness-105 shadow-2xl transition-all font-satoshi group"
              style={{
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.4)',
              }}
            >
              <span>Book a FREE trial class</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
