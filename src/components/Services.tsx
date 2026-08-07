import { motion } from 'framer-motion';
import { Workflow, Bot, Layers, ArrowRight, Zap } from 'lucide-react';

const services = [
  {
    icon: Workflow,
    title: 'Workflow Engineering',
    description: 'Automate document extraction, data sync, and ticket routing end-to-end.',
    tags: ['Document Extraction', 'Data Sync', 'Ticket Routing'],
    featured: true,
    stat: { value: '< 12s', label: 'Pipeline execution' },
  },
  {
    icon: Bot,
    title: 'Autonomous Agents',
    description: 'RAG-based AI agents for 24/7 support and lead qualification.',
    tags: ['RAG Pipelines', 'Knowledge Base', 'Lead Qualification'],
    featured: false,
  },
  {
    icon: Layers,
    title: 'Custom AI Middleware',
    description: 'Vector databases, LLM routing, and API adapters built to your rules.',
    tags: ['Vector Databases', 'LLM Routing', 'API Adapters'],
    featured: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>Core Offer</SectionLabel>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Three pillars of enterprise AI infrastructure
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`card-glow group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-slate-700 ${
                  service.featured ? 'md:col-span-1 md:row-span-1' : ''
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 text-indigo-400 transition-all duration-300 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {service.description}
                </p>

                {service.stat && (
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3">
                    <Zap className="h-4 w-4 text-indigo-400" />
                    <div>
                      <p className="font-mono text-xl font-semibold text-white">
                        {service.stat.value}
                      </p>
                      <p className="text-xs text-slate-500">{service.stat.label}</p>
                    </div>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-800 bg-slate-800/30 px-2.5 py-1 font-mono text-[11px] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-sm text-slate-500 transition-colors group-hover:text-indigo-400">
                  <span>System specification</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="h-px w-8 bg-indigo-500" />
      <span className="font-mono text-xs uppercase tracking-wider text-indigo-400">
        {children}
      </span>
    </div>
  );
}
