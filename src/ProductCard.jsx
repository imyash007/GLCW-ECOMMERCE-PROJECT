import React, { useState, useRef, useEffect } from 'react';
import { Icons, ProductImagePlaceholder } from './Icons';
import useWishlist from './useWishlist';

const BADGE_COLORS = {
  NEW: { bg: '#e10000', color: '#fff' },
  HOT: { bg: '#ef4444', color: '#fff' },
  SALE: { bg: '#f60d0d', color: '#000' },
};

export default function ProductCard({ product, index, isMobile = false }) {
  const [hovered, setHovered] = useState(false);
  const [wished, toggleWish] = useWishlist(product.id);
  const [activeImg, setActiveImg] = useState(0);
  const cardRef = useRef();
  const touchStartX = useRef(null);

  const disc = Math.round((1 - product.price / product.old) * 100);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const staggerDelay = index < 4 ? `${(index % 2) * 0.12 + Math.floor(index / 2) * 0.1}s` : '0s';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.location.href = `/product/${product.id}`}
      className="fade-in-card"
      style={{ cursor: 'pointer', minWidth: 0, transitionDelay: staggerDelay }}
    >
      <div style={{
        transform: `translateY(${hovered ? '-6px' : '0'})`,
        transition: 'transform 0.3s ease',
        borderRadius: isMobile ? 14 : 20,
        background: 'linear-gradient(160deg, #ffffff 0%, #fff5f2 100%)',
        border: `1px solid ${hovered ? 'rgba(210, 20, 58, 0.4)' : 'rgba(218, 165, 50, 0.2)'}`,
        boxShadow: hovered
          ? '0 20px 40px rgba(210, 20, 58, 0.15), 0 0 20px rgba(218, 165, 50, 0.15)'
          : '0 4px 16px rgba(210, 20, 58, 0.08)',
        overflow: 'hidden',
        transition: hovered ? 'border 0.1s, box-shadow 0.1s' : 'all 0.5s ease',
        position: 'relative', width: '100%',
      }}>

        {/* Image area */}
        <div
          style={{
            position: 'relative', overflow: 'hidden',
            aspectRatio: '1 / 1', width: '100%',
            background: '#fff',
            borderBottom: '1px solid rgba(180,150,80,0.1)',
          }}
          onMouseMove={(e) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const images = [product.image, product.image2, product.image3].filter(Boolean);
            if (images.length > 1) {
              const idx = Math.floor(x * images.length);
              setActiveImg(Math.min(idx, images.length - 1));
            }
          }}
          onMouseLeave={() => setActiveImg(0)}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(delta) < 30) return;
            const images = [product.image, product.image2, product.image3].filter(Boolean);
            if (images.length <= 1) return;
            e.stopPropagation();
            setActiveImg(i => (i + (delta < 0 ? 1 : -1) + images.length) % images.length);
          }}
        >
        {/* Rakhi Thread Accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4, zIndex: 10,
          background: 'repeating-linear-gradient(45deg, #D2143A, #D2143A 8px, #FFD700 8px, #FFD700 16px)'
        }} />

          {(() => {
            const images = [product.image, product.image2, product.image3].filter(Boolean);
            return images.length > 0 ? (
              <>
                {images.map((img, i) => (
                  <img key={i} src={img} alt={product.name} style={{
                    width: '100%', height: '100%', objectFit: 'contain',
                    position: 'absolute', top: 0, left: 0,
                    opacity: activeImg === i ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    background: '#fff',
                  }} />
                ))}
                {images.length > 1 && (
                  <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4, zIndex: 3 }}>
                    {images.map((_, i) => (
                      <div key={i} style={{
                        width: activeImg === i ? 14 : 5, height: 3, borderRadius: 999,
                        background: activeImg === i ? '#D2143A' : 'rgba(210, 20, 58, 0.3)',
                        transition: 'all 0.3s ease',
                      }} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <ProductImagePlaceholder category={product.cat} size={isMobile ? 48 : 72} />
            );
          })()}

          {/* Badges */}
          <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 4, zIndex: 2, flexWrap: 'wrap', maxWidth: '70%' }}>
            {product.badges.map(b => (
              <span key={b} style={{
                padding: isMobile ? '1px 5px' : '2px 8px', borderRadius: 6,
                fontSize: isMobile ? '0.5rem' : '0.6rem',
                fontWeight: 700, letterSpacing: '0.06em',
                background: BADGE_COLORS[b]?.bg, color: BADGE_COLORS[b]?.color,
                display: 'flex', alignItems: 'center', gap: 3,
              }}>
                {b === 'NEW' && <Icons.Sparkle size={7} color="#fff" />}
                {b === 'HOT' && <Icons.Zap size={7} color="#fff" />}
                {b === 'SALE' && <Icons.Tag size={7} color="#000" />}
                {b} {disc > 0 ? `${disc}% off` : ''}
              </span>
            ))}
          </div>

          {/* Wishlist */}
          <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleWish(); }} style={{
            position: 'absolute', top: 8, right: 8,
            width: isMobile ? 28 : 36, height: isMobile ? 28 : 36,
            borderRadius: '50%', zIndex: 2,
            background: 'rgba(245,240,232,0.85)', border: '1px solid rgba(180,150,80,0.2)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'transform 0.2s',
          }}>
            <Icons.Heart size={isMobile ? 12 : 16} color={wished ? '#ef4444' : 'var(--muted)'} filled={wished} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: isMobile ? '0.6rem 0.7rem' : '1rem 1.1rem',minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: isMobile ? '0.55rem' : '0.6rem',
            letterSpacing: '0.15em', color: 'var(--gold)',
            textTransform: 'uppercase', marginBottom: 4, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            {product.cat === 'Mouse' && <Icons.Mouse size={9} color="var(--gold)" />}
            {product.cat === 'LED' && <Icons.Bulb size={9} color="var(--gold)" />}
            {product.cat === 'Home' && <Icons.Home size={9} color="var(--gold)" />}
            {product.cat}
          </div>

   <div style={{
  fontFamily: 'Inter', fontWeight: 700,
  fontSize: isMobile ? '0.78rem' : '0.95rem',
  color: 'var(--text)', marginBottom: isMobile ? 2 : 4, lineHeight: 1.3,
  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  maxWidth: '100%', display: 'block', minWidth: 0,
}}>{product.name}</div>
          {!isMobile && (
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.6rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {product.desc}
            </div>
          )}

          {/* Price */}
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: isMobile ? 4 : 8,
            marginBottom: isMobile ? '0.5rem' : '0.75rem',
            marginTop: isMobile ? '0.25rem' : 0,
          }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: isMobile ? '1rem' : '1.2rem', color: '#1A1A1A' }}>₹{product.price}</span>
            <span style={{ fontSize: isMobile ? '0.65rem' : '0.78rem', color: 'var(--muted)', textDecoration: 'line-through' }}>₹{product.old}</span>
          </div>

          {/* Buy buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: `${product.meesho ? '1fr' : ''} ${product.amazon ? '1fr' : ''}`.trim(), gap: isMobile ? 5 : 6 }}>
            {product.meesho && (
              <button onClick={e => { e.stopPropagation(); e.preventDefault(); window.open(product.meesho, '_blank', 'noopener,noreferrer'); }} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 3 : 5,
                padding: isMobile ? '0.38rem 0' : '0.55rem 0',
                borderRadius: isMobile ? 8 : 10, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #f43397, #c0126f)', color: '#fff',
                fontSize: isMobile ? '0.6rem' : '0.72rem', fontWeight: 700, transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(0.97)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Icons.ShoppingBag size={isMobile ? 10 : 13} color="#fff" /> Normal
              </button>
            )}
            {product.amazon && (
              <button onClick={e => { e.stopPropagation(); e.preventDefault(); window.open(product.amazon, '_blank', 'noopener,noreferrer'); }} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 3 : 5,
                padding: isMobile ? '0.38rem 0' : '0.55rem 0',
                borderRadius: isMobile ? 8 : 10, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #48ff00, #2de000)', color: '#000',
                fontSize: isMobile ? '0.6rem' : '0.72rem', fontWeight: 700, transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(0.97)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Icons.Bolt size={isMobile ? 10 : 13} color="#000" /> Express
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
