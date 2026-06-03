import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  SiReact,
  SiDotnet,
  SiPython,
  SiCplusplus,
  SiGit,
  SiVercel
} from 'react-icons/si';
import { FaDatabase, FaBrain } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { id: 1, name: 'React.js', icon: SiReact },
  { id: 2, name: '.NET', icon: SiDotnet },
  { id: 3, name: 'SQL', icon: FaDatabase },
  { id: 4, name: 'Python', icon: SiPython },
  { id: 5, name: 'AI / ML', icon: FaBrain },
  { id: 6, name: 'C++', icon: SiCplusplus },
  { id: 7, name: 'Git', icon: SiGit },
  { id: 8, name: 'Vercel', icon: SiVercel },
];

export default function Skills() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const orbitWrapRef = useRef(null);
  const orbitRef = useRef(null);
  const centerTextRef = useRef(null);
  const portalRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      entranceTl.fromTo(
        titleRef.current,
        { opacity: 0, y: -30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
      ).fromTo(
        orbitRef.current,
        { opacity: 0, scale: 0.5, rotation: -45 },
        { opacity: 1, scale: 1, rotation: 0, duration: 2.2, ease: 'expo.out' },
        '-=0.8'
      );

      gsap.set(portalRef.current, { scale: 0, xPercent: -50, yPercent: -50 });

      const zoomTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center 45%',
          end: '+=120%',
          pin: true,
          scrub: 0.8,
        },
      });

      zoomTl
        .to(centerTextRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0)
        .to(orbitWrapRef.current, { scale: 15, duration: 2, ease: 'power2.in' }, 0)
        .to(titleRef.current, { y: -100, opacity: 0, duration: 0.5 }, 0.5)
        .to(orbitRef.current, { opacity: 0, duration: 0.5 }, 1.5)
        .to(portalRef.current, {
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.in'
        }, 1.2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="skills-container" id="case-studies">

      <div ref={portalRef} className="white-portal" />

      <div className="ambient-light" />

      <div className="glitch-overlay" aria-hidden="true">
        <div className="glitch-slice slice-1" />
        <div className="glitch-slice slice-2" />
        <div className="glitch-slice slice-3" />
      </div>

      <div ref={titleRef} className="skills-header">
        <h2 className="skills-title" data-text="Skills">Skills</h2>
      </div>

      <div ref={orbitWrapRef} className="skills-orbit-wrap">
        <div ref={orbitRef} className="orbit-system">

          <div ref={centerTextRef} className="orbit-center-para">
            <p>
              Bridging strategy and execution through code, data, and product
              thinking - shipping end-to-end systems that actually solve the
              right problem.
            </p>
          </div>

          <div className="orbit-ring">
            {SKILLS.map((skill, index) => (
              <div
                key={skill.id}
                className="coin-positioner"
                style={{ '--angle': `${index * 45}deg` }}
              >
                <div className="coin-3d-tilt">
                  <div className="skill-coin">
                    <div className="coin-glare" />
                    <div className="coin-content">
                      <skill.icon className="coin-icon" />
                      <span className="coin-name">{skill.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}