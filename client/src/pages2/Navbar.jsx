import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Menu, X } from 'lucide-react';

/**
 * FactoryIQ Brand Logo
 * Styled with the wide, brutalist industrial aesthetic of the cockpit theme.
 */
function FactoryIqLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* Active telemetry indicator dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c9a7] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c9a7]" />
      </span>
      <span
        className="font-bold tracking-[0.24em] text-white uppercase text-base sm:text-lg md:text-[21px] leading-none select-none"
        style={{
          fontFamily: "'Chakra Petch', 'Space Grotesk', sans-serif",
          letterSpacing: '0.22em',
        }}
      >
        FACTORY<span className="text-[#00c9a7]">IQ</span>
      </span>
    </div>
  );
}

const NAV_LINKS = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'features', label: 'FEATURES', href: '#features' },
  { id: 'how-it-works', label: 'HOW IT WORKS', href: '#how-it-works' },
  { id: 'use-cases', label: 'USE CASES', href: '#use-cases' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('features');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ['home', 'features', 'how-it-works', 'use-cases', 'contact'];

    function handleScroll() {
      setScrolled(window.scrollY > 20);

      // Scroll spy: automatically detect and update active tab
      const scrollPos = window.scrollY + 220;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(id);
            break;
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 md:px-8 transition-all duration-300 pointer-events-none">
      <div
        className={`max-w-[1360px] mx-auto pointer-events-auto rounded-xl sm:rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'bg-[#090b0e]/92 backdrop-blur-xl border-white/25 shadow-2xl shadow-black/80 py-2.5 sm:py-3 px-4 sm:px-7'
            : 'bg-[#0c0e12]/78 backdrop-blur-md border-white/20 py-3 sm:py-3.5 px-4 sm:px-7'
        }`}
        style={{
          fontFamily: "'Space Mono', 'Geist Mono', monospace",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left: FactoryIQ Brand & Subtitle */}
          <div className="flex flex-col justify-center">
            <Link
              to="/"
              className="inline-block transition-opacity hover:opacity-85 focus:outline-none"
              title="FactoryIQ Home"
            >
              <FactoryIqLogo />
            </Link>
            <span
              className="mt-1 text-[8.5px] sm:text-[9.5px] font-medium tracking-[0.22em] text-zinc-500 uppercase select-none"
              style={{ letterSpacing: '0.22em' }}
            >
              INDUSTRIAL KNOWLEDGE INTELLIGENCE
            </span>
          </div>

          {/* Right Desktop: 2-Tier Navigation Structure */}
          <div className="hidden md:flex flex-col items-end gap-1">
            {/* Top Row: Utility links (LOG IN / REGISTER or USER / LOGOUT) */}
            <div className="flex items-center gap-6 text-[10px] sm:text-[10.5px] font-mono tracking-[0.16em] uppercase text-zinc-300 select-none">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="hover:text-white transition-colors cursor-pointer text-[#00c9a7]"
                  >
                    {user.name || user.email || 'DASHBOARD'}
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="hover:text-white transition-colors cursor-pointer text-zinc-400"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/demo-login"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    LOG IN
                  </Link>
                  <Link
                    to="/demo-login"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    REGISTER
                  </Link>
                </>
              )}
            </div>

            {/* Bottom Row: Main Navigation Links + Joined Action Button Block */}
            <div className="flex items-center gap-5 lg:gap-7 pt-0.5">
              {NAV_LINKS.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setActiveTab(link.id)}
                    className={`relative font-mono text-[11px] sm:text-[11.5px] font-bold tracking-[0.14em] uppercase transition-colors select-none ${
                      isActive ? 'text-zinc-200' : 'text-zinc-500 hover:text-white'
                    }`}
                    style={{ letterSpacing: '0.14em' }}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#28DCC8]" />
                    )}
                  </a>
                );
              })}

              {/* Joined Dual-Button Block: [ DEMO LOGIN | GET STARTED ] */}
              <div className="flex items-center ml-2 border border-black/50 overflow-hidden select-none">
                <Link
                  to={user ? '/dashboard' : '/demo-login'}
                  className="bg-black hover:bg-zinc-900 text-white font-mono text-[10.5px] sm:text-[11px] font-bold tracking-wider px-3.5 py-1.5 uppercase transition-colors"
                >
                  {user ? 'DASHBOARD' : 'DEMO LOGIN'}
                </Link>
                <Link
                  to="/app"
                  className="bg-[#19CDB8] hover:bg-[#45E6D4] text-black font-mono text-[10.5px] sm:text-[11px] font-bold tracking-wider px-3.5 py-1.5 uppercase transition-colors active:scale-95"
                >
                  GET STARTED
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Right: Compact CTA & Hamburger Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/app"
              className="bg-[#19CDB8] text-black font-mono text-[10px] font-bold tracking-wider px-2.5 py-1 uppercase"
            >
              GET STARTED
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/15 flex flex-col gap-3 animate-fade-in">
            {/* Nav section links */}
            <div className="grid grid-cols-2 gap-2 py-1 text-xs font-mono font-bold tracking-wider border-b border-white/10 pb-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1 uppercase ${
                    activeTab === link.id ? 'text-[#28DCC8]' : 'text-zinc-300'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Auth / Action links */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider px-1 text-zinc-300">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-white uppercase text-[#28DCC8]"
                  >
                    DASHBOARD
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="hover:text-white uppercase text-zinc-400"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/demo-login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-white uppercase"
                  >
                    LOG IN
                  </Link>
                  <Link
                    to="/demo-login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-white uppercase"
                  >
                    REGISTER
                  </Link>
                </>
              )}
              <Link
                to={user ? '/dashboard' : '/demo-login'}
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#19CDB8] text-black px-2.5 py-1 text-[10px] uppercase font-bold"
              >
                DEMO LOGIN
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
