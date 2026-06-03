import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);
    const chars = '010101ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const fontSize = 15;
    let columns = Math.floor(width / fontSize);
    let drops = [];
    let activeColumns = [];

    const initDrops = () => {
      for (let x = 0; x < columns; x++) {
        activeColumns[x] = Math.random() > 0.95;
        drops[x] = Math.random() * -100;
      }
    };

    initDrops();

    const draw = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      ctx.fillStyle = '#0000009f';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (activeColumns[i]) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          ctx.clearRect(i * fontSize, 0, fontSize, height);

          drops[i] = 0;
          activeColumns[i] = Math.random() > 0.95;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 60);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      columns = Math.floor(width / fontSize);
      drops = [];
      activeColumns = [];
      initDrops();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      }}
    />
  );
};

const POOL = '⠁⠂⠃⠆⠇⠉⠊⠋⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯';
const ScrambleText = ({ text }) => {
  const [charData, setCharData] = useState([]);
  const isAnimating = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setCharData(
      text.split('').map((letter) => ({
        char: letter === ' ' ? ' ' : letter,
        isSpace: letter === ' ',
        isScrambled: false,
      }))
    );
  }, [text]);
  const triggerScramble = () => {
    if (isAnimating.current) return;

    isAnimating.current = true;
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCharData(
        text.split('').map((letter, index) => {
          if (letter === ' ') return { char: ' ', isSpace: true, isScrambled: false };
          if (index < Math.floor(iteration)) {
            return { char: letter, isScrambled: false };
          }
          return {
            char: POOL[Math.floor(Math.random() * POOL.length)],
            isScrambled: true,
            rotate: (Math.random() * 90 - 45).toFixed(1),
            scale: (0.7 + Math.random() * 0.85).toFixed(2),
          };
        })
      );

      iteration += 0.33;
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        isAnimating.current = false;
        setCharData(
          text.split('').map((letter) => ({
            char: letter === ' ' ? ' ' : letter,
            isSpace: letter === ' ',
            isScrambled: false,
          }))
        );
      }
    }, 40);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  if (charData.length === 0) return <>{text}</>;

  return (
    <span
      onMouseEnter={triggerScramble}
      style={{ cursor: 'crosshair', display: 'inline-block' }}
    >
      {charData.map((d, i) => {
        if (d.isSpace) return <span key={i} style={{ whiteSpace: 'pre' }}> </span>;

        if (!d.isScrambled) return <span key={i} className="revealed-char">{d.char}</span>;

        return (
          <span
            key={i}
            className="scrambled-char"
            style={{
              display: 'inline-block',
              transition: 'transform 0.06s ease',
              willChange: 'transform',
            }}
          >
            {d.char}
          </span>
        );
      })}
    </span>
  );
};

