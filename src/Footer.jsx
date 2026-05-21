import React from 'react';
import { Icons } from './Icons';
import useIsMobile from './useIsMobile';

const SOCIAL_LINKS = [
  { Icon: Icons.Instagram, href: 'https://www.instagram.com/glcw.in', label: 'Instagram' },
  { Icon: Icons.Zap, href: null, label: 'Meesho' },
  { Icon: Icons.Mail, href: 'mailto:guptalasercuttingworks@gmail.com', label: 'Email' },
];

const QUICK_LINKS = [
  { label: 'Home Decor', cat: 'home' },
  { label: 'LED Products', cat: 'led' },
  { label: 'Mouse Pads', cat: 'mousepads' },
];

const CONTACT_INFO = [
  // { Icon: Icons.Phone, text: '+91 98765 43210', sub: 'Direct contact' },
  { Icon: Icons.Instagram, text: '@glcw.in', sub: 'Follow our reels', href: 'https://www.instagram.com/glcw.in' },
  // { Icon: Icons.User, text: 'Seller Profile', sub: 'View catalogue' },
  { Icon: Icons.Mail, text: 'Custom Orders (Coming Soon) ', sub: 'Product options', href: null },
];

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer style={{
      background: 'rgba(245,240,232,0.98)',
      borderTop: '1px solid rgba(180,150,80,0.15)',
      padding: isMobile ? '2rem 1rem 1rem' : '3rem 2.5rem 1.5rem',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: isMobile ? '1.5rem' : '2.5rem',
        marginBottom: isMobile ? '1.5rem' : '2.5rem',
      }}>
        {/* Brand */}
        <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
          <div onClick={() => window.location.href = '/'} style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: isMobile ? '1.3rem' : '1.6rem', color: '#b98a22', marginBottom: 6, cursor: 'pointer' }}>GLCW</div>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: 220 }}>Gupta Laser Cutting Works</p>
          <div style={{ display: 'flex', gap: 8, marginTop: '0.75rem' }}>
            {SOCIAL_LINKS.map(({ Icon, href, label }) => {
              const Component = href ? 'a' : 'div';
              return (
                <Component key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: href ? 'pointer' : 'default', transition: 'all 0.2s', textDecoration: 'none',
                  }}
                  onMouseEnter={e => { if (href) { e.currentTarget.style.background = 'rgba(184,134,11,0.18)'; } }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(184,134,11,0.08)'; }}
                ><Icon size={13} color="#7a5200" /></Component>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#7a5200', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>Quick Links</div>
          {QUICK_LINKS.map(({ label, cat }) => (
            <div key={label} style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.4rem', cursor: 'pointer', transition: 'color 0.2s' }}
              onClick={() => {
                window.dispatchEvent(new CustomEvent('setFilter', { detail: cat }));
                setTimeout(() => {
                  document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 500);
              }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{label}</div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#7a5200', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>Contact</div>
          {CONTACT_INFO.map(c => (
            <div key={c.text} onClick={() => c.href && window.open(c.href, '_blank')} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: '0.6rem', cursor: c.href ? 'pointer' : 'default' }}>
              <c.Icon size={14} color="#7a5200" style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontSize: '0.78rem', color: c.href ? 'var(--gold)' : 'var(--text)', fontWeight: 500 }}>{c.text}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(180,150,80,0.15)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.68rem', color: '#8B6000' }}>© 2026 GLCW · All product links go to official stores</span>
        {!isMobile && <span style={{ fontSize: '0.68rem', color: '#8B6000' }}>No price manipulation · Affiliate links may apply</span>}
      </div>
    </footer>
  );
}
