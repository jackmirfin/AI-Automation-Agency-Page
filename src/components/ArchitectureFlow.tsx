import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  UserPlus,
  Brain,
  Database,
  Bell,
  FileText,
  Clock,
  ArrowRight,
  Users,
  ClipboardList,
  Mail,
  Repeat,
} from 'lucide-react';
import { SectionLabel } from './Services';

type Mode = 'manual' | 'automated';

const manualNodes = [
  { icon: UserPlus, label: 'Inbound Lead', detail: 'Form submission received', time: '5 min' },
  { icon: Users, label: 'Manual Review', detail: 'Sales rep screens the lead', time: '45 min' },
  { icon: ClipboardList, label: 'Data Entry', detail: 'CRM fields populated by hand', time: '20 min' },
  { icon: Mail, label: 'Email Draft', detail: 'Rep writes personalized follow-up', time: '40 min' },
  { icon: Bell, label: 'Team Notification', detail: 'Slack message posted manually', time: '10 min' },
  { icon: FileText, label: 'Proposal Initiated', detail: 'Rep starts proposal document', time: '30 min' },
];

const automatedNodes = [
  { icon: UserPlus, label: 'Inbound Lead', detail: 'Form submission received', time: '1.2s' },
  { icon: Brain, label: 'LLM Evaluation & Qualification', detail: 'Agent scores intent & fit', time: '3.1s' },
  { icon: Database, label: 'CRM Sync', detail: 'Fields auto-populated via API', time: '0.8s' },
  { icon: Bell, label: 'Slack Alert & Proposal Drafted', detail: 'Instant notification + doc generated', time: '2.4s' },
];

export default function ArchitectureFlow() {
  const [mode, setMode] = useState<Mode>('automated');

  const nodes = mode === 'manual' ? manualNodes : automatedNodes;
  const totalTime = mode === 'manual' ? '3.5 Hours' : '< 12 Seconds';

  return (
    <section id="architecture" className="relative py-24">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>Architecture</SectionLabel>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          From 3.5 hours to 12 seconds
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Toggle to compare a legacy manual process against the automated AI pipeline.
          The automated view shows the system your deployment ships with.
        </p>

        {/* Toggle */}
        <div className="mt-8 inline-flex items-center rounded-xl border border-slate-800 bg-slate-900/60 p-1">
          <ToggleBtn active={mode === 'manual'} onClick={() => setMode('manual')}>
            Manual Process
          </ToggleBtn>
          <ToggleBtn active={mode === 'automated'} onClick={() => setMode('automated')}>
            Automated AI Pipeline
          </ToggleBtn>
        </div>

        {/* Flow Diagram */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Nodes */}
              <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
                {nodes.map((node, i) => {
                  const Icon = node.icon;
                  const isLast = i === nodes.length - 1;
                  return (
                    <div key={`${mode}-${node.label}`} className="flex flex-1 items-center gap-3 lg:flex-col lg:items-stretch lg:gap-0">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        className={`flex flex-1 flex-col gap-3 rounded-xl border p-4 ${
                          mode === 'automated'
                            ? 'border-indigo-500/20 bg-indigo-500/5'
                            : 'border-slate-800 bg-slate-800/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                              mode === 'automated'
                                ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
                                : 'border-slate-700 bg-slate-800/50 text-slate-400'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-mono text-[11px] text-slate-500">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{node.label}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{node.detail}</p>
                        </div>
                        <div className="flex items-center gap-1.5 border-t border-slate-800/50 pt-2.5">
                          <Clock className="h-3 w-3 text-slate-600" />
                          <span
                            className={`font-mono text-xs ${mode === 'automated' ? 'text-emerald-400' : 'text-slate-400'}`}
                          >
                            {node.time}
                          </span>
                        </div>
                      </motion.div>

                      {/* Connector with animated data pulse */}
                      {!isLast && (
                        <div className="relative flex items-center justify-center lg:py-2">
                          {/* Static arrow (mobile + manual) */}
                          <ArrowRight className="h-4 w-4 text-slate-700 lg:hidden" />
                          {mode === 'manual' ? (
                            <Repeat className="hidden h-4 w-4 text-slate-700 lg:block" />
                          ) : (
                            <div className="relative hidden lg:block">
                              {/* Track line */}
                              <div className="h-px w-8 bg-slate-800" />
                              {/* Animated pulse dot */}
                              <motion.div
                                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                                animate={{ left: ['0%', '100%'] }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1.8,
                                  delay: i * 0.3,
                                  ease: 'easeInOut',
                                }}
                              />
                              <ArrowRight className="absolute -right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-indigo-500/60" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Metrics Callout */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: nodes.length * 0.08 + 0.1 }}
                className={`mt-8 flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between ${
                  mode === 'automated'
                    ? 'border-emerald-500/20 bg-emerald-500/5'
                    : 'border-slate-800 bg-slate-800/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                      mode === 'automated'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                        : 'border-slate-700 bg-slate-800/50 text-slate-400'
                    }`}
                  >
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                      {mode === 'manual' ? 'Manual Execution' : 'Automated Execution'}
                    </p>
                    <p
                      className={`text-2xl font-semibold ${mode === 'automated' ? 'text-emerald-400' : 'text-white'}`}
                    >
                      {totalTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Metric label="Improvement" value={mode === 'manual' ? 'Baseline' : '1,058×'} />
                  <Metric label="Human Touchpoints" value={mode === 'manual' ? '6' : '0'} />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        active
          ? 'bg-indigo-500 text-white shadow-[0_0_16px_rgba(99,102,241,0.3)]'
          : 'text-slate-400 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-right">
      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="font-mono text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
