import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface StickyCTAProps {
  onOpenAudit: () => void;
}

export default function StickyCTA({ onOpenAudit }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/90 p-3 backdrop-blur-md sm:hidden"
        >
          <button
            onClick={onOpenAudit}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:bg-indigo-400"
          >
            Request Roadmap
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
