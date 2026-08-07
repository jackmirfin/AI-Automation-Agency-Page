import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AuditButton from './AuditButton';
import { useTypewriter } from '../hooks/useTypewriter';

interface HeroProps {
  onOpenAudit: () => void;
}

const HEADLINE_LINE_2 = 'Replaced by autonomous AI pipelines that run in 12 seconds.';

export default function Hero({ onOpenAudit }: HeroProps) {
  const { displayed, done } = useTypewriter(HEADLINE_LINE_2, 35, 600);

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
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="block"
            >
              Manual operations are costing you 3.5 hours per lead.
            </motion.span>
            <span className="block text-indigo-400 mt-1">
              {displayed}
              {!done && (
                <span className="inline-block w-[3px] h-[0.8em] bg-indigo-400 ml-1 align-middle animate-pulse" />
              )}
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            We replace manual workflows with custom AI agents that cut operational overhead by 60%.
          </motion.p>

          {/* CTA Group — gated behind typewriter completion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={done ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <AuditButton onOpen={onOpenAudit} className="px-6 py-3 text-base" icon>
              Request Your Roadmap
            </AuditButton>
            <a
              href="#architecture"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/40 px-6 py-3 text-base font-medium text-slate-200 backdrop-blur-sm transition-all hover:border-slate-500 hover:text-white"
            >
              Explore Architecture
              <ChevronDown className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Value prop strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={done ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex items-center justify-center gap-3 sm:gap-6"
          >
            <ValueProp text="No-code required" />
            <Divider />
            <ValueProp text="Deployed in 4 weeks" />
            <Divider />
            <ValueProp text="SLA-backed uptime" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ValueProp({ text }: { text: string }) {
  return (
    <span className="font-mono text-xs text-slate-500">{text}</span>
  );
}

function Divider() {
  return <span className="text-slate-700">/</span>;
}
