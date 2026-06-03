import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiMail, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const gridRefs = useRef([]);
  const rowRefs = useRef([]);

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setTime(`${formattedTime} IST`);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.fromTo(textRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
      );

      tl.fromTo(gridRefs.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, stagger: 0.1, ease: 'power2.inOut', transformOrigin: 'left' },
        "-=0.8"
      );

      tl.fromTo(rowRefs.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        "-=0.5"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="contact-container" id="contact">

      <div className="contact-inner">
        <div className="contact-title-wrap">
          <h2 ref={textRef} className="contact-title">SAY HELLO.</h2>
        </div>
        <div className="contact-grid">

          <div className="grid-line" ref={el => gridRefs.current[0] = el} />

          <div className="contact-columns">

            <div className="contact-left">
              <div className="time-wrap">
                <div className="time-header">
                  <div className="status-dot" />
                  <span className="time-label">Local Time (Mumbai)</span>
                </div>
                <span className="time-value">{time || "Loading..."}</span>
              </div>

              <a href={`${import.meta.env.BASE_URL}resume.pdf`} download="Resume-Shashank_Modi.pdf" target="_blank" rel="noreferrer" className="cv-download-btn">
                <span>Download Résumé</span>
                <FiDownload className="cv-icon" />
              </a>
            </div>

            <div className="contact-right">
              <a href="mailto:modishashank10@gmail.com" className="social-row" ref={el => rowRefs.current[0] = el}>
                <div className="social-info">
                  <FiMail className="social-icon" />
                  <span className="social-name">Email</span>
                </div>
                <FiArrowUpRight className="social-arrow" />
              </a>

              <a href="https://linkedin.com/in/shashank-modi" target="_blank" rel="noreferrer" className="social-row" ref={el => rowRefs.current[1] = el}>
                <div className="social-info">
                  <FiLinkedin className="social-icon" />
                  <span className="social-name">LinkedIn</span>
                </div>
                <FiArrowUpRight className="social-arrow" />
              </a>

              <a href="https://github.com/shashank-modi" target="_blank" rel="noreferrer" className="social-row" ref={el => rowRefs.current[2] = el}>
                <div className="social-info">
                  <FiGithub className="social-icon" />
                  <span className="social-name">GitHub</span>
                </div>
                <FiArrowUpRight className="social-arrow" />
              </a>

              <div className="social-row twitter-row" ref={el => rowRefs.current[3] = el}>
                <div className="social-info">
                  <FaXTwitter className="social-icon" />
                  <div className="twitter-text-wrap">
                    <span className="twitter-default">X (Twitter)</span>
                    <span className="twitter-hover">Coming Soon</span>
                  </div>
                </div>
                <div className="twitter-placeholder" />
              </div>

            </div>
          </div>

          <div className="grid-line" ref={el => gridRefs.current[1] = el} />
        </div>

        <div className="footer-credits">
          <span>© {new Date().getFullYear()} Shashank Modi. All rights reserved.</span>
          <span>Built with React & GSAP.</span>
        </div>
      </div>
    </div>
  );
}