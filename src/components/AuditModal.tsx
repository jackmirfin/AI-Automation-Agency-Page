import { useState, useEffect, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Database,
  Ticket,
  FileText,
  Zap,
  Bot,
  CheckCircle2,
  Map,
} from 'lucide-react';

interface AuditModalProps {
  open: boolean;
  onClose: () => void;
}

const stepLabels = ['Bottleneck', 'Contact', 'Roadmap'];

const bottleneckOptions = [
  { id: 'data-sync', label: 'Multi-system data sync', description: 'Disconnected tools, manual exports', icon: Database },
  { id: 'support', label: 'Customer support routing', description: 'Tickets triaged by hand', icon: Ticket },
  { id: 'documents', label: 'Document processing', description: 'Manual extraction & data entry', icon: FileText },
  { id: 'leads', label: 'Lead qualification', description: 'Reps screening every inbound', icon: Zap },
  { id: 'agents', label: 'Knowledge-base agents', description: 'No 24/7 self-service layer', icon: Bot },
];

export default function AuditModal({ open, onClose }: AuditModalProps) {
  const [step, setStep] = useState(0);
  const [bottleneck, setBottleneck] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (open) {
      setStep(0);
      setBottleneck(null);
      setName('');
      setEmail('');
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const canProceed = () => {
    if (step === 0) return bottleneck !== null;
    if (step === 1) return name.trim().length > 0 && email.trim().length > 0;
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (canProceed() && step < 2) setStep((s) => s + 1);
  };

  const selectedBottleneck = bottleneckOptions.find((b) => b.id === bottleneck);
  const progressPct = ((step + 1) / 3) * 100;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-6 py-4 backdrop-blur">
              <div>
                <p className="font-mono text-xs text-indigo-400 uppercase tracking-wider">
                  Automation Roadmap
                </p>
                <h3 className="mt-0.5 text-lg font-semibold text-white">
                  {step < 2 ? 'Request Your Roadmap' : 'Roadmap Confirmed'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Progress bar */}
            {step < 2 && (
              <div className="px-6 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    Step {step + 1} of 3 — {stepLabels[step]}
                  </span>
                  <span className="font-mono text-[10px] text-indigo-400">
                    {Math.round(progressPct)}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-full rounded-full bg-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <AnimatePresence mode="wait">
                {/* Step 0: Bottleneck */}
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <p className="text-sm text-slate-400 mb-4">
                      What's your biggest operational bottleneck?
                    </p>
                    {bottleneckOptions.map((opt) => {
                      const Icon = opt.icon;
                      const active = bottleneck === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setBottleneck(opt.id)}
                          className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                            active
                              ? 'border-indigo-500 bg-indigo-500/10'
                              : 'border-slate-800 bg-slate-800/30 hover:border-slate-700'
                          }`}
                        >
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                              active
                                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                                : 'border-slate-700 bg-slate-800/50 text-slate-500'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm ${active ? 'text-white' : 'text-slate-300'}`}>
                              {opt.label}
                            </p>
                            <p className="text-xs text-slate-500">{opt.description}</p>
                          </div>
                          {active && <CheckCircle2 className="h-5 w-5 text-indigo-400" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {/* Step 1: Contact */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <p className="text-sm text-slate-400 mb-2">
                      Where should we send your roadmap?
                    </p>
                    <Field label="Name" icon={User}>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="input"
                        required
                      />
                    </Field>
                    <Field label="Work Email" icon={Mail}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@company.com"
                        className="input"
                        required
                      />
                    </Field>
                    <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-3">
                      <p className="text-xs text-slate-500">
                        Your roadmap covers:{' '}
                        <span className="text-slate-300">
                          {selectedBottleneck?.label ?? 'your selected bottleneck'}
                        </span>
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Confirmation */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                      className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10"
                    >
                      <Check className="h-8 w-8 text-emerald-400" />
                    </motion.div>
                    <h4 className="text-lg font-semibold text-white">Roadmap Incoming</h4>
                    <p className="mt-1 text-sm text-slate-400">
                      Your custom automation roadmap will arrive within 48 hours.
                    </p>

                    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/50 p-5 text-left font-mono text-xs">
                      <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-slate-500 uppercase">Request Receipt</span>
                        <span className="text-emerald-400 flex items-center gap-1.5">
                          <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          QUEUED
                        </span>
                      </div>
                      <div className="space-y-2">
                        <ReceiptRow label="Contact" value={name || '—'} />
                        <ReceiptRow label="Email" value={email || '—'} />
                        <ReceiptRow
                          label="Bottleneck"
                          value={selectedBottleneck?.label ?? '—'}
                        />
                        <ReceiptRow label="Delivery" value="Within 48 hours" />
                        <div className="border-t border-slate-800 pt-2 mt-2">
                          <ReceiptRow
                            label="Request ID"
                            value={`RDMP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                      <Map className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Includes: process map, ROI matrix, integration roadmap</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              {step < 2 && (
                <div className="mt-6 flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="submit"
                    disabled={!canProceed()}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {step === 1 ? 'Get My Roadmap' : 'Continue'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-2.5 text-sm font-medium text-slate-200 transition-all hover:border-slate-600 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof User;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
        <Icon className="h-3.5 w-3.5" /> {label}
      </label>
      {children}
    </div>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-200">{value}</span>
    </div>
  );
}
