import React, { useState } from 'react';
import { Icons } from './Icons';
import useIsMobile from './useIsMobile';
import SEO from './SEO';

export default function ContactPage() {
  const isMobile = useIsMobile(640);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.message) return;
    setSending(true);
    // Build mailto link
    const subject = encodeURIComponent(form.subject || 'Enquiry from GLCW Website');
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ''}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:guptalasercuttingworks@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => { setSending(false); setSubmitted(true); }, 1000);
  };

  const INPUT = {
    width: '100%', padding: '0.85rem 1rem', borderRadius: 12,
    border: '1px solid rgba(180,150,80,0.2)',
    background: '#fff', color: 'var(--text)',
    fontSize: '0.9rem', fontFamily: 'inherit',
    outline: 'none', transition: 'border 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <SEO
        title="Contact Us"
        description="Get in touch with Gupta Laser Cutting Works. Send us an enquiry about products, orders, or custom laser-cutting requests."
      />

      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(245,240,232,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(180,150,80,0.15)',
        padding: '0.75rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={() => window.history.back()} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600,
        }}>
          <Icons.ArrowLeft size={16} color="var(--gold)" /> Back
        </button>
        <div onClick={() => window.location.href = '/'} style={{
          fontFamily: 'Syne', fontWeight: 800, fontSize: '1.1rem',
          background: 'linear-gradient(120deg, #8B6000, #b8860b)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          cursor: 'pointer',
        }}>GLCW</div>
        <div style={{ width: 60 }} />
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>Get in Touch</div>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Have a question or want a custom order? We'd love to hear from you. Reach out via email or Instagram.
          </p>
        </div>

        {(() => {
          const emailCard = (
            <a key="email" href="mailto:guptalasercuttingworks@gmail.com" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '1.5rem', borderRadius: 16,
                background: '#fff', border: '1px solid rgba(180,150,80,0.15)',
                boxShadow: '0 4px 16px rgba(180,150,80,0.08)',
                display: 'flex', alignItems: 'center', gap: '1rem',
                transition: 'all 0.2s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(180,150,80,0.15)'; e.currentTarget.style.borderColor = 'rgba(184,134,11,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(180,150,80,0.08)'; e.currentTarget.style.borderColor = 'rgba(180,150,80,0.15)'; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(184,134,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icons.Mail size={22} color="var(--gold)" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Email Us</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)' }}>guptalasercuttingworks@gmail.com</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>We reply within 24 hours</div>
                </div>
              </div>
            </a>
          );

          const instagramCard = (
            <a key="instagram" href="https://www.instagram.com/glcw.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '1.5rem', borderRadius: 16,
                background: '#fff', border: '1px solid rgba(180,150,80,0.15)',
                boxShadow: '0 4px 16px rgba(180,150,80,0.08)',
                display: 'flex', alignItems: 'center', gap: '1rem',
                transition: 'all 0.2s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(180,150,80,0.15)'; e.currentTarget.style.borderColor = 'rgba(184,134,11,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(180,150,80,0.08)'; e.currentTarget.style.borderColor = 'rgba(180,150,80,0.15)'; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, rgba(255,100,100,0.1), rgba(200,50,200,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icons.Instagram size={22} color="#e1306c" />
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Instagram</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)' }}>@glcw.in</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>Follow us for new products</div>
                </div>
              </div>
            </a>
          );

          const businessCard = (
            <div key="business" style={{
              padding: '1.5rem', borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(184,134,11,0.06), rgba(184,134,11,0.02))',
              border: '1px solid rgba(184,134,11,0.15)',
            }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>Business Info</div>
              {[
                { label: 'Business', value: 'Gupta Laser Cutting Works' },
                { label: 'Products', value: 'Mouse Pads · LED · Home Decor' },
                { label: 'Response', value: 'Within 24 hours' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--muted)', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ color: 'var(--text)', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{item.value}</span>
                </div>
              ))}
            </div>
          );

          const contactForm = (
            <div key="form" style={{
              padding: '2rem', borderRadius: 20,
              background: '#fff', border: '1px solid rgba(180,150,80,0.15)',
              boxShadow: '0 4px 24px rgba(180,150,80,0.08)',
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <Icons.Check size={28} color="#22c55e" />
                  </div>
                  <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)', marginBottom: '0.5rem' }}>Message Sent!</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>Your email client should have opened. We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }} style={{ padding: '0.6rem 1.5rem', borderRadius: 10, background: 'rgba(184,134,11,0.1)', border: '1px solid rgba(184,134,11,0.3)', color: 'var(--gold)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)', marginBottom: '1.5rem' }}>Send a Message</h2>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 6 }}>Your Name *</label>
                    <input style={INPUT} value={form.name}
                      onChange={e => set('name', e.target.value)}
                      onFocus={e => e.target.style.borderColor = 'rgba(184,134,11,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(180,150,80,0.2)'} />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 6 }}>Your Email *</label>
                    <input style={INPUT} type="email" value={form.email}
                      onChange={e => set('email', e.target.value)}
                      onFocus={e => e.target.style.borderColor = 'rgba(184,134,11,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(180,150,80,0.2)'} />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 6 }}>Contact Number *</label>
                    <input style={INPUT} type="tel" value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      onFocus={e => e.target.style.borderColor = 'rgba(184,134,11,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(180,150,80,0.2)'} />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 6 }}>Subject</label>
                    <input style={INPUT} value={form.subject}
                      onChange={e => set('subject', e.target.value)}
                      onFocus={e => e.target.style.borderColor = 'rgba(184,134,11,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(180,150,80,0.2)'} />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 6 }}>Message *</label>
                    <textarea style={{ ...INPUT, height: 120, resize: 'vertical' }}
                      value={form.message}
                      onChange={e => set('message', e.target.value)}
                      onFocus={e => e.target.style.borderColor = 'rgba(184,134,11,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(180,150,80,0.2)'} />
                  </div>

                  <button onClick={handleSubmit} disabled={!form.name 
                  || !form.email || !form.phone || !form.message} style={{
                    width: '100%', padding: '0.9rem', borderRadius: 12,
                    background: (!form.name || !form.email || !form.phone || !form.message) ? 'rgba(180,150,80,0.1)' : 'linear-gradient(135deg, #b8860b, #daa532)',
                    border: 'none', color: (!form.name || !form.email || !form.phone || !form.message) ? 'var(--muted)' : '#fff',
                    fontSize: '0.95rem', fontWeight: 700, cursor: (!form.name || !form.email || !form.phone || !form.message) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}>
                    <Icons.Mail size={18} color={(!form.name || !form.email || !form.phone || !form.message) ? 'var(--muted)' : '#fff'} />
                    {sending ? 'Opening Email...' : 'Send Message'}
                  </button>

                  <p style={{ fontSize: '0.7rem', color: 'var(--muted)', textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.5 }}>
                    This will open your email client with the message pre-filled.
                  </p>
                </>
              )}
            </div>
          );

          if (isMobile) {
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {emailCard}
                {instagramCard}
                {contactForm}
                {businessCard}
              </div>
            );
          }

          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {emailCard}
                {instagramCard}
                {businessCard}
              </div>
              {contactForm}
            </div>
          );
        })()}
      </div>
    </div>
  );
}