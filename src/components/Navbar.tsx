'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCoursesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const courseItems = [
    {
      name: 'Coding',
      desc: 'Scratch, Python, AI & Web Dev',
      age: 'Ages 5-16',
      path: '/courses/coding',
      img: '/images/coding.png',
      color: 'text-blue-600',
    },
    {
      name: 'Math',
      desc: 'Mental arithmetic & Vedic math',
      age: 'Ages 5-18',
      path: '/courses/math',
      img: '/images/math.png',
      color: 'text-amber-700',
    },
    {
      name: 'English',
      desc: 'Reading, creative writing & speech',
      age: 'Ages 5-13',
      path: '/courses/english',
      img: '/images/english.png',
      color: 'text-teal-700',
    },
    {
      name: 'Science',
      desc: 'Hands-on experiments & physics',
      age: 'Ages 5-12',
      path: '/courses/science',
      img: '/images/science.png',
      color: 'text-emerald-700',
    },
  ];

  return (
    <div className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-[#f2f2f2] shadow-[0_6px_8px_0_rgba(0,0,0,0.02)] transition-all duration-300">
      <header className="w-full bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 sm:h-22 md:h-24">
          {/* Logo */}
          <Link href="/" className="relative block w-[170px] h-[52px] sm:w-[210px] sm:h-[64px] md:w-[250px] md:h-[76px] lg:w-[280px] lg:h-[84px] flex-shrink-0 transition-transform hover:scale-[1.02]">
            <Image
              src="/images/primary_logo.png"
              alt="website-logo"
              fill
              priority
              className="object-contain object-left"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 font-satoshi">
            <Link
              href="/"
              className="px-3.5 py-2 text-[16px] font-semibold text-[#2F4F4F] hover:text-[#000000] rounded-xl hover:bg-slate-50 transition-colors"
            >
              Home
            </Link>

            {/* Courses Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                className="inline-flex items-center gap-1 px-3.5 py-2 text-[16px] font-semibold text-[#2F4F4F] hover:text-[#000000] rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span>Courses</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#477777] transition-transform duration-200 ${
                    coursesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {coursesDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2.5 mt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    1:1 Online Programs
                  </div>
                  {courseItems.map((c) => (
                    <Link
                      key={c.name}
                      href={c.path}
                      onClick={() => setCoursesDropdownOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-[15px] font-medium text-[#2F4F4F] hover:text-[#000000] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-lg bg-amber-50/60 p-1 flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={c.img}
                            alt={c.name}
                            fill
                            className="object-contain p-0.5 group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                            {c.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal">
                            {c.desc}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {c.age}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="px-3.5 py-2 text-[15px] font-semibold text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-100/80 transition-colors"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="px-3.5 py-2 text-[15px] font-semibold text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-100/80 transition-colors"
            >
              Contact Us
            </Link>

            {/* CTAs */}
            <div className="flex items-center pl-3 gap-2.5">
              <Link
                href="/login"
                className="inline-flex items-center justify-center font-semibold text-sm px-4 py-2.5 rounded-full border border-slate-300/80 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-xs"
              >
                Sign In
              </Link>

              <Link
                href="/book-a-demo"
                className="inline-flex items-center justify-center font-bold text-sm px-5 py-2.5 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md hover:shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-satoshi"
              >
                Book Free Trial
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/book-a-demo"
              className="px-4 py-2 rounded-full font-bold text-xs bg-orange-500 text-white shadow-sm hover:bg-orange-600"
            >
              Free Trial
            </Link>
            <button
              type="button"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-3 shadow-lg animate-in slide-in-from-top">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-slate-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[15px] font-medium text-[#1e293b] hover:text-black"
            >
              Home
            </Link>

            <div className="py-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Courses
              </span>
              <div className="grid grid-cols-2 gap-2 pl-2">
                {courseItems.map((c) => (
                  <Link
                    key={c.name}
                    href={c.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-amber-50 text-sm font-medium text-[#1e293b]"
                  >
                    <Image src={c.img} alt={c.name} width={20} height={20} />
                    <span>{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[15px] font-medium text-[#1e293b] hover:text-black"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[15px] font-medium text-[#1e293b] hover:text-black"
            >
              Contact Us
            </Link>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/book-a-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-bold text-sm bg-orange-500 text-white shadow-md hover:bg-orange-600 transition-all"
              >
                Book Free Trial
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-semibold text-sm border border-slate-200 text-[#1e293b] hover:bg-slate-50 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
