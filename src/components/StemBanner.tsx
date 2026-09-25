'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Award, CheckCircle } from 'lucide-react';

export default function StemBanner() {
  return (
    <section className="py-10 bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded-2xl p-2 shadow-sm border border-amber-100">
              <Image
                src="/images/stem_big.png"
                alt="STEM.org Accredited Educational Experience"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full font-satoshi">
                  Accredited Program
                </span>
                <span className="text-xs font-medium text-[#477777] font-satoshi">STEM.ORG Verified</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#2F4F4F] font-satoshi">
                Globally recognized STEM.ORG accredited program
              </h3>
              <p className="text-xs sm:text-sm text-[#477777] mt-0.5 max-w-xl font-satoshi">
                Carefully crafted pedagogical framework adhering to international standards of Science, Technology, Engineering, and Mathematics education.
              </p>
            </div>
          </div>

          <a
            href="https://www.credential.net/7743d25a-b3be-434c-aec8-6eeb2e56052c?_ga=2.184108192.762835980.1622747493-71842715.1622597353#gs.8gbtvn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[16px] font-semibold text-xs sm:text-sm bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/50 shadow-sm transition-all flex-shrink-0 font-satoshi"
          >
            <span>Verify Credential</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
