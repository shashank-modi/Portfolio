# Shashank Modi — Design Engineering Portfolio

A premium portfolio experience engineered with React, GSAP, and Lenis Smooth Scroll, combining motion design, architectural layouts, and interactive storytelling.

[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-B736FF?style=flat-square&logo=vite&logoColor=FFD62B)](https://vite.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=github&logoColor=white)](https://pages.github.com/)

---

## Live Demo

**Portfolio:** https://shashank-modi.github.io/Portfolio/

---

## Overview

This portfolio serves as a digital showroom for my work, projects, and engineering philosophy.

Built with a strong emphasis on:

- Motion-driven user experiences
- High-performance frontend architecture
- Smooth scrolling systems
- Structural typography
- Interactive project showcases
- Clean and minimalist design principles

The experience is intentionally optimized for desktop devices to preserve animation quality and visual fidelity.

---

## Features

### Smooth Scroll Architecture

- Lenis-powered smooth scrolling
- GSAP ScrollTrigger synchronization
- Consistent scrolling behavior across browsers

### Motion Design System

- Timeline-based animations
- Scroll-driven interactions
- Carefully designed micro-interactions
- Performance-focused animation sequencing

### Responsive Experience Control

- Desktop-first experience
- Mobile experience isolation
- Reduced unnecessary rendering on unsupported viewports

### Interactive Components

- Real-time local clock
- Animated navigation system
- Dynamic project showcases
- Resume download functionality

---

## Tech Stack

| Category | Technology |
|-----------|------------|
| Framework | React |
| Build Tool | Vite |
| Animations | GSAP |
| Scroll Engine | Lenis |
| Styling | CSS3 |
| Icons | React Icons |
| Deployment | GitHub Pages |

---

## Engineering Highlights

### GSAP × Lenis Synchronization

One of the primary engineering challenges involved synchronizing GSAP ScrollTrigger with Lenis's custom scroll engine.

The implementation includes:

- Shared render loop integration
- ScrollTrigger refresh lifecycle management
- Dynamic height recalculation support
- Resize-aware scroll boundary updates

### Desktop-Only Rendering Strategy

The portfolio intentionally disables animation-heavy experiences on mobile devices.

Benefits include:

- Improved performance
- Better animation fidelity
- Consistent layout behavior
- Reduced GPU overhead

### Production Asset Management

The application uses Vite's build pipeline alongside GitHub Pages deployment to ensure:

- Correct static asset paths
- Reliable PDF downloads
- Consistent production builds
- Fast page delivery

---

## Project Structure

```text
src/
├── components/
│   ├── Navbar
│   └── Shared UI Components
│
├── sections/
│   ├── CinematicHero
│   ├── About
│   ├── Skills
│   ├── Experience
│   ├── Projects
│   └── Contact
│
├── App.jsx
├── main.jsx
└── index.css

public/
├── resume.pdf
└── assets/
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/shashank-modi/Portfolio.git
cd Portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

## Deployment

Push source code:

```bash
git add .
git commit -m "update portfolio"
git push origin main
```

Deploy production build:

```bash
npm run deploy
```

---

## Performance Considerations

- Optimized asset loading
- GPU-friendly transforms
- Scroll-triggered rendering
- Font loading synchronization
- Lightweight dependency footprint
- Smooth 60 FPS animation targets

---

## Future Improvements

- Theme switching support
- Enhanced accessibility features
- Mobile Experience Extension
- Expanded project case studies
- Experimental Three.js experiences

---

## About Me

I am a software engineer focused on backend systems, AI, developer tooling, and interactive web experiences. I enjoy building products that combine strong engineering foundations with thoughtful user experiences.

### Connect

- LinkedIn: https://linkedin.com/in/shashank-modi
- GitHub: https://github.com/shashank-modi
- Email: modishashank10@gmail.com

---

Built with React, GSAP, and Lenis.

© 2026 Shashank Modi. All rights reserved.