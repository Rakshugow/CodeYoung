'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const orbitalPills = [
    {
      name: 'Coding',
      icon: '/images/coding.png',
      textColor: '#2E5CFF',
      bgHover: 'hover:bg-blue-50',
      angle: 300, // Upper-Left
      hasSparkle: true,
      sparklePos: '-top-3 -right-2',
    },
    {
      name: 'Science',
      icon: '/images/science.png',
      textColor: '#0A7A51',
      bgHover: 'hover:bg-emerald-50',
      angle: 0, // Top
      hasSparkle: false,
    },
    {
      name: 'English',
      icon: '/images/english.png',
      textColor: '#12706B',
      bgHover: 'hover:bg-teal-50',
      angle: 60, // Upper-Right
      hasSparkle: true,
      sparklePos: '-top-3 -left-2',
    },
    {
      name: 'Financial Literacy',
      icon: '/images/finance.png',
      textColor: '#AF1DE2',
      bgHover: 'hover:bg-purple-50',
      angle: 120, // Lower-Right
      hasSparkle: false,
    },
    {
      name: 'Robotics',
      icon: '/images/robotics.png',
      textColor: '#E51A32',
      bgHover: 'hover:bg-red-50',
      angle: 180, // Bottom
      hasSparkle: false,
    },
    {
      name: 'Math',
      icon: '/images/math.png',
      textColor: '#8A600D',
      bgHover: 'hover:bg-amber-50',
      angle: 240, // Lower-Left
      hasSparkle: true,
      sparklePos: '-bottom-2 -right-2',
    },
  ];

  return (
    <section ref={heroRef} className="relative pt-16 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-white via-white to-slate-50/70 border-b border-slate-100">
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-100/25 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-3xl transform translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (Content & CTAs) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-6 text-center lg:text-left">
            {/* Formal Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-slate-800 text-xs font-semibold tracking-wide w-fit mx-auto lg:mx-0 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>STEM.org Accredited • Ages 5-18 Programs</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-slate-900 leading-[1.14] tracking-tight font-heading">
              1:1 Live Online Mentorship for Your Child&apos;s Full Potential
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-inter">
              Empowering young learners through personalized mastery curriculum in Coding, Math, Science & English. One dedicated mentor, tailored pace, and clear academic progress.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                href="/book-a-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-base bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-xl hover:shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-satoshi group"
              >
                <span>Book a FREE Trial Class</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#curriculum"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-base bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-all font-satoshi shadow-xs"
              >
                <span>View Curriculum</span>
              </Link>
            </div>

            {/* Live Trust Badges & Ratings */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 border-t border-slate-200/80">
              {/* Google Reviews Card */}
              <div className="flex items-center gap-3 bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-xs hover:shadow-sm transition-shadow">
                <div className="w-7 h-7 relative flex-shrink-0">
                  <Image
                    src="/images/google_review.png"
                    alt="Google Reviews"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-slate-900 text-sm">4.5</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">2,365+ Google reviews</span>
                </div>
              </div>

              {/* Trustpilot Card */}
              <a
                href="https://www.trustpilot.com/review/www.codeyoung.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-xs hover:shadow-sm transition-shadow group"
              >
                <div className="w-7 h-7 relative flex-shrink-0">
                  <Image
                    src="/images/trustpilot_img.png"
                    alt="Trustpilot"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-700">
                      Trustpilot
                    </span>
                    <span className="font-extrabold text-xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
                      4.4 ★
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">Excellent rating</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column (Hero Visual with Circular Orbit Badges) */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center p-4">
            {/* Atmospheric ambient circles */}
            <div className="absolute w-[400px] h-[400px] sm:w-[520px] sm:h-[520px] rounded-full bg-gradient-to-tr from-amber-200/30 to-yellow-100/40 -z-10 blur-3xl transform -translate-y-4"></div>

            {/* Central Hero Outline & Girl Image with Circular Moving Orbit */}
            <div className="orbit-system relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[560px] xl:max-w-[620px] aspect-[1080/918] flex items-center justify-center select-none mx-auto">
              {/* Static Ambient Glow and Orbit Boundary */}
              <div className="absolute inset-[-4%] sm:inset-[-6%] rounded-full border border-amber-200/40 -z-10 pointer-events-none"></div>
              <div className="absolute inset-[4%] sm:inset-[2%] rounded-full bg-gradient-to-tr from-amber-200/20 via-yellow-100/25 to-emerald-100/15 blur-2xl -z-10 pointer-events-none"></div>

              {/* The Student Image (Centered & Large) */}
              <div className="relative w-full h-full pointer-events-none">
                <Image
                  src="/images/homepage_hero_outline.9a3d1ae9.webp"
                  alt="Codeyoung 1:1 Live Student Learning"
                  fill
                  priority
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 95vw, (max-width: 1024px) 50vw, 620px"
                />
              </div>

              {/* Revolving Circular Orbit Track & Moving Subjects */}
              <div className="animate-orbit-spin absolute top-1/2 left-1/2 w-[104%] sm:w-[106%] aspect-square rounded-full pointer-events-none z-20">
                {/* Visible Glowing Dashed Orbit Track */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/60 pointer-events-none shadow-[0_0_15px_rgba(251,191,36,0.2)]"></div>

                {/* 6 Orbital Spokes circling her */}
                {orbitalPills.map((pill) => (
                  <div
                    key={pill.name}
                    className="absolute inset-0 pointer-events-none"
                    style={{ transform: `rotate(${pill.angle}deg)` }}
                  >
                    {/* Position badge at top of the revolving perimeter */}
                    <div className="absolute -top-3.5 sm:-top-5 left-1/2 -translate-x-1/2 pointer-events-auto">
                      {/* Fixed counter-rotation for spoke angle */}
                      <div style={{ transform: `rotate(-${pill.angle}deg)` }}>
                        {/* Dynamic counter-rotation so badge stays level while orbiting */}
                        <div className="animate-counter-orbit-spin">
                          <div className="relative group transition-all duration-300 hover:scale-115">
                            <div
                              className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-white/95 glass-badge shadow-md hover:shadow-2xl transition-all cursor-pointer ${pill.bgHover}`}
                            >
                              <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                                <Image
                                  src={pill.icon}
                                  alt={pill.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span
                                className="text-xs sm:text-sm font-bold whitespace-nowrap"
                                style={{ color: pill.textColor }}
                              >
                                {pill.name}
                              </span>
                            </div>

                            {/* Sparkle Vector Accent */}
                            {pill.hasSparkle && (
                              <div className={`absolute ${pill.sparklePos} w-5 h-5 pointer-events-none animate-pulse`}>
                                <Image
                                  src="/images/new-sparkle.99482c1d.png"
                                  alt="Sparkle"
                                  width={20}
                                  height={20}
                                  className="object-contain"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

