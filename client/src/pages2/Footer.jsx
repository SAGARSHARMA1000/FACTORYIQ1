import React, { useState } from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';


export default function Footer({ onSubscribe }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const contentLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'FAQ', href: '#faq' },
  ];

  const socialLinks = [
    { label: 'TWITTER/X', href: 'https://x.com' },
    { label: 'INSTAGRAM', href: 'https://instagram.com' },
    { label: 'YOUTUBE', href: 'https://youtube.com' },
    { label: 'DISCORD', href: 'https://discord.com' },
  ];

  const bottomLinks = [
    { label: 'PRIVACY', href: '#privacy' },
    { label: 'TERMS & CONDITIONS', href: '#terms' },
    { label: 'FACTORYIQ.COM', href: 'https://factoryiq.com' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setStatus('error');
      setMessage('PLEASE ENTER YOUR EMAIL ADDRESS');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setStatus('error');
      setMessage('PLEASE ENTER A VALID EMAIL FORMAT');
      return;
    }

    setStatus('loading');
    setMessage('');

    // Simulate API call or trigger optional callback
    setTimeout(() => {
      if (onSubscribe) {
        onSubscribe(trimmed);
      }
      setStatus('success');
      setMessage('CONFIRMED. YOU ARE NOW ON THE FACTORYIQ PRIORITY LIST.');
      setEmail('');
    }, 600);
  };

  const handleReset = () => {
    setStatus('idle');
    setMessage('');
    setEmail('');
  };

  return (
    <footer
      className="w-full bg-[#FAFAF7] text-black select-none border-t border-black/40 pt-6 pb-8 px-6 sm:px-10 md:px-14 lg:px-20 transition-colors"
      style={{
        backgroundColor: '#FAFAF7',
        color: '#000000',
        fontFamily: "'Space Mono', 'Geist Mono', monospace",
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Top Blueprint Framing Line with Architectural Offset */}
        <div className="w-full mb-12 sm:mb-16">
          <div className="flex items-center">
            <div className="h-[1.5px] bg-black flex-1 max-w-[80%]" />
          </div>
        </div>

        {/* Main Content Grid: Top Section (Logo + Heading) & Bottom Section (Links + Newsletter) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-y-16 lg:gap-x-12">
          {/* Top Left: Logo & Subtitle */}
          {/* <div className="lg:col-span-6 flex flex-col justify-start">
            <a
              href="#home"
              className="inline-block transition-transform duration-300 hover:opacity-85 focus:outline-none"
              title="FACTORYIQ Home"
            >
              <DeloreanLogo />
              FACTORYIQ
            </a>
            <p
              className="mt-3.5 text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-black uppercase"
              style={{ letterSpacing: '0.22em' }}
            >
              RESERVATION SYSTEM &amp; MARKETPLACE
            </p>
          </div> */}
          
{/* Footer Brand — FactoryIQ */}
<div className="lg:col-span-6 flex flex-col items-start">

  <a
    href="#home"
    aria-label="FactoryIQ home"
    className="group inline-flex items-center gap-3 rounded-lg
               focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-teal/70"
  >
    {/* Brand icon */}
    <span
      className="relative flex h-11 w-11 items-center justify-center
                 overflow-hidden rounded-xl border border-teal/25
                 bg-teal/10 transition-all duration-300
                 group-hover:border-teal/60 group-hover:bg-teal/15
                 group-hover:shadow-[0_0_24px_rgba(40,220,200,0.12)]"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="h-7 w-7 transition-transform duration-300
                   group-hover:scale-110"
        aria-hidden="true"
      >
        <path
          d="M7 30V11L16 18V11L25 18V11L33 17V30H7Z"
          stroke="#19CDB8"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M13 25H17M22 25H26"
          stroke="#19CDB8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="30" cy="9" r="3" fill="#19CDB8" />
      </svg>
    </span>

    {/* Wordmark */}
    <span className="text-xl sm:text-2xl font-semibold
                     tracking-[-0.06em] text-black">
      FACTORY<span className="text-teal">IQ</span>
      <span className="ml-1.5 inline-block h-1.5 w-1.5
                       rounded-full bg-teal align-baseline" />
    </span>
  </a>

  {/* Brand descriptor */}
  <div className="mt-5 flex items-center gap-2">
    <span className="h-px w-6 bg-teal" />
    <p className="text-[10px] sm:text-[11px] font-semibold
                  uppercase tracking-[0.2em] text-black/60">
      Industrial Knowledge Intelligence
    </p>
  </div>

</div>

          {/* Top Right: Large Headline */}
          <div className="lg:col-span-6 flex flex-col justify-start lg:pl-6 xl:pl-10">
            <h2
              className="text-[#0e0f0f] font-bold uppercase leading-[1.08] tracking-[0.02em] text-[26px] sm:text-[34px] md:text-[38px] lg:text-[42px]"
              style={{
                fontFamily: "'Chakra Petch', 'Space Grotesk', sans-serif",
                lineHeight: 1.08,
                letterSpacing: '0.02em',
              }}
            >
              SUBSCRIBE TO GET THE
              <br />
              LATEST FACTORYIQ
              <br />
              UPDATES.
            </h2>
          </div>

          {/* Lower Left: CONTENT & SOCIAL Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8 sm:gap-14 pt-4 lg:pt-8">
            {/* Column 1: CONTENT */}
            <div className="min-w-[140px] max-w-[240px]">
              <h3
                className="text-[#19CDB8] font-bold text-[11px] tracking-[0.2em] uppercase mb-2"
                style={{ letterSpacing: '0.2em' }}
              >
                CONTENT
              </h3>
              <ul className="space-y-0">
                {contentLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group flex items-center justify-between py-2.5 border-b border-black text-[#9CAAB3] text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-200 hover:pl-1 hover:text-black/70 focus:outline-none"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: SOCIAL */}
            <div className="min-w-[140px] max-w-[240px]">
              <h3
                className="text-[#19CDB8] font-bold text-[11px] tracking-[0.2em] uppercase mb-2"
                style={{ letterSpacing: '0.2em' }}
              >
                SOCIAL
              </h3>
              <ul className="space-y-0">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-2.5 border-b border-black text-[#9CAAB3] text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-200 hover:pl-1 hover:text-[#19CDB8] focus:outline-none"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lower Right: NEWSLETTER Box */}
          <div className="lg:col-span-6 flex flex-col justify-start lg:pl-6 xl:pl-10 pt-4 lg:pt-8">
            <h3
              className="text-black font-bold text-[11px] tracking-[0.2em] uppercase mb-3"
              style={{ letterSpacing: '0.2em' }}
            >
              CONTACT &amp; NEWSLETTER
            </h3>

            {/* Subscription Form */}
            {status !== 'success' ? (
              <form
                onSubmit={handleSubscribe}
                className="w-full max-w-[460px]"
                noValidate
              >
                <div className="flex items-stretch bg-[#b0b7bd] border border-black h-[52px] sm:h-[56px] shadow-sm focus-within:ring-2 focus-within:ring-black">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="VIRATKOHLI@GMAIL.COM"
                    aria-label="Email address for DeLorean newsletter"
                    className="flex-1 bg-[#b0b7bd] text-white px-4 sm:px-5 text-xs sm:text-[13px] tracking-[0.12em] placeholder:text-[#525960] focus:outline-none uppercase font-mono"
                    style={{ letterSpacing: '0.12em' }}
                    disabled={status === 'loading'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    aria-label="Subscribe to updates"
                    className="w-[52px] sm:w-[56px] bg-[#b0b7bd] border-l border-black flex items-center justify-center text-black hover:bg-white active:scale-95 transition-all duration-200 group cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-black transition-transform duration-200 group-hover:translate-x-1" />
                    )}
                  </button>
                </div>

                {/* Inline error feedback */}
                {status === 'error' && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold text-black tracking-wider uppercase animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{message}</span>
                  </div>
                )}
              </form>
            ) : (
              /* Success State */
              <div className="w-full max-w-[460px] bg-black text-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-black animate-fade-in">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b0b7bd] flex-shrink-0" />
                  <p className="text-[11px] tracking-wider uppercase font-mono text-[#b0b7bd]">
                    {message}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] uppercase font-mono text-white underline hover:text-[#b0b7bd] transition-colors self-end sm:self-auto"
                >
                  RESET
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Full-width Divider */}
        <div className="mt-16 sm:mt-20 pt-5 border-t border-black">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 text-[10px] sm:text-[11px] tracking-[0.1em] font-medium text-black uppercase">
            {/* Copyright */}
            <div className="flex-shrink-0">
              <p>© 2026 FACTORYIQ</p>
            </div>

            {/* Center Policy Links */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 md:gap-10">
              {bottomLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:opacity-60 transition-opacity focus:outline-none"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Credits */}
            <div className="flex-shrink-0 self-start md:self-auto">
              <a
                href="https://linkedin.com/in/sagar-sharma-751943336"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity focus:outline-none"
              >
                DESIGNED AND ENGINEERED BY SAGAR SHARMA
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
