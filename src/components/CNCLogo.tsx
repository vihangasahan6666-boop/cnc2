import React, { useState } from 'react';

interface CNCLogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'horizontal' | 'vertical';
}

export default function CNCLogo({
  className = 'h-16 w-auto',
  showText = true,
  variant = 'horizontal',
}: CNCLogoProps) {
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

  // 1. Icon-only mode
  if (!showText) {
    return (
      <svg
        viewBox="20 20 240 240"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* Green Square Base */}
        <rect x="20" y="20" width="240" height="240" rx="2" fill="#0C5E34" />

        {/* Yellow Square Inner */}
        <rect x="45" y="45" width="190" height="190" rx="2" fill="#FABD00" />

        {/* White Parallel Slashes */}
        <polygon points="110,105 150,20 165,20 125,105" fill="#FFFFFF" />
        <polygon points="140,105 180,20 195,20 155,105" fill="#FFFFFF" />

        {/* Lowercase "cnc" Text & Stylized Pillars */}
        <path
          d="M 106,147 A 26 26 0 1 0 106,183"
          stroke="#0C5E34"
          strokeWidth="13"
          strokeLinecap="butt"
          fill="none"
        />
        <path
          d="M 123,202 L 123,165 A 17 17 0 0 1 157,165 L 157,230 C 157,245 148,254 132,254"
          stroke="#0C5E34"
          strokeWidth="13"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          fill="none"
        />
        <path
          d="M 210,147 A 26 26 0 1 0 210,183"
          stroke="#0C5E34"
          strokeWidth="13"
          strokeLinecap="butt"
          fill="none"
        />
      </svg>
    );
  }

  // 2. Vertical layout mode
  if (variant === 'vertical') {
    return (
      <svg
        viewBox="0 0 400 520"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* Green Square Base */}
        <rect x="80" y="30" width="240" height="240" rx="2" fill="#0C5E34" />

        {/* Yellow Square Inner */}
        <rect x="105" y="55" width="190" height="190" rx="2" fill="#FABD00" />

        {/* White Parallel Slashes */}
        <polygon points="170,115 210,30 225,30 185,115" fill="#FFFFFF" />
        <polygon points="200,115 240,30 255,30 215,115" fill="#FFFFFF" />

        {/* Lowercase "cnc" Text & Stylized Pillars */}
        <path
          d="M 166,157 A 26 26 0 1 0 166,193"
          stroke="#0C5E34"
          strokeWidth="13"
          strokeLinecap="butt"
          fill="none"
        />
        <path
          d="M 183,212 L 183,175 A 17 17 0 0 1 217,175 L 217,240 C 217,255 208,264 192,264"
          stroke="#0C5E34"
          strokeWidth="13"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          fill="none"
        />
        <path
          d="M 270,157 A 26 26 0 1 0 270,193"
          stroke="#0C5E34"
          strokeWidth="13"
          strokeLinecap="butt"
          fill="none"
        />

        {/* "carbon neutral community" Text Below */}
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

        {/* Gray Block and Bold "LIMITED" Text */}
        <rect x="80" y="450" width="240" height="32" fill="#727376" rx="1" />
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
      </svg>
    );
  }

  // 3. Horizontal layout mode (Highly optimized for headers/navigation bar)
  return (
    <svg
      viewBox="0 0 920 280"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Icon Group (Shifted to Left) */}
      <g id="logo-icon">
        {/* Green Square Base */}
        <rect x="20" y="20" width="240" height="240" rx="2" fill="#0C5E34" />

        {/* Yellow Square Inner */}
        <rect x="45" y="45" width="190" height="190" rx="2" fill="#FABD00" />

        {/* White Parallel Slashes */}
        <polygon points="110,105 150,20 165,20 125,105" fill="#FFFFFF" />
        <polygon points="140,105 180,20 195,20 155,105" fill="#FFFFFF" />

        {/* Lowercase "cnc" Text & Stylized Pillars */}
        <path
          d="M 106,147 A 26 26 0 1 0 106,183"
          stroke="#0C5E34"
          strokeWidth="13"
          strokeLinecap="butt"
          fill="none"
        />
        <path
          d="M 123,202 L 123,165 A 17 17 0 0 1 157,165 L 157,230 C 157,245 148,254 132,254"
          stroke="#0C5E34"
          strokeWidth="13"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          fill="none"
        />
        <path
          d="M 210,147 A 26 26 0 1 0 210,183"
          stroke="#0C5E34"
          strokeWidth="13"
          strokeLinecap="butt"
          fill="none"
        />
      </g>

      {/* Typography Group (Aligned on Right) */}
      <g id="logo-text">
        <text
          x="290"
          y="85"
          fill="#FFFFFF"
          fontSize="68"
          fontWeight="500"
          fontFamily="Manrope, Inter, sans-serif"
          letterSpacing="-1"
          textAnchor="start"
        >
          carbon
        </text>
        <text
          x="290"
          y="152"
          fill="#FFFFFF"
          fontSize="68"
          fontWeight="500"
          fontFamily="Manrope, Inter, sans-serif"
          letterSpacing="-1"
          textAnchor="start"
        >
          neutral
        </text>
        <text
          x="290"
          y="218"
          fill="#FFFFFF"
          fontSize="68"
          fontWeight="500"
          fontFamily="Manrope, Inter, sans-serif"
          letterSpacing="-1"
          textAnchor="start"
        >
          community
        </text>

        {/* Accent gray box with "LIMITED" under the main texts */}
        <rect x="290" y="235" width="410" height="28" fill="#727376" rx="1" />
        <text
          x="495"
          y="256"
          fill="#FFFFFF"
          fontSize="17"
          fontWeight="900"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          letterSpacing="11"
          textAnchor="middle"
        >
          LIMITED
        </text>
      </g>
    </svg>
  );
}
