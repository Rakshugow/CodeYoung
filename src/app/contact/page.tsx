'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col selection:bg-amber-200">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb Bar */}
        <div className="bg-white border-b border-slate-100 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-semibold text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span>/</span>
            <span className="text-amber-700 font-bold">Contact Us</span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="py-16 bg-white border-b border-slate-200/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="heading-slate text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight font-satoshi text-center pb-[11px]">
              Contact us
            </h1>
            <p className="subtitle-cy text-base sm:text-lg text-[#2F4F4F] leading-relaxed max-w-2xl mx-auto font-satoshi">
              Whether you have a question, need support, or want to raise a concern, our team is ready to help. Start with our Support Team, and if your issue remains unresolved, you can escalate it through the appropriate channels below.
            </p>
          </div>
        </section>

        {/* Primary Contact Channels & Form */}
        <section className="py-16 bg-[#FFFDF7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct channels */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                    General inquiries
                  </h2>
                  <p className="text-sm text-slate-600">
                    Not sure where to start? Reach us here and we&apos;ll direct your message to the right person within minutes.
                  </p>
                </div>

                {/* WhatsApp Box */}
                <a
                  href="https://wa.me/918884459977"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 p-2.5 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/images/contact/whatsapp.svg"
                        alt="WhatsApp"
                        width={28}
                        height={28}
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        WhatsApp Live Chat
                      </span>
                      <span className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        +91 88844 59977
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <Image
                      src="/images/contact/arrow-up-right.svg"
                      alt="Arrow"
                      width={14}
                      height={14}
                    />
                  </div>
                </a>

                {/* Email Box */}
                <a
                  href="mailto:support@codeyoung.com"
                  className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 p-2.5 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/images/contact/email.svg"
                        alt="Email"
                        width={28}
                        height={28}
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Email Support
                      </span>
                      <span className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                        support@codeyoung.com
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                    <Image
                      src="/images/contact/arrow-up-right.svg"
                      alt="Arrow"
                      width={14}
                      height={14}
                    />
                  </div>
                </a>

                {/* Escalation Hierarchy Section */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                    <span>We&apos;re here at every step</span>
                  </h3>

                  {/* Tier 1 Escalation */}
                  <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/80">
                    <span className="text-xs font-bold text-amber-900 block mb-1">
                      72 hours passed. Still no resolution?
                    </span>
                    <p className="text-xs text-slate-600 mb-2">
                      Our Grievance Redressal Officer will handle your case immediately.
                    </p>
                    <a
                      href="mailto:grievances@codeyoung.com"
                      className="text-xs font-extrabold text-amber-800 hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>grievances@codeyoung.com</span>
                    </a>
                  </div>

                  {/* Tier 2 Escalation */}
                  <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200/80">
                    <span className="text-xs font-bold text-blue-900 block mb-1">
                      7 days passed. Still no resolution?
                    </span>
                    <p className="text-xs text-slate-600 mb-2">
                      Our Co-Founder steps in, personally.
                    </p>
                    <a
                      href="mailto:rupika@codeyoung.com"
                      className="text-xs font-extrabold text-blue-800 hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>rupika@codeyoung.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-lg">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Send us a message
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Our team typically responds within 2 business hours.
                  </p>

                  {submitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900">
                        Thank you for reaching out!
                      </h4>
                      <p className="text-sm text-slate-600 max-w-sm mx-auto">
                        We have received your message and our team will get in touch with you at <strong className="text-slate-900">{form.email}</strong> shortly.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
                        }}
                        className="mt-4 px-6 py-2.5 rounded-full font-semibold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="your.email@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 000-0000"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Inquiry Subject
                        </label>
                        <select
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                        >
                          <option value="General Question">General Question</option>
                          <option value="Course Inquiry">Course & Curriculum Inquiry</option>
                          <option value="Demo Rescheduling">Trial Class Rescheduling</option>
                          <option value="Payment & Billing">Payment & Billing Support</option>
                          <option value="Technical Issue">Sandbox / Portal Technical Issue</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Your Message *
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="How can we help your child's learning journey?"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-full font-bold text-base bg-[#FFB800] hover:bg-[#F59E0B] text-slate-950 shadow-md hover:shadow-pill-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 mt-4"
                      >
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
