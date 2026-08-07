import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import AuditButton from './AuditButton';

interface HeroProps {
  onOpenAudit: () => void;
}

export default function Hero({ onOpenAudit }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 radial-glow" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="font-mono text-xs text-slate-400 tracking-wider">
              [ ENTERPRISE AI INFRASTRUCTURE ]
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Eliminate operational bottlenecks with{' '}
            <span className="text-indigo-400">custom AI workflows</span> and autonomous agents.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            We design, deploy, and maintain custom automation systems that reduce manual labor
            overhead by 40–70% for growth-stage service enterprises.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <AuditButton onOpen={onOpenAudit} className="px-6 py-3 text-base" icon>
              Schedule an Automation Audit
            </AuditButton>
            <a
              href="#architecture"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/40 px-6 py-3 text-base font-medium text-slate-200 backdrop-blur-sm transition-all hover:border-slate-500 hover:text-white"
            >
              Explore Architecture
              <ChevronDown className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800"
          >
            <StatCell value="40–70%" label="Manual overhead reduction" />
            <StatCell value="< 12s" label="Automated pipeline execution" />
            <StatCell value="24/7" label="Autonomous agent uptime" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-slate-950/60 px-4 py-6 text-center">
      <p className="font-mono text-2xl font-semibold text-white sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{label}</p>
    </div>
  );
}
