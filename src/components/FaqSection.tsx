'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is the duration and frequency of the classes?',
      answer:
        "Our live online classes for kids typically run for 1 hour and are held 2-4 times weekly. We offer flexible scheduling options to accommodate your child's busy schedule.",
    },
    {
      question: 'What all programs are available for my kids?',
      answer:
        'We provide the following programs for kids: Coding (Scratch, Web Dev, Python, AI/ML), Math (School Math, Mental Math, Vedic Math, Olympiad), English (Creative Writing, Public Speaking), Science, Robotics, and Financial Literacy classes.',
    },
    {
      question: 'Do you provide any assessments or evaluations?',
      answer:
        "Yes, we conduct periodic assessments to track your child's progress and identify areas for growth. These assessments help us tailor our instruction to meet your child's individual needs and ensure they are making meaningful progress.",
    },
    {
      question: 'What sets your online classes apart from other educational platforms?',
      answer:
        'Our live online classes for kids stand out for their interactive and engaging learning experiences, personalized 1:1 attention from qualified instructors, comprehensive curriculum covering various subjects, and flexible scheduling options. We are committed to fostering a supportive learning community where every child can thrive.',
    },
    {
      question: 'What equipment or technical setup is required for the classes?',
      answer:
        'A desktop computer or laptop with a working microphone, webcam, and stable internet connection (minimum 5 Mbps) is all you need. All our learning environments, IDEs, and whiteboards run right inside the web browser with zero complex installations.',
    },
    {
      question: 'Can I reschedule a session if my child has a conflict?',
      answer:
        'Yes, absolutely. We understand family schedules can change. You can easily reschedule any upcoming 1:1 session up to 6 hours before class time directly through your dedicated parent portal or by messaging your student success manager.',
    },
  ];

  return (
    <section id="faqs" className="py-16 lg:py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight pb-2">
            Frequently Asked Questions
          </h2>
          <p className="subtitle-cy mt-2 font-inter text-slate-600">
            Everything you need to know about our 1:1 online classes, curriculum, scheduling, and mentors.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200/90 rounded-2xl overflow-hidden transition-all bg-white shadow-xs hover:border-slate-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 pr-2">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-amber-100 text-amber-800' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
