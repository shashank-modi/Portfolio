import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: 1,
        title: 'blip.',
        type: 'Full-Stack PWA',
        tech: ['React.js', 'Node.js', 'PostgreSQL', 'Vercel'],
        links: [{ label: 'Live Demo', url: 'https://blip-eta.vercel.app/', icon: FiExternalLink }],
        bullets: [
            'Engineered a rule-based NLP engine for real-time expense logging, achieving <100ms processing by eliminating LLM call latency.',
            'Architected a social debt settlement system using PostgreSQL ACID transactions and row-level locking for safe concurrent balance updates.',
            'Reduced perceived latency via optimistic UI updates and serverless warm-up strategies to mitigate cold starts.',
            'Designed a high-contrast, minimalist interface optimized for rapid data entry and power-user workflows.'
        ],
    },
    {
        id: 2,
        title: 'Mental Fatigue Estimation',
        type: 'Machine Learning Pipeline',
        tech: ['Python', 'scikit-learn', 'XGBoost', 'NumPy', 'Pandas'],
        links: [{ label: 'View Code', url: 'https://github.com/shashank-modi/MentalFatigueEstimation-KeystrokeDynamics', icon: FiCode }],
        bullets: [
            'Built an ML pipeline to estimate cognitive fatigue levels (1-5) using keystroke dynamics and mouse telemetry data.',
            'Engineered features such as typing latency and cursor movement patterns to convert raw input events into predictive signals.',
            'Evaluated Linear Regression, Random Forest, and XGBoost; best performance with XGBoost (MAE: 0.93, MSE: 0.95).',
        ],
    },
];

export default function Projects() {
    const containerRef = useRef(null);
    const headingRef = useRef(null);
    const projectRefs = useRef([]);
    const segmentRefs = useRef([]);
    const dotRefs = useRef([]);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
                }
            );

            projectRefs.current.forEach((project, i) => {
                if (!project) return;

                const dot = dotRefs.current[i];
                const ripple = project.querySelector('.project-dot-ripple');
                const pulse = project.querySelector('.project-dot-pulse');
                const content = project.querySelector('.project-content');
                const segment = segmentRefs.current[i];

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: project,
                        start: 'top 65%',
                        toggleActions: 'play none none reverse',
                    },
                });

                tl
                    .to(dot, { backgroundColor: '#111', borderColor: '#111', scale: 1.2, duration: 0.3, ease: 'back.out(2)' }, 0)
                    .to(pulse, { opacity: 0, duration: 0.2 }, 0)

                    .fromTo(ripple,
                        { scale: 0.8, opacity: 0.8 },
                        { scale: 3, opacity: 0, duration: 0.9, ease: 'power2.out' },
                        0
                    )

                    .fromTo(content,
                        { opacity: 0, x: 30, filter: 'blur(4px)' },
                        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
                        0.1
                    );

                if (segment) {
                    tl.fromTo(segment,
                        { scaleY: 0 },
                        { scaleY: 1, duration: 1.2, ease: 'power2.inOut' },
                        0.2
                    );
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="projects-container" id="projects">
            <div className="projects-inner">

                <div className="projects-header-wrap" ref={headingRef}>
                    <h2 className="projects-heading">Selected Works</h2>

                    <a href="https://github.com/shashank-modi" target="_blank" rel="noreferrer" className="github-profile-btn">
                        <FiGithub className="btn-icon" />
                        <span>View GitHub</span>
                    </a>
                </div>

                <div className="projects-list-wrap">
                    <div className="projects-list">
                        {PROJECTS.map((proj, index) => (
                            <div
                                key={proj.id}
                                className="project-row"
                                ref={el => (projectRefs.current[index] = el)}
                            >
                                {index < PROJECTS.length - 1 && (
                                    <div
                                        className="project-segment"
                                        ref={el => (segmentRefs.current[index] = el)}
                                    />
                                )}

                                <div className="project-node">
                                    <div className="project-dot-pulse" />
                                    <div className="project-dot-ripple" />
                                    <div
                                        className="project-dot-inner"
                                        ref={el => (dotRefs.current[index] = el)}
                                    />
                                </div>
                                <div className="project-content">
                                    <div className="project-header">
                                        <div>
                                            <h3 className="project-title">{proj.title}</h3>
                                            <span className="project-type">{proj.type}</span>
                                        </div>
                                        <div className="project-links">
                                            {proj.links.map((link, i) => (
                                                <a key={i} href={link.url} target="_blank" rel="noreferrer" className="project-link">
                                                    <link.icon className="link-icon" />
                                                    <span>{link.label}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="project-tech">
                                        {proj.tech.map((t, i) => (
                                            <span key={i} className="tech-tag">{t}</span>
                                        ))}
                                    </div>

                                    <ul className="project-bullets">
                                        {proj.bullets.map((bullet, i) => (
                                            <li key={i} className="project-bullet-item">
                                                <span className="bullet-dash">—</span>
                                                <p>{bullet}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}