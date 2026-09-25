# Codeyoung 1:1 Live Online Learning Platform

A modern, high-performance, and feature-rich clone of the **Codeyoung** global EdTech platform. Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Key Features & Architectural Modules

### 1. Modern Homepage
- **Dynamic Hero Section**: Features an enlarged hero student visual with an interactive **360° planetary orbit motion** where subject badges (Coding, Math, English, Science, Robotics, Finance) continuously glide in smooth circular orbit around the central learner.
- **Executive Navigation & Branding**: Enlarged high-resolution primary branding with responsive navigation, desktop dropdowns, and mobile menu drawer.
- **Interactive Courses Section**:
  - **Animated Segmented Control**: Framer Motion spring physics layout indicator (`layoutId="activeCourseTab"`) smoothly gliding beneath selected subjects.
  - **Workable Draggable Carousel**: Users can drag and swipe cards with elastic physics or use the **Interactive Drag Button Scrub Bar** with step marks and navigation arrows.
  - **Grid View Toggle**: Switch between Draggable Carousel View and Side-by-Side Comparison Grid.
- **Conversion & Social Proof**:
  - Verified Trustpilot (4.4★) and Google Reviews (4.8★) filterable by country.
  - Top 1% Mentors showcase with credentials, degree backgrounds, and parent quotes.
  - Interactive FAQ accordion, media features, and curriculum advantage breakdowns.

### 2. Multi-Step Live Booking Engine (`/book-a-demo`)
- **Step 1: Student & Parent Profile**:
  - Automatic browser timezone detection (US, UK, Canada, India, Australia, Middle East).
  - Validated parent contact details and grade/course preferences.
- **Step 2: Date & Local Slot Picker**:
  - Responsive 5-day calendar selector.
  - Live available slots converted dynamically to the parent's local timezone.
- **Step 3: Confirmation & Live Classroom Handoff**:
  - Confetti celebration, assigned mentor profile, and one-click direct access to the live virtual classroom.

### 3. Interactive 1:1 Live Classroom (`/classroom/[slug]`)
- **Workable Interactive Terminal & REPL Shell**:
  - **Real Code Execution**: Clicking **"Run Code ▶"** executes code in a real JavaScript sandbox, capturing outputs and performance benchmarks.
  - **Interactive Terminal Prompt (`guest@codeyoung:~$`)**:
    - Evaluates any JS/math expression directly (e.g. `2 + 2`, `Math.PI`, `calculateScore(2, 3)`).
    - Custom CLI commands: `run`, `node`, `test`, `help`, `ls`, `cat README.md`, `whoami`, `mentor`, `date`, `clear`.
    - Command history recall with **Up / Down arrow keys**.
    - Maximize/Minimize toggle and quick-clear console.
- **Code Editor**: Line numbers, reset code, and pre-built lesson templates (Game Score Engine, Number Guessing, Math Arithmetic).
- **Interactive Math Whiteboard**: Full HTML5 canvas drawing engine with color palette, eraser, brush sizing, and clear canvas.
- **Webcam & Audio Integration**: Live student camera feed via `getUserMedia` with clean avatar fallback, mentor audio controls, and screen sharing.
- **Milestone Tracker & Encrypted Chat**: Live interactive lesson milestones and simulated mentor dialogue.

### 4. Curriculum Syllabus Pages (`/courses/[slug]`)
- Dedicated subpages for **Coding**, **Math**, **English**, and **Science**.
- Interactive grade bracket switcher (K-2, 3-5, 6-8, 9-12) with animated sliding indicator.
- Key modules, capstone projects, tools learned, and learning outcomes.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14.2](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) with custom design tokens |
| **Animation** | [Framer Motion 11](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Visual Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Charts** | [Recharts 3](https://recharts.org/) |

---

## 🎨 Design System & Color Palette

- **Primary Slate**: `#0F172A` / `#080C14` (Deep executive dark backgrounds and typography)
- **Primary CTA Orange**: `#F97316` / `#FF8A00` (`bg-orange-500 hover:bg-orange-600` for all trial booking actions)
- **Accent Warm Amber**: `#F59E0B` / `#FFB800` (Highlights, stars, badges)
- **Background Cream**: `#FFFDF7` / `#FAFAFA` (Soft formal light backgrounds)
- **Success Emerald**: `#10B981` (Accreditations, available slots, terminal outputs)

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v18.17.0 or later recommended)
- npm or yarn

### 2. Installation
```bash
# Clone or navigate into the repository directory
cd CodeYoung

# Install dependencies
npm install
```

### 3. Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Key URLs
- **Homepage**: `http://localhost:3000/`
- **Book a Free Trial**: `http://localhost:3000/book-a-demo`
- **Interactive 1:1 Classroom**: `http://localhost:3000/classroom/demo-CY-MUHHROJ3-636`
- **Course Details**: `http://localhost:3000/courses/coding`

### 5. Production Build
```bash
# Type check and build optimized bundle
npm run build

# Start production server
npm run start
```

.
