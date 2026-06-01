import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const bracketLeftRef = useRef(null);
    const bracketRightRef = useRef(null);
    const lineTopRef = useRef(null);
    const lineBottomRef = useRef(null);
    const introRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    toggleActions: 'play none none reverse',
                }
            });

            tl.to(gridRef.current, { opacity: 0.15, duration: 1.5, ease: 'power2.inOut' }, 0);

            tl.fromTo([lineTopRef.current, lineBottomRef.current],
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 0.3, duration: 1.5, ease: 'expo.out', stagger: 0.2 },
                0.2
            );

            tl.fromTo(bracketLeftRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: 'back.out(1.5)' },
                0.5
            );
            tl.fromTo(bracketRightRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: 'back.out(1.5)' },
                0.5
            );

            tl.fromTo(titleRef.current,
                { opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.95 },
                { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 1.2, ease: 'power3.out' },
                0.6
            );

            tl.fromTo(textRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out' },
                0.9
            );

            tl.fromTo(introRef.current,
                { opacity: 0, y: 10, filter: 'blur(4px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
                1.1
            );

            const chatBubbles = [line1Ref.current, line2Ref.current, line3Ref.current];
            tl.fromTo(chatBubbles,
                { opacity: 0, scale: 0.8, y: 30, transformOrigin: 'bottom left' },
                { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.25, ease: 'back.out(1.2)' },
                1.3
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="about-section">
            <div ref={gridRef} className="about-grid-bg" />

            <div className="about-content-wrapper">
                <div className="about-design-frame">
                    <div ref={lineTopRef} className="design-line line-top" />
                    <div ref={lineBottomRef} className="design-line line-bottom" />
                </div>

                <div className="about-header-centered">
                    <h2 ref={titleRef} className="about-title">About Me</h2>
                </div>
                <div className="about-split-layout">
                    <div className="about-left-col">
                        <div ref={textRef} className="about-body">
                            <p>
                                I am a Software Engineer (Vellore Institute of Technology '26) who builds across the full stack and AI.
                            </p>
                            <p>
                                I believe the best technical architectures are driven by a deep understanding of business goals.
                            </p>
                            <p>
                                By bridging the gap between high-level strategy and low-level execution, my goal is to organize chaos and build solutions that truly matter.
                            </p>
                        </div>
                    </div>

                    <div className="about-right-col">
                        <div className="chat-about-wrapper">
                            <h2 ref={introRef} className="chat-intro-about">CURIOUS ABOUT</h2>
                            <div className="chat-bubbles-stack">
                                <div ref={line1Ref}>
                                    <div className="bubble-float-wrapper float-1">
                                        <span className="chat-bubble bubble-systems">Systems</span>
                                    </div>
                                </div>
                                <div ref={line2Ref} className="bubble-offset-1">
                                    <div className="bubble-float-wrapper float-2">
                                        <span className="chat-bubble bubble-product">Product</span>
                                    </div>
                                </div>
                                <div ref={line3Ref} className="bubble-offset-2">
                                    <div className="bubble-float-wrapper float-3">
                                        <span className="chat-bubble bubble-ai">& AI.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}