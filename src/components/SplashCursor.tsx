import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const SplashCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const createRipple = useCallback((x: number, y: number) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: radial-gradient(circle, hsla(350, 80%, 55%, 0.6) 0%, transparent 70%);
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 9999;
    `;
    document.body.appendChild(ripple);

    gsap.to(ripple, {
      width: 100,
      height: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let rippleTimer = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create ripple effect occasionally
      rippleTimer++;
      if (rippleTimer % 8 === 0) {
        createRipple(mouseX, mouseY);
      }

      // Instant dot movement
      gsap.set(cursorDot, {
        x: mouseX,
        y: mouseY,
      });
    };

    const animate = () => {
      // Smooth cursor follow
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Scale on click
    const handleClick = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
      });
      createRipple(mouseX, mouseY);
      createRipple(mouseX, mouseY);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [createRipple]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid hsla(350, 80%, 55%, 0.5)',
          background: 'radial-gradient(circle, hsla(350, 80%, 55%, 0.1) 0%, transparent 70%)',
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'hsl(350, 80%, 55%)',
          boxShadow: '0 0 10px hsla(350, 80%, 55%, 0.8)',
        }}
      />
      <div ref={containerRef} />
    </>
  );
};

export default SplashCursor;
