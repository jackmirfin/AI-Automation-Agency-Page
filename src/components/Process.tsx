import { motion } from 'framer-motion';
import { Search, Wrench, Rocket, ShieldCheck } from 'lucide-react';
import { SectionLabel } from './Services';

const phases = [
  {
    icon: Search,
    phase: 'Phase 01',
    title: 'Audit & Blueprint',
    timeframe: 'Week 1',
    description:
      'Operational process mapping, API vulnerability analysis, and ROI matrix generation.',
    tasks: ['Process mapping', 'API audit', 'ROI matrix'],
  },
  {
    icon: Wrench,
    phase: 'Phase 02',
    title: 'Staging & Architecture',
    timeframe: 'Weeks 2–3',
    description:
      'Pipeline configuration, vector indexing, custom prompt engineering, and sandbox environment builds.',
    tasks: ['Pipeline config', 'Vector indexing', 'Sandbox build'],
  },
  {
    icon: Rocket,
    phase: 'Phase 03',
    title: 'Live Integration',
    timeframe: 'Week 4',
    description:
      'Production deployment, fail-safe setup, rate-limit optimization, and operational testing.',
    tasks: ['Production deploy', 'Fail-safe setup', 'Operational testing'],
  },
  {
    icon: ShieldCheck,
    phase: 'Phase 04',
    title: 'Maintenance & SLA',
    timeframe: 'Ongoing',
    description:
      'Active log monitoring, model drift evaluation, continuous performance optimization, and custom uptime SLAs.',
    tasks: ['Log monitoring', 'Model drift eval', 'Uptime SLA'],
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>Implementation Lifecycle</SectionLabel>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Structured deployment with engineering rigor
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Every engagement follows a deterministic four-phase lifecycle from initial audit
          through ongoing SLA coverage.
        </p>

        <div className="mt-14 relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-slate-800 to-transparent sm:left-6" />

          <div className="space-y-8">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative flex gap-6 pl-0 sm:pl-4"
                >
                  {/* Node */}
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 sm:h-12 sm:w-12">
                    <div className="flex h-full w-full items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-indigo-400">
                        {phase.phase}
                      </span>
                      <span className="rounded-md border border-slate-800 bg-slate-800/50 px-2 py-0.5 font-mono text-[11px] text-slate-400">
                        {phase.timeframe}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white">{phase.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {phase.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {phase.tasks.map((task) => (
                        <span
                          key={task}
                          className="rounded-md border border-slate-800 bg-slate-800/30 px-2.5 py-1 font-mono text-[11px] text-slate-400"
                        >
                          {task}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
