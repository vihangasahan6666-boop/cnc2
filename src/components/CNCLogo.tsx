import React, { useState } from 'react';

interface CNCLogoProps {
  className?: string;
  showText?: boolean;
}

export default function CNCLogo({ className = 'h-16 w-auto', showText = true }: CNCLogoProps) {
  const [imgError, setImgError] = useState(false);

  // If the user uploads the custom logo, we try to load it. 
  // - Full logo with text: /logo.png
  // - Icon-only mark: /logo-icon.png
  const imgSrc = showText ? '/logo.png' : '/logo-icon.png';

  if (!imgError) {
    return (
      <img
        src={imgSrc}
        alt="Carbon Neutral Community Logo"
        className={`${className} object-contain`}
        onError={() => setImgError(true)}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 400 520"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* 1. Green Square Base */}
      <rect
        x="80"
        y="30"
        width="240"
        height="240"
        rx="2"
        fill="#0C5E34"
      />

      {/* 2. Yellow Square Inner - Centered with equal 25px border paths */}
      <rect
        x="105"
        y="55"
        width="190"
        height="190"
        rx="2"
        fill="#FABD00"
      />

      {/* 3. White Parallel Slashes cutting through the top green border into the yellow area */}
      <polygon
        points="170,115 210,30 225,30 185,115"
        fill="#FFFFFF"
      />
      <polygon
        points="200,115 240,30 255,30 215,115"
        fill="#FFFFFF"
      />

      {/* 4. Lowercase "cnc" Text & Stylized Pillars in Green */}
      {/* First 'c' - Perfectly centered and sized */}
      <path
        d="M 166,157 A 26 26 0 1 0 166,193"
        stroke="#0C5E34"
        strokeWidth="13"
        strokeLinecap="butt"
        fill="none"
      />

      {/* Stylized 'n' with left leg, arch, and right stem extending down past the yellow and green boxes with an elegant calligraphic tail */}
      <path
        d="M 183,212 L 183,175 A 17 17 0 0 1 217,175 L 217,240 C 217,255 208,264 192,264"
        stroke="#0C5E34"
        strokeWidth="13"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="none"
      />

      {/* Second 'c' - Perfectly centered and symmetrical */}
      <path
        d="M 270,157 A 26 26 0 1 0 270,193"
        stroke="#0C5E34"
        strokeWidth="13"
        strokeLinecap="butt"
        fill="none"
      />

      {showText && (
        <>
          {/* 5. "carbon neutral community" Text Below */}
          <text
            x="200"
            y="325"
            fill="#FFFFFF"
            fontSize="48"
            fontWeight="600"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            letterSpacing="-0.5"
            textAnchor="middle"
          >
            carbon
          </text>
          <text
            x="200"
            y="375"
            fill="#FFFFFF"
            fontSize="48"
            fontWeight="600"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            letterSpacing="-0.5"
            textAnchor="middle"
          >
            neutral
          </text>
          <text
            x="200"
            y="425"
            fill="#FFFFFF"
            fontSize="48"
            fontWeight="600"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            letterSpacing="-0.5"
            textAnchor="middle"
          >
            community
          </text>

          {/* 6. Gray Block and Bold "LIMITED" Text */}
          <rect
            x="80"
            y="450"
            width="240"
            height="32"
            fill="#727376"
            rx="1"
          />
          <text
            x="196"
            y="473"
            fill="#FFFFFF"
            fontSize="18"
            fontWeight="900"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            letterSpacing="8"
            textAnchor="middle"
          >
            LIMITED
          </text>
        </>
      )}
    </svg>
  );
}
