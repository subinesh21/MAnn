'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: "Welcome to Thulira",
    subtitle: "Embrace Sustainable Living",
    image: "/images/category-drinkware.png"
  },
  {
    id: 2,
    title: "Eco-Friendly Choices",
    subtitle: "Products designed with nature in mind",
    image: "/images/category-tableware.png"
  },
  {
    id: 3,
    title: "Start Your Journey",
    subtitle: "Experience nature's touch every day",
    image: "/images/category-storage.png"
  }
];

export default function IntroSlides() {
  const [showIntro, setShowIntro] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Check if the user has already seen the intro this session
    const hasSeenIntro = sessionStorage.getItem('thulira_intro_seen');
    if (!hasSeenIntro) {
      setShowIntro(true);
      // Prevent scrolling while intro is active
      document.body.style.overflow = 'hidden';
    }
  }, []);

  useEffect(() => {
    if (!showIntro) return;

    const timer = setInterval(() => {
      setCurrentSlide(prev => {
        if (prev === slides.length - 1) {
          clearInterval(timer);
          setTimeout(() => {
            handleComplete();
          }, 2500); // stay on last slide an extra 2.5s
          return prev;
        }
        return prev + 1;
      });
    }, 3000); // 3 seconds per slide

    return () => clearInterval(timer);
  }, [showIntro]);

  const handleComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('thulira_intro_seen', 'true');
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
        >
          {slides.map((slide, index) => (
            currentSlide === index && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 bg-[#f5f7fa]">
                  <div className="absolute inset-0 bg-black/50 z-10" />
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                {/* Content */}
                <div className="relative z-20 max-w-2xl w-full">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mb-8"
                  >
                    <h2 className="text-[#52dd28ff] font-bold text-2xl tracking-widest uppercase">
                      Thulira
                    </h2>
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                    style={{ fontFamily: 'var(--font-cinzel), serif' }}
                  >
                    {slide.title}
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="text-lg md:text-2xl text-white/90 font-light"
                  >
                    {slide.subtitle}
                  </motion.p>
                </div>

                {/* Skip Button positioned at the bottom */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  onClick={handleComplete}
                  className="absolute bottom-10 z-30 text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase underline-offset-8 hover:underline transition-all"
                >
                  Skip Intro
                </motion.button>
              </motion.div>
            )
          ))}

          {/* Progress Indicators */}
          <div className="absolute bottom-24 z-20 flex gap-3">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-8 bg-[#52dd28ff]' : 'w-2 bg-white/30'}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
