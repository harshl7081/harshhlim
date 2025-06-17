'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Pageeeee() {
  const router = useRouter();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [letterRefs, setLetterRefs] = useState<(HTMLSpanElement | null)[]>(Array(15).fill(null));
  const [isNavigating, setIsNavigating] = useState(false);

  // Add mount animation
  useEffect(() => {
    document.body.style.opacity = '1';
  }, []);

  // Parallax handler with enhanced letter highlight
  function handleMouseMove(e: React.MouseEvent) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMouse({ x, y });

    requestAnimationFrame(() => {
      letterRefs.forEach((letterRef, index) => {
        if (letterRef) {
          const rect = letterRef.getBoundingClientRect();
          const letterCenterX = rect.left + rect.width / 2;
          const letterCenterY = rect.top + rect.height / 2;
          const distance = Math.sqrt(
            Math.pow(e.clientX - letterCenterX, 2) + 
            Math.pow(e.clientY - letterCenterY, 2)
          );
          const maxDistance = 150; // Increased interaction range
          const intensity = Math.max(0, 1 - distance / maxDistance);
          
          if (distance < maxDistance) {
            const baseColor = '#00c6fb';
            const glowColor1 = '#f94892';
            const glowColor2 = '#a21caf';
            
            letterRef.style.color = baseColor;
            letterRef.style.textShadow = `
              0 0 4px #fff,
              0 0 8px #fff,
              0 0 12px ${baseColor},
              0 0 20px ${baseColor},
              0 0 32px ${glowColor1},
              0 0 48px ${glowColor2}
            `;
            letterRef.style.transform = `scale(${1 + intensity * 0.4}) rotate(${intensity * 10}deg)`;
            letterRef.style.filter = `brightness(${1 + intensity * 1.5})`;
            letterRef.style.zIndex = '10';
          } else {
            letterRef.style.color = '#fff';
            letterRef.style.textShadow = '0 4px 12px rgba(0,0,0,0.5)';
            letterRef.style.transform = 'scale(1) rotate(0deg)';
            letterRef.style.filter = 'none';
            letterRef.style.zIndex = '1';
          }
        }
      });
    });
  }

  const float = (dx: number, dy: number, rot: number = 15) => 
    `translate3d(${(mouse.x - 0.5) * dx}px, ${(mouse.y - 0.5) * dy}px, 0) 
     rotateX(${(mouse.y - 0.5) * rot}deg) rotateY(${(mouse.x - 0.5) * rot}deg)`;

  const handleLetterClick = () => {
    if (isNavigating) return; // Prevent multiple clicks
    setIsNavigating(true);
    
    // Trigger fade-out animation before navigation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
    
    // Navigate to about page after fade animation
    setTimeout(() => {
      router.push('/about');
    }, 500);
  };

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Flowing Gradient Background */}
      <div className="fixed inset-0 -z-20" style={{
        background: `
          linear-gradient(to right, 
            rgba(255, 182, 193, 0.15) 0%,    /* Pastel Pink */
            rgba(173, 216, 230, 0.15) 20%,   /* Pastel Blue */
            rgba(221, 160, 221, 0.15) 40%,   /* Pastel Purple */
            rgba(152, 251, 152, 0.15) 60%,   /* Pastel Green */
            rgba(255, 218, 185, 0.15) 80%,   /* Pastel Peach */
            rgba(255, 182, 193, 0.15) 100%   /* Back to Pink */
          )
        `,
        backgroundSize: '200% 100%',
        animation: 'flowingGradient 8s linear infinite',
      }} />

      {/* Dynamic Glass Shapes with Flowing Gradients */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-1/4 left-1/5 w-[35vw] h-[15vw] rounded-[8vw]"
        style={{
          background: 'linear-gradient(to right, rgba(173, 216, 230, 0.2), rgba(221, 160, 221, 0.2), rgba(255, 182, 193, 0.2))',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          transform: float(-80, -40),
          transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
          animation: 'flowingColors 6s linear infinite',
          backgroundSize: '200% 100%',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-1/4 right-1/5 w-[40vw] h-[18vw] rounded-[10vw]"
        style={{
          background: 'linear-gradient(to right, rgba(152, 251, 152, 0.2), rgba(255, 218, 185, 0.2), rgba(173, 216, 230, 0.2))',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          transform: float(60, 80),
          transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
          animation: 'flowingColors 8s linear infinite reverse',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Main Glass Card with Enhanced Pastel Effects */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl px-16 py-10"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          boxShadow: `
            0 8px 32px rgba(0,0,0,0.3),
            0 1px 1px rgba(255,255,255,0.1),
            inset 0 1px 1px rgba(255,255,255,0.1)
          `,
          border: '1px solid rgba(255,255,255,0.1)',
          maxWidth: '95vw',
          transform: float(120, -120, 12),
          transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
        }}
      >
        <motion.div
          className="font-extrabold tracking-tight text-center relative"
          style={{
            fontSize: '7vw',
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            fontFamily: 'Inter, Sora, Space Grotesk, sans-serif',
          }}
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, -1, 1, 0],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            style={{ display: 'inline-block' }}
          >
            {["H", "a", "r", "s", "h", " ", "L", "i", "m", "b", "a", "s", "i", "y", "a"].map((letter, _) => (
              <motion.span
                key={_}
                ref={el => {
                  if (el && letterRefs[_] !== el) {
                    letterRefs[_] = el;
                    setLetterRefs([...letterRefs]);
                  }
                }}
                style={{ 
                  display: 'inline-block',
                  transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
                  position: 'relative',
                  cursor: isNavigating ? 'wait' : 'pointer',
                }}
                whileHover={!isNavigating ? {
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 }
                } : {}}
                onClick={handleLetterClick}
                onKeyDown={(e) => e.key === 'Enter' && handleLetterClick()}
                tabIndex={0}
                role="button"
                aria-label={`Navigate to about page - Letter ${letter}`}
                aria-disabled={isNavigating}
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes flowingGradient {
          0% {
            background-position: 100% 0%;
          }
          100% {
            background-position: -100% 0%;
          }
        }

        @keyframes flowingColors {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        /* Update glass card background to match the flowing theme */
        .backdrop-blur-3xl {
          background: linear-gradient(
            to right,
            rgba(255,255,255,0.1),
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.1)
          );
          background-size: 200% 100%;
          animation: flowingGradient 10s linear infinite;
        }

        body {
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }
      `}</style>
    </main>
  );
}