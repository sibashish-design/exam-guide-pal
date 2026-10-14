"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import styles from "./HeroIllustration.module.css";

interface EyeConfig {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  pupilR: number;
  maxMove: number;
}

const characters: {
  id: string;
  eyes: { left: EyeConfig; right: EyeConfig };
}[] = [
  {
    id: "student-a",
    eyes: {
      left:  { cx: 132, cy: 88, rx: 8, ry: 9, pupilR: 4, maxMove: 3.5 },
      right: { cx: 158, cy: 86, rx: 8, ry: 9, pupilR: 4, maxMove: 3.5 },
    },
  },
  {
    id: "student-b",
    eyes: {
      left:  { cx: 288, cy: 82, rx: 7, ry: 8, pupilR: 3.5, maxMove: 3 },
      right: { cx: 312, cy: 80, rx: 7, ry: 8, pupilR: 3.5, maxMove: 3 },
    },
  },
  {
    id: "student-c",
    eyes: {
      left:  { cx: 418, cy: 72, rx: 7, ry: 8, pupilR: 3.5, maxMove: 2.8 },
      right: { cx: 442, cy: 70, rx: 7, ry: 8, pupilR: 3.5, maxMove: 2.8 },
    },
  },
];

export function HeroIllustration() {
  const svgRef = useRef<SVGSVGElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const pupilRefs = useRef<Map<string, SVGCircleElement>>(new Map());
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const updatePupils = useCallback(() => {
    const svg = svgRef.current;
    const mouse = mouseRef.current;
    if (!svg) return;

    characters.forEach((char) => {
      [char.eyes.left, char.eyes.right].forEach((eye, i) => {
        const key = `${char.id}-${i}`;
        const pupil = pupilRefs.current.get(key);
        if (!pupil) return;

        if (!mouse) {
          pupil.setAttribute("cx", String(eye.cx));
          pupil.setAttribute("cy", String(eye.cy));
          return;
        }

        const pt = svg.createSVGPoint();
        pt.x = mouse.x;
        pt.y = mouse.y;
        const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());

        const dx = svgPt.x - eye.cx;
        const dy = svgPt.y - eye.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
          const clampedDist = Math.min(dist, eye.maxMove * 30) / 30;
          const scale = Math.min(clampedDist, eye.maxMove) / (dist > 0 ? dist : 1);
          pupil.setAttribute("cx", String(eye.cx + dx * scale * 0.03));
          pupil.setAttribute("cy", String(eye.cy + dy * scale * 0.03));
        }
      });
    });
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!animRef.current) {
        animRef.current = requestAnimationFrame(() => {
          updatePupils();
          animRef.current = 0;
        });
      }
    };

    const onMouseLeave = () => {
      mouseRef.current = null;
      updatePupils();
    };

    const heroSection = svgRef.current?.closest("section");
    const target = heroSection || document;

    target.addEventListener("mousemove", onMouseMove as EventListener);
    target.addEventListener("mouseleave", onMouseLeave as EventListener);

    return () => {
      target.removeEventListener("mousemove", onMouseMove as EventListener);
      target.removeEventListener("mouseleave", onMouseLeave as EventListener);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isTouchDevice, updatePupils]);

  const setPupilRef = useCallback(
    (key: string) => (el: SVGCircleElement | null) => {
      if (el) pupilRefs.current.set(key, el);
      else pupilRefs.current.delete(key);
    },
    []
  );

  return (
    <div className={styles.wrapper}>
      <svg
        ref={svgRef}
        viewBox="0 0 560 440"
        className={styles.svg}
        aria-label="Illustration of students studying together"
        role="img"
      >
        {/* Background desk / table area */}
        <rect x="40" y="300" width="480" height="16" rx="8" fill="#0a2430" />
        
        {/* Books stack */}
        <g className={styles.floatSlow}>
          <rect x="60" y="260" width="80" height="14" rx="3" fill="#D6A52B" />
          <rect x="64" y="248" width="72" height="14" rx="3" fill="#F8F5EF" />
          <rect x="62" y="236" width="76" height="14" rx="3" fill="#c4961f" />
        </g>

        {/* Laptop */}
        <g>
          <rect x="380" y="264" width="120" height="6" rx="3" fill="#8a9ba5" />
          <rect x="388" y="212" width="104" height="54" rx="4" fill="#0a2430" stroke="#8a9ba5" strokeWidth="2" />
          <rect x="394" y="218" width="92" height="42" rx="2" fill="#102e3c" />
          {/* Screen content lines */}
          <rect x="400" y="226" width="50" height="3" rx="1.5" fill="#D6A52B" opacity="0.6" />
          <rect x="400" y="234" width="70" height="3" rx="1.5" fill="#FFFFFF" opacity="0.2" />
          <rect x="400" y="242" width="40" height="3" rx="1.5" fill="#FFFFFF" opacity="0.15" />
        </g>

        {/* Pencil */}
        <g className={styles.floatMedium} transform="translate(310, 250) rotate(-20)">
          <rect x="0" y="0" width="60" height="8" rx="1" fill="#D6A52B" />
          <polygon points="60,0 68,4 60,8" fill="#F8F5EF" />
          <rect x="0" y="0" width="8" height="8" rx="1" fill="#c4961f" />
        </g>

        {/* Checklist */}
        <g className={styles.floatSlow} transform="translate(200, 230)">
          <rect x="0" y="0" width="56" height="70" rx="4" fill="#F8F5EF" />
          <rect x="8" y="8" width="10" height="10" rx="2" fill="none" stroke="#D6A52B" strokeWidth="1.5" />
          <path d="M11,13 L14,16 L19,10" stroke="#D6A52B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <rect x="24" y="10" width="24" height="4" rx="2" fill="#0a2430" opacity="0.2" />
          <rect x="8" y="26" width="10" height="10" rx="2" fill="none" stroke="#D6A52B" strokeWidth="1.5" />
          <path d="M11,31 L14,34 L19,28" stroke="#D6A52B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <rect x="24" y="28" width="20" height="4" rx="2" fill="#0a2430" opacity="0.2" />
          <rect x="8" y="44" width="10" height="10" rx="2" fill="none" stroke="#8a9ba5" strokeWidth="1.5" />
          <rect x="24" y="46" width="18" height="4" rx="2" fill="#0a2430" opacity="0.1" />
        </g>

        {/* ═══ Student A (Left) ═══ */}
        <g transform="translate(80, 40)">
          {/* Body */}
          <rect x="28" y="120" width="70" height="80" rx="12" fill="#E8C4A0" />
          {/* Shirt collar area */}
          <rect x="34" y="120" width="58" height="40" rx="8" fill="#D6A52B" />
          
          {/* Head */}
          <ellipse cx="63" cy="62" rx="35" ry="40" fill="#F5DEB3" />
          {/* Hair */}
          <path d="M28,55 Q28,22 63,22 Q98,22 98,55 Q98,35 63,32 Q28,35 28,55Z" fill="#2c1810" />
          <ellipse cx="32" cy="55" rx="6" ry="12" fill="#2c1810" />
          <ellipse cx="94" cy="55" rx="6" ry="12" fill="#2c1810" />
          
          {/* Eyes */}
          <ellipse cx={characters[0].eyes.left.cx - 80} cy={characters[0].eyes.left.cy - 40} rx={characters[0].eyes.left.rx} ry={characters[0].eyes.left.ry} fill="white" />
          <circle ref={setPupilRef("student-a-0")} cx={characters[0].eyes.left.cx - 80} cy={characters[0].eyes.left.cy - 40} r={characters[0].eyes.left.pupilR} fill="#2c1810" />
          
          <ellipse cx={characters[0].eyes.right.cx - 80} cy={characters[0].eyes.right.cy - 40} rx={characters[0].eyes.right.rx} ry={characters[0].eyes.right.ry} fill="white" />
          <circle ref={setPupilRef("student-a-1")} cx={characters[0].eyes.right.cx - 80} cy={characters[0].eyes.right.cy - 40} r={characters[0].eyes.right.pupilR} fill="#2c1810" />
          
          {/* Smile */}
          <path d="M50,60 Q63,72 76,60" fill="none" stroke="#c4961f" strokeWidth="2" strokeLinecap="round" />
          
          {/* Glasses */}
          <circle cx="52" cy="48" r="12" fill="none" stroke="#0a2430" strokeWidth="2" />
          <circle cx="78" cy="46" r="12" fill="none" stroke="#0a2430" strokeWidth="2" />
          <line x1="64" y1="47" x2="66" y2="46" stroke="#0a2430" strokeWidth="2" />
        </g>

        {/* ═══ Student B (Center) ═══ */}
        <g transform="translate(220, 20)">
          {/* Body */}
          <rect x="28" y="130" width="80" height="90" rx="14" fill="#E8B8A0" />
          {/* Jacket */}
          <rect x="24" y="130" width="88" height="50" rx="10" fill="#8a9ba5" />
          
          {/* Head */}
          <ellipse cx="68" cy="68" rx="38" ry="44" fill="#C68B5B" />
          {/* Hair (curly top) */}
          <path d="M30,58 Q30,18 68,18 Q106,18 106,58" fill="#1a0e08" />
          <circle cx="38" cy="30" r="10" fill="#1a0e08" />
          <circle cx="55" cy="22" r="11" fill="#1a0e08" />
          <circle cx="75" cy="20" r="12" fill="#1a0e08" />
          <circle cx="92" cy="26" r="10" fill="#1a0e08" />
          <circle cx="100" cy="38" r="8" fill="#1a0e08" />
          
          {/* Eyes */}
          <ellipse cx={characters[1].eyes.left.cx - 220} cy={characters[1].eyes.left.cy - 20} rx={characters[1].eyes.left.rx} ry={characters[1].eyes.left.ry} fill="white" />
          <circle ref={setPupilRef("student-b-0")} cx={characters[1].eyes.left.cx - 220} cy={characters[1].eyes.left.cy - 20} r={characters[1].eyes.left.pupilR} fill="#1a0e08" />
          
          <ellipse cx={characters[1].eyes.right.cx - 220} cy={characters[1].eyes.right.cy - 20} rx={characters[1].eyes.right.rx} ry={characters[1].eyes.right.ry} fill="white" />
          <circle ref={setPupilRef("student-b-1")} cx={characters[1].eyes.right.cx - 220} cy={characters[1].eyes.right.cy - 20} r={characters[1].eyes.right.pupilR} fill="#1a0e08" />
          
          {/* Smile */}
          <path d="M56,72 Q68,84 80,72" fill="none" stroke="#8B6A4A" strokeWidth="2" strokeLinecap="round" />
          
          {/* Backpack strap */}
          <path d="M36,130 L30,105" stroke="#D6A52B" strokeWidth="5" strokeLinecap="round" />
          <path d="M100,130 L106,105" stroke="#D6A52B" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* ═══ Student C (Right) ═══ */}
        <g transform="translate(370, 30)">
          {/* Body */}
          <rect x="18" y="120" width="70" height="80" rx="12" fill="#F0D0B0" />
          {/* Top */}
          <rect x="14" y="120" width="78" height="40" rx="8" fill="#E8928C" />
          
          {/* Head */}
          <ellipse cx="48" cy="58" rx="34" ry="40" fill="#FAE0C8" />
          {/* Hair (ponytail) */}
          <path d="M14,48 Q14,14 48,14 Q82,14 82,48 Q82,30 48,26 Q14,30 14,48Z" fill="#B84C2A" />
          <ellipse cx="82" cy="28" rx="12" ry="18" fill="#B84C2A" />
          <line x1="82" y1="28" x2="95" y2="60" stroke="#B84C2A" strokeWidth="8" strokeLinecap="round" />
          
          {/* Eyes */}
          <ellipse cx={characters[2].eyes.left.cx - 370} cy={characters[2].eyes.left.cy - 30} rx={characters[2].eyes.left.rx} ry={characters[2].eyes.left.ry} fill="white" />
          <circle ref={setPupilRef("student-c-0")} cx={characters[2].eyes.left.cx - 370} cy={characters[2].eyes.left.cy - 30} r={characters[2].eyes.left.pupilR} fill="#4A2520" />
          
          <ellipse cx={characters[2].eyes.right.cx - 370} cy={characters[2].eyes.right.cy - 30} rx={characters[2].eyes.right.rx} ry={characters[2].eyes.right.ry} fill="white" />
          <circle ref={setPupilRef("student-c-1")} cx={characters[2].eyes.right.cx - 370} cy={characters[2].eyes.right.cy - 30} r={characters[2].eyes.right.pupilR} fill="#4A2520" />
          
          {/* Smile */}
          <path d="M36,54 Q48,66 60,54" fill="none" stroke="#D4836A" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Graduation cap floating */}
        <g className={styles.floatMedium} transform="translate(460, 50)">
          <rect x="0" y="12" width="50" height="6" rx="2" fill="#0a2430" />
          <polygon points="25,0 50,12 25,18 0,12" fill="#0a2430" />
          <line x1="42" y1="14" x2="46" y2="30" stroke="#D6A52B" strokeWidth="1.5" />
          <circle cx="46" cy="32" r="3" fill="#D6A52B" />
        </g>

        {/* Small decorative stars */}
        <g fill="#D6A52B" opacity="0.4">
          <circle cx="30" cy="30" r="2" />
          <circle cx="530" cy="100" r="2.5" />
          <circle cx="280" cy="20" r="1.5" />
          <circle cx="500" cy="350" r="2" />
          <circle cx="50" cy="380" r="1.5" />
        </g>
      </svg>
    </div>
  );
}
