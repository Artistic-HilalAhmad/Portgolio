import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        if (glowRef.current) glowRef.current.style.opacity = '1';
        if (orbRef.current) orbRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (glowRef.current) glowRef.current.style.opacity = '0';
      if (orbRef.current) orbRef.current.style.opacity = '0';
    };

    const updatePosition = () => {
      // Smooth lerp interpolation
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      const isLight = theme.type === 'light';
      const glowColor = isLight ? 'rgba(2, 132, 199, 0.04)' : 'rgba(56, 189, 248, 0.08)';

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(450px circle at ${targetX}px ${targetY}px, ${glowColor}, transparent 80%)`;
      }

      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-300 will-change-[background]"
      />
      <div
        ref={orbRef}
        className="pointer-events-none fixed top-0 left-0 z-40 h-32 w-32 rounded-full bg-sky-400/10 blur-[40px] opacity-0 transition-opacity duration-300 will-change-transform"
      />
    </>
  );
};
