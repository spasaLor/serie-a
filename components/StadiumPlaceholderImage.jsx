import React from "react";

/**
 * Illustrazione segnaposto per la foto di uno stadio.
 * Usata quando `stadium.imageUrl` non è ancora valorizzato (vedi data/stadiums.js).
 */
export default function StadiumPlaceholderImage() {
  return (
    <svg
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id={`ph-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eaf9ff" />
          <stop offset="55%" stopColor="#cdeffb" />
          <stop offset="100%" stopColor="#a9e2f7" />
        </linearGradient>
        <linearGradient id={`ph-bowl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2de6fd" />
          <stop offset="100%" stopColor="#0d47b2" />
        </linearGradient>
        <linearGradient id={`ph-pitch`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a8f7d" />
          <stop offset="100%" stopColor="#2f7566" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="600" height="400" fill={`url(#ph-sky)`} />

      {/* nuvole leggere, per profondità */}
      <ellipse cx={80} cy="70" rx="55" ry="14" fill="#ffffff" opacity="0.55" />
      <ellipse cx={480} cy="45" rx="70" ry="16" fill="#ffffff" opacity="0.45" />

      {/* tribuna esterna (bowl) */}
      <ellipse cx="300" cy="255" rx="255" ry="120" fill={`url(#ph-bowl)`} />
      {/* anello superiore più chiaro, per dare volume */}
      <ellipse
        cx="300"
        cy="230"
        rx="255"
        ry="110"
        fill="none"
        stroke="#eaf9ff"
        strokeOpacity="0.25"
        strokeWidth="3"
      />

      {/* copertura / tetto, accento oro */}
      <path
        d="M 55 232 Q 300 120 545 232"
        fill="none"
        stroke="#d4af37"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* piloni faro */}
      {[70, 530].map((x) => (
        <g key={x}>
          <rect
            x={x - 3}
            y="150"
            width="6"
            height="70"
            fill="#d4af37"
            opacity="0.85"
          />
          <circle
            cx={x}
            cy="148"
            r="7"
            fill="#fff6da"
            stroke="#d4af37"
            strokeWidth="2"
          />
        </g>
      ))}

      {/* campo da gioco */}
      <ellipse cx="300" cy="270" rx="165" ry="70" fill={`url(#ph-pitch)`} />
      {/* strisce di rasatura */}
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={i}
          d={`M ${300 - 165 + i * 47} 270 A 165 70 0 0 1 ${300 - 165 + (i + 1) * 47} 270`}
          fill={i % 2 === 0 ? "#ffffff" : "none"}
          opacity="0.06"
        />
      ))}
      {/* linee di gioco */}
      <ellipse
        cx="300"
        cy="270"
        rx="165"
        ry="70"
        fill="none"
        stroke="#eaf9ff"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <ellipse
        cx="300"
        cy="270"
        rx="34"
        ry="16"
        fill="none"
        stroke="#eaf9ff"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <line
        x1="300"
        y1="200"
        x2="300"
        y2="340"
        stroke="#eaf9ff"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
    </svg>
  );
}
