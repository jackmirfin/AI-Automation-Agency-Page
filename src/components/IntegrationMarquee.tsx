import {
  Brain,
  Workflow,
  Boxes,
  Network,
  Cloud,
  Database,
  MessageSquare,
  Headphones,
  Table,
  Cpu,
  Sparkles,
} from 'lucide-react';

const integrations = [
  { name: 'OpenAI', icon: Sparkles },
  { name: 'Anthropic', icon: Brain },
  { name: 'n8n', icon: Workflow },
  { name: 'Make', icon: Network },
  { name: 'HubSpot', icon: Cpu },
  { name: 'Salesforce', icon: Cloud },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Pinecone', icon: Boxes },
  { name: 'Slack', icon: MessageSquare },
  { name: 'Zendesk', icon: Headphones },
  { name: 'Airtable', icon: Table },
];

export default function IntegrationMarquee() {
  const doubled = [...integrations, ...integrations];

  return (
    <section className="border-y border-slate-800/50 bg-slate-950/40 py-10">
      <p className="mb-8 text-center text-sm text-slate-500">
        Direct API integrations with your existing technology stack
      </p>

      {/* Marquee (desktop/tablet) */}
      <div className="marquee-pause relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-slate-950 to-transparent" />
        <div className="flex w-max animate-marquee gap-3">
          {doubled.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.name}-${i}`}
                className="flex shrink-0 items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/40 px-5 py-3"
              >
                <Icon className="h-5 w-5 text-slate-400" />
                <span className="font-mono text-sm text-slate-300">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid (mobile) */}
      <div className="mt-6 grid grid-cols-3 gap-2 px-4 sm:hidden">
        {integrations.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/40 px-2 py-3"
            >
              <Icon className="h-5 w-5 text-slate-400" />
              <span className="font-mono text-[10px] text-slate-400">{item.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
