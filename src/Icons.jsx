import React from "react";

const Icon = ({ children, size = 20, color = "currentColor", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "inline-block", flexShrink: 0, ...style }}
  >
    {children}
  </svg>
);

export const Icons = {
  // Categories
  All: ({ size, color }) => (
    <Icon size={size} color={color}>
      <circle cx="12" cy="12" r="3" />
      <path d="M3 12h3m12 0h3M12 3v3m0 12v3" />
      <circle cx="12" cy="12" r="9" strokeWidth="1.2" />
    </Icon>
  ),
  Fashion: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M6 2 3 7l3 1v12a1 1 0 001 1h10a1 1 0 001-1V8l3-1-3-5" />
      <path d="M9 2c0 2 1.5 4 3 4s3-2 3-4" />
    </Icon>
  ),
  Home: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M3 9.5L12 3l9 6.5" />
      <path d="M9 21V12h6v9" />
      <rect x="3" y="9" width="18" height="12" rx="1" strokeWidth="0" />
      <path d="M3 9.5V21h18V9.5" />
    </Icon>
  ),
  Electronics: ({ size, color }) => (
    <Icon size={size} color={color}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8m-4-4v4" />
    </Icon>
  ),
  Beauty: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
      <circle cx="12" cy="9" r="2" />
    </Icon>
  ),

  // Actions
  Cart: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </Icon>
  ),
  Heart: ({ size, color, filled }) => (
    <Icon size={size} color={color}>
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        fill={filled ? color : "none"}
      />
    </Icon>
  ),
  Edit: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </Icon>
  ),
  Trash: ({ size, color }) => (
    <Icon size={size} color={color}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6m4-6v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </Icon>
  ),
  Plus: ({ size, color }) => (
    <Icon size={size} color={color}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  ),
  Check: ({ size, color }) => (
    <Icon size={size} color={color}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  ),
  X: ({ size, color }) => (
    <Icon size={size} color={color}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  ),
  ArrowLeft: ({ size, color }) => (
    <Icon size={size} color={color}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </Icon>
  ),
  ArrowRight: ({ size, color }) => (
    <Icon size={size} color={color}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </Icon>
  ),
  ChevronLeft: ({ size, color }) => (
    <Icon size={size} color={color}>
      <polyline points="15 18 9 12 15 6" />
    </Icon>
  ),
  ChevronRight: ({ size, color }) => (
    <Icon size={size} color={color}>
      <polyline points="9 18 15 12 9 6" />
    </Icon>
  ),
  Eye: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  ),
  LogOut: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </Icon>
  ),
  Lock: ({ size, color }) => (
    <Icon size={size} color={color}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </Icon>
  ),
  Upload: ({ size, color }) => (
    <Icon size={size} color={color}>
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
    </Icon>
  ),
  Image: ({ size, color }) => (
    <Icon size={size} color={color}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </Icon>
  ),
  Package: ({ size, color }) => (
    <Icon size={size} color={color}>
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </Icon>
  ),
  Carousel: ({ size, color }) => (
    <Icon size={size} color={color}>
      <rect x="2" y="6" width="6" height="12" rx="1" />
      <rect x="9" y="4" width="6" height="16" rx="1" />
      <rect x="16" y="6" width="6" height="12" rx="1" />
    </Icon>
  ),
  Tag: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </Icon>
  ),
  Star: ({ size, color }) => (
    <Icon size={size} color={color}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </Icon>
  ),
  Sparkle: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
      <path d="M5.636 5.636l2.122 2.122m8.485 8.485l2.121 2.121M5.636 18.364l2.122-2.122m8.485-8.485l2.121-2.121" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  ),
  Phone: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </Icon>
  ),
  Instagram: ({ size, color }) => (
    <Icon size={size} color={color}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </Icon>
  ),
  Mail: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </Icon>
  ),
  User: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Icon>
  ),
  ShoppingBag: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </Icon>
  ),
  ExternalLink: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </Icon>
  ),
  Filter: ({ size, color }) => (
    <Icon size={size} color={color}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </Icon>
  ),
  Grid: ({ size, color }) => (
    <Icon size={size} color={color}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </Icon>
  ),
  Zap: ({ size, color }) => (
    <Icon size={size} color={color}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </Icon>
  ),
  Bulb: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.9 10.2 19 8.7 19 7a7 7 0 10-14 0c0 1.7 1.1 3.2 2.5 4.5.8.8 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6m-6 3h6" />
    </Icon>
  ),
  Bolt: ({ size, color }) => (
    <Icon size={size} color={color}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </Icon>
  ),
  Bolt: ({ size, color }) => (
    <Icon size={size} color={color}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </Icon>
  ),
  Bulb: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.9 10.2 19 8.7 19 7a7 7 0 10-14 0c0 1.7 1.1 3.2 2.5 4.5.8.8 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6m-6 3h6" />
    </Icon>
  ),
  Mouse: ({ size, color }) => (
    <Icon size={size} color={color}>
      <rect x="5" y="2" width="14" height="20" rx="7" />
      <line x1="12" y1="2" x2="12" y2="10" />
    </Icon>
  ),
  Truck: ({ size, color }) => (
    <Icon size={size} color={color}>
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v4h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </Icon>
  ),
  Shield: ({ size, color }) => (
    <Icon size={size} color={color}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </Icon>
  ),
  Live: ({ size, color }) => (
    <Icon size={size} color={color}>
      <circle cx="12" cy="12" r="2" fill={color} stroke="none" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="10" />
    </Icon>
  ),
};

// Placeholder shown in product card when no image uploaded
export function ProductImagePlaceholder({ category, size = 80 }) {
  const map = {
    fashion: { Icon: Icons.Fashion, color: "#c084fc" },
    electronics: { Icon: Icons.Electronics, color: "#60a5fa" },
    home: { Icon: Icons.Home, color: "#4ade80" },
    beauty: { Icon: Icons.Beauty, color: "#f472b6" },
  };
  const { Icon: CatIcon, color } = map[category] || {
    Icon: Icons.Package,
    color: "#daa532",
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
      }}
    >
      <CatIcon size={size} color={color} />
    </div>
  );
}

export default Icons;
