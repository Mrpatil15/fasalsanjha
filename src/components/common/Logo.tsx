import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = true }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <Link to="/" className="flex items-center gap-2.5 group transition-transform hover:scale-[1.01]">
      {/* Brand Icon SVG: Hands holding sprouting seedling + golden sun arc */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-forest-900 via-forest-800 to-forest-700 shadow-md ${iconSizes[size]} p-2 border border-forest-500/20`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Sun Arc */}
          <circle cx="50" cy="30" r="14" fill="#F5A623" />
          <path d="M26 30 C26 16.7 36.7 6 50 6 C63.3 6 74 16.7 74 30" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" strokeDasharray="3 5" />
          
          {/* Sprout Leaves */}
          <path d="M50 60 C50 42 36 34 32 35 C28 48 44 58 50 60 Z" fill="#8CC63F" />
          <path d="M50 60 C50 40 64 32 68 33 C72 46 56 58 50 60 Z" fill="#2E8B3E" />
          
          {/* Protecting Hands */}
          <path d="M22 75 C30 68 40 65 50 70 C60 65 70 68 78 75 C70 88 30 88 22 75 Z" fill="#F5A623" opacity="0.95" />
          <path d="M28 82 C38 88 62 88 72 82 C65 92 35 92 28 82 Z" fill="#0B4F2E" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-extrabold tracking-tight text-forest-900 ${textSizes[size]}`}>
            Fasal<span className="text-harvest-500">Sanjha</span>
          </span>
          <span className="text-xs font-semibold text-forest-700 font-devanagari px-1.5 py-0.5 bg-forest-100 rounded-md">
            फसल साझा
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-500 tracking-wide hidden sm:block">
            Sow Together. Share the Harvest.
          </span>
        )}
      </div>
    </Link>
  );
};
