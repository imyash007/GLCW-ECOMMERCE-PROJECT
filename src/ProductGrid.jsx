import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from './ProductContext';
import { Icons } from './Icons';
import useIsMobile from './useIsMobile';

const FILTERS = [
  { label: 'Mouse Pads', key: 'mousepads', Icon: Icons.Grid },
  { label: 'LED Products', key: 'led', Icon: Icons.Bulb },
  { label: 'Home Decor', key: 'home', Icon: Icons.Home },
  { label: 'All', key: 'all', Icon: Icons.Grid },
];

export default function ProductGrid({ sectionRef }) {
  const [active, setActive] = useState('mousepads');
  const { products } = useProducts();
  const isMobile = useIsMobile();
  const filtered = active === 'all' ? products : products.filter(p => p.cat === active);
  const touchStartX = useRef(null);

  useEffect(() => {
    const fn = (e) => setActive(e.detail);
    window.addEventListener('setFilter', fn);
    return () => window.removeEventListener('setFilter', fn);
  }, []);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    const idx = FILTERS.findIndex(f => f.key === active);
    if (dx < 0 && idx < FILTERS.length - 1) setActive(FILTERS[idx + 1].key);
    if (dx > 0 && idx > 0) setActive(FILTERS[idx - 1].key);
  }

  return (
    <section
      id="product-section"
      ref={sectionRef}
      style={{ position: 'relative', zIndex: 1 }}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
    >

      {/* Filter bar */}
      <div style={{
        position: 'sticky', top: 62, zIndex: 200,
        background: 'rgba(245,240,232,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(180,150,80,0.15)',
        padding: isMobile ? '0.5rem 1rem' : '0.85rem 2.5rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        overflowX: isMobile ? 'auto' : 'visible',
        flexWrap: isMobile ? 'nowrap' : 'wrap',
        scrollbarWidth: 'none',
      }}>

        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: '0.5rem' }}>
            <Icons.Filter size={13} color="var(--muted)" />
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600 }}>Filter</span>
          </div>
        )}

        {FILTERS.map(({ label, key, Icon }) => {
          const isActive = active === key;
          return (
            <button key={key} onClick={() => setActive(key)} style={{
              padding: isMobile ? '0.28rem 0.65rem' : '0.35rem 0.9rem',
              borderRadius: 999, cursor: 'pointer', transition: 'all 0.2s',
              border: `1px solid ${isActive ? 'rgba(184,134,11,0.5)' : 'rgba(180,150,80,0.2)'}`,
              background: isActive ? 'rgba(184,134,11,0.1)' : 'transparent',
              color: isActive ? 'var(--gold)' : 'var(--muted)',
              fontSize: isMobile ? '0.68rem' : '0.78rem',
              fontWeight: isActive ? 600 : 400,
              display: 'flex', alignItems: 'center', gap: 5,
              flexShrink: 0, whiteSpace: 'nowrap',
            }}>
              <Icon size={11} color={isActive ? 'var(--gold)' : 'var(--muted)'} />
              {label}
            </button>
          );
        })}

        {!isMobile && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icons.Package size={13} color="var(--muted)" />
            <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{filtered.length} products</span>
          </div>
        )}
      </div>

      {/* Swipe dots indicator — mobile only */}
      {isMobile && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, paddingTop: '0.5rem' }}>
          {FILTERS.map(f => (
            <div key={f.key} onClick={() => setActive(f.key)} style={{
              width: active === f.key ? 18 : 6,
              height: 6,
              borderRadius: 999,
              background: active === f.key ? 'var(--gold)' : 'rgba(184,134,11,0.25)',
              transition: 'all 0.25s',
              cursor: 'pointer',
            }} />
          ))}
        </div>
      )}

      {/* Section header */}
      <div style={{
        padding: isMobile ? '1.25rem 1rem 0.75rem' : '2.5rem 2.5rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <h2 style={{
          fontFamily: 'Syne', fontWeight: 700,
          fontSize: isMobile ? '1rem' : '1.3rem',
          color: 'rgba(218,165,50,0.7)', letterSpacing: '0.05em', whiteSpace: 'nowrap',
        }}>
          Featured Products
        </h2>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(218,165,50,0.25), transparent)' }} />
      </div>

      {/* Grid — 2 cols mobile, 5 cols desktop */}
      <div className="product-grid-inner" style={{
        padding: isMobile ? '0 1rem 2rem' : '0 2.5rem 3rem',
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
        gap: isMobile ? '0.75rem' : '1.25rem',
        scrollbarWidth: 'none',
      }}>
        {filtered.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}