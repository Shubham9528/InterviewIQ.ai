import React from 'react';
import { motion } from 'motion/react';

const AISparkleIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
  >
    {/* Main 4-pointed star */}
    <path
      d="M16 2C16 9.73 9.73 16 2 16C9.73 16 16 22.27 16 30C16 22.27 22.27 16 30 16C22.27 16 16 9.73 16 2Z"
      fill="white"
    />
    {/* Top left mini sparkle */}
    <path
      d="M7 5C7 7.2 5.2 9 3 9C5.2 9 7 10.8 7 13C7 10.8 8.8 9 11 9C8.8 9 7 7.2 7 5Z"
      fill="#BAE6FD"
    />
    {/* Bottom left mini sparkle */}
    <path
      d="M8 20C8 21.65 6.65 23 5 23C6.65 23 8 24.35 8 26C8 24.35 9.35 23 11 23C9.35 23 8 21.65 8 20Z"
      fill="#E9D5FF"
    />
  </svg>
);

function AIButton({
  children,
  href,
  onClick,
  target = "_blank",
  rel = "noopener noreferrer",
  className = "",
  showSparkles = true,
  ...props
}) {
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      target={href ? target : undefined}
      rel={href && target === "_blank" ? rel : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`relative group inline-flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${className}`}
      {...props}
    >
      {/* Floating decorative sparkles surrounding the button (Visible only on hover) */}
      {showSparkles && (
        <div className="absolute inset-0 -m-3 pointer-events-none overflow-visible opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="absolute -top-1.5 left-2 text-[#70baff] text-xs scale-50 group-hover:scale-125 group-hover:-translate-y-1 transition-all duration-300 delay-75 select-none">✦</span>
          <span className="absolute -top-2 left-1/2 text-[#c084fc] text-[10px] scale-50 group-hover:scale-110 group-hover:-translate-y-1.5 transition-all duration-300 select-none">✦</span>
          <span className="absolute -top-2 right-6 text-[#38bdf8] text-sm scale-50 group-hover:scale-125 group-hover:-translate-y-1 transition-all duration-300 delay-100 select-none">✦</span>
          <span className="absolute -bottom-1.5 left-6 text-white text-[10px] scale-50 group-hover:scale-110 group-hover:translate-y-1 transition-all duration-300 select-none">✦</span>
          <span className="absolute -bottom-2 left-1/3 text-[#93c5fd] text-xs scale-50 group-hover:scale-125 group-hover:translate-y-1.5 transition-all duration-300 delay-75 select-none">✦</span>
          <span className="absolute -bottom-1.5 right-3 text-[#e879f9] text-xs scale-50 group-hover:scale-125 group-hover:translate-y-1 transition-all duration-300 delay-100 select-none">✦</span>
          <span className="absolute top-1 -left-1 text-[#60a5fa] text-[8px] scale-50 group-hover:scale-100 group-hover:-translate-x-1 transition-all duration-300 select-none">✦</span>
          <span className="absolute bottom-1 -right-1 text-[#c084fc] text-[9px] scale-50 group-hover:scale-100 group-hover:translate-x-1 transition-all duration-300 select-none">✦</span>
        </div>
      )}

      {/* Outer Glow on Hover */}
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#60a5fa] via-[#818cf8] to-[#c04cfa] opacity-40 blur-[6px] group-hover:opacity-90 group-hover:blur-[10px] transition-all duration-500"></div>

      {/* Button Body with Pill Gradient */}
      <div className="relative flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#5ea5ff] via-[#6366f1] to-[#be4ff9] border border-white/50 shadow-[0_4px_15px_rgba(99,102,241,0.35)] group-hover:shadow-[0_6px_25px_rgba(190,79,249,0.6)] text-white overflow-hidden transition-all duration-300">
        {/* Shimmer light sweep on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out"></div>
        
        {/* 4-point AI Star Icon */}
        <div className="group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
          <AISparkleIcon />
        </div>

        {/* Button Content / Children */}
        {children}
      </div>
    </Component>
  );
}

export default AIButton;
