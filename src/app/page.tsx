'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MetricsBar from '@/components/MetricsBar';
import ProvenAdvantage from '@/components/ProvenAdvantage';
import GettingStarted from '@/components/GettingStarted';
import CoursesGrid from '@/components/CoursesGrid';
import CheckoutCallout from '@/components/CheckoutCallout';
import Ecosystem from '@/components/Ecosystem';
import StemBanner from '@/components/StemBanner';
import ReviewsTrustpilot from '@/components/ReviewsTrustpilot';
import WhatSetsUsApart from '@/components/WhatSetsUsApart';
import MentorsShowcase from '@/components/MentorsShowcase';
import MediaAndAwards from '@/components/MediaAndAwards';
import JoinBanner from '@/components/JoinBanner';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { MessageCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col selection:bg-amber-200 selection:text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MetricsBar />
        <ProvenAdvantage />
        <GettingStarted />
        <CoursesGrid />
        <CheckoutCallout />
        <Ecosystem />
        <StemBanner />
        <ReviewsTrustpilot />
        <WhatSetsUsApart />
        <MentorsShowcase />
        <MediaAndAwards />
        <JoinBanner />
        <FaqSection />
      </main>
      <Footer />

      {/* Floating Action Button for Chat */}
      <FloatingActionButton
        icon={<MessageCircle className="w-6 h-6" />}
        onClick={() => console.log('Chat clicked')}
        position="bottom-right"
        variant="primary"
        tooltip="Chat with us"
      />
    </div>
  );
}
