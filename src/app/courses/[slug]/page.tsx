'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Star,
  BookOpen,
  Award,
  Sparkles,
  ChevronDown,
  Layers,
  Code,
  Calculator,
  Compass,
  Laptop,
} from 'lucide-react';

interface CourseData {
  title: string;
  slug: string;
  themeColor: string;
  badge: string;
  heroImage: string;
  tagline: string;
  description: string;
  gradeBrackets: {
    id: string;
    label: string;
    ages: string;
    description: string;
    modules: {
      title: string;
      topics: string[];
      project: string;
    }[];
    tools: string[];
    outcomes: string[];
  }[];
  mentors: {
    name: string;
    degree: string;
    hours: string;
    quote: string;
    image: string;
    rating: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

const COURSES: Record<string, CourseData> = {
  coding: {
    title: 'Coding for Kids',
    slug: 'coding',
    themeColor: '#2E5CFF',
    badge: 'STEM.ORG Accredited',
    heroImage: '/images/codingHeroImg.c144f998.webp',
    tagline: 'Harness the power of Coding to create your own games, apps, and more!',
    description:
      'From foundational logic and block coding to Python, JavaScript, and Artificial Intelligence. 1:1 live guidance adapted to your child’s creative curiosity.',
    gradeBrackets: [
      {
        id: 'k2',
        label: 'Grades K - 2',
        ages: 'Ages 5 - 7',
        description: 'Visual block-based logic, sequencing, animation, and digital storytelling without typing hurdles.',
        modules: [
          {
            title: 'Foundations of Computational Logic',
            topics: ['Algorithmic Sequencing', 'Pattern Recognition', 'Loops & Repeats', 'Event Triggers'],
            project: 'Animated Interactive Fairy Tale & Maze Runner Game',
          },
          {
            title: 'Creative Block Programming',
            topics: ['Costume Animation', 'Sound & Music Effects', 'Conditional Logic', 'User Interaction'],
            project: 'Virtual Musical Instrument & Interactive Greeting Card',
          },
        ],
        tools: ['Scratch Junior', 'Code.org Studio', 'Tynker Blocks'],
        outcomes: [
          'Understand sequence and cause-and-effect in software',
          'Build self-directed interactive stories and animations',
          'Nurture problem-solving patience and error correction',
        ],
      },
      {
        id: '35',
        label: 'Grades 3 - 5',
        ages: 'Ages 8 - 10',
        description: 'Game design, physics simulation, multi-level Scratch projects, and early mobile app logic.',
        modules: [
          {
            title: 'Game Architecture & Physics',
            topics: ['Variables & Scoring Systems', 'Velocity & Gravity Simulation', 'Broadcast Messaging', 'Cloning'],
            project: 'Multi-Level Space Shooter & Flappy Bird Clone',
          },
          {
            title: 'Introduction to Mobile Apps',
            topics: ['UI Layouts & Buttons', 'Touch & Tilt Sensors', 'Text-to-Speech Modules', 'Local Storage'],
            project: 'Emergency Siren App & Whack-a-Mole Game on Phone',
          },
        ],
        tools: ['Scratch 3.0', 'MIT App Inventor', 'Thunkable'],
        outcomes: [
          'Design full 2D arcade games from conceptual blueprint to code',
          'Deploy real functional applications to Android / iOS devices',
          'Master conditional branching and nested iteration',
        ],
      },
      {
        id: '68',
        label: 'Grades 6 - 8',
        ages: 'Ages 11 - 13',
        description: 'Transition from blocks to typed code: HTML/CSS web design and core Python programming.',
        modules: [
          {
            title: 'Modern Web Development',
            topics: ['HTML5 Semantic Structure', 'CSS3 Flexbox & Grid Styling', 'DOM Manipulation', 'Responsive Web'],
            project: 'Personal Portfolio Website & Online Calculator',
          },
          {
            title: 'Core Python & Data Types',
            topics: ['Syntax & Indentation', 'Lists, Tuples, Dictionaries', 'Functions & Modular Code', 'Turtle Graphics'],
            project: 'Text Adventure RPG & Geometric Spirograph Generator',
          },
        ],
        tools: ['Python 3', 'VS Code Sandbox', 'HTML5 / CSS3', 'JavaScript'],
        outcomes: [
          'Write clean, readable Python code with standard syntax',
          'Publish responsive multi-page websites on the live internet',
          'Debug syntax and runtime logic errors independently',
        ],
      },
      {
        id: '912',
        label: 'Grades 9 - 12',
        ages: 'Ages 14 - 18',
        description: 'Object-Oriented Programming, Data Science, Artificial Intelligence, and Computer Vision.',
        modules: [
          {
            title: 'Object-Oriented Architecture',
            topics: ['Classes & Objects', 'Inheritance & Polymorphism', 'File I/O & Exception Handling', 'Pygame'],
            project: 'Complete Retro Arcade Platformer with Sound & Particle Effects',
          },
          {
            title: 'Applied AI & Computer Vision',
            topics: ['NumPy & Pandas Analysis', 'OpenCV Face Detection', 'Machine Learning Models', 'GenAI APIs'],
            project: 'Real-Time Webcam Face & Gesture Recognition AI',
          },
        ],
        tools: ['Python', 'OpenCV', 'Pandas', 'Pygame', 'Git & GitHub'],
        outcomes: [
          'Build college-ready software engineering portfolio projects',
          'Master standard computer science algorithms and data structures',
          'Understand machine learning fundamentals and neural networks',
        ],
      },
    ],
    mentors: [
      {
        name: 'Viji Anup',
        degree: 'Masters - Computer Science',
        hours: '7,000+ hrs',
        quote: 'When kids code they develop analytical thinking skills and the confidence to invent!',
        image: '/images/co_mentor_1.png',
        rating: '4.95',
      },
      {
        name: 'Shraddha Shukla',
        degree: 'Masters - Computer Science',
        hours: '7,000+ hrs',
        quote: 'Coding helps kids express their unbounded creativity through digital creation.',
        image: '/images/co_mentor_2.png',
        rating: '4.98',
      },
    ],
    faqs: [
      {
        q: 'Does my child need prior coding experience?',
        a: 'No prior background is required. We assess every student during the free trial class and tailor the starting track specifically to their age, computer literacy, and learning pace.',
      },
      {
        q: 'What computer specs are required?',
        a: 'Any standard laptop or desktop running Windows, macOS, or ChromeOS with a webcam, microphone, and stable internet connection. All programming tools run directly in the browser.',
      },
    ],
  },
  math: {
    title: 'Math for Kids',
    slug: 'math',
    themeColor: '#8A600D',
    badge: 'Common Core & CBSE Aligned',
    heroImage: '/images/math_hero_img.392d5d70.webp',
    tagline: 'Shed the fear of Math and become a Math wizard!',
    description:
      'Master school curriculum, mental arithmetic speed, and Olympiad problem-solving through visual intuition and 1:1 individualized pacing.',
    gradeBrackets: [
      {
        id: 'k2',
        label: 'Grades K - 2',
        ages: 'Ages 5 - 7',
        description: 'Number sense, spatial relationships, visual patterns, and joyful math foundations.',
        modules: [
          {
            title: 'Foundational Arithmetic & Number Bonds',
            topics: ['Place Value & Counting', 'Addition/Subtraction Facts', 'Measurement Basics', '2D/3D Shapes'],
            project: 'Interactive Grocery Store & Money Calculation Game',
          },
        ],
        tools: ['Virtual Manipulatives', 'Interactive Number Lines', 'Visual Grids'],
        outcomes: [
          'Instant recall of single-digit addition and subtraction facts',
          'Deep intuitive grasp of place values (ones, tens, hundreds)',
          'Confidence solving real-world measurement and money problems',
        ],
      },
      {
        id: '35',
        label: 'Grades 3 - 5',
        ages: 'Ages 8 - 10',
        description: 'Multiplication fluency, fractions visual models, and high-speed Vedic mental math shortcuts.',
        modules: [
          {
            title: 'Fractions, Decimals & Mental Math',
            topics: ['Multi-digit Multiplication & Division', 'Equivalent Fractions', 'Decimals & Percentages', 'Vedic Math Sutras'],
            project: 'Speed Math Challenge & Recipe Fraction Scaler',
          },
        ],
        tools: ['Fraction Circles', 'Vedic Mental Trachtenberg Methods', 'Geometric Geoboards'],
        outcomes: [
          'Calculate multi-digit arithmetic 2x faster without scratch paper',
          'Eliminate common misconceptions in fraction addition and division',
          'Acquire top scores in elementary school examinations',
        ],
      },
      {
        id: '68',
        label: 'Grades 6 - 8',
        ages: 'Ages 11 - 13',
        description: 'Pre-algebra, linear equations, coordinate geometry, ratios, and probability reasoning.',
        modules: [
          {
            title: 'Algebraic Thinking & Geometry',
            topics: ['Linear Equations in One & Two Variables', 'Exponents & Powers', 'Pythagorean Theorem', 'Data Handling'],
            project: 'Architectural Blueprint Scale Design & Probability Simulator',
          },
        ],
        tools: ['Desmos Graphing Calculator', 'GeoGebra Geometry Suite'],
        outcomes: [
          'Bridge the critical gap from arithmetic to abstract algebra',
          'Graph and solve systems of linear equations confidently',
          'Master word problem translation into mathematical equations',
        ],
      },
      {
        id: '912',
        label: 'Grades 9 - 12',
        ages: 'Ages 14 - 18',
        description: 'Advanced algebra, trigonometry, coordinate geometry, pre-calculus, and Olympiad competition preparation.',
        modules: [
          {
            title: 'Advanced Functions & Analytic Geometry',
            topics: ['Quadratic Functions & Polynomials', 'Trigonometric Identities', 'Sequences & Series', 'Calculus Fundamentals'],
            project: 'Projectile Motion Physics Modeling with Quadratics',
          },
        ],
        tools: ['CAS Calculators', 'Desmos 3D', 'Advanced GeoGebra'],
        outcomes: [
          'Master high school board exams (Common Core, GCSE, CBSE, IB)',
          'Develop Olympiad and competitive test problem-solving agility',
          'Establish rigorous mathematical thinking for STEM degrees',
        ],
      },
    ],
    mentors: [
      {
        name: 'Tarun Mengi',
        degree: 'M.Sc. Mathematics',
        hours: '5,000+ hrs',
        quote: 'Math gives us hope that every problem has an elegant and simple solution.',
        image: '/images/math_mentor_01.png',
        rating: '4.92',
      },
      {
        name: 'Vaibhavi Parab',
        degree: 'B.E - Computer Science',
        hours: '5,000+ hrs',
        quote: "A teacher's influence goes beyond the screen. Proudly, I am a positive guide for them.",
        image: '/images/math_mentor_02.png',
        rating: '4.96',
      },
    ],
    faqs: [
      {
        q: 'How do you align with our school curriculum?',
        a: 'Our curriculum maps directly to US Common Core, UK National Curriculum (GCSE), CBSE, ICSE, and IB standards. Your mentor customizes the lesson sequence to match your child’s upcoming school tests.',
      },
    ],
  },
  english: {
    title: 'English for Kids',
    slug: 'english',
    themeColor: '#12706B',
    badge: 'Communication Mastery',
    heroImage: '/images/eng_hero.7afba47e.webp',
    tagline: 'Be an effective communicator - speak confidently, write effectively!',
    description:
      'Transform reading comprehension, vocabulary, creative storytelling, and public speaking through interactive 1:1 coaching.',
    gradeBrackets: [
      {
        id: 'k2',
        label: 'Grades K - 2',
        ages: 'Ages 5 - 7',
        description: 'Phonics, early sight words, vocabulary building, and joyful expressive reading.',
        modules: [
          {
            title: 'Phonics & Expressive Storytelling',
            topics: ['Phonemic Awareness', 'Sight Word Mastery', 'Sentence Construction', 'Picture-Prompt Narration'],
            project: 'My First Illustrated Storybook with Voice Recording',
          },
        ],
        tools: ['Digital Storyboards', 'Phonics Audio Lab', 'Interactive Reader'],
        outcomes: [
          'Read grade-level books with accurate inflection and confidence',
          'Form complete, grammatically sound written sentences',
          'Overcome hesitation when speaking in front of peers',
        ],
      },
      {
        id: '35',
        label: 'Grades 3 - 5',
        ages: 'Ages 8 - 10',
        description: 'Reading comprehension strategies, paragraph writing, rich vocabulary, and debate basics.',
        modules: [
          {
            title: 'Creative Writing & Reading Depth',
            topics: ['Main Idea & Inferences', 'Descriptive & Narrative Writing', 'Grammar Mechanics', 'Speech Delivery'],
            project: '5-Chapter Fantasy Novella & 2-Minute Persuasive Speech',
          },
        ],
        tools: ['Writer’s Workshop Sandbox', 'Vocabulary Builder Cards'],
        outcomes: [
          'Deconstruct complex non-fiction and fiction reading passages',
          'Craft structured essays with compelling introductions and conclusions',
          'Deliver organized verbal presentations with clear diction',
        ],
      },
      {
        id: '68',
        label: 'Grades 6 - 8',
        ages: 'Ages 11 - 13',
        description: 'Literary devices, critical analysis, formal argumentative essays, and competitive debate skills.',
        modules: [
          {
            title: 'Critical Analysis & Advanced Rhetoric',
            topics: ['Ethos/Pathos/Logos', 'Metaphor & Tone Analysis', 'Research & Citation', 'Cross-Examination Debate'],
            project: 'Published Research Editorial & Live Parliamentary Debate',
          },
        ],
        tools: ['Essay Rubric Evaluator', 'Speech Timing & Tone Analyzer'],
        outcomes: [
          'Construct persuasive, evidence-backed analytical essays',
          'Participate effectively in competitive school debates and MUNs',
          'Master advanced vocabulary for standardized school assessments',
        ],
      },
    ],
    mentors: [
      {
        name: 'Sana Javed',
        degree: 'Masters - English Literature',
        hours: '6,000+ hrs',
        quote: 'Teaching is the highest form of understanding. We ignite the joy of language in every session.',
        image: '/images/eng_mentor_01.png',
        rating: '4.97',
      },
    ],
    faqs: [
      {
        q: 'Does this course cover school grammar or creative writing?',
        a: 'It covers both! We integrate grammatical precision with creative expression so students excel in academic exams while discovering their own authentic authorial voice.',
      },
    ],
  },
  science: {
    title: 'Science for Kids',
    slug: 'science',
    themeColor: '#0A7A51',
    badge: 'Hands-on STEM Framework',
    heroImage: '/images/sci-course-hero.064f98da.png',
    tagline: 'Invoke the inner scientist within your kids!',
    description:
      'Hands-on kitchen experiments, discovery-based physics, biology, and chemistry. Learn how the universe really functions.',
    gradeBrackets: [
      {
        id: 'k2',
        label: 'Grades K - 2',
        ages: 'Ages 5 - 7',
        description: 'Sensory observation, nature wonders, physical properties, and simple safe kitchen experiments.',
        modules: [
          {
            title: 'Everyday Physics & Living Wonders',
            topics: ['Sink or Float & Density', 'Plant Life Cycles', 'Light & Rainbows', 'Weather & Seasons'],
            project: 'Home Volcano Eruption & Seed Germination Diary',
          },
        ],
        tools: ['Safe Household Materials', 'Visual Observation Worksheets'],
        outcomes: [
          'Formulate hypotheses using simple "If-Then" observations',
          'Recognize basic physical properties of solids, liquids, and gases',
          'Develop immense curiosity about natural phenomena',
        ],
      },
      {
        id: '35',
        label: 'Grades 3 - 5',
        ages: 'Ages 8 - 10',
        description: 'Forces, energy conservation, chemical mixtures, electricity, and human body systems.',
        modules: [
          {
            title: 'Mechanics, Matter & Electrical Circuits',
            topics: ['Newtonian Motion & Friction', 'Simple Closed Circuits', 'States of Matter Transitions', 'Ecosystem Food Webs'],
            project: 'Working DIY Electromagnet & Solar Oven Model',
          },
        ],
        tools: ['Virtual Circuit Simulator (PhET)', 'STEM Lab Manual'],
        outcomes: [
          'Construct series and parallel electrical circuits',
          'Understand force balance, friction, and kinetic/potential energy',
          'Conduct reproducible scientific experiments with control variables',
        ],
      },
      {
        id: '68',
        label: 'Grades 6 - 8',
        ages: 'Ages 11 - 13',
        description: 'Chemical bonding, cell biology, genetics, thermodynamics, and astronomy fundamentals.',
        modules: [
          {
            title: 'Molecular Chemistry & Cellular Biology',
            topics: ['Periodic Table & Reactions', 'Cellular Respiration & DNA', 'Heat Transfer & Waves', 'Space & Gravity'],
            project: 'DNA Extraction Experiment & Solar System Gravity Simulation',
          },
        ],
        tools: ['Molecular 3D Visualizer', 'PhET Interactive Simulations'],
        outcomes: [
          'Balance chemical equations and understand acid-base reactions',
          'Explain cellular structure, genetic inheritance, and evolution',
          'Score top marks in middle school science and STEM fairs',
        ],
      },
    ],
    mentors: [
      {
        name: 'Lavanya Baid',
        degree: 'Graduate - STEM Educator',
        hours: '1,200+ hrs',
        quote: 'Let’s learn with fun hands-on experiments and discover how the physical world really works!',
        image: '/images/sc_mentor_1.png',
        rating: '4.90',
      },
      {
        name: 'Swapnil',
        degree: 'B.E. - Mechanical',
        hours: '2,100+ hrs',
        quote: 'Curiosity is the spark of engineering. We help kids explore, hypothesize, and construct.',
        image: '/images/sc_mentor_4.png',
        rating: '4.89',
      },
    ],
    faqs: [
      {
        q: 'Are the experiments safe for kids at home?',
        a: 'Yes, 100%! All experiments use standard household non-toxic supplies (e.g., vinegar, baking soda, water, flashlight, paper clips). Mentors guide every step in real-time.',
      },
    ],
  },
};

export default function CourseSubpage() {
  const params = useParams();
  const slug = (params?.slug as string)?.toLowerCase() || 'coding';
  const course = COURSES[slug];

  if (!course) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Course Not Found</h1>
        <Link href="/" className="px-6 py-2.5 rounded-full bg-[#FFB800] text-slate-950 font-bold">
          Return Home
        </Link>
      </div>
    );
  }

