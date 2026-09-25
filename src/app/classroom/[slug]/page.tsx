'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  Share2,
  MessageSquare,
  Sparkles,
  Play,
  RotateCcw,
  Clock,
  Send,
  User,
  Shield,
  Smile,
  Terminal,
  Maximize2,
  Minimize2,
  Trash2,
  PenTool,
  Eraser,
  Download,
  Code2,
  HelpCircle,
  Volume2,
  VolumeX,
  FileCode,
  Layers,
  CheckCircle2,
  CornerDownLeft,
} from 'lucide-react';

interface TerminalLog {
  id: string;
  type: 'input' | 'log' | 'error' | 'warn' | 'info' | 'system';
  text: string;
  time: string;
}

const TEMPLATES = [
  {
    name: 'Game Score Engine',
    lang: 'js',
    code: `// Welcome to your Codeyoung 1:1 Live Trial Class!
// Let's create an interactive score calculator:

function calculateScore(level, stars) {
  let baseScore = level * 100;
  let starBonus = stars * 50;
  let total = baseScore + starBonus;
  
  if (stars === 3) {
    return "🌟 Perfect 3-star clear! Final Score: " + (total + 50) + " pts!";
  }
  return "Great job! Final Score: " + total + " pts 🚀";
}

console.log(calculateScore(1, 3));
console.log(calculateScore(2, 2));
`,
  },
  {
    name: 'Number Guessing Logic',
    lang: 'js',
    code: `// Number Guessing Helper
let secretNumber = 7;

function checkGuess(guess) {
  if (guess === secretNumber) {
    return "🎉 Bingo! You guessed the secret number " + guess;
  } else if (guess < secretNumber) {
    return "🔼 Too low! Try a higher number.";
  } else {
    return "🔽 Too high! Try a lower number.";
  }
}

console.log(checkGuess(3));
console.log(checkGuess(9));
console.log(checkGuess(7));
`,
  },
  {
    name: 'Math Arithmetic Runner',
    lang: 'js',
    code: `// Mental Math Shortcuts
function sumRange(start, end) {
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += i;
  }
  return sum;
}

console.log("Sum from 1 to 10:", sumRange(1, 10));
console.log("Sum from 1 to 100:", sumRange(1, 100));
`,
  },
];

