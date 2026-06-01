import { useState, useEffect, useRef } from 'react';

const LINKS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'teardowns' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' }
];

export default function Navbar() {
  const [active, setActive] = useState('hero');
  const activeRef = useRef('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id && id !== activeRef.current) {
              activeRef.current = id;
              setActive(id);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40% 0px',
      }
    );

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-links">
          {LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleScroll(e, id)}
              className={`navbar-link${active === id ? ' navbar-link--active' : ''}`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}