  const [selectedGrade, setSelectedGrade] = useState(course.gradeBrackets[0].id);
  const activeBracket =
    course.gradeBrackets.find((b) => b.id === selectedGrade) || course.gradeBrackets[0];

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb Bar */}
        <div className="bg-white border-b border-slate-100 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-semibold text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-400">Courses</span>
            <span>/</span>
            <span className="text-amber-700 capitalize font-bold">{course.title}</span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-[#FFFDF7] border-b border-slate-200/60 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{course.badge}</span>
                </div>

                <h1 className="heading-slate text-3xl sm:text-4xl lg:text-[48px] font-bold tracking-tight leading-tight font-satoshi pb-2">
                  {course.tagline}
                </h1>

                <p className="text-base sm:text-lg text-[#2F4F4F] max-w-xl mx-auto lg:mx-0 leading-relaxed font-satoshi">
                  {course.description}
                </p>

                {/* Rating & Proof */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-extrabold text-slate-900">4.9 / 5.0</span>
                    <span className="text-slate-400">(2,500+ reviews)</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full">
                    Recommended for KG to Grade 12
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link
                    href="/book-a-demo"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-pill-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <span>Book a FREE Trial Class</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="#syllabus"
                    className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full font-bold text-sm text-slate-700 hover:bg-slate-100 border border-slate-200"
                  >
                    Explore Syllabus
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full max-w-[420px] h-[280px] sm:h-[320px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white">
                  <Image
                    src={course.heroImage}
                    alt={course.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grade Bracket Navigation & Syllabus Tree */}
        <section id="syllabus" className="py-16 lg:py-24 bg-[#FFFDF7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-600 bg-amber-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
                Tailored By Age &amp; Grade
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Curriculum Syllabus Tree
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Select your child&apos;s grade bracket to inspect the detailed modules, projects, and learning milestones.
              </p>
            </div>

            {/* Bracket Tabs */}
            <div className="flex items-center justify-center mb-12">
              <div className="inline-flex p-1.5 rounded-full bg-slate-200/70 border border-slate-300/80 shadow-inner backdrop-blur-sm max-w-full overflow-x-auto no-scrollbar">
                {course.gradeBrackets.map((bracket) => {
                  const isActive = selectedGrade === bracket.id;
                  return (
                    <button
                      key={bracket.id}
                      onClick={() => setSelectedGrade(bracket.id)}
                      className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors z-10 whitespace-nowrap ${
                        isActive ? 'text-white' : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeGradeBracket"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                          className="absolute inset-0 bg-slate-900 rounded-full shadow-md z-[-1]"
                        />
                      )}
                      <span>{bracket.label}</span>
                      <span className={`text-xs ${isActive ? 'text-amber-300 font-medium' : 'text-slate-500 font-normal'}`}>
                        ({bracket.ages})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Bracket Content Showcase */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-100 mb-8">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                    <span>{activeBracket.label}</span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                      {activeBracket.ages}
                    </span>
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                    {activeBracket.description}
                  </p>
                </div>

                <Link
                  href="/book-a-demo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 shadow-sm flex-shrink-0"
                >
                  <span>Book Trial for This Grade</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {activeBracket.modules.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#FFFDF7] border border-amber-200/60 shadow-sm hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-7 h-7 rounded-full bg-amber-200 text-amber-900 font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        {m.title}
                      </h4>
                    </div>

                    <div className="space-y-2 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Topics Covered
                      </span>
                      {m.topics.map((t, ti) => (
                        <div key={ti} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-amber-100 text-xs">
                      <span className="font-bold text-amber-800 block mb-0.5">Capstone Project:</span>
                      <span className="text-slate-700 font-medium">{m.project}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tools & Outcomes Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-slate-100">
                <div className="lg:col-span-4 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Software &amp; Tools Mastered
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeBracket.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Skill Outcomes &amp; Milestones
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeBracket.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mentors for this subject */}
        <section className="py-16 bg-white border-y border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-600 bg-amber-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
                Dedicated Mentorship
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Meet your {course.title} mentors
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {course.mentors.map((m, i) => (
                <div
                  key={i}
                  className="bg-[#FFFDF7] rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 flex-shrink-0 bg-white">
                      <Image src={m.image} alt={m.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{m.name}</h4>
                      <p className="text-xs text-slate-500">{m.degree}</p>
                      <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{m.hours} taught</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                    &ldquo;{m.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs for this course */}
        <section className="py-16 bg-[#FFFDF7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {course.faqs.map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-base mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Booking Banner */}
        <section className="py-12 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black">
                Ready to begin {course.title}?
              </h3>
              <p className="text-sm font-semibold text-slate-900/80 mt-1">
                Book a free 50-minute trial session. Experience the Bloom 2 Sigma advantage firsthand.
              </p>
            </div>
            <Link
              href="/book-a-demo"
              className="px-8 py-4 rounded-full font-black text-sm bg-orange-500 text-white hover:bg-orange-600 shadow-xl transition-all hover:scale-105 flex-shrink-0"
            >
              Book My FREE Trial Class
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
