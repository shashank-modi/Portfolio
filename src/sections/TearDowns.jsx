import { useState, useEffect, useRef } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const ESSAYS = [
  {
    num: '01',
    title: 'Cognitive State Management: LLM Tool Calling Loops',
    date: 'OCTOBER 2025',
    category: 'AI SYSTEMS DESIGN',
    desc: 'Analyzing execution barriers, recovery trees, and state-machine architectures for autonomous agentic loops in production environment sandboxes.',
    visual: (
      <svg className="w-full h-full" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="180" fill="#000" rx="4" />
        <circle cx="120" cy="90" r="50" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" />
        <path d="M 120 40 L 120 140" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.75" />
        <path d="M 70 90 L 170 90" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.75" />
        {/* State nodes */}
        <circle cx="120" cy="40" r="6" fill="#000000" stroke="#00f0ff" strokeWidth="1" />
        <circle cx="120" cy="140" r="6" fill="#000000" stroke="#00f0ff" strokeWidth="1" />
        <circle cx="70" cy="90" r="6" fill="#000000" stroke="#00f0ff" strokeWidth="1" />
        <circle cx="170" cy="90" r="6" fill="#000000" stroke="#00f0ff" strokeWidth="1" />
        {/* Flow arrows */}
        <path d="M 126 40 A 50 50 0 0 1 170 84" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M 170 96 A 50 50 0 0 1 126 140" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
        <path d="M 114 140 A 50 50 0 0 1 70 96" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
        <path d="M 70 84 A 50 50 0 0 1 114 40" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3 3" />
        
        <text x="120" y="93" fill="#fff" fontSize="6" fontFamily="monospace" textAnchor="middle" letterSpacing="0.05em">AGENTIC_CYCLE</text>
      </svg>
    )
  },
  {
    num: '02',
    title: 'The Latency Wall: Quantizing Models on the Client Edge',
    date: 'AUG 2025',
    category: 'LATENCY OPTIMIZATION',
    desc: 'Deep dive into integer precision mapping, memory cache management, and WebAssembly compilation loops for sub-second local inferences.',
    visual: (
      <svg className="w-full h-full" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="180" fill="#000" rx="4" />
        {/* Quantization grids */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.5">
          <line x1="20" y1="20" x2="220" y2="20" />
          <line x1="20" y1="60" x2="220" y2="60" />
          <line x1="20" y1="100" x2="220" y2="100" />
          <line x1="20" y1="140" x2="220" y2="140" />
          
          <line x1="40" y1="10" x2="40" y2="170" />
          <line x1="100" y1="10" x2="100" y2="170" />
          <line x1="160" y1="10" x2="160" y2="170" />
          <line x1="200" y1="10" x2="200" y2="170" />
        </g>
        {/* Data curve */}
        <path d="M 20 150 Q 80 40 120 100 T 220 30" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <path d="M 20 150 Q 80 40 120 100 T 220 30" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="5 7" />
        
        <circle cx="80" cy="62" r="4" fill="#00f0ff" />
        <circle cx="120" cy="100" r="4" fill="#00f0ff" />
        <circle cx="170" cy="65" r="4" fill="#fff" />
        
        <text x="30" y="165" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="monospace">8-BIT_QUANTIZATION</text>
      </svg>
    )
  },
  {
    num: '03',
    title: 'UI as a Compiler: Heuristic Input Parsing Blueprints',
    date: 'MAY 2025',
    category: 'INTERFACE COMPILATION',
    desc: 'Structuring UX mechanics that parse unstructured user commands into predictable database actions, bypassing heavy API request buffers.',
    visual: (
      <svg className="w-full h-full" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="180" fill="#000" rx="4" />
        {/* Blueprint trees */}
        <rect x="20" y="30" width="70" height="20" rx="2" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
        <text x="55" y="42" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="monospace" textAnchor="middle">UNSTRUCTURED_IN</text>
        
        <line x1="90" y1="40" x2="140" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        
        <rect x="140" y="30" width="80" height="20" rx="2" fill="none" stroke="#00f0ff" strokeWidth="0.75" />
        <text x="180" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" textAnchor="middle">REGEX_HEURISTICS</text>
        
        <line x1="180" y1="50" x2="180" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        
        <rect x="140" y="100" width="80" height="20" rx="2" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
        <text x="180" y="112" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="monospace" textAnchor="middle">STRUCTURED_SCHEMA</text>
        
        <path d="M 140 110 L 55 110 L 55 50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" strokeDasharray="3 3" />
        
        <text x="55" y="125" fill="#00f0ff" fontSize="5" fontFamily="monospace" textAnchor="middle">FEEDBACK_LOOP</text>
      </svg>
    )
  }
];

export default function TearDowns() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const containerRef = useRef(null);
  const floatingRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cardPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Lerp loop for weighted spring movement of the hover preview card
    let animFrameId;
    const updateLerp = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Spring-like lerping parameter (0.08 friction)
      const x = cardPos.current.x + (targetX - cardPos.current.x) * 0.08;
      const y = cardPos.current.y + (targetY - cardPos.current.y) * 0.08;

      cardPos.current = { x, y };

      if (floatingRef.current) {
        // Offset card slightly so it sits next to the cursor instead of directly under it
        floatingRef.current.style.transform = `translate3d(${x + 25}px, ${y - 120}px, 0)`;
      }

      animFrameId = requestAnimationFrame(updateLerp);
    };

    updateLerp();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="teardowns-container"
    >
      
      {/* Ambient Spotlight */}
      <div className="spotlight spotlight-3 radial-glow-silver" />

      {/* Floating Schematic Card (Mouse Follower) */}
      <div
        ref={floatingRef}
        className={`floating-schematic ${hoveredIdx !== null ? 'visible' : 'hidden'}`}
        style={{ willChange: 'transform' }}
      >
        {hoveredIdx !== null && ESSAYS[hoveredIdx].visual}
      </div>

      <div className="teardowns-content">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="section-header-meta">
            // DISTRIBUTION ENGINE // 03
          </div>
          <h2 className="section-title">
            TEAR-DOWNS & PAPERS
          </h2>
        </ScrollReveal>

        {/* Brutalist Essay List */}
        <div className="essays-list">
          
          {ESSAYS.map((essay, idx) => (
            <div
              key={essay.num}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="essay-row"
            >
              {/* Highlight background light overlay */}
              <div className="essay-hover-bg" />
              
              {/* Left detail: Index & meta */}
              <div className="essay-meta">
                <span className="essay-num">{essay.num}</span>
                <span>/</span>
                <span>{essay.category}</span>
              </div>

              {/* Center detail: Title & desc */}
              <div className="essay-body">
                <h3 className="essay-title">
                  {essay.title}
                </h3>
                <p className="essay-desc">
                  {essay.desc}
                </p>
              </div>

              {/* Right detail: Timestamp */}
              <div className="essay-date">
                {essay.date}
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
