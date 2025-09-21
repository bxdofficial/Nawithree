import React from 'react';

const NawiLogo = ({ className = "h-10", variant = "default" }) => {
  const isDark = variant === "dark";
  const mainColor = isDark ? "#9FE3FF" : "#0B0B0B";
  const accentColor = "#67C7FF";
  
  return (
    <svg 
      className={className} 
      viewBox="0 0 240 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: '40px', width: 'auto' }}
    >
      {/* Arabic Text - ناوي */}
      <g transform="translate(10, 15)">
        <path 
          d="M5 25 Q 10 15, 20 20 T 35 25 L 35 30 Q 30 35, 20 35 T 5 30 Z" 
          fill={mainColor} 
          strokeWidth="2"
        />
        <circle cx="20" cy="10" r="2" fill={mainColor} />
        
        <path 
          d="M45 20 Q 48 15, 55 15 T 65 20 L 65 30 Q 60 35, 55 35 T 45 30 Z" 
          fill={mainColor} 
          strokeWidth="2"
        />
        
        <path 
          d="M75 25 Q 78 20, 85 20 T 95 25 L 95 30 Q 90 32, 85 32 T 75 30 Z" 
          fill={mainColor} 
          strokeWidth="2"
        />
        <circle cx="85" cy="12" r="2" fill={mainColor} />
      </g>
      
      {/* English Text - Stylized NAWI */}
      <g transform="translate(110, 20)">
        {/* N */}
        <path d="M0 35 L 0 10 L 5 10 L 15 25 L 15 10 L 20 10 L 20 35 L 15 35 L 5 20 L 5 35 Z" fill={mainColor} />
        
        {/* A */}
        <path d="M25 35 L 30 10 L 35 10 L 40 35 L 35 35 L 34 28 L 31 28 L 30 35 Z M 31.5 23 L 33.5 23 L 32.5 15 Z" fill={mainColor} />
        
        {/* W */}
        <path d="M45 10 L 48 30 L 50 20 L 52 30 L 55 10 L 60 10 L 55 35 L 50 35 L 48 25 L 46 35 L 41 35 L 40 10 Z" fill={mainColor} />
        
        {/* I */}
        <path d="M65 10 L 75 10 L 75 15 L 72 15 L 72 30 L 75 30 L 75 35 L 65 35 L 65 30 L 68 30 L 68 15 L 65 15 Z" fill={mainColor} />
      </g>
      
      {/* Pen/Design Tool Icon */}
      <g transform="translate(195, 12)">
        {/* Pen body */}
        <rect 
          x="0" 
          y="8" 
          width="25" 
          height="12" 
          rx="2" 
          fill={mainColor}
          transform="rotate(-45 12.5 14)"
        />
        
        {/* Pen tip */}
        <path 
          d="M 3 28 L 8 33 L 13 28 L 8 20 Z" 
          fill={accentColor}
        />
        
        {/* Pen nib detail */}
        <circle cx="8" cy="26" r="1.5" fill={mainColor} />
        
        {/* Decorative dots */}
        <circle cx="22" cy="8" r="2" fill={accentColor} opacity="0.7" />
        <circle cx="18" cy="4" r="1.5" fill={accentColor} opacity="0.5" />
        <circle cx="26" cy="12" r="1.5" fill={accentColor} opacity="0.5" />
      </g>
      
      {/* Decorative underline */}
      <rect 
        x="10" 
        y="52" 
        width="180" 
        height="2" 
        rx="1" 
        fill={accentColor}
        opacity="0.3"
      />
    </svg>
  );
};

export default NawiLogo;