import React from "react";

interface CategoryIconProps {
  type: string;
  size?: number;
  color?: string;
}

export function CategoryIcon({ type, size = 32, color = "#D6A52B" }: CategoryIconProps) {
  switch (type?.toLowerCase()) {
    case "it":
    case "tech":
    case "computer-science":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect x="4" y="6" width="24" height="16" rx="2" stroke={color} strokeWidth="2" />
          <path d="M10 26h12M16 22v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M10 12l4 3-4 3M17 18h5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "healthcare":
    case "medical":
    case "nursing":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M16 6v20M6 16h20" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <rect x="4" y="4" width="24" height="24" rx="4" stroke={color} strokeWidth="2" />
        </svg>
      );
    case "finance":
    case "business":
    case "accounting":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect x="4" y="6" width="24" height="20" rx="3" stroke={color} strokeWidth="2" />
          <path d="M4 12h24" stroke={color} strokeWidth="2" />
          <circle cx="10" cy="19" r="2" fill={color} />
          <path d="M18 19h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "academic":
    case "standardized":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M16 4L2 11l14 7 14-7-14-7z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
          <path d="M6 13v9c0 3 4.5 5 10 5s10-2 10-5v-9" stroke={color} strokeWidth="2" />
          <path d="M28 12v10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "language":
    case "english":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="11" stroke={color} strokeWidth="2" />
          <path d="M5 16h22M16 5c3 3.5 4.5 7.5 4.5 11S19 23.5 16 27M16 5c-3 3.5-4.5 7.5-4.5 11S13 23.5 16 27" stroke={color} strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M8 4h12l6 6v18H8V4z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 4v6h6M12 16h8M12 20h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}
