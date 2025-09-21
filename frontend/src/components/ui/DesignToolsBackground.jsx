import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Design Tool Icons as SVG Components
const PenTool = ({ size = 40, color = "#67C7FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 19l7-7 3 3-7 7-3-3z" fill={color} opacity="0.8"/>
    <path d="M12 19l-7-7L2 9l7 7 3 3z" fill={color} opacity="0.6"/>
    <path d="M11 12L2 3l3-3 9 9-3 3z" fill={color}/>
    <circle cx="21" cy="3" r="2" fill={color}/>
  </svg>
);

const BrushTool = ({ size = 40, color = "#9FE3FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 14.5L4 20s1 2 4 2c3 0 4-2 4-2l4.5-5.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 10L8 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <rect x="14" y="2" width="6" height="12" rx="2" transform="rotate(45 17 8)" fill={color} opacity="0.7"/>
  </svg>
);

const ShapeTool = ({ size = 40, color = "#0A84FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="8" height="8" rx="1" fill={color} opacity="0.6"/>
    <circle cx="17" cy="7" r="4" fill={color} opacity="0.8"/>
    <path d="M12 22l5-10h-10z" fill={color}/>
  </svg>
);

const ColorPalette = ({ size = 40, color = "#67C7FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="9" cy="9" r="2" fill="#FF6B6B"/>
    <circle cx="15" cy="9" r="2" fill="#4ECDC4"/>
    <circle cx="9" cy="15" r="2" fill="#FFE66D"/>
    <circle cx="15" cy="15" r="2" fill="#A8E6CF"/>
  </svg>
);

const TextTool = ({ size = 40, color = "#9FE3FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16v4h-2V6H13v12h2v2h-6v-2h2V6H6v2H4V4z" fill={color}/>
  </svg>
);

const EraserTool = ({ size = 40, color = "#0A84FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 2L2 12.5 8.5 19 19 8.5z" fill={color} opacity="0.7"/>
    <rect x="8" y="18" width="14" height="4" rx="1" fill={color} opacity="0.5"/>
  </svg>
);

const tools = [PenTool, BrushTool, ShapeTool, ColorPalette, TextTool, EraserTool];

const DesignToolsBackground = () => {
  const [clickEffects, setClickEffects] = useState([]);
  const containerRef = useRef(null);
  const nextIdRef = useRef(0);
  const isDarkMode = document.documentElement.classList.contains('dark');

  const handleClick = useCallback((event) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const Tool = tools[Math.floor(Math.random() * tools.length)];
    const colors = isDarkMode 
      ? ['#9FE3FF', '#67C7FF', '#0A84FF', '#38BDF8']
      : ['#67C7FF', '#0A84FF', '#38BDF8', '#0284C7'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 30 + Math.random() * 30;
    const rotation = Math.random() * 360;
    
    const id = nextIdRef.current++;
    const newEffect = {
      id,
      x,
      y,
      Tool,
      color,
      size,
      rotation,
      timestamp: Date.now()
    };

    setClickEffects(prev => [...prev, newEffect]);

    // Remove after animation completes
    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== id));
    }, 3000);
  }, [isDarkMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('click', handleClick);
    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  // Clean up old effects periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setClickEffects(prev => 
        prev.filter(effect => now - effect.timestamp < 3000)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-auto"
      style={{ zIndex: 1 }}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-day/5 to-transparent dark:via-primary-night/5" />
      
      {/* Floating Background Tools */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`bg-tool-${i}`}
            className="absolute opacity-5 dark:opacity-10"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            {React.createElement(tools[i % tools.length], {
              size: 60 + Math.random() * 40,
              color: isDarkMode ? '#9FE3FF' : '#67C7FF'
            })}
          </motion.div>
        ))}
      </div>
      
      {/* Click Effects */}
      <AnimatePresence>
        {clickEffects.map(({ id, x, y, Tool, color, size, rotation }) => (
          <motion.div
            key={id}
            className="absolute pointer-events-none"
            style={{ left: x, top: y }}
            initial={{ 
              scale: 0, 
              rotate: rotation,
              opacity: 0 
            }}
            animate={{ 
              scale: [0, 1.5, 1],
              opacity: [0, 1, 0.8, 0],
              y: [0, -20, -40, -60],
              rotate: rotation + 180,
            }}
            exit={{ 
              scale: 0,
              opacity: 0 
            }}
            transition={{ 
              duration: 3,
              ease: "easeOut"
            }}
          >
            <motion.div
              animate={{
                filter: [
                  'drop-shadow(0 0 10px rgba(103, 199, 255, 0.8))',
                  'drop-shadow(0 0 30px rgba(159, 227, 255, 1))',
                  'drop-shadow(0 0 10px rgba(103, 199, 255, 0.8))',
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: 1,
              }}
            >
              <Tool size={size} color={color} />
            </motion.div>
            
            {/* Ripple Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ 
                borderColor: color,
                width: size * 2,
                height: size * 2,
                left: -size/2,
                top: -size/2,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 2, 3],
                opacity: [1, 0.5, 0]
              }}
              transition={{ duration: 2 }}
            />
            
            {/* Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: color,
                  left: 0,
                  top: 0,
                }}
                initial={{ scale: 0 }}
                animate={{
                  x: Math.cos(i * 60 * Math.PI / 180) * 50,
                  y: Math.sin(i * 60 * Math.PI / 180) * 50,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  delay: 0.1 * i
                }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Hint Text */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-sm text-gray-500 dark:text-gray-400 opacity-50">
          انقر في أي مكان لإظهار أدوات التصميم • Click anywhere to show design tools
        </p>
      </motion.div>
    </div>
  );
};

export default DesignToolsBackground;