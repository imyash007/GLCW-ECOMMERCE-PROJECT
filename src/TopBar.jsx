import React from "react";

const MESSAGES = [
  " Free Delivery on orders above ₹499",
  " Express Delivery Available",
  " New Mouse Pads just dropped",
  " Home Decor collection now live",
  " LED Products at unbeatable prices",
  " Custom orders available — Contact us",
  " ✅Trusted by 23000+ customers across India",

  " Free Delivery on orders above ₹499",
  " Express Delivery Available",
  " New Mouse Pads just dropped",
  " Home Decor collection now live",
  " LED Products at unbeatable prices",
  " Custom orders available — Contact us",
  " ✅Trusted by 23000+ customers across India",
];

export default function TopBar() {
  return (
    <div
      style={{
        background: "#8B6000",
        color: "#fff8e8",
        height: 34,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 400,
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 60,
          zIndex: 2,
          background: "linear-gradient(90deg, #8B6000, transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 60,
          zIndex: 2,
          background: "linear-gradient(270deg, #8B6000, transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Scrolling track */}
      <div
        style={{
          display: "flex",
          animation: "marquee 30s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {MESSAGES.map((msg, i) => (
          <span
            key={i}
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              padding: "0 2.5rem",
              borderRight: "1px solid rgba(255,248,232,0.2)",
            }}
          >
            {msg}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