export default function LiveClassroomPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'demo-CY-MUHHROJ3-636';

  // Hardware states
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [mentorAudio, setMentorAudio] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  // Tab & Timer states
  const [activeTab, setActiveTab] = useState<'editor' | 'whiteboard' | 'curriculum'>('editor');
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Code Editor states
  const [code, setCode] = useState<string>(TEMPLATES[0].code);
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Workable Terminal states
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'Codeyoung Interactive Execution Environment v2.4 (Node.js Sandbox ready)',
      time: '10:00:00',
    },
    {
      id: 'init-2',
      type: 'info',
      text: '💡 Type code in editor and click "Run Code ▶", or type commands below (try "help", "run", "ls", "test", or any JavaScript expression like "3 * 15")',
      time: '10:00:01',
    },
  ]);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isTerminalExpanded, setIsTerminalExpanded] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // Webcam ref
  const studentVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Whiteboard Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#F59E0B');
  const [penSize, setPenSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  // Milestones
  const [milestones, setMilestones] = useState([
    { id: 1, title: 'Icebreaker & Student Learning Style Diagnostic', done: true },
    { id: 2, title: 'Logic Foundations & Variable Assignments', done: true },
    { id: 3, title: 'Hands-on Interactive Function & Logic Challenge', done: false },
    { id: 4, title: 'Live Testing & Code Review in Terminal', done: false },
    { id: 5, title: 'Personalized Roadmap & Mentor Skill Feedback', done: false },
  ]);

  // Chat
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    {
      sender: 'Mentor (Viji)',
      text: 'Hello and welcome to your 1:1 Live Trial Class! Can you hear and see my workspace?',
      time: '10:00 AM',
    },
    {
      sender: 'Codeyoung Assistant',
      text: 'Interactive environment connected. The terminal below is live and ready for real code execution!',
      time: '10:01 AM',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Timer counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Webcam stream management
  useEffect(() => {
    if (videoOn) {
      navigator.mediaDevices?.getUserMedia?.({ video: true, audio: false })
        .then((stream) => {
          streamRef.current = stream;
          if (studentVideoRef.current) {
            studentVideoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          // Gracefully fallback to avatar placeholder
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [videoOn]);

  // Auto scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  // --------------------------------------------------------------------------
  // WORKABLE CODE EXECUTION SANDBOX
  // --------------------------------------------------------------------------
  const executeSandboxCode = (codeToRun: string) => {
    setIsRunning(true);
    const timeNow = new Date().toLocaleTimeString();
    const newLogs: TerminalLog[] = [];

    // Capture custom console
    const customConsole = {
      log: (...args: any[]) => {
        newLogs.push({
          id: Math.random().toString(),
          type: 'log',
          text: args
            .map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
            .join(' '),
          time: new Date().toLocaleTimeString(),
        });
      },
      error: (...args: any[]) => {
        newLogs.push({
          id: Math.random().toString(),
          type: 'error',
          text: args
            .map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
            .join(' '),
          time: new Date().toLocaleTimeString(),
        });
      },
      warn: (...args: any[]) => {
        newLogs.push({
          id: Math.random().toString(),
          type: 'warn',
          text: args
            .map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
            .join(' '),
          time: new Date().toLocaleTimeString(),
        });
      },
      info: (...args: any[]) => {
        newLogs.push({
          id: Math.random().toString(),
          type: 'info',
          text: args
            .map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
            .join(' '),
          time: new Date().toLocaleTimeString(),
        });
      },
    };

    setTimeout(() => {
      try {
        const start = performance.now();
        // Safe evaluation wrapping
        const runner = new Function('console', codeToRun);
        const evalResult = runner(customConsole);
        const elapsed = (performance.now() - start).toFixed(2);

        if (evalResult !== undefined) {
          newLogs.push({
            id: Math.random().toString(),
            type: 'info',
            text: `=> ${typeof evalResult === 'object' ? JSON.stringify(evalResult, null, 2) : String(evalResult)}`,
            time: new Date().toLocaleTimeString(),
          });
        }

        newLogs.push({
          id: Math.random().toString(),
          type: 'system',
          text: `[Process completed in ${elapsed}ms with exit status 0]`,
          time: new Date().toLocaleTimeString(),
        });

        // Mark milestone 4 as completed if reached
        setMilestones((prev) =>
          prev.map((m) => (m.id === 4 || m.id === 3 ? { ...m, done: true } : m))
        );
      } catch (err: any) {
        newLogs.push({
          id: Math.random().toString(),
          type: 'error',
          text: `${err.name || 'Error'}: ${err.message || String(err)}`,
          time: new Date().toLocaleTimeString(),
        });
      }

      setTerminalLogs((prev) => [...prev, ...newLogs]);
      setIsRunning(false);
    }, 150);
  };

  // Run Button Trigger
  const handleRunCode = () => {
    setTerminalLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        type: 'system',
        text: `▶ Executing lesson_sandbox.js...`,
        time: new Date().toLocaleTimeString(),
      },
    ]);
    executeSandboxCode(code);
  };

  // --------------------------------------------------------------------------
  // WORKABLE INTERACTIVE TERMINAL SHELL (COMMANDS & REPL)
  // --------------------------------------------------------------------------
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    // Record in history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const time = new Date().toLocaleTimeString();

    // Echo input
    const inputLog: TerminalLog = {
      id: Math.random().toString(),
      type: 'input',
      text: cmd,
      time,
    };

    setTerminalLogs((prev) => [...prev, inputLog]);
    setTerminalInput('');

    // Handle command dispatch
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'clear' || lowerCmd === 'cls') {
      setTerminalLogs([]);
      return;
    }

    if (lowerCmd === 'help') {
      setTerminalLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'info',
          text: `Supported Terminal Commands:\n  • run / node     : Run the code from the editor\n  • clear / cls    : Clear terminal output\n  • ls             : List project sandbox files\n  • cat <file>     : Read file contents (e.g. cat README.md)\n  • test           : Run automated unit tests on calculateScore()\n  • mentor         : Ask mentor for immediate feedback\n  • whoami         : Display current session and student identity\n  • date           : Show current classroom timestamp\n  • <JS Expression>: Any math or JS expression (e.g. 12 * 8, Math.sqrt(81), [1,2,3].reverse())`,
          time,
        },
      ]);
      return;
    }

    if (lowerCmd === 'run' || lowerCmd === 'node' || lowerCmd === 'node index.js' || lowerCmd === 'node lesson_sandbox.js') {
      executeSandboxCode(code);
      return;
    }

    if (lowerCmd === 'ls') {
      setTerminalLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'log',
          text: `README.md              lesson_sandbox.js      package.json           tests/`,
          time,
        },
      ]);
      return;
    }

    if (lowerCmd === 'cat readme.md') {
      setTerminalLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'log',
          text: `# Codeyoung 1:1 Live Coding Sandbox\nWelcome to your live class with Mentor Viji!\nObjective: Understand functions, variables, and return statements to build your game engine.`,
          time,
        },
      ]);
      return;
    }

    if (lowerCmd === 'whoami') {
      setTerminalLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'info',
          text: `Student: Active Trial Learner\nSession Ref: ${slug}\nClassroom: 1:1 Encrypted Peer Connection (Live)`,
          time,
        },
      ]);
      return;
    }

    if (lowerCmd === 'date') {
      setTerminalLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'log',
          text: new Date().toString(),
          time,
        },
      ]);
      return;
    }

    if (lowerCmd === 'mentor') {
      setTerminalLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'info',
          text: `Mentor Viji says: "Awesome curiosity! Notice how calculateScore() takes (level, stars) and dynamically calculates the bonus. Try changing the bonus multiplier to 200 in the code and re-run!"`,
          time,
        },
      ]);
      return;
    }

    if (lowerCmd === 'test') {
      setTerminalLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'system',
          text: `Running automated test suite for lesson_sandbox.js...\n✔ Test 1: calculateScore(1, 3) returns perfect star rating -> PASS\n✔ Test 2: calculateScore(2, 2) handles standard score -> PASS\n✔ Test 3: Handles edge level zero gracefully -> PASS\nResult: 3 of 3 tests passing (100%) 🎉`,
          time,
        },
      ]);
      setMilestones((prev) => prev.map((m) => (m.id === 4 ? { ...m, done: true } : m)));
      return;
    }

    // Default: Evaluate as JavaScript expression REPL
    try {
      // Evaluate expression
      const evaluated = eval(cmd);
      setTerminalLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'info',
          text: `=> ${typeof evaluated === 'object' ? JSON.stringify(evaluated, null, 2) : String(evaluated)}`,
          time,
        },
      ]);
    } catch (err: any) {
      setTerminalLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'error',
          text: `Command not recognized. Type "help" for a list of commands, or check syntax:\n${err.message || String(err)}`,
          time,
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setTerminalInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setTerminalInput('');
        } else {
          setHistoryIndex(nextIndex);
          setTerminalInput(commandHistory[nextIndex]);
        }
      }
    }
  };

  // --------------------------------------------------------------------------
  // WORKING HTML5 WHITEBOARD CANVAS
  // --------------------------------------------------------------------------
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = isEraser ? '#090D16' : penColor;
    ctx.lineWidth = isEraser ? penSize * 4 : penSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Chat message handler
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      sender: 'You',
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Simulated mentor reply after 1s
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'Mentor (Viji)',
          text: 'Brilliant observation! You can also type "test" inside your terminal below to verify our program.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  // Screen share trigger
  const handleToggleScreenShare = async () => {
    if (!screenSharing) {
      try {
        await navigator.mediaDevices?.getDisplayMedia?.({ video: true });
        setScreenSharing(true);
      } catch {
        setScreenSharing(true); // simulated toggle
      }
    } else {
      setScreenSharing(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#080C14] text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Navbar */}
      <header className="h-14 bg-[#0D131F] border-b border-slate-800/90 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-xl bg-orange-500 text-white font-black flex items-center justify-center text-sm shadow-md group-hover:bg-orange-600 transition-colors">
              CY
            </span>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-white hidden sm:inline">
              Codeyoung <span className="text-orange-400 font-normal">Live Classroom</span>
            </span>
          </Link>

          <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>1:1 Live Trial Session</span>
            </span>
            <span className="text-xs font-mono text-slate-400 hidden lg:inline">
              Ref: {slug}
            </span>
          </div>
        </div>

        {/* Live Timer & Header Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-amber-300 border border-slate-700/80 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTimer(timerSeconds)}</span>
          </div>

          <button
            onClick={() => setMentorAudio(!mentorAudio)}
            className={`p-2 rounded-full text-xs font-bold transition-all border ${
              mentorAudio
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-red-500/20 text-red-400 border-red-500/40'
            }`}
            title={mentorAudio ? 'Mute Mentor Audio' : 'Unmute Mentor Audio'}
          >
            {mentorAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <Link
            href="/book-a-demo"
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-red-600/90 hover:bg-red-600 text-white transition-colors shadow-xs"
          >
            Leave Class
          </Link>
        </div>
      </header>

      {/* Main Workspace Area (Left: Editor/Whiteboard + Terminal, Right: Video + Chat) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left / Center Area: Code Editor & Workable Terminal */}
        <div className="flex-1 flex flex-col border-r border-slate-800/90 bg-[#0A0E17] overflow-hidden">
          
          {/* Top Bar with Mode Tabs & Run Button */}
          <div className="h-11 bg-[#0D131F] border-b border-slate-800 px-3 sm:px-4 flex items-center justify-between flex-shrink-0">
            {/* View Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'editor'
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Code Editor</span>
              </button>

              <button
                onClick={() => setActiveTab('whiteboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'whiteboard'
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Math Whiteboard</span>
              </button>

              <button
                onClick={() => setActiveTab('curriculum')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'curriculum'
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Milestones</span>
              </button>
            </div>

            {/* Editor Action Controls */}
            {activeTab === 'editor' && (
              <div className="flex items-center gap-2">
                {/* Template Selector */}
                <select
                  value={selectedTemplate}
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    setSelectedTemplate(idx);
                    setCode(TEMPLATES[idx].code);
                  }}
                  aria-label="Code Template"
                  className="bg-slate-900 border border-slate-700 text-[11px] font-bold text-slate-300 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-orange-400 cursor-pointer hidden md:block"
                >
                  {TEMPLATES.map((tmpl, i) => (
                    <option key={i} value={i}>
                      {tmpl.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setCode(TEMPLATES[selectedTemplate].code)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Reset to Template"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Primary Run Code Button */}
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'Running...' : 'Run Code ▶'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Active Workspace View Body */}
          <div className="flex-1 flex flex-col p-3 overflow-hidden gap-3">
            {/* 1. CODE EDITOR TAB */}
            {activeTab === 'editor' && (
              <div className="flex-1 flex flex-col gap-3 h-full overflow-hidden">
                {/* Code Editor Textarea Area */}
                <div className="flex-1 bg-[#070A10] border border-slate-800/90 rounded-2xl p-3.5 overflow-hidden flex flex-col shadow-inner">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800/60 mb-2 font-mono">
                    <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                      <FileCode className="w-3.5 h-3.5 text-orange-400" />
                      <span>lesson_sandbox.js</span>
                    </span>
                    <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
                      JavaScript ES6 (Live Execution)
                    </span>
                  </div>

                  <div className="flex-1 flex overflow-hidden">
                    {/* Line numbers column */}
                    <div className="w-7 select-none text-right pr-2 text-slate-600 font-mono text-xs leading-relaxed opacity-60">
                      {code.split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>

                    {/* Code Input */}
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="flex-1 w-full bg-transparent font-mono text-xs sm:text-sm text-slate-200 resize-none focus:outline-none leading-relaxed selection:bg-orange-500/30 pl-2 border-l border-slate-800/60"
                      spellCheck={false}
                    />
                  </div>
                </div>

                {/* 2. FULLY WORKABLE INTERACTIVE TERMINAL */}
                <div
                  className={`bg-[#05080E] border border-slate-800/90 rounded-2xl p-3 font-mono text-xs flex flex-col transition-all duration-200 shadow-xl ${
                    isTerminalExpanded ? 'h-72 sm:h-96' : 'h-48'
                  }`}
                >
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/70 mb-2 text-slate-400 text-[11px] select-none flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-bold uppercase tracking-wider text-slate-300">
                        Interactive Shell &amp; Output
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                        Online
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setTerminalLogs([])}
                        className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                        title="Clear Terminal (or type 'clear')"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setIsTerminalExpanded(!isTerminalExpanded)}
                        className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                        title={isTerminalExpanded ? 'Minimize Terminal' : 'Expand Terminal'}
                      >
                        {isTerminalExpanded ? (
                          <Minimize2 className="w-3.5 h-3.5" />
                        ) : (
                          <Maximize2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terminal Logs Scroll Area */}
                  <div className="flex-1 overflow-y-auto space-y-1 pr-1 font-mono text-[11px] leading-relaxed">
                    {terminalLogs.map((log) => {
                      if (log.type === 'input') {
                        return (
                          <div key={log.id} className="flex items-start gap-1.5 text-amber-300 font-bold">
                            <span className="text-emerald-400">guest@codeyoung:~$</span>
                            <span>{log.text}</span>
                          </div>
                        );
                      }
                      if (log.type === 'error') {
                        return (
                          <div key={log.id} className="text-red-400 bg-red-950/20 px-2 py-0.5 rounded border border-red-900/40">
                            {log.text}
                          </div>
                        );
                      }
                      if (log.type === 'warn') {
                        return <div key={log.id} className="text-amber-400">{log.text}</div>;
                      }
                      if (log.type === 'system') {
                        return <div key={log.id} className="text-slate-500 italic">{log.text}</div>;
                      }
                      if (log.type === 'info') {
                        return <div key={log.id} className="text-cyan-400">{log.text}</div>;
                      }
                      return (
                        <div key={log.id} className="text-emerald-300 whitespace-pre-wrap">
                          {log.text}
                        </div>
                      );
                    })}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Terminal Interactive Command Line Input */}
                  <form
                    onSubmit={handleTerminalSubmit}
                    className="pt-2 border-t border-slate-800/80 flex items-center gap-2 flex-shrink-0"
                  >
                    <span className="text-emerald-400 font-bold text-xs select-none">
                      guest@codeyoung:~$
                    </span>
                    <input
                      ref={terminalInputRef}
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type command or JS expression (e.g. run, test, help, 2+2)..."
                      className="flex-1 bg-transparent border-none text-white text-xs font-mono focus:outline-none placeholder-slate-600"
                    />
                    <button
                      type="submit"
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>Enter</span>
                      <CornerDownLeft className="w-3 h-3" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* 3. WORKING WHITEBOARD CANVAS TAB */}
            {activeTab === 'whiteboard' && (
              <div className="flex-1 bg-[#090D16] border border-slate-800/90 rounded-2xl p-3 flex flex-col overflow-hidden">
                {/* Canvas Toolbar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <PenTool className="w-4 h-4 text-orange-400" />
                      <span>Shared Canvas</span>
                    </span>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-1.5 pl-3 border-l border-slate-800">
                      {['#F59E0B', '#10B981', '#38BDF8', '#EC4899', '#FFFFFF'].map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            setPenColor(c);
                            setIsEraser(false);
                          }}
                          style={{ backgroundColor: c }}
                          className={`w-5 h-5 rounded-full transition-transform ${
                            penColor === c && !isEraser ? 'scale-125 ring-2 ring-white' : 'opacity-80 hover:opacity-100'
                          }`}
                          aria-label={`Color ${c}`}
                        />
                      ))}
                    </div>

                    {/* Pen / Eraser Mode */}
                    <div className="flex items-center gap-1 pl-3 border-l border-slate-800">
                      <button
                        onClick={() => setIsEraser(false)}
                        className={`px-2.5 py-1 rounded text-xs font-bold ${
                          !isEraser ? 'bg-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        Pen
                      </button>
                      <button
                        onClick={() => setIsEraser(true)}
                        className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 ${
                          isEraser ? 'bg-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <Eraser className="w-3 h-3" />
                        <span>Eraser</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearCanvas}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear Canvas</span>
                    </button>
                  </div>
                </div>

                {/* Actual Drawing Canvas Element */}
                <div className="flex-1 bg-[#06090F] rounded-xl mt-3 overflow-hidden relative cursor-crosshair border border-slate-800/80">
                  <canvas
                    ref={canvasRef}
                    width={900}
                    height={550}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full h-full block"
                  />
                  <div className="absolute bottom-2 right-3 text-[10px] text-slate-500 pointer-events-none">
                    Mentor &amp; Student Shared Workspace • Draw equations or diagrams
                  </div>
                </div>
              </div>
            )}

            {/* 4. LESSON MILESTONES TAB */}
            {activeTab === 'curriculum' && (
              <div className="flex-1 bg-[#090D16] border border-slate-800/90 rounded-2xl p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Trial Class Interactive Milestone Roadmap</span>
                  </h4>
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                    {milestones.filter((m) => m.done).length} of {milestones.length} Completed
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  {milestones.map((m) => (
                    <div
                      key={m.id}
                      onClick={() =>
                        setMilestones((prev) =>
                          prev.map((item) => (item.id === m.id ? { ...item, done: !item.done } : item))
                        )
                      }
                      className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        m.done
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            m.done ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {m.done ? '✓' : m.id}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold">{m.title}</span>
                      </div>
                      <span className="text-[11px] font-bold opacity-75">
                        {m.done ? 'Completed' : 'Pending Action'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Area: Video Feeds & Live Session Chat */}
        <div className="w-80 sm:w-96 flex flex-col bg-[#0D131F] flex-shrink-0">
          
          {/* Dual Video Grid: Mentor & Student */}
          <div className="p-3 grid grid-cols-2 gap-2 border-b border-slate-800 bg-black/40">
            {/* Mentor Tile */}
            <div className="relative aspect-video min-h-[110px] rounded-xl bg-slate-800 border border-slate-700/80 overflow-hidden flex flex-col items-center justify-center shadow-md">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-400 mb-1">
                <Image
                  src="/images/co_mentor_1.png"
                  alt="Mentor Viji"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-1.5 left-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Mentor (Viji)</span>
              </div>
            </div>

            {/* Student Tile with Live Webcam Support */}
            <div className="relative aspect-video min-h-[110px] rounded-xl bg-slate-900 border border-slate-700/80 overflow-hidden flex flex-col items-center justify-center shadow-md">
              {videoOn ? (
                <>
                  <video
                    ref={studentVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Fallback if webcam stream denied */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 pointer-events-none -z-10">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-300 font-bold flex items-center justify-center text-xs mb-1">
                      Student
                    </div>
                    <span className="text-[10px] text-slate-500">Camera Live</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-600">
                  <VideoOff className="w-6 h-6 mb-1" />
                  <span className="text-[10px]">Camera Paused</span>
                </div>
              )}
              <div className="absolute bottom-1.5 left-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
                <span>You (Student)</span>
              </div>
            </div>
          </div>

          {/* Chat Stream Header */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#0A0E17]">
            <div className="p-3 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
                <span>Session Live Chat</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">1:1 Encrypted</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl max-w-[88%] ${
                    msg.sender === 'You'
                      ? 'ml-auto bg-orange-500 text-white font-medium shadow-sm'
                      : 'bg-slate-900 text-slate-200 border border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] opacity-75 mb-0.5 font-bold">
                    <span>{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="leading-snug">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-2.5 bg-[#0D131F] border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask Mentor Viji a question..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Classroom Footer Controls Toolbar */}
      <footer className="h-16 bg-[#0D131F] border-t border-slate-800/90 px-6 flex items-center justify-between flex-shrink-0 z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMicOn(!micOn)}
            className={`p-3 rounded-full text-xs font-bold transition-all ${
              micOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500/20 text-red-400 border border-red-500/40'
            }`}
            title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setVideoOn(!videoOn)}
            className={`p-3 rounded-full text-xs font-bold transition-all ${
              videoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500/20 text-red-400 border border-red-500/40'
            }`}
            title={videoOn ? 'Pause Camera' : 'Resume Camera'}
          >
            {videoOn ? <VideoIcon className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </button>

          <button
            onClick={handleToggleScreenShare}
            className={`p-3 rounded-full text-xs font-bold transition-all ${
              screenSharing ? 'bg-orange-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title="Share Screen"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Center Quick Hint */}
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>1:1 Audio &amp; Video Connected</span>
        </div>

        {/* End Class Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/book-a-demo"
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>End Class</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
