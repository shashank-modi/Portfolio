import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ProvidenceLogo from '../assets/providence-logo.jpeg';
import SUDLogo from '../assets/sud-logo.jpeg';
import BiomedLogo from '../assets/biomed-logo.png';
import { FiMapPin, FiCalendar, FiLinkedin } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
    {
        id: 1,
        company: 'Star Union Dai-ichi Life Insurance',
        role: 'Software Development Intern',
        duration: 'Jan 2026 - June 2026',
        location: 'Mumbai, India',
        iconSrc: SUDLogo,
        details: [
            'Optimized a high-volume stored procedure operating on large datasets, reducing query execution time by 2x and simplifying code by 3x through indexing, join restructuring, and use of temporary tables.',
            'Developed a streaming XML export pipeline using .NET (XMLWriter, GZipStream, SqlDataReader), reducing memory usage to 5-20MB for large regulatory data exports.',
            'Migrated legacy APIs from Python to .NET, aligning services with the organization\'s backend ecosystem.',
            'Documenting legacy systems by creating system design documentation for undocumented applications.'
        ]
    },
    {
        id: 2,
        company: 'Providence Global Center',
        role: 'Software Engineer Summer Intern',
        duration: 'May 2025 — Aug 2025',
        location: 'Hyderabad, India',
        iconSrc: ProvidenceLogo,
        details: [
            'Developed a workflow management platform using React, ASP.NET Core, and MS SQL Server, replacing manual SharePoint-based processes across teams.',
            'Designed and implemented REST APIs and automated reporting workflows using MailKit, improving process visibility and reducing manual effort.',
            'Built real-time dashboards for facility onboarding metrics, enabling better tracking and decision-making for leadership.'
        ]
    },
    {
        id: 3,
        company: 'Biomed International',
        role: 'Technical Intern ',
        duration: 'Jun 2024 — July 2024',
        location: 'Kathmandu, Nepal',
        iconSrc: BiomedLogo,
        details: [
            'Redesigned product pages using HTML, CSS, and JavaScript, improving responsiveness and overall navigation.',
            'Developed a secure patient portal and resolved user-reported issues, reducing recurring frontend bugs by 15%.'
        ]
    }
];

export default function Experience() {
    const containerRef = useRef(null);
    const headingRef = useRef(null);
    const rowRefs = useRef([]);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 50, filter: 'blur(10px)' },
                {
                    opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out',
                    scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
                }
            );
            rowRefs.current.forEach((row) => {
                if (!row) return;
                const leftCol = row.querySelector('.exp-meta-inner');
                const rightCol = row.querySelector('.exp-details');
                const leftColWrapper = row.querySelector('.exp-meta');

                gsap.fromTo(leftCol,
                    { opacity: 0, x: -40 },
                    {
                        opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
                        scrollTrigger: { trigger: row, start: 'top 80%' }
                    }
                );
                gsap.fromTo(rightCol,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
                        scrollTrigger: { trigger: row, start: 'top 72%' }
                    }
                );
                ScrollTrigger.create({
                    trigger: row,
                    pin: leftColWrapper,
                    start: 'top 30%',
                    end: 'bottom 80%',
                    pinSpacing: false,
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="experience-container" id="experience">
            <div className="experience-content">
                <div className="experience-header-wrap" ref={headingRef}>
                    <h2 className="experience-heading">
                        EXPERIENCE
                    </h2>
                    <a href="https://www.linkedin.com/in/shashank-modi" target="_blank" rel="noreferrer" className="linkedin-profile-btn">
                        <FiLinkedin className="btn-icon" />
                        <span>View LinkedIn</span>
                    </a>
                </div>

                <div className="experience-list">
                    {EXPERIENCES.map((exp, index) => (
                        <div
                            key={exp.id}
                            className="experience-row"
                            ref={(el) => (rowRefs.current[index] = el)}
                        >
                            <div className="exp-meta">
                                <div className="exp-meta-inner">
                                    <div className="exp-company-group">
                                        <div className="exp-icon-wrap">
                                            <img
                                                src={exp.iconSrc}
                                                alt={`${exp.company} logo`}
                                                className="exp-company-logo"
                                            />
                                        </div>
                                        <h3 className="exp-company">{exp.company}</h3>
                                    </div>

                                    <div className="exp-meta-details">
                                        <span className="meta-item">
                                            <FiCalendar className="meta-icon" />
                                            {exp.duration}
                                        </span>
                                        <span className="meta-item">
                                            <FiMapPin className="meta-icon" />
                                            {exp.location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="exp-details">
                                <h4 className="exp-role">{exp.role}</h4>
                                <ul className="exp-bullets">
                                    {exp.details.map((bullet, i) => (
                                        <li key={i} className="exp-bullet-item">
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
    );
}