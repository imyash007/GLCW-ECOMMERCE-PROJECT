import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useProducts } from './ProductContext';
import { Icons } from './Icons';

const injectStyles = () => {
  if (document.getElementById('shimmer-styles')) return;
  const style = document.createElement('style');
  style.id = 'shimmer-styles';
  style.textContent = `
    @keyframes shine {
      0% { transform: translateX(-200%) skewX(-30deg); }
      30% { transform: translateX(300%) skewX(-30deg); }
      100% { transform: translateX(300%) skewX(-30deg); }
    }
    .shimmer-btn {
      position: relative;
      overflow: hidden;
      -webkit-mask-image: -webkit-radial-gradient(white, black);
      isolation: isolate;
    }
    .shimmer-btn::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 60%;
      height: 100%;
      background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent);
      transform: translateX(-200%) skewX(-30deg);
      animation: shine 4s infinite ease-in-out;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
};

function RelatedCarousel({ products, currentId, category }) {
  const relatedBase = products.filter(p => p.cat === category && p.id !== currentId);
  const related = [...relatedBase, ...relatedBase, ...relatedBase];
  const cardWidth = 180;
  const cardGap = 12;
  const cardStep = cardWidth + cardGap;
  const initialOffset = relatedBase.length * cardStep;
  const [offset, setOffset] = useState(initialOffset);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  if (relatedBase.length === 0) return null;

  const handleTransitionEnd = () => {
    const maxThreshold = (relatedBase.length * 2) * cardStep;
    if (offset <= 0 || offset >= maxThreshold) {
      setTransitionEnabled(false);
      setOffset(relatedBase.length * cardStep);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      const raf = requestAnimationFrame(() => setTransitionEnabled(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [transitionEnabled]);

  const goLeft = () => { setTransitionEnabled(true); setOffset(o => o - cardStep); };
  const goRight = () => { setTransitionEnabled(true); setOffset(o => o + cardStep); };

  const onDragStart = (clientX) => { setIsDragging(true); setDragStartX(clientX); setDragOffset(0); };
  const onDragMove = (clientX) => { if (!isDragging) return; setDragOffset(clientX - dragStartX); };
  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) goRight();
    else if (dragOffset > 50) goLeft();
    setDragOffset(0);
  };

  return (
    <div style={{ padding: '2rem 1.5rem', borderTop: '1px solid rgba(180,150,80,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.1rem', color: 'rgba(184,134,11,0.8)' }}>Related Products</h2>
          <div style={{ width: 120, height: 1, background: 'linear-gradient(90deg, rgba(184,134,11,0.3), transparent)' }} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={goLeft} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.2)', color: 'var(--gold)', cursor: 'pointer' }}><Icons.ChevronLeft size={16} /></button>
          <button onClick={goRight} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.2)', color: 'var(--gold)', cursor: 'pointer' }}><Icons.ChevronRight size={16} /></button>
        </div>
      </div>
      <div style={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab' }}
           onMouseDown={e => onDragStart(e.clientX)}
           onMouseMove={e => onDragMove(e.clientX)}
           onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
           onTouchStart={e => onDragStart(e.touches[0].clientX)}
           onTouchMove={e => { e.preventDefault(); onDragMove(e.touches[0].clientX); }}
           onTouchEnd={onDragEnd}>
        <div onTransitionEnd={handleTransitionEnd} style={{ display: 'flex', gap: cardGap, transform: `translateX(${-(offset) + dragOffset}px)`, transition: (isDragging || !transitionEnabled) ? 'none' : 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)' }}>
          {related.map((p, index) => (
            <div key={`${p.id}-${index}`} onClick={() => { window.location.href = `/product/${p.id}`; }} style={{ width: cardWidth, flexShrink: 0, borderRadius: 14, background: '#fff', border: '1px solid rgba(180,150,80,0.15)', cursor: 'pointer' }}>
              <div style={{ width: '100%', aspectRatio: '1/1' }}><img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
              <div style={{ padding: '0.6rem 0.7rem' }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '0.8rem', marginBottom: 4 }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.95rem', color: '#1A1A1A' }}>₹{p.price}</span>
                  {p.old && <span style={{ fontSize: '0.72rem', color: 'var(--muted)', textDecoration: 'line-through' }}>₹{p.old}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { products } = useProducts();
  const [activeImg, setActiveImg] = useState(0);
  const [wished, setWished] = useState(false);
  const [zoom, setZoom] = useState({ show: false, x: 0, y: 0 });
  const imgRef = useRef();

  useEffect(() => { injectStyles(); }, []);

  const productId = useMemo(() => {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1);
  }, []);

  const product = products.find(p => p.id === productId);
  useEffect(() => { window.scrollTo(0, 0); setActiveImg(0); }, [productId]);

  const handleMouseMove = (e) => {
    if (!imgRef.current || window.innerWidth <= 768) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ show: true, x, y });
  };

  if (!product) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Product not found</div>;

  const images = [product.image, product.image2, product.image3].filter(Boolean);
  const disc = product.old ? Math.round((1 - product.price / product.old) * 100) : 0;

  const buyButtonStyle = (type) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    padding: '1.1rem', borderRadius: 16, textDecoration: 'none', fontSize: '1.05rem', fontWeight: 700,
    transition: 'all 0.3s ease',
    background: type === 'amazon' ? 'linear-gradient(135deg, rgb(72, 255, 0), rgb(45, 224, 0))' : 'linear-gradient(135deg, #f43397, #c0126f)',
    color: type === 'amazon' ? '#000' : '#fff',
    boxShadow: type === 'amazon' ? '0 4px 15px rgba(72, 255, 0, 0.3)' : '0 4px 15px rgba(244, 51, 151, 0.3)',
    border: 'none', cursor: 'pointer'
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(245,240,232,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(180,150,80,0.15)', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => window.history.back()} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 600, padding: '4px 0' }}>
          <Icons.ArrowLeft size={18} /><span style={{ lineHeight: 1 }}>Back</span>
        </button>
        <div onClick={() => window.location.href = '/'} style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.1rem', background: 'linear-gradient(120deg, #8B6000, #b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer' }}>GLCW</div>
        <button onClick={() => setWished(!wished)} style={{ background: 'transparent', border: 'none' }}><Icons.Heart size={20} color={wished ? '#ef4444' : 'var(--muted)'} filled={wished} /></button>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1rem 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', alignItems: 'start' }}>

        {/* LEFT — Images */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {images.map((img, i) => (
              <div key={i} onClick={() => { setActiveImg(i); setZoom({ show: false, x: 0, y: 0 }); }} style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden', border: `2px solid ${activeImg === i ? '#b8860b' : 'rgba(180,150,80,0.15)'}`, cursor: 'pointer' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <div ref={imgRef} onMouseMove={handleMouseMove} onMouseLeave={() => setZoom({ show: false, x: 0, y: 0 })} style={{ width: '100%', aspectRatio: '1/1', borderRadius: 20, overflow: 'hidden', background: '#fff', border: '1px solid rgba(180,150,80,0.2)', position: 'relative', cursor: zoom.show && window.innerWidth > 768 ? 'crosshair' : 'default' }}>
              <img src={images[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              {zoom.show && window.innerWidth > 768 && (
                <div style={{ position: 'absolute', width: 120, height: 120, border: '2px solid rgba(184,134,11,0.6)', transform: 'translate(-50%, -50%)', left: `${zoom.x}%`, top: `${zoom.y}%`, background: 'rgba(184,134,11,0.08)', pointerEvents: 'none' }} />
              )}
            </div>
            {zoom.show && window.innerWidth > 768 && (
              <div style={{ position: 'absolute', top: 0, left: 'calc(100% + 1rem)', width: 380, height: 380, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(180,150,80,0.25)', boxShadow: '0 16px 48px rgba(180,150,80,0.2)', background: '#fff', zIndex: 50, backgroundImage: `url(${images[activeImg]})`, backgroundSize: '300%', backgroundPosition: `${zoom.x}% ${zoom.y}%`, backgroundRepeat: 'no-repeat' }} />
            )}
          </div>
        </div>

        {/* RIGHT — Info */}
        <div style={{ zIndex: 1 }}>
          {/* Category */}
          <div style={{ fontSize: '0.65rem', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.2rem' }}>{product.cat}</div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.25rem' }}>
            <div style={{ background: 'rgba(184,134,11,0.1)', border: '1px solid rgba(184,134,11,0.25)', borderRadius: '6px', padding: '2px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icons.Star size={12} color="var(--gold)" filled={true} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'Syne' }}>{product.rating || '4.5'}</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>({product.reviews || '0'} reviews)</span>
          </div>

          {/* Name */}
          <h1 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 'clamp(1.1rem, 3vw, 2rem)', marginBottom: '0.2rem' }}>{product.name}</h1>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', color: '#1A1A1A' }}>₹{product.price}</span>
            {product.old && (
              <span style={{ color: 'var(--muted)', position: 'relative', display: 'inline-block' }}>
                ₹{product.old}
                <span style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1.5px', background: 'var(--muted)', transform: 'translateY(-50%)' }} />
              </span>
            )}
            {disc > 0 && <span style={{ padding: '4px 12px', borderRadius: 999, background: '#c52222', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>{disc}% OFF</span>}
          </div>

          {/* Buy buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
            {product.meesho && (
              <button onClick={e => { e.stopPropagation(); e.preventDefault(); window.open(product.meesho, '_blank', 'noopener,noreferrer'); }} className="shimmer-btn" style={buyButtonStyle('meesho')}>
                <Icons.ShoppingBag size={20} /> Buy Normal
              </button>
            )}
            {product.amazon && (
              <button onClick={e => { e.stopPropagation(); e.preventDefault(); window.open(product.amazon, '_blank', 'noopener,noreferrer'); }} className="shimmer-btn" style={buyButtonStyle('amazon')}>
                <Icons.Bolt size={20} /> Buy Express
              </button>
            )}
          </div>

          {/* Trust badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '0.85rem 0', borderTop: '1px solid rgba(180,150,80,0.1)', borderBottom: '1px solid rgba(180,150,80,0.1)', marginBottom: '0.75rem' }}>
            {[{ Icon: Icons.Package, text: '10 Day Replacement' }, { Icon: Icons.Truck, text: 'Free Delivery' }, { Icon: Icons.Shield, text: 'Warranty Policy' }, { Icon: Icons.Lock, text: 'Secure Transaction' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px' }}>
                <item.Icon size={18} color="var(--gold)" />
                <span style={{ fontSize: '0.58rem', fontWeight: 600, color: 'var(--muted)' }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          {product.desc && (
            <div onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(180,150,80,0.2)'; e.currentTarget.style.borderColor = 'rgba(184,134,11,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(180,150,80,0.08)'; e.currentTarget.style.borderColor = 'rgba(184,134,11,0.15)'; }}
              style={{ padding: '0.75rem 1rem', borderRadius: 12, background: '#fff', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.8, boxShadow: '0 4px 12px rgba(180,150,80,0.08)', border: '1px solid rgba(184,134,11,0.15)', transition: 'all 0.3s ease', cursor: 'default' }}>
              {product.desc}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <RelatedCarousel products={products} currentId={productId} category={product.cat} />
      </div>
    </div>
  );
}
