import React from "react";

export default function Hero({ onExplore }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "5rem 2.5rem 4rem",
        textAlign: "center",
        overflow: "hidden",
        animation: "fadeUp 0.8s ease both",
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "20%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(218,165,50,0.09) 0%, transparent 70%)",
          animation: "orb1 10s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "15%",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(244,51,151,0.07) 0%, transparent 70%)",
          animation: "orb2 13s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Eyebrow tag */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          border: "1px solid rgba(218,165,50,0.25)",
          borderRadius: 999,
          padding: "0.3rem 1rem",
          marginBottom: "1.5rem",
          background: "rgba(218,165,50,0.06)",
          backdropFilter: "blur(10px)",
          animation: "fadeUp 0.5s ease both",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "var(--gold)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          🔥 Daily updated deals
        </span>
      </div>

      {/* Main heading */}
      <h1
        style={{
          fontFamily: "Syne",
          fontWeight: 800,
          fontSize: "clamp(3rem, 7vw, 6rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          marginBottom: "0.5rem",
          animation: "fadeUp 0.6s ease 0.1s both",
        }}
      >
        <span style={{ color: "var(--text)" }}>Shop </span>
        <span
          style={{
            background:
              "linear-gradient(135deg, #daa532 0%, #f0c060 40%, #ff9900 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Smarter.
        </span>
        <br />
        <span style={{ color: "var(--text)", fontSize: "85%" }}>Pay </span>
        <span
          style={{
            background: "linear-gradient(135deg, #f43397 0%, #c0126f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "85%",
          }}
        >
          Less.
        </span>
      </h1>

      <p
        style={{
          fontSize: "1rem",
          color: "var(--muted)",
          lineHeight: 1.8,
          maxWidth: 520,
          margin: "1.25rem auto 2.5rem",
          animation: "fadeUp 0.6s ease 0.2s both",
          fontWeight: 300,
        }}
      >
        Handpicked products that link directly to{" "}
        <strong style={{ color: "#f43397", fontWeight: 600 }}>Meesho</strong>{" "}
        and{" "}
        <strong style={{ color: "#ff9900", fontWeight: 600 }}>Amazon</strong>.
        One tap, best price, done.
      </p>

      {/* CTA buttons */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          justifyContent: "center",
          flexWrap: "wrap",
          animation: "fadeUp 0.6s ease 0.3s both",
        }}
      >
        <button
          onClick={onExplore}
          style={{
            padding: "0.75rem 2rem",
            borderRadius: 12,
            background: "linear-gradient(135deg, #daa532, #f0c060)",
            border: "none",
            color: "#000",
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            boxShadow: "0 0 30px rgba(218,165,50,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = "0 0 45px rgba(218,165,50,0.55)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(218,165,50,0.35)";
          }}
        >
          Explore Products ↓
        </button>
        <button
          style={{
            padding: "0.75rem 2rem",
            borderRadius: 12,
            background: "transparent",
            border: "1px solid rgba(218,165,50,0.3)",
            color: "var(--gold)",
            fontWeight: 600,
            fontSize: "0.85rem",
            letterSpacing: "0.06em",
            transition: "all 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(218,165,50,0.08)";
            e.currentTarget.style.borderColor = "rgba(218,165,50,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(218,165,50,0.3)";
          }}
        >
          Today's Deals
        </button>
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          flexWrap: "wrap",
          marginTop: "4rem",
          paddingTop: "2.5rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          animation: "fadeUp 0.6s ease 0.4s both",
        }}
      >
        {[
          { value: "500+", label: "Products Listed" },
          { value: "₹99", label: "Lowest Price Found" },
          { value: "2", label: "Platforms" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: "1.8rem",
                color: "var(--gold)",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
