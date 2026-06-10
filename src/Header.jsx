import React, { useState, useEffect } from "react";
import { Icons } from "./Icons";
import logo from "./logo.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // useEffect(() => {
  //   if (menuOpen) {
  //     const fn = () => setMenuOpen(false);
  //     window.addEventListener('scroll', fn, { once: true });
  //     return () => window.removeEventListener('scroll', fn);
  //   }
  // }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 300,
          background:
            scrolled || menuOpen
              ? "rgba(245,240,232,0.97)"
              : "rgba(245,240,232,0.85)",
          backdropFilter: "blur(24px)",
          borderBottom: `1px solid ${menuOpen ? "rgba(184,134,11,0.25)" : scrolled ? "rgba(184,134,11,0.15)" : "transparent"}`,
          padding: "0.75rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo + Title */}
        <div
          onClick={() => (window.location.href = "/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            cursor: "pointer",
          }}
        >
          <img
            src={logo}
            alt="GLCW Logo"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
              border: "2px solid rgba(184,134,11,0.4)",
              boxShadow: "0 2px 12px rgba(184,134,11,0.2)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "Syne",
                fontWeight: 800,
                fontSize: "1.3rem",
                lineHeight: 1.1,
                background:
                  "linear-gradient(120deg, #8B6000 0%, #b8860b 50%, #8B6000 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
              }}
            >
              GLCW
            </span>
            <span
              style={{
                fontSize: "0.48rem",
                letterSpacing: "0.1em",
                color: "#8B6000",
                textTransform: "uppercase",
                lineHeight: 1,
                marginTop: 3,
                whiteSpace: "nowrap",
              }}
            >
              Gupta Laser Cutting Works
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav
          className="header-nav"
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
        >
          {["Catalogue", "Deals", "Contact"].map((n) => (
            <span
              key={n}
              style={{
                fontSize: "0.82rem",
                color: "var(--muted)",
                cursor: "pointer",
                fontWeight: 500,
                letterSpacing: "0.05em",
                transition: "color 0.2s",
              }}
              onClick={() => {
                if (n === "Catalogue") {
                  window.dispatchEvent(
                    new CustomEvent("setFilter", { detail: "all" }),
                  );
                  document
                    .getElementById("product-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                } else if (n === "Deals") {
                  document
                    .getElementById("carousel-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                } else if (n === "Contact") {
                  window.location.href = "/contact";
                }
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
            >
              {n}
            </span>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icons.Live size={14} color="#22c55e" />
            <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
              Live deals
            </span>
          </div>
        </nav>

        {/* Mobile right — live + hamburger */}
        <div
          className="header-mobile-right"
          style={{ display: "none", alignItems: "center", gap: "0.75rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Icons.Live size={10} color="#22c55e" />
            <span style={{ fontSize: "0.6rem", color: "var(--muted)" }}>
              Live
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: menuOpen
                ? "rgba(184,134,11,0.15)"
                : "rgba(184,134,11,0.08)",
              border: "1px solid rgba(184,134,11,0.25)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              padding: "8px",
              transition: "all 0.3s ease",
            }}
          >
            <span
              style={{
                display: "block",
                width: 18,
                height: 2,
                background: "#8B6000",
                borderRadius: 2,
                transition: "all 0.3s ease",
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 18,
                height: 2,
                background: "#8B6000",
                borderRadius: 2,
                transition: "all 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 18,
                height: 2,
                background: "#8B6000",
                borderRadius: 2,
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Slide-down mobile menu */}
      <div
        className="mobile-menu"
        style={{
          position: "sticky",
          top: 60,
          zIndex: 299,
          background: "rgba(245,240,232,0.98)",
          backdropFilter: "blur(24px)",
          borderBottom: menuOpen ? "1px solid rgba(184,134,11,0.2)" : "none",
          maxHeight: menuOpen ? "300px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.23,1,0.32,1)",
          display: "none",
        }}
      >
        <div style={{ padding: "0.75rem 1.5rem 1.25rem" }}>
          {["Catalogue", "Deals", "Contact"].map((n, i) => (
            <div
              key={n}
              onClick={() => {
                setMenuOpen(false);
                if (n === "Catalogue") {
                  setTimeout(() => {
                    window.dispatchEvent(
                      new CustomEvent("setFilter", { detail: "all" }),
                    );
                    document
                      .getElementById("product-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                } else if (n === "Deals") {
                  setTimeout(() => {
                    document
                      .getElementById("carousel-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                } else if (n === "Contact") {
                  setTimeout(() => {
                    window.location.href = "/contact";
                  }, 300);
                }
              }}
              style={{
                padding: "0.75rem 0",
                borderBottom: i < 2 ? "1px solid rgba(184,134,11,0.1)" : "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#5a3e00",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#b8860b")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#5a3e00")}
            >
              {n}
              <Icons.ChevronRight size={14} color="#b8860b" />
            </div>
          ))}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icons.Live size={12} color="#22c55e" />
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  fontWeight: 500,
                }}
              >
                Live deals updated daily
              </span>
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "#b8860b",
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: 999,
                background: "rgba(184,134,11,0.1)",
                border: "1px solid rgba(184,134,11,0.2)",
              }}
            >
              GLCW
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 298,
            background: "rgba(100,70,0,0.15)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}
    </>
  );
}
