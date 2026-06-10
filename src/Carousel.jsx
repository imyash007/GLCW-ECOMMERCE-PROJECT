import React, { useState, useRef, useEffect, useCallback } from "react";
import { useProducts } from "./ProductContext";
import { Icons } from "./Icons";
import useIsMobile from "./useIsMobile";

const CARD_WIDTH = 185;
const CARD_WIDTH_MOBILE = 145;
const CARD_GAP = 14;
const CARD_GAP_MOBILE = 10;
const AUTO_INTERVAL = 2800;

function CarouselCard({ item, isMobile, products }) {
  const [hovered, setHovered] = useState(false);
  const cardWidth = isMobile ? CARD_WIDTH_MOBILE : CARD_WIDTH;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        const match = products.find(
          (p) =>
            p.name === item.name ||
            p.name.toLowerCase().includes(item.name.toLowerCase()) ||
            item.name.toLowerCase().includes(p.name.toLowerCase()),
        );
        if (match) window.location.href = `/product/${match.id}`;
        else if (item.meesho) window.open(item.meesho, "_blank");
        else if (item.amazon) window.open(item.amazon, "_blank");
      }}
      style={{
        width: cardWidth,
        flexShrink: 0,
        borderRadius: isMobile ? 12 : 16,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        userSelect: "none",
        background: "linear-gradient(160deg, #ffffff, #faf7f2)",
        border: `1px solid ${hovered ? "rgba(184,134,11,0.4)" : "rgba(180,150,80,0.15)"}`,
        transform: `translateY(${hovered ? -8 : 0}px) scale(${hovered ? 1.03 : 1})`,
        boxShadow: hovered
          ? "0 20px 40px rgba(180,150,80,0.2)"
          : "0 4px 16px rgba(180,150,80,0.1)",
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <div
        style={{
          height: "auto",
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #ffffff, #faf7f2)",
          border: `1px solid ${hovered ? "rgba(184,134,11,0.4)" : "rgba(180,150,80,0.15)"}`,
          overflow: "hidden",
          position: "relative",
          filter:
            !item.image && hovered
              ? "drop-shadow(0 10px 20px rgba(218,165,50,0.35))"
              : "none",
          transition: "filter 0.3s",
        }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: `scale(${hovered ? 1.07 : 1})`,
              transition: "transform 0.4s",
            }}
          />
        ) : (
          <span style={{ fontSize: isMobile ? "2.5rem" : "3.4rem" }}>
            {item.emoji || "📦"}
          </span>
        )}
      </div>
      <div style={{ padding: isMobile ? "0.5rem 0.6rem" : "0.7rem 0.85rem" }}>
        <div
          style={{
            fontFamily: "Syne",
            fontWeight: 600,
            fontSize: isMobile ? "0.72rem" : "0.82rem",
            color: "var(--gold)",
            marginBottom: 3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 5,
            marginBottom: isMobile ? 6 : 9,
          }}
        >
          <span
            style={{
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: isMobile ? "0.85rem" : "1rem",
              color: "#1A1A1A",
            }}
          >
            ₹{item.price}
          </span>
          {item.old && (
            <span
              style={{
                fontSize: isMobile ? "0.62rem" : "0.72rem",
                color: "var(--muted)",
                textDecoration: "line-through",
              }}
            >
              ₹{item.old}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: isMobile ? 4 : 5 }}>
          {item.meesho && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(item.meesho, "_blank", "noopener,noreferrer");
              }}
              style={{
                flex: 1,
                padding: isMobile ? "3px 0" : "5px 0",
                borderRadius: 8,
                textAlign: "center",
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(135deg, #f43397, #c0126f)",
                color: "#fff",
                fontSize: isMobile ? "0.58rem" : "0.65rem",
                fontWeight: 700,
              }}
            >
              Normal
            </button>
          )}
          {item.amazon && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(item.amazon, "_blank", "noopener,noreferrer");
              }}
              style={{
                flex: 1,
                padding: isMobile ? "3px 0" : "5px 0",
                borderRadius: 8,
                textAlign: "center",
                border: "none",
                cursor: "pointer",
                background:
                  "linear-gradient(135deg, rgb(72, 255, 0), rgb(45, 224, 0))",
                color: "#000",
                fontSize: isMobile ? "0.58rem" : "0.65rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              }}
            >
              <Icons.Bolt size={isMobile ? 8 : 11} color="#000" /> Express
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CarouselSection() {
  const { products } = useProducts();
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const isPausedRef = useRef(false);
  const trackRef = useRef();
  const autoRef = useRef();

  const cardWidth = isMobile ? CARD_WIDTH_MOBILE : CARD_WIDTH;
  const cardGap = isMobile ? CARD_GAP_MOBILE : CARD_GAP;
  const cardStep = cardWidth + cardGap;

  const items = products;
  const looped = [...items, ...items, ...items];
  const START = items.length;

  const handleTransitionEnd = useCallback(() => {
    if (currentIndex >= items.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex(items.length);
    } else if (currentIndex < items.length) {
      setIsTransitioning(false);
      setCurrentIndex(items.length * 2 - 1);
    }
  }, [currentIndex, items.length]);

  useEffect(() => {
    if (!isTransitioning) {
      const t = setTimeout(() => setIsTransitioning(true), 20);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  useEffect(() => {
    setIsTransitioning(false);
    setCurrentIndex(START);
    setDragOffset(0);
  }, [START]);

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setIsTransitioning(true);
        setCurrentIndex((i) => i + 1);
      }
    }, AUTO_INTERVAL);
  }, []);

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, [startAuto]);

  const goTo = (dir) => {
    setIsTransitioning(true);
    setCurrentIndex((i) => i + dir);
    startAuto();
  };
  const onDragStart = (clientX) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragOffset(0);
    isPausedRef.current = true;
  };
  const onDragMove = (clientX) => {
    if (!isDragging) return;
    setDragOffset(clientX - dragStartX);
  };
  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    isPausedRef.current = false;
    if (dragOffset < -50) goTo(1);
    else if (dragOffset > 50) goTo(-1);
    setDragOffset(0);
  };

  const translateX = -(currentIndex * cardStep) + dragOffset;
  const dotIndex = (currentIndex - START + items.length * 10) % items.length;

  if (items.length === 0) return null;

  const padding = isMobile ? "0 1rem" : "0 2.5rem";

  return (
    <section
      style={{
        padding: isMobile ? "0.75rem 0 2.5rem" : "1rem 0 4rem",
        position: "relative",
        zIndex: 1,
      }}
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
          padding,
        }}
      >
        <h2
          style={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: isMobile ? "1rem" : "1.3rem",
            color: "rgba(218,165,50,0.7)",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          More Picks
        </h2>
        <div
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(218,165,50,0.25), transparent)",
          }}
        />
      </div>

      {/* Track */}
      <div
        style={{ position: "relative", overflow: "hidden", paddingTop: "10px" }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: isMobile ? 30 : 60,
            zIndex: 10,
            background: "linear-gradient(90deg, var(--bg), transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: isMobile ? 30 : 60,
            zIndex: 10,
            background: "linear-gradient(270deg, var(--bg), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Left arrow */}
        <button
          onClick={() => goTo(-1)}
          style={{
            position: "absolute",
            left: isMobile ? 4 : 10,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            width: isMobile ? 28 : 36,
            height: isMobile ? 28 : 36,
            borderRadius: "50%",
            background: "#daa532",
            border: "1px solid #daa532",
            color: "#fff",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#b8860b";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#daa532";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <Icons.ChevronLeft size={isMobile ? 14 : 18} color="#fff" />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => goTo(1)}
          style={{
            position: "absolute",
            right: isMobile ? 4 : 10,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            width: isMobile ? 28 : 36,
            height: isMobile ? 28 : 36,
            borderRadius: "50%",
            background: "#daa532",
            border: "1px solid #daa532",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#b8860b";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#daa532";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <Icons.ChevronRight size={isMobile ? 14 : 18} color="#fff" />
        </button>

        <div
          style={{
            overflow: "visible",
            padding: isMobile ? "0.5rem 1rem 1rem" : "0.5rem 2.5rem 1rem",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseMove={(e) => onDragMove(e.clientX)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => {
            e.preventDefault();
            onDragMove(e.touches[0].clientX);
          }}
          onTouchEnd={onDragEnd}
        >
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={{
              display: "flex",
              gap: cardGap,
              transform: `translateX(${translateX}px)`,
              transition:
                isTransitioning && !isDragging
                  ? "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  : "none",
              willChange: "transform",
            }}
          >
            {looped.map((item, i) => (
              <CarouselCard
                key={i}
                item={item}
                isMobile={isMobile}
                products={products}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
          marginTop: "0.5rem",
        }}
      >
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(START + i);
              startAuto();
            }}
            style={{
              width: dotIndex === i ? (isMobile ? 16 : 22) : isMobile ? 5 : 7,
              height: isMobile ? 5 : 7,
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background:
                dotIndex === i ? "var(--gold)" : "rgba(218,165,50,0.2)",
              transition: "all 0.35s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
