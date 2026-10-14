import React from "react";

export function TrustIllustration() {
  return (
    <svg viewBox="0 0 460 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* Background radial glow */}
      <circle cx="230" cy="170" r="140" fill="#D6A52B" opacity="0.1" />

      {/* Main Shield */}
      <g transform="translate(150, 40)">
        <path
          d="M80 0 L160 35 V110 C160 170 80 210 80 210 C80 210 0 170 0 110 V35 L80 0 Z"
          fill="#061820"
          stroke="#D6A52B"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Inner Shield Accent */}
        <path
          d="M80 15 L145 44 V105 C145 155 80 190 80 190 C80 190 15 155 15 105 V44 L80 15 Z"
          fill="#0A2430"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        {/* Star Badge inside shield */}
        <polygon
          points="80,50 90,75 117,78 97,96 103,123 80,108 57,123 63,96 43,78 70,75"
          fill="#D6A52B"
        />
        {/* Checkmark inside star */}
        <path d="M72 82 L78 88 L90 74" stroke="#061820" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Floating Card Left: 98% Pass Rate */}
      <g transform="translate(30, 80)" style={{ animation: "float 4s ease-in-out infinite" }}>
        <rect x="0" y="0" width="140" height="75" rx="16" fill="#FFFFFF" stroke="rgba(6,24,32,0.1)" />
        <text x="20" y="32" fill="#D6A52B" fontSize="22" fontFamily="var(--font-extended)" fontWeight="900">
          98%+
        </text>
        <text x="20" y="54" fill="#061820" fontSize="12" fontFamily="var(--font-sans)" fontWeight="700">
          Exam Success Rate
        </text>
      </g>

      {/* Floating Card Right: 99+ Exams */}
      <g transform="translate(290, 180)" style={{ animation: "float 4s ease-in-out infinite 1.5s" }}>
        <rect x="0" y="0" width="145" height="75" rx="16" fill="#0A2430" stroke="#D6A52B" strokeWidth="2" />
        <text x="20" y="32" fill="#FFFFFF" fontSize="22" fontFamily="var(--font-extended)" fontWeight="900">
          99+ Exams
        </text>
        <text x="20" y="54" fill="#D6A52B" fontSize="12" fontFamily="var(--font-sans)" fontWeight="700">
          Covered Worldwide
        </text>
      </g>

      {/* Floating Card Bottom Left: Certified Tutors */}
      <g transform="translate(40, 220)" style={{ animation: "float 4s ease-in-out infinite 1s" }}>
        <rect x="0" y="0" width="150" height="65" rx="16" fill="#061820" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <circle cx="30" cy="32" r="14" fill="#D6A52B" />
        <path d="M25 32 L29 36 L36 28" stroke="#061820" strokeWidth="2.5" strokeLinecap="round" />
        <text x="54" y="28" fill="#FFFFFF" fontSize="12" fontFamily="var(--font-extended)" fontWeight="800">
          Verified Experts
        </text>
        <text x="54" y="44" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="var(--font-sans)">
          Tailored Guidance
        </text>
      </g>
    </svg>
  );
}