export default function CinematicHero() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const greetingRef = useRef(null);
  const introRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const descriptionRef = useRef(null);
  const scrollRef = useRef(null);

  const art1Ref = useRef(null);
  const art2Ref = useRef(null);
  const art3Ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2;
      const yPos = (clientY / window.innerHeight - 0.5) * 2;

      gsap.to(art1Ref.current, { x: xPos * -30, y: yPos * -30, duration: 1, ease: 'power2.out' });
      gsap.to(art2Ref.current, { x: xPos * -50, y: yPos * -50, duration: 1, ease: 'power2.out' });
      gsap.to(art3Ref.current, { x: xPos * 25, y: yPos * 25, duration: 1, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(introRef.current,
        { opacity: 0, y: 10, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }
      );

      gsap.fromTo([greetingRef.current, introRef.current],
        { opacity: 0, y: 15, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.2, ease: 'power2.out' }
      );

      const floatOrganic = (target) => {
        gsap.to(target, {
          yPercent: gsap.utils.random(-8, 8),
          xPercent: gsap.utils.random(-4, 4),
          rotation: gsap.utils.random(-3, 3),
          duration: gsap.utils.random(3, 6),
          ease: 'sine.inOut',
          onComplete: () => floatOrganic(target)
        });
      };

      floatOrganic(art1Ref.current);
      floatOrganic(art2Ref.current);
      floatOrganic(art3Ref.current);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="hero-container relative">

      <MatrixRain />
      <div className="spotlight spotlight-1 radial-spotlight-indigo" />
      <div className="spotlight spotlight-2 radial-spotlight-silver" />

      <div ref={art1Ref} className="artifact artifact-card">
        <div className="card-bg-gradient" />
        <div className="card-rim-light" />
        <div className="card-content">
          <div className="card-top-row">
            <div className="emv-chip">
              <div className="chip-line-h" />
              <div className="chip-line-h" />
              <div className="chip-line-v" />
            </div>
            <svg className="contactless-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8.5 16.5a10 10 0 0 1 0-9" />
              <path d="M11.5 18a12.5 12.5 0 0 1 0-12" />
              <path d="M14.5 19.5a15 15 0 0 1 0-15" />
            </svg>
          </div>
          <div className="card-middle-row">
            <div className="card-number">
              •••• •••• •••• 4096
            </div>
          </div>
          <div className="card-bottom-row">
            <div className="card-user-info">
              <span className="card-status">
                <span className="status-dot" />
                Active System
              </span>
              <span className="card-name">SHASHANK MODI</span>
            </div>
            <div className="card-branding">
              blip<span className="branding-dot">.</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={art2Ref} className="artifact artifact-card artifact-ml">
        <div className="card-bg-gradient" />
        <div className="ml-rim-light" />
        <div className="card-content">
          <div className="ml-header">
            <span className="ml-title">xgboost</span>
            <span className="ml-status">OPTIMIZED</span>
          </div>
          <div className="ml-tree-container">
            <svg className="ml-edges" width="100%" height="100%">
              <line x1="50%" y1="10%" x2="30%" y2="50%" />
              <line x1="50%" y1="10%" x2="70%" y2="50%" />
              <line x1="30%" y1="50%" x2="15%" y2="90%" />
              <line x1="30%" y1="50%" x2="45%" y2="90%" />
              <line x1="70%" y1="50%" x2="55%" y2="90%" />
              <line x1="70%" y1="50%" x2="85%" y2="90%" />
            </svg>
            <div className="ml-node root" style={{ left: '50%', top: '10%' }} />
            <div className="ml-node split" style={{ left: '30%', top: '50%' }} />
            <div className="ml-node split" style={{ left: '70%', top: '50%' }} />
            <div className="ml-node leaf" style={{ left: '15%', top: '90%' }} />
            <div className="ml-node leaf pulse-1" style={{ left: '45%', top: '90%' }} />
            <div className="ml-node leaf" style={{ left: '55%', top: '90%' }} />
            <div className="ml-node leaf pulse-2" style={{ left: '85%', top: '90%' }} />
          </div>
          <div className="ml-footer">
            <span className="ml-metric">&gt; MAE: <span className="text-white">0.93</span></span>
            <span className="ml-metric">MSE: <span className="text-white">0.95</span></span>
          </div>
        </div>
      </div>

      <div ref={art3Ref} className="artifact artifact-card artifact-lock">
        <div className="card-bg-gradient" />
        <div className="lock-rim-light" />
        <div className="card-content">
          <div className="lock-header">
            <span className="lock-title">SQL TRANSACTIONS</span>
            <span className="lock-status">SECURED</span>
          </div>
          <div className="css-lock-container">
            <div className="css-lock-shackle" />
            <div className="css-lock-body">
              <div className="css-lock-keyhole">
                <div className="keyhole-circle" />
                <div className="keyhole-base" />
              </div>
            </div>
          </div>
          <div className="lock-footer">
            <span className="lock-hash">HASH: <span className="text-white">0x8F4...B92</span></span>
            <span className="lock-latency"><span className="status-dot-purple" /> COMMITTED</span>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="hero-content z-10 relative" style={{ marginBottom: '10rem' }}>
        <div ref={greetingRef} className="hero-greeting-wrapper">
          <h1 className="hero-greeting">
            <span style={{ color: '#3a451c97', fontWeight: '600', fontSize: '3.5rem' }}>Hi, I'm</span> <div style={{ color: '#1e2019d0', fontWeight: 800, fontSize: '4rem' }}><ScrambleText text="Shashank Modi." /></div>
          </h1>
        </div>

        <div ref={descriptionRef} className="hero-desc-wrapper">
          <p className="hero-desc">
            "Great products fracture when business strategy and engineering execution speak different languages.
            <br />
            I build across the stack and AI to act as that missing bridge. By immersing myself in the overarching architecture and business goals, I ensure the code we write solves the actual problem - not just the ticket."
          </p>
          <div className="hero-tags">
            {['Full-Stack Development', 'AI/ML Engineering', 'Product Architecture'].map((tag) => (
              <span key={tag} className="hero-tag">
                <span className="tag-status-dot"></span>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="hero-scroll-indicator">
        <span>DESCEND</span>
        <svg className="animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}