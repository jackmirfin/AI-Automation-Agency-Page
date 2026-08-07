import { Zap, ArrowRight } from 'lucide-react';
import AuditButton from './AuditButton';

interface FooterProps {
  onOpenAudit: () => void;
}

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Process', href: '#process' },
];

export default function Footer({ onOpenAudit }: FooterProps) {
  return (
    <footer className="relative border-t border-slate-800 bg-slate-950">
      {/* Final CTA */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center sm:p-12">
          <div className="absolute inset-0 radial-glow opacity-50" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to map your automation pipeline?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Schedule an automation audit to receive a full operational blueprint, ROI matrix,
              and integration roadmap for your infrastructure.
            </p>
            <div className="mt-8 flex justify-center">
              <AuditButton onOpen={onOpenAudit} icon className="px-6 py-3 text-base">
                Schedule Audit
              </AuditButton>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-slate-800/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
              <Zap className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            <span className="text-sm font-semibold text-white">AAA</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
              Automation Infrastructure
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Status */}
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1">
            <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] text-emerald-400">Systems Operational</span>
          </div>
        </div>

        <div className="border-t border-slate-800/50">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
            <p className="font-mono text-xs text-slate-600">
              © {new Date().getFullYear()} AAA. All systems maintained under active SLA.
            </p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-slate-600">v2.4.1</span>
              <span className="font-mono text-xs text-slate-600">build: deterministic</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
