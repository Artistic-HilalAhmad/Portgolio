import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Server, 
  Terminal, 
  Activity, 
  GitBranch,
  Sparkles,
  Workflow
} from 'lucide-react';

interface ArchitectureNode {
  id: string;
  title: string;
  subtitle: string;
  icon: React.FC<{ className?: string }>;
  tech: string[];
  metrics: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const pipelineNodes: ArchitectureNode[] = [
  {
    id: 'ingestion',
    title: '1. Ingestion & Streaming',
    subtitle: 'CDC & High-Throughput Stream',
    icon: Zap,
    tech: ['Striim CDC', 'Google Cloud Pub/Sub', 'Cloud SQL', 'Python Batch Ingestion'],
    metrics: '2 TB / Day Ingestion within 5-min SLA',
    description: 'Real-time Change Data Capture (CDC) from operational relational databases directly into BigQuery and staging storage, handling 500M+ nightly records seamlessly without data loss.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-400/40',
  },
  {
    id: 'processing',
    title: '2. Orchestration & Compute',
    subtitle: 'DAGs, GKE & Dataflow Engine',
    icon: Cpu,
    tech: ['Cloud Composer (Airflow)', 'GKE (Kubernetes Engine)', 'Google Cloud Dataflow', 'Docker Containers'],
    metrics: '95% On-Time Job Accuracy • 50% GKE Perf Boost',
    description: 'Automated DAG dependency management and containerized job execution. Migrated tokenization and ETL processing from App Engine to GKE to optimize compute cost and resource utilization.',
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-400/40',
  },
  {
    id: 'warehouse',
    title: '3. Data Warehouse & Storage',
    subtitle: 'Snowflake Iceberg & BigQuery',
    icon: Database,
    tech: ['Snowflake Warehouse', 'Apache Iceberg Format', 'Google BigQuery', 'Partitioning & Clustering'],
    metrics: '25% Query Cost Reduction',
    description: 'Enterprise data warehousing with Apache Iceberg open table formats on Snowflake and heavily partitioned/clustered BigQuery datasets for sub-second analytical queries.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-400/40',
  },
  {
    id: 'transformation',
    title: '4. Modeling & Quality Auditing',
    subtitle: 'dbt Core & CDC History',
    icon: Layers,
    tech: ['dbt Core', '100+ Incremental Models', 'Multi-Env CI/CD Schema Automation', 'Cloud Composer Auditing'],
    metrics: '40% Boosted Data Quality • 99.9% Pipeline Uptime',
    description: 'Production ELT dbt pipelines with CDC history tracking, enforced data contracts, schema evolution across Dev/QA/Cert/Prod environments, and automated quality checks.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-400/40',
  },
];

export const PipelineVisualizer: React.FC = React.memo(() => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(pipelineNodes[0]);
  const [isSimulating, setIsSimulating] = useState(true);

  return (
    <section id="architecture" className="relative mx-auto max-w-6xl px-6 py-24 z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-300/60 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 px-4 py-1.5 text-xs sm:text-sm font-mono uppercase tracking-wider theme-accent font-semibold">
          <Server className="h-4 w-4" /> Enterprise Data Architecture
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight theme-text-primary sm:text-5xl">
          Cloud Data Pipeline Engine
        </h2>
        <p className="mx-auto mt-4 max-w-2xl theme-text-secondary text-base sm:text-lg font-normal">
          Interactive multi-stage ELT/ETL data architecture engineered across Google Cloud Platform and Snowflake.
        </p>
        <div className="mx-auto mt-6 h-1 w-20 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
      </motion.div>

      {/* Interactive Controls & Live Telemetry Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border theme-card px-5 py-3.5 shadow-sm">
        <div className="flex items-center gap-3 font-mono text-xs sm:text-sm">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold theme-text-primary">Pipeline Telemetry:</span>
          <span className="theme-text-secondary hidden sm:inline">2.4 TB Processed Today • SLA: 99.9%</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className="inline-flex items-center gap-1.5 rounded-xl border theme-card theme-card-hover px-3 py-1.5 text-xs font-mono font-semibold theme-text-primary transition-all cursor-pointer"
          >
            <Activity className={`h-3.5 w-3.5 ${isSimulating ? 'text-emerald-500' : 'theme-text-secondary'}`} />
            <span>{isSimulating ? 'Live Simulation Active' : 'Simulation Paused'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Pipeline Diagram Grid */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Flow Nodes */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between px-2 text-xs font-mono theme-text-secondary uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Workflow className="h-3.5 w-3.5 theme-accent" />
              Pipeline Architecture Stages
            </span>
            <span>Click to inspect details</span>
          </div>

          <div className="grid gap-3.5">
            {pipelineNodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = selectedNode.id === node.id;

              return (
                <div key={node.id} className="relative">
                  <motion.button
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedNode(node)}
                    className={`w-full text-left rounded-2xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/70 dark:bg-sky-950/30 shadow-md ring-2 ring-sky-400/30'
                        : 'theme-card theme-card-hover shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                            isSelected ? 'border-sky-400 bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-300' : 'theme-card ' + node.color
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold theme-text-primary">
                              {node.title}
                            </h3>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500 text-white shadow-xs">
                                <Sparkles className="h-2.5 w-2.5" /> Inspected
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm theme-text-secondary font-mono mt-0.5 font-medium">{node.subtitle}</p>
                          
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {node.tech.slice(0, 3).map((t, idx) => (
                              <span
                                key={idx}
                                className="rounded-lg border theme-card px-2.5 py-1 text-xs font-mono theme-text-primary font-medium"
                              >
                                {t}
                              </span>
                            ))}
                            {node.tech.length > 3 && (
                              <span className="rounded-lg border theme-card px-2 py-1 text-xs font-mono theme-text-secondary">
                                +{node.tech.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 hidden sm:block">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-mono font-semibold ${
                            isSelected
                              ? 'bg-sky-500 text-white font-bold'
                              : 'border theme-card theme-text-secondary'
                          }`}
                        >
                          {isSelected ? 'Active' : 'Inspect'}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Node Details Inspector Card */}
        <div className="lg:col-span-5 sticky top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl border border-sky-200/80 dark:border-slate-800 theme-card p-6 sm:p-8 backdrop-blur-xl shadow-lg relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="rounded-xl border border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-950 p-3 theme-accent">
                    {React.createElement(selectedNode.icon, { className: 'h-6 w-6' })}
                  </div>
                  <div>
                    <span className="text-xs font-mono tracking-widest theme-text-secondary uppercase font-semibold">Stage Deep-Dive</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold theme-text-primary">{selectedNode.title}</h3>
                  </div>
                </div>

                {/* Measured SLA box */}
                <div className="my-5 rounded-2xl border border-sky-300/80 dark:border-sky-500/30 bg-sky-50/80 dark:bg-sky-500/10 p-4 sm:p-5">
                  <div className="text-xs font-mono uppercase tracking-wider theme-accent mb-1 flex items-center gap-2 font-bold">
                    <ShieldCheck className="h-4 w-4" /> Measured Impact & SLA
                  </div>
                  <div className="text-base sm:text-lg font-bold theme-text-primary">{selectedNode.metrics}</div>
                </div>

                <p className="text-sm sm:text-base theme-text-secondary leading-relaxed font-normal mb-6">
                  {selectedNode.description}
                </p>

                <div>
                  <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider theme-text-secondary mb-3 flex items-center gap-2 font-semibold">
                    <Terminal className="h-4 w-4 theme-accent" /> Technical Modules & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-xl border theme-card px-3 py-1.5 text-xs sm:text-sm font-mono theme-text-primary font-medium"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 theme-accent" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});
