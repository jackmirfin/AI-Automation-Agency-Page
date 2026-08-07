import { useState, useEffect, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Building2,
  User,
  Mail,
  Zap,
  Database,
  Bot,
  FileText,
  Ticket,
  CheckCircle2,
  Hash,
} from 'lucide-react';

interface AuditModalProps {
  open: boolean;
  onClose: () => void;
}

const steps = ['Contact', 'Bottlenecks', 'Schedule', 'Confirmation'] as const;

const bottleneckOptions = [
  { id: 'data-sync', label: 'Multi-system data synchronization', icon: Database },
  { id: 'support', label: 'Tier-1 customer support routing', icon: Ticket },
  { id: 'documents', label: 'Document extraction & processing', icon: FileText },
  { id: 'leads', label: 'Lead qualification & enrichment', icon: Zap },
  { id: 'agents', label: 'Autonomous knowledge-base agents', icon: Bot },
  { id: 'middleware', label: 'Custom API middleware & routing', icon: Hash },
];

const companySizes = ['1–10', '11–50', '51–200', '201–500', '500+'];

const timeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
];

function nextSevenDays(): { date: Date; label: string; day: string; num: string }[] {
  const days: { date: Date; label: string; day: string; num: string }[] = [];
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d,
      label: labels[d.getDay()],
      day: d.toLocaleDateString('en-US', { month: 'short' }),
      num: String(d.getDate()),
    });
  }
  return days;
}

export default function AuditModal({ open, onClose }: AuditModalProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [size, setSize] = useState(companySizes[1]);
  const [selectedBottlenecks, setSelectedBottlenecks] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);

  const days = nextSevenDays();

  useEffect(() => {
    if (open) {
      setStep(0);
      setName('');
      setEmail('');
      setCompany('');
      setSize(companySizes[1]);
      setSelectedBottlenecks([]);
      setSelectedDay(0);
      setSelectedTime(timeSlots[0]);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const toggleBottleneck = (id: string) => {
    setSelectedBottlenecks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    if (step === 0) return name.trim() && email.trim() && company.trim();
    if (step === 1) return selectedBottlenecks.length > 0;
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (canProceed() && step < 3) setStep((s) => s + 1);
  };

  const selectedDateLabel = `${days[selectedDay].label}, ${days[selectedDay].day} ${days[selectedDay].num}`;

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
                  Automation Audit
                </p>
                <h3 className="mt-0.5 text-lg font-semibold text-white">
                  {step < 3 ? 'Schedule an Automation Audit' : 'Audit Confirmed'}
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

            {/* Progress */}
            {step < 3 && (
              <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-800/50">
                {steps.slice(0, 3).map((label, i) => (
                  <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
                    <div
                      className={`flex items-center gap-2 ${i <= step ? 'text-indigo-400' : 'text-slate-600'}`}
                    >
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-mono border ${
                          i < step
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                            : i === step
                              ? 'border-indigo-500 bg-indigo-500 text-white'
                              : 'border-slate-700 bg-slate-800/50 text-slate-600'
                        }`}
                      >
                        {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                      </div>
                      <span className="text-xs font-medium hidden sm:inline">{label}</span>
                    </div>
                    {i < 2 && <div className="h-px flex-1 bg-slate-800" />}
                  </div>
                ))}
              </div>
            )}

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Contact */}
                {step === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <Field label="Full Name" icon={User}>
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
                    <Field label="Company" icon={Building2}>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Corp"
                        className="input"
                        required
                      />
                    </Field>
                    <div>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
                        Company Size
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {companySizes.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSize(s)}
                            className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-all ${
                              size === s
                                ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                                : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Bottlenecks */}
                {step === 1 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <p className="text-sm text-slate-400 mb-4">
                      Select the operational bottlenecks you want to evaluate.
                    </p>
                    {bottleneckOptions.map((opt) => {
                      const Icon = opt.icon;
                      const active = selectedBottlenecks.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleBottleneck(opt.id)}
                          className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${
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
                          <span
                            className={`text-sm flex-1 ${active ? 'text-white' : 'text-slate-300'}`}
                          >
                            {opt.label}
                          </span>
                          {active && <CheckCircle2 className="h-5 w-5 text-indigo-400" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {/* Step 3: Date/Time */}
                {step === 2 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                        <Calendar className="h-3.5 w-3.5" /> Select Date
                      </label>
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                        {days.map((d, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedDay(i)}
                            className={`flex flex-col items-center gap-0.5 rounded-lg border py-2.5 transition-all ${
                              selectedDay === i
                                ? 'border-indigo-500 bg-indigo-500/10'
                                : 'border-slate-800 bg-slate-800/30 hover:border-slate-700'
                            }`}
                          >
                            <span
                              className={`font-mono text-[10px] uppercase ${selectedDay === i ? 'text-indigo-300' : 'text-slate-500'}`}
                            >
                              {d.label}
                            </span>
                            <span
                              className={`font-mono text-xs ${selectedDay === i ? 'text-indigo-300' : 'text-slate-500'}`}
                            >
                              {d.day}
                            </span>
                            <span
                              className={`text-sm font-semibold ${selectedDay === i ? 'text-white' : 'text-slate-400'}`}
                            >
                              {d.num}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                        <Clock className="h-3.5 w-3.5" /> Select Time (UTC)
                      </label>
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTime(t)}
                            className={`rounded-lg border py-2 font-mono text-xs transition-all ${
                              selectedTime === t
                                ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                                : 'border-slate-800 bg-slate-800/30 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
                      <p className="font-mono text-xs text-slate-500 uppercase">Selected Slot</p>
                      <p className="mt-1 text-sm text-slate-200">
                        {selectedDateLabel} at {selectedTime} UTC
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Confirmation */}
                {step === 3 && (
                  <motion.div
                    key="step4"
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
                    <h4 className="text-lg font-semibold text-white">Audit Scheduled</h4>
                    <p className="mt-1 text-sm text-slate-400">
                      A confirmation receipt has been generated for your records.
                    </p>

                    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/50 p-5 text-left font-mono text-xs">
                      <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-slate-500 uppercase">Receipt</span>
                        <span className="text-emerald-400">
                          <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5" />
                          CONFIRMED
                        </span>
                      </div>
                      <div className="space-y-2">
                        <ReceiptRow label="Contact" value={name} />
                        <ReceiptRow label="Email" value={email} />
                        <ReceiptRow label="Company" value={company} />
                        <ReceiptRow label="Team Size" value={size} />
                        <ReceiptRow
                          label="Bottlenecks"
                          value={`${selectedBottlenecks.length} selected`}
                        />
                        <ReceiptRow label="Date" value={selectedDateLabel} />
                        <ReceiptRow label="Time" value={`${selectedTime} UTC`} />
                        <div className="border-t border-slate-800 pt-2 mt-2">
                          <ReceiptRow
                            label="Audit ID"
                            value={`AAA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              {step < 3 && (
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
                    {step === 2 ? 'Confirm Audit' : 'Continue'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {step === 3 && (
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
