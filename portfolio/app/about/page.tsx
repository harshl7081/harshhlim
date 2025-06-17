'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [isNavigating, setIsNavigating] = useState(false);

  // Add mount animation
  useEffect(() => {
    document.body.style.opacity = '1';
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMouse({ x, y });
  }

  const handleBack = () => {
    if (isNavigating) return; // Prevent multiple clicks
    setIsNavigating(true);
    
    // Start fade out
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
    
    // Navigate after animation
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  const float = (dx: number, dy: number, rot: number = 15) => 
    `translate3d(${(mouse.x - 0.5) * dx}px, ${(mouse.y - 0.5) * dy}px, 0) 
     rotateX(${(mouse.y - 0.5) * rot}deg) rotateY(${(mouse.x - 0.5) * rot}deg)`;

  // Fade in effect on mount
  useEffect(() => {
    document.body.style.opacity = '1';
  }, []);

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

      {/* Dynamic Glass Shape with Flowing Gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-1/4 right-1/5 w-[35vw] h-[15vw] rounded-[8vw]"
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

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl px-16 py-12 max-w-4xl mx-4"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          boxShadow: `
            0 8px 32px rgba(0,0,0,0.3),
            0 1px 1px rgba(255,255,255,0.1),
            inset 0 1px 1px rgba(255,255,255,0.1)
          `,
          border: '1px solid rgba(255,255,255,0.1)',
          transform: float(60, -60, 8),
          transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          About Me
        </motion.h1>
        
        <motion.div
          className="text-lg text-white/90 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>
            Hello! I'm <span className="animated-gradient-text">Harsh Limbasiya</span>, a passionate developer with a love for creating beautiful and functional web experiences.
          </p>
          <p>
            I specialize in modern web technologies and believe in crafting interfaces that are both aesthetically pleasing and highly performant.
          </p>
          {/* Add more content about yourself here */}
        </motion.div>

        <motion.button
          onClick={handleBack}
          className="mt-8 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isNavigating}
        >
          Back to Home
        </motion.button>
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