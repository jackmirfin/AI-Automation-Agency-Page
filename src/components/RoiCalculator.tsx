import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Clock, TrendingDown, Calendar, Wallet } from 'lucide-react';
import { SectionLabel } from './Services';
import AuditButton from './AuditButton';

interface RoiCalculatorProps {
  onOpenAudit: () => void;
}

// Assumed: automation recovers 60% of manual task hours
const RECOVERY_RATE = 0.6;
// Assumed: implementation cost equivalent to 3 months of recovered labor
const PAYBACK_MONTHS = 3;
const WEEKS_PER_YEAR = 52;

export default function RoiCalculator({ onOpenAudit }: RoiCalculatorProps) {
  const [teamSize, setTeamSize] = useState(15);
  const [hourlyCost, setHourlyCost] = useState(45);
  const [weeklyHours, setWeeklyHours] = useState(12);

  const results = useMemo(() => {
    const totalManualHoursYear = teamSize * weeklyHours * WEEKS_PER_YEAR;
    const recoveredHours = Math.round(totalManualHoursYear * RECOVERY_RATE);
    const annualSavings = recoveredHours * hourlyCost;
    const paybackPeriod = PAYBACK_MONTHS;

    return {
      recoveredHours,
      annualSavings,
      paybackPeriod,
      weeklyLaborCost: teamSize * weeklyHours * hourlyCost,
    };
  }, [teamSize, hourlyCost, weeklyHours]);

  const fmtMoney = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const fmtNum = (n: number) => n.toLocaleString('en-US');

  return (
    <section id="calculator" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>ROI Calculator</SectionLabel>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Client-side capacity &amp; savings estimator
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Adjust the parameters below to calculate projected operational savings in real time.
          All computations run locally in your browser.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {/* Inputs */}
          <div className="lg:col-span-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            <h3 className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-300">
              <span className="font-mono text-xs uppercase tracking-wider text-indigo-400">
                Input Parameters
              </span>
            </h3>

            <Slider
              icon={Users}
              label="Team Size"
              unit="employees"
              value={teamSize}
              min={1}
              max={100}
              step={1}
              onChange={setTeamSize}
              display={`${teamSize} ${teamSize === 1 ? 'employee' : 'employees'}`}
            />

            <Slider
              icon={DollarSign}
              label="Average Hourly Cost"
              unit="/hr"
              value={hourlyCost}
              min={20}
              max={200}
              step={5}
              onChange={setHourlyCost}
              display={`$${hourlyCost}/hr`}
            />

            <Slider
              icon={Clock}
              label="Weekly Manual Task Hours"
              unit="hrs/employee"
              value={weeklyHours}
              min={2}
              max={30}
              step={1}
              onChange={setWeeklyHours}
              display={`${weeklyHours} hrs/employee`}
            />

            {/* Weekly cost summary */}
            <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/30 px-4 py-3">
              <span className="text-xs text-slate-500">Current weekly manual labor cost</span>
              <span className="font-mono text-sm text-slate-300">
                {fmtMoney(results.weeklyLaborCost)}
              </span>
            </div>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <OutputCard
              icon={TrendingDown}
              label="Annual Hours Recovered"
              value={fmtNum(results.recoveredHours)}
              unit="hrs"
              accent="emerald"
              delay={0}
            />
            <OutputCard
              icon={Wallet}
              label="Estimated Annual Savings"
              value={fmtMoney(results.annualSavings)}
              unit="USD"
              accent="indigo"
              delay={0.1}
            />
            <OutputCard
              icon={Calendar}
              label="Projected Payback Period"
              value={`${results.paybackPeriod}`}
              unit="months"
              accent="blue"
              delay={0.2}
            />

            <AuditButton onOpen={onOpenAudit} icon className="mt-1 w-full py-3">
              Lock In Your Audit Plan
            </AuditButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  icon: Icon,
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  icon: typeof Users;
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-6 last:mb-0">
      <div className="mb-2 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <Icon className="h-4 w-4 text-slate-500" />
          {label}
        </label>
        <span className="rounded-md border border-slate-800 bg-slate-800/50 px-2.5 py-1 font-mono text-xs text-indigo-300">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{
          background: `linear-gradient(to right, #6366f1 ${pct}%, #1e293b ${pct}%)`,
          borderRadius: '3px',
          height: '6px',
          appearance: 'none',
        }}
      />
      <div className="mt-1.5 flex justify-between">
        <span className="font-mono text-[10px] text-slate-600">{min} {unit}</span>
        <span className="font-mono text-[10px] text-slate-600">{max} {unit}</span>
      </div>
    </div>
  );
}

function OutputCard({
  icon: Icon,
  label,
  value,
  unit,
  accent,
  delay,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  unit: string;
  accent: 'emerald' | 'indigo' | 'blue';
  delay: number;
}) {
  const accents = {
    emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
    indigo: 'border-indigo-500/20 bg-indigo-500/5 text-indigo-400',
    blue: 'border-blue-500/20 bg-blue-500/5 text-blue-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className={`rounded-2xl border p-5 ${accents[accent]}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span className="font-mono text-xs uppercase tracking-wider opacity-80">{label}</span>
      </div>
      <p className="text-3xl font-semibold text-white">{value}</p>
      <p className="mt-1 font-mono text-xs text-slate-500">{unit}</p>
    </motion.div>
  );
}
