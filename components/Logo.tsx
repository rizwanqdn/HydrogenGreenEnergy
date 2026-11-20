"use client";

import { useId } from "react";

type LogoProps = {
  /** Width and height in pixels. */
  size?: number;
  /** Set the text colour (e.g. "text-ink" or "text-white"); the ring, orbit and bond follow it. */
  className?: string;
  /** Turn off all motion (e.g. for print or very small uses). */
  still?: boolean;
};

/**
 * Company mark — Japanese Green Hydrogen (H₂)
 * - Green disc  = renewable energy
 * - Red disc    = Japan (technology, the rising sun)
 * - Overlap     = H₂ covalent bond
 * - Orbit       = clean energy electron circling the molecule
 */
export default function Logo({
  size = 40,
  className = "",
  still = false,
}: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const clipLeftId = `logo-clip-left-${uid}`;
  const glowId = `logo-glow-${uid}`;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="Company logo"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <clipPath id={clipLeftId}>
          <circle cx="25" cy="32" r="11.5" />
        </clipPath>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2f9e6f" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2f9e6f" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle outer orbital track */}
      <circle
        cx="32"
        cy="32"
        r="27.5"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.25"
      />

      {/* Animated energy arc along the orbit */}
      <circle
        cx="32"
        cy="32"
        r="27.5"
        fill="none"
        stroke="#2f9e6f"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="46 130"
      >
        {!still && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 32 32"
            to="360 32 32"
            dur="7s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Orbiting electron */}
      <g>
        {!still && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 32 32"
            to="360 32 32"
            dur="7s"
            repeatCount="indefinite"
          />
        )}
        <circle cx="32" cy="4.5" r="5.5" fill={`url(#${glowId})`} />
        <circle cx="32" cy="4.5" r="2.6" fill="currentColor" />
      </g>

      {/* H₂ Molecule */}
      <g>
        {/* Renewable Green Atom */}
        <circle cx="25" cy="32" r="11.5" fill="#2f9e6f" />
        {/* Japan Rising Sun Atom */}
        <circle cx="39" cy="32" r="11.5" fill="#c8102e" />
        {/* Covalent Bond Overlap */}
        <circle
          cx="39"
          cy="32"
          r="11.5"
          fill="currentColor"
          clipPath={`url(#${clipLeftId})`}
        />
        {/* Crisp H₂ monogram */}
        <text
          x="32"
          y="35.5"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="10.5"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
          letterSpacing="-0.5"
        >
          H
          <tspan dy="2" fontSize="7.5">
            2
          </tspan>
        </text>
      </g>
    </svg>
  );
}
