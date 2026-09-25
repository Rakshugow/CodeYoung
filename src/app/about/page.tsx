'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, GraduationCap, Quote, Users, Globe2, Sparkles, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col selection:bg-amber-200">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb Bar */}
        <div className="bg-white border-b border-slate-100 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-semibold text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span>/</span>
            <span className="text-amber-700 font-bold">About Us</span>
          </div>
        </div>

        {/* Hero Section: Our Story */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-[#FFFDF7] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <h1 className="heading-slate text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight font-satoshi text-center pb-[11px]">
                Our story
              </h1>
              <p className="subtitle-cy text-lg sm:text-xl text-[#2F4F4F] leading-relaxed font-satoshi">
                We believe kids of today are the innovators of tomorrow, and we want to empower them through effective and simplified education to unlock their learning potential to the maximum.
              </p>
            </div>

            {/* Central Graphic */}
            <div className="mt-12 relative w-full max-w-4xl mx-auto h-[240px] sm:h-[360px] md:h-[440px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white">
              <Image
                src="/images/our-story-tablet.png"
                alt="Codeyoung Story"
                fill
                priority
                className="object-contain p-4"
              />
            </div>
          </div>
        </section>

        {/* Meet the Founders */}
        <section className="py-16 lg:py-24 bg-white border-y border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="heading-slate text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight font-satoshi text-center pb-[11px]">
                Meet the founders behind the vision
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Founder 1: Shailendra Dhakad */}
              <div className="bg-[#FFFDF7] rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-400 shadow-md bg-white">
                    <Image
                      src="/images/shailendra.png"
                      alt="Shailendra Dhakad"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Shailendra Dhakad
                    </h3>
                    <p className="text-sm font-semibold text-amber-600 mt-1">
                      Co-founder &amp; CEO
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full mt-2">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <span>IIT Delhi Alumnus</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 italic text-slate-600 text-sm leading-relaxed relative">
                    <Quote className="w-5 h-5 text-amber-400 mb-2 opacity-60" />
                    &ldquo;Meaning of Education should be a process that empowers an individual to do something which otherwise they cannot.&rdquo;
                  </div>
                </div>
              </div>

              {/* Founder 2: Rupika Taneja */}
              <div className="bg-[#FFFDF7] rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-400 shadow-md bg-white">
                    <Image
                      src="/images/rupika.png"
                      alt="Rupika Taneja"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Rupika Taneja
                    </h3>
                    <p className="text-sm font-semibold text-amber-600 mt-1">
                      Co-founder &amp; COO
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full mt-2">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <span>IIT Delhi Alumnus</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 italic text-slate-600 text-sm leading-relaxed relative">
                    <Quote className="w-5 h-5 text-amber-400 mb-2 opacity-60" />
                    &ldquo;I deeply believe that if the innate creativity in kids is properly nurtured &amp; finds expression, we can cultivate leaders.&rdquo;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Journey Section */}
        <section className="py-16 lg:py-24 bg-[#FFFDF7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-600 bg-amber-100/70 px-3.5 py-1.5 rounded-full inline-block border border-amber-200">
                  Milestones
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  The journey
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Codeyoung started out in 2019 end, and we&apos;ve come a long way since then. We are growing ever since - serving parents the best we can to be a pivotal part of their kids&apos; adventure of learning and growth.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Along the way, we have been recognized by prestigious organizations and parents themselves for our efforts and contributions in the online education sector globally.
                </p>

                <div className="p-6 rounded-2xl bg-amber-100/60 border border-amber-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl flex-shrink-0">
                    20k+
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    students are enrolled with us and are a part of the ever expanding learning community
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 flex items-center justify-center">
                <div className="relative w-full max-w-lg h-[260px] sm:h-[340px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white">
                  <Image
                    src="/images/journey.png"
                    alt="Codeyoung Journey Timeline"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black">
                Join thousands of happy parents to provide quality, effective learning to your kid today
              </h3>
              <p className="text-sm font-semibold text-slate-900/80 mt-1">
                Book a 1:1 live trial session and experience the difference.
              </p>
            </div>
            <Link
              href="/book-a-demo"
              className="px-8 py-4 rounded-full font-black text-sm bg-slate-950 text-white hover:bg-slate-800 shadow-xl transition-all hover:scale-105 flex-shrink-0"
            >
              Book a FREE trial
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
