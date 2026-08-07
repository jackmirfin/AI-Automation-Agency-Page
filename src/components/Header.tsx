import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import AuditButton from './AuditButton';

interface HeaderProps {
  onOpenAudit: () => void;
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Process', href: '#process' },
];

export default function Header({ onOpenAudit }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-800 bg-slate-950/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
            <Zap className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-tight text-white">AAA</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-wider text-slate-500 sm:inline">
              Automation Infrastructure
            </span>
          </div>
          <div className="ml-2 hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-0.5 sm:flex">
            <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] text-emerald-400">Systems Operational</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <AuditButton onOpen={onOpenAudit} className="hidden sm:inline-flex">
            Request Roadmap
          </AuditButton>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-slate-800 bg-slate-950/95 backdrop-blur-md md:hidden"
        >
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <AuditButton
              onOpen={() => {
                setMobileOpen(false);
                onOpenAudit();
              }}
              className="mt-2"
            >
              Request Roadmap
            </AuditButton>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
