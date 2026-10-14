import React from "react";

export function LanguageIllustration() {
  return (
    <svg viewBox="0 0 500 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* Background Glow */}
      <circle cx="250" cy="190" r="160" fill="#D6A52B" opacity="0.08" />
      <circle cx="250" cy="190" r="110" fill="#0A2430" opacity="0.6" />

      {/* Globe Grid lines */}
      <circle cx="250" cy="190" r="140" stroke="#D6A52B" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
      <ellipse cx="250" cy="190" rx="140" ry="50" stroke="#D6A52B" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
      <ellipse cx="250" cy="190" rx="50" ry="140" stroke="#D6A52B" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />

      {/* Speech Bubble 1 - English (Top Left) */}
      <g transform="translate(60, 60)" className="float">
        <rect x="0" y="0" width="110" height="54" rx="16" fill="#061820" stroke="#D6A52B" strokeWidth="2" />
        <path d="M20 54 L12 66 L34 54 Z" fill="#061820" stroke="#D6A52B" strokeWidth="2" strokeLinejoin="round" />
        <text x="55" y="32" fill="#FFFFFF" fontSize="16" fontFamily="var(--font-extended)" fontWeight="800" textAnchor="middle">
          Hello! 🇬🇧
        </text>
      </g>

      {/* Speech Bubble 2 - Spanish (Top Right) */}
      <g transform="translate(320, 50)" style={{ animation: "float 4s ease-in-out infinite 1s" }}>
        <rect x="0" y="0" width="115" height="54" rx="16" fill="#0A2430" stroke="#D6A52B" strokeWidth="2" />
        <path d="M85 54 L98 66 L75 54 Z" fill="#0A2430" stroke="#D6A52B" strokeWidth="2" strokeLinejoin="round" />
        <text x="57" y="32" fill="#D6A52B" fontSize="16" fontFamily="var(--font-extended)" fontWeight="800" textAnchor="middle">
          ¡Hola! 🇪🇸
        </text>
      </g>

      {/* Speech Bubble 3 - French (Mid Right) */}
      <g transform="translate(340, 170)" style={{ animation: "float 4s ease-in-out infinite 0.5s" }}>
        <rect x="0" y="0" width="125" height="54" rx="16" fill="#061820" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.95" />
        <path d="M15 54 L5 66 L30 54 Z" fill="#061820" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
        <text x="62" y="32" fill="#FFFFFF" fontSize="15" fontFamily="var(--font-extended)" fontWeight="800" textAnchor="middle">
          Bonjour! 🇫🇷
        </text>
      </g>

      {/* Speech Bubble 4 - German (Mid Left) */}
      <g transform="translate(30, 180)" style={{ animation: "float 4s ease-in-out infinite 1.5s" }}>
        <rect x="0" y="0" width="135" height="54" rx="16" fill="#0A2430" stroke="#D6A52B" strokeWidth="1.5" />
        <path d="M100 54 L115 65 L90 54 Z" fill="#0A2430" stroke="#D6A52B" strokeWidth="1.5" strokeLinejoin="round" />
        <text x="67" y="32" fill="#FFFFFF" fontSize="15" fontFamily="var(--font-extended)" fontWeight="800" textAnchor="middle">
          Guten Tag! 🇩🇪
        </text>
      </g>

      {/* Speech Bubble 5 - Chinese (Bottom Left) */}
      <g transform="translate(80, 280)" style={{ animation: "float 4s ease-in-out infinite 2s" }}>
        <rect x="0" y="0" width="110" height="52" rx="16" fill="#061820" stroke="#D6A52B" strokeWidth="2" />
        <text x="55" y="32" fill="#D6A52B" fontSize="16" fontFamily="var(--font-extended)" fontWeight="800" textAnchor="middle">
          你好! 🇨🇳
        </text>
      </g>

      {/* Speech Bubble 6 - Japanese (Bottom Right) */}
      <g transform="translate(300, 275)" style={{ animation: "float 4s ease-in-out infinite 2.5s" }}>
        <rect x="0" y="0" width="135" height="52" rx="16" fill="#0A2430" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="67" y="32" fill="#FFFFFF" fontSize="15" fontFamily="var(--font-extended)" fontWeight="800" textAnchor="middle">
          こんにちは 🇯🇵
        </text>
      </g>

      {/* Centerpiece Certificate & Passport Icon */}
      <g transform="translate(195, 135)">
        <rect x="0" y="0" width="110" height="110" rx="24" fill="#061820" stroke="#D6A52B" strokeWidth="3" />
        {/* Flag badge emblem */}
        <circle cx="55" cy="48" r="24" fill="#D6A52B" />
        <path d="M43 48 L51 56 L67 40" stroke="#061820" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="55" y="90" fill="#FFFFFF" fontSize="13" fontFamily="var(--font-extended)" fontWeight="800" textAnchor="middle">
          C1 / C2 LEVEL
        </text>
      </g>

      {/* Decorative Sparkles */}
      <path d="M250 40 L254 50 L264 54 L254 58 L250 68 L246 58 L236 54 L246 50 Z" fill="#D6A52B" opacity="0.8" />
      <path d="M430 140 L432 147 L439 149 L432 151 L430 158 L428 151 L421 149 L428 147 Z" fill="#D6A52B" opacity="0.6" />
      <path d="M70 140 L72 145 L77 147 L72 149 L70 154 L68 149 L63 147 L68 145 Z" fill="#FFFFFF" opacity="0.5" />
    </svg>
  );
}
