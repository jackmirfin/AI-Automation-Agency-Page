import { type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface AuditButtonProps {
  onOpen: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium text-sm transition-all duration-200 rounded-lg whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50';

const variants: Record<Variant, string> = {
  primary:
    'bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2.5 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]',
  secondary:
    'bg-slate-900/60 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white px-5 py-2.5 backdrop-blur-sm',
  ghost: 'text-slate-400 hover:text-white px-3 py-2',
};

export default function AuditButton({
  onOpen,
  children,
  variant = 'primary',
  className = '',
  icon = false,
}: AuditButtonProps) {
  return (
    <button
      onClick={onOpen}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
      {icon && <ArrowRight className="h-4 w-4" />}
    </button>
  );
}
