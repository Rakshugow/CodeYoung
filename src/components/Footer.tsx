'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const codingLinks = [
    { title: 'Scratch Classes for Kids', href: '/courses/coding' },
    { title: 'MIT App Inventor Classes', href: '/courses/coding' },
    { title: 'Web Development Classes', href: '/courses/coding' },
    { title: 'App Development Classes', href: '/courses/coding' },
    { title: 'Python Classes for Kids', href: '/courses/coding' },
    { title: 'Artificial Intelligence Classes', href: '/courses/coding' },
    { title: 'Deep Learning & Gen AI', href: '/courses/coding' },
  ];

  const mathLinks = [
    { title: 'Math Classes for Grade 1', href: '/courses/math' },
    { title: 'Math Classes for Grade 2', href: '/courses/math' },
    { title: 'Math Classes for Grade 3', href: '/courses/math' },
    { title: 'Math Classes for Grade 4', href: '/courses/math' },
    { title: 'Math Classes for Grade 5', href: '/courses/math' },
    { title: 'Math Classes for Grade 6-8', href: '/courses/math' },
    { title: 'Vedic & Mental Math Classes', href: '/courses/math' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '/images/facebook.png', url: 'https://facebook.com/codeyoung' },
    { name: 'YouTube', icon: '/images/youtube.png', url: 'https://youtube.com/codeyoung' },
    { name: 'Instagram', icon: '/images/instagram.png', url: 'https://instagram.com/codeyoung' },
    { name: 'LinkedIn', icon: '/images/linkedin.png', url: 'https://linkedin.com/company/codeyoung' },
    { name: 'Twitter', icon: '/images/twitter.png', url: 'https://twitter.com/codeyoung' },
  ];

  return (
    <footer className="bg-white text-slate-600 pt-16 pb-12 border-t border-slate-200/80 font-satoshi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Brand, Socials & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200/80">
          {/* Logo & Description */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-56 h-16">
                <Image
                  src="/images/primary_logo.png"
                  alt="Codeyoung Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-[#437070] max-w-sm leading-relaxed">
              Empowering next-generation learners through personalized 1:1 online classes in Coding, Math, English, and Science.
            </p>

            {/* Social Icons Strip */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2F4F4F] block mb-3">
                Follow Codeyoung
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-10 h-10 rounded-xl bg-white border border-[#d9d9d9] p-2 flex items-center justify-center hover:shadow-sm hover:scale-105 transition-all"
                  >
                    <Image
                      src={s.icon}
                      alt={s.name}
                      width={22}
                      height={22}
                      className="object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F4F4F] block mb-2">
              Get In Touch
            </span>
            <div className="space-y-3">
              <a
                href="mailto:support@codeyoung.com"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#d9d9d9] hover:border-[#5c7cff] transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#946b00] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#437070] font-medium">Customer Support Email</div>
                  <div className="text-sm font-semibold text-[#2F4F4F] group-hover:text-[#3333ff] transition-colors">
                    support@codeyoung.com
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/918884459977"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#d9d9d9] hover:border-[#5c7cff] transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#437070] font-medium">Official WhatsApp Desk</div>
                  <div className="text-sm font-semibold text-[#2F4F4F] group-hover:text-[#3333ff] transition-colors">
                    +91-88844-59977
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F4F4F] block mb-2">
              Free Experience
            </span>
            <p className="text-xs text-[#437070] leading-relaxed">
              Book a 1:1 live trial session with a dedicated mentor. Discover your child’s customized learning path today.
            </p>
            <Link
              href="/book-a-demo"
              className="inline-flex w-full items-center justify-center gap-2 py-3.5 px-6 rounded-[16px] font-semibold text-sm bg-gradient-to-b from-[#FFD361] to-[#FFC52E] text-[#943000] border-b-4 border-[#FBB600] active:border-b-0 active:translate-y-1 hover:brightness-105 shadow-md transition-all font-satoshi"
            >
              <span>Book a FREE trial class</span>
            </Link>
          </div>
        </div>

        {/* Middle Tier: Course Directories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-[#d9d9d9] text-xs sm:text-sm">
          {/* Track 1: Primary Courses */}
          <div>
            <h4 className="font-bold text-[#2F4F4F] uppercase tracking-wider text-xs mb-3">
              Core Tracks
            </h4>
            <ul className="space-y-2 text-[#437070]">
              <li>
                <Link href="/courses/coding" className="hover:text-[#2F4F4F] transition-colors">
                  Online Coding Classes
                </Link>
              </li>
              <li>
                <Link href="/courses/math" className="hover:text-[#2F4F4F] transition-colors">
                  Online Math Classes
                </Link>
              </li>
              <li>
                <Link href="/courses/english" className="hover:text-[#2F4F4F] transition-colors">
                  Online English Classes
                </Link>
              </li>
              <li>
                <Link href="/courses/science" className="hover:text-[#2F4F4F] transition-colors">
                  Online Science Classes
                </Link>
              </li>
              <li>
                <Link href="/book-a-demo" className="hover:text-[#2F4F4F] transition-colors">
                  Robotics &amp; AI
                </Link>
              </li>
              <li>
                <Link href="/book-a-demo" className="hover:text-[#2F4F4F] transition-colors">
                  Financial Literacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Track 2: Coding Deep Dive */}
          <div>
            <h4 className="font-bold text-[#2F4F4F] uppercase tracking-wider text-xs mb-3">
              Coding Topics
            </h4>
            <ul className="space-y-2 text-[#437070]">
              {codingLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="hover:text-[#2F4F4F] transition-colors">
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Track 3: Math Deep Dive */}
          <div>
            <h4 className="font-bold text-[#2F4F4F] uppercase tracking-wider text-xs mb-3">
              Math Grades
            </h4>
            <ul className="space-y-2 text-[#437070]">
              {mathLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="hover:text-[#2F4F4F] transition-colors">
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Track 4: Portals & Company */}
          <div>
            <h4 className="font-bold text-[#2F4F4F] uppercase tracking-wider text-xs mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-[#437070]">
              <li>
                <Link href="/about" className="hover:text-[#2F4F4F] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2F4F4F] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://studentportal.codeyoung.com/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2F4F4F] transition-colors"
                >
                  Student Portal
                </a>
              </li>
              <li>
                <a
                  href="https://sandbox.codeyoung.com/#/login/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2F4F4F] transition-colors"
                >
                  Sandbox Platform
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#437070]">
          <div>
            Copyright &copy; 2024 Smart Owl Education Pvt Ltd. All rights reserved.
            <span className="block sm:inline sm:ml-2 text-[#2F4F4F] font-medium">CIN : U80902KA2020PTC141505</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-[#2F4F4F] transition-colors">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-[#2F4F4F] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
