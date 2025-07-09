import React from 'react';

interface PlantLoadingAnimationProps {
  size?: number;
  transparent?: boolean;
  align?: 'center' | 'left' | 'right';
  showText?: boolean;
  className?: string;
}

export function PlantLoadingAnimation({
  size = 60,
  transparent = false,
  align = 'center',
  showText = true,
  className = '',
}: PlantLoadingAnimationProps) {
  let justify = 'items-center';
  if (align === 'left') justify = 'items-start';
  if (align === 'right') justify = 'items-end';
  return (
    <div className={`flex flex-col ${justify} justify-center ${className}`}
      style={{ background: transparent ? 'transparent' : undefined }}>
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <ellipse cx="30" cy="50" rx="18" ry="6" fill="#A3D977" opacity="0.3" />
          <path d="M30 50 Q32 35 40 30 Q32 32 30 20 Q28 32 20 30 Q28 35 30 50 Z" fill="#4CAF50">
            <animate attributeName="d" values="M30 50 Q32 35 40 30 Q32 32 30 20 Q28 32 20 30 Q28 35 30 50 Z;M30 50 Q34 36 44 32 Q34 34 30 18 Q26 34 16 32 Q26 36 30 50 Z;M30 50 Q32 35 40 30 Q32 32 30 20 Q28 32 20 30 Q28 35 30 50 Z" dur="1.5s" repeatCount="indefinite" />
          </path>
          <circle cx="30" cy="18" r="4" fill="#81C784">
            <animate attributeName="cy" values="18;15;18" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
      {showText && (
        <span className="mt-2 text-green-700 font-medium animate-pulse">Loading...</span>
      )}
    </div>
  );
} 