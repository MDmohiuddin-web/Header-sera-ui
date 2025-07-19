"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';

// --- Types ---
interface CardData {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
}

interface IconProps {
  className?: string;
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

interface CardProps {
  card: CardData;
  index: number;
  activeIndex: number;
  totalCards: number;
}

// --- Helper Components & Icons ---
const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

const Badge: React.FC<BadgeProps> = ({ children, className }) => (
  <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${className}`}>
    {children}
  </div>
);

// --- Enhanced Carousel Data ---
const cardData: CardData[] = [
  { 
    id: 1, 
    imageUrl: 'https://i.pinimg.com/736x/d6/8a/12/d68a121e960094f99ad8acd37505fb7d.jpg', 
    title: 'Crimson Forest',
    description: 'A mystical forest bathed in crimson light, home to ancient spirits and magical creatures.',
    category: 'Nature'
  },
  { 
    id: 2, 
    imageUrl: 'https://i.pinimg.com/736x/21/16/f7/2116f71f9d51d875e44d809f074ff079.jpg', 
    title: 'Misty Mountains',
    description: 'Towering peaks shrouded in ethereal mist, where the air is pure and the views are endless.',
    category: 'Landscape'
  },
  { 
    id: 3, 
    imageUrl: 'https://i.pinimg.com/1200x/fe/c2/0d/fec20d2958059b8463bffb138d4eaac6.jpg', 
    title: 'Floating Islands',
    description: 'Mysterious islands suspended in the sky, defying gravity with their otherworldly beauty.',
    category: 'Fantasy'
  },
  { 
    id: 4, 
    imageUrl: 'https://i.pinimg.com/736x/84/dc/62/84dc62de850a34a9d420c97f3a2d58f4.jpg', 
    title: 'Crystal Cave',
    description: 'A hidden cavern filled with luminescent crystals that glow with an inner light.',
    category: 'Underground'
  },
  { 
    id: 5, 
    imageUrl: 'https://i.pinimg.com/1200x/be/c3/7e/bec37e2c43e703f922f887db2578ce2e.jpg', 
    title: 'Sunset Peaks',
    description: 'Golden hour transforms these majestic mountains into a painter\'s dream canvas.',
    category: 'Landscape'
  },
  { 
    id: 6, 
    imageUrl: 'https://i.pinimg.com/736x/47/dd/47/47dd47b0d66c2fa641e03e370bcb5433.jpg', 
    title: 'Night Sky',
    description: 'A celestial tapestry of stars and galaxies stretching across the infinite cosmos.',
    category: 'Space'
  },
  { 
    id: 7, 
    imageUrl: 'https://i.pinimg.com/736x/05/01/bc/0501bcd327d9df915e83154bbf9456e3.jpg', 
    title: 'Ancient Ruins',
    description: 'Time-worn structures that whisper secrets of civilizations long forgotten.',
    category: 'History'
  },
  { 
    id: 8, 
    imageUrl: 'https://i.pinimg.com/736x/c1/46/be/c146bebffca026d2c4fa76cc85aac917.jpg', 
    title: 'Magical Tree',
    description: 'A sentient tree with branches that reach toward the heavens, pulsing with magical energy.',
    category: 'Fantasy'
  },
  { 
    id: 9, 
    imageUrl: 'https://i.pinimg.com/736x/91/7a/51/917a51df0d444def3cade8d626305a67.jpg', 
    title: 'Celestial Waters',
    description: 'Waters that mirror the night sky, creating a perfect reflection of the universe above.',
    category: 'Nature'
  },
];

// --- Enhanced Carousel Component ---
export default function EnhancedCarousel() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setActiveIndex(Math.floor(cardData.length / 2));
  }, []);

  // Function to go to the next slide
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cardData.length);
  }, []);

  // Function to manually change slide and reset autoplay
  const changeSlide = useCallback((newIndex: number) => {
    if (!isMounted) return;
    
    const newSafeIndex = (newIndex + cardData.length) % cardData.length;
    setActiveIndex(newSafeIndex);
    
    // Reset autoplay timer on manual interaction
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, 4000);
    }
  }, [isPaused, goToNext, isMounted]);

  // Set up and clear autoplay interval
  useEffect(() => {
    if (!isMounted) return;
    
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, 4000);
    }
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, activeIndex, goToNext, isMounted]);

  // Keyboard controls
  useEffect(() => {
    if (!isMounted) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          changeSlide(activeIndex - 1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          changeSlide(activeIndex + 1);
          break;
        case ' ':
          event.preventDefault();
          setIsPaused(prev => !prev);
          break;
        case 'Escape':
          setIsFullscreen(false);
          break;
        case 'f':
        case 'F':
          setIsFullscreen(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, changeSlide, isMounted]);
  
  // Handle drag events to change slides
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isMounted) return;
    
    const dragThreshold = 75;
    const dragOffset = info.offset.x;
    if (dragOffset > dragThreshold) {
      changeSlide(activeIndex - 1);
    } else if (dragOffset < -dragThreshold) {
      changeSlide(activeIndex + 1);
    }
  };

  if (!isMounted) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="relative flex w-full flex-col rounded-3xl border border-white/10 bg-white dark:bg-neutral-900 p-4 pt-6 md:p-6">
          <div className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center">
            <div className="bg-gray-200 dark:bg-neutral-800 rounded-3xl w-full h-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`w-full flex-col items-center justify-center font-sans overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <div 
        className={`${isFullscreen ? 'w-full h-full' : 'w-full max-w-7xl mx-auto p-4'}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`relative flex w-full flex-col rounded-3xl border border-white/10
           dark:border-white/10 bg-white  dark:bg-neutral-900 p-4 pt-6 md:p-6 ${isFullscreen ? 'h-full' : ''}`}>
          
          {/* Carousel Container */}
          <div className={`relative w-full flex items-center justify-center overflow-hidden ${isFullscreen ?
             'flex-1' : 'h-[280px] md:h-[400px]'}`}>
            <motion.div  
              className="w-full h-full flex items-center justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              style={{
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                touchAction: 'pan-y'
              }}
            >
              {cardData.map((card, index) => (
                <Card
                  key={card.id}
                  card={card}
                  index={index}
                  activeIndex={activeIndex}
                  totalCards={cardData.length}
                />
              ))}
            </motion.div>
          </div>

          {/* Navigation and Indicators */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {/* Previous Button */}
            <button 
              onClick={() => changeSlide(activeIndex - 1)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2">
              {cardData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    activeIndex === index ? 'w-6 bg-pink-400' : 'w-2 bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button 
              onClick={() => changeSlide(activeIndex + 1)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Enhanced Card Component ---
function Card({ card, index, activeIndex, totalCards }: CardProps) {
  let offset = index - activeIndex;
  if (offset > totalCards / 2) {
    offset -= totalCards;
  } else if (offset < -totalCards / 2) {
    offset += totalCards;
  }
  
  const isVisible = Math.abs(offset) <= 1;
  const isActive = offset === 0;

  const animate = {
    x: `${offset * 50}%`,
    scale: offset === 0 ? 1 : 0.8,
    zIndex: totalCards - Math.abs(offset),
    opacity: isVisible ? 1 : 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 30 }
  };

  return (
    <motion.div
      className="absolute w-1/2 md:w-1/3 h-[95%]"
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={animate}
      initial={false}
    >
      <div className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden bg-gray-200 dark:bg-neutral-800 group cursor-pointer">
        <Image
          width={500}
          height={500} 
          src={card.imageUrl}  
          alt={card.title}
          className="w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { 
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src='https://placehold.co/400x600/1e1e1e/ffffff?text=Image+Missing'; 
          }}
        />
        
        {/* Enhanced overlay with more information */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="space-y-2">
            <div className="flex md:flex-row flex-col items-center justify-between">
              <h4 className="text-white  md:text-lg font-semibold">{card.title}</h4>
              <Badge className="text-xs bg-white/20 text-white border-white/20">
                {card.category}
              </Badge>
            </div>
            {isActive && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/90 text-sm leading-relaxed hidden md:block"
              >
                {card.description}
              </motion.p>
            )}
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}