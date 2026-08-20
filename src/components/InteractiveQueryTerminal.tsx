import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Terminal, 
  Database, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Code2, 
  Copy, 
  Check, 
  Sparkles,
  Zap,
  HardDrive
} from 'lucide-react';

interface CodeSnippet {
  id: string;
  name: string;
  type: string;
  icon: React.FC<{ className?: string }>;
  code: string;
  output: {
    status: string;
    duration: string;
    bytesProcessed: string;
    rowsAffected: string;
    cost: string;
    summary: string;
    records?: Array<Record<string, string | number>>;
  };
}

const snippets: CodeSnippet[] = [
  {
    id: 'cdc-stream',
    name: 'striim_cdc_stream.sql',
    type: 'SQL / CDC',
    icon: Zap,
    code: `-- Change Data Capture (CDC) Real-Time Ingestion
SELECT 
    stream_id,
    table_name,
    operation_type, -- 'INSERT', 'UPDATE', 'DELETE'
    before_payload,
    after_payload,
    cdc_timestamp,
    ROW_NUMBER() OVER(PARTITION BY primary_key ORDER BY cdc_timestamp DESC) as row_num
FROM \`prod-analytics.cdc_raw.striim_financial_events\`
WHERE DATE(cdc_timestamp) = CURRENT_DATE()
QUALIFY row_num = 1;`,
    output: {
      status: 'SUCCESS • BigQuery Query Job Completed',
      duration: '184 ms',
      bytesProcessed: '14.2 MB',
      rowsAffected: '500,000 records',
      cost: '$0.00 (Cached Tier)',
      summary: 'Change Data Capture stream synchronized across 12 source tables with 0 dropped events.',
      records: [
        { id: 'TXN-9021', table: 'orders', op: 'UPDATE', latency: '42ms', status: 'SYNCHRONIZED' },
        { id: 'TXN-9022', table: 'ledger', op: 'INSERT', latency: '38ms', status: 'SYNCHRONIZED' },
        { id: 'TXN-9023', table: 'customers', op: 'UPDATE', latency: '45ms', status: 'SYNCHRONIZED' },
      ],
    },
  },
  {
    id: 'dbt-model',
    name: 'dim_financial_reconciliation.sql',
    type: 'dbt Model',
    icon: Layers,
    code: `{{ config(
    materialized='incremental',
    unique_key='account_id',
    incremental_strategy='merge',
    cluster_by=['region', 'account_status']
) }}

WITH source_transactions AS (
    SELECT * FROM {{ ref('stg_striim_transactions') }}
    {% if is_incremental() %}
      WHERE _loaded_at > (SELECT MAX(_loaded_at) FROM {{ this }})
    {% endif %}
),

aggregated_balances AS (
    SELECT 
        account_id,
        region,
        account_status,
        SUM(amount_usd) AS current_balance_usd,
        MAX(_loaded_at) AS last_activity_timestamp
    FROM source_transactions
    GROUP BY 1, 2, 3
)

SELECT * FROM aggregated_balances;`,
    output: {
      status: 'SUCCESS • dbt run complete [100/100 models passed]',
      duration: '420 ms',
      bytesProcessed: '36.8 MB',
      rowsAffected: '1,240,000 accounts',
      cost: '$0.00 (Optimized Partitioning)',
      summary: 'Incremental merge reconciled 100% of financial accounts with zero duplicate records.',
      records: [
        { account: 'ACC-3841', region: 'NA-EAST', balance: '$1,450,200', status: 'RECONCILED' },
        { account: 'ACC-3842', region: 'EMEA-WEST', balance: '$890,450', status: 'RECONCILED' },
        { account: 'ACC-3843', region: 'APAC-SOUTH', balance: '$3,120,000', status: 'RECONCILED' },
      ],
    },
  },
  {
    id: 'airflow-dag',
    name: 'gcp_data_orchestrator.py',
    type: 'Airflow / Python',
    icon: Code2,
    code: `from airflow import DAG
from airflow.providers.google.cloud.operators.bigquery import BigQueryInsertJobOperator
from airflow.providers.dbt.cloud.operators.dbt import DbtCloudRunJobOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'hilal_ahmad',
    'retries': 3,
    'retry_delay': timedelta(minutes=2),
    'sla': timedelta(minutes=5),
}

with DAG('enterprise_financial_pipeline', default_args=default_args, schedule='*/5 * * * *') as dag:
    audit_pre_check = BigQueryInsertJobOperator(
        task_id='audit_pre_check',
        configuration={'query': {'query': 'SELECT COUNT(*) FROM raw_staging;'}}
    )
    
    run_dbt_models = DbtCloudRunJobOperator(
        task_id='dbt_incremental_transform',
        job_id=40281
    )
    
    audit_pre_check >> run_dbt_models`,
    output: {
      status: 'SUCCESS • Cloud Composer DAG Executed',
      duration: '310 ms',
      bytesProcessed: '9.4 MB',
      rowsAffected: '100% On-Time SLA Met',
      cost: 'GKE Auto-scaled Node',
      summary: 'Cloud Composer Airflow DAG triggered with 95% on-time execution accuracy.',
    },
  },
];

export const InteractiveQueryTerminal: React.FC = React.memo(() => {
  const [activeSnippet, setActiveSnippet] = useState<CodeSnippet>(snippets[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setHasRun(false);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 450);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl border theme-card overflow-hidden shadow-xl backdrop-blur-2xl transition-all">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b theme-border bg-slate-100/80 dark:bg-slate-900/90 px-4 sm:px-6 py-3 gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono font-semibold theme-text-secondary ml-2 hidden sm:inline">
            cloud-shell@hilal-gcp-prod:~
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-white/60 dark:bg-slate-950/60 p-1 rounded-xl border theme-border overflow-x-auto">
          {snippets.map((snip) => {
            const Icon = snip.icon;
            const isActive = activeSnippet.id === snip.id;
            return (
              <button
                key={snip.id}
                onClick={() => {
                  setActiveSnippet(snip);
                  setHasRun(true);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'theme-text-secondary hover:theme-text-primary hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{snip.name}</span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-lg border theme-card theme-card-hover px-2.5 py-1.5 text-xs font-mono font-semibold theme-text-secondary hover:theme-text-primary transition-all cursor-pointer"
            title="Copy Code"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 active:scale-95 text-white px-3.5 py-1.5 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Play className={`h-3 w-3 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Executing...' : 'Run Query'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x theme-border">
        {/* Left: Code Snippet */}
        <div className="lg:col-span-7 p-4 sm:p-6 bg-white/40 dark:bg-slate-950/40 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto">
          <pre className="text-slate-800 dark:text-slate-200">
            <code>{activeSnippet.code}</code>
          </pre>
        </div>

        {/* Right: Live Telemetry Output Sandbox */}
        <div className="lg:col-span-5 p-4 sm:p-6 bg-slate-50/70 dark:bg-slate-900/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b theme-border pb-3 mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider theme-accent flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5" /> Execution Metrics
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Engine
              </span>
            </div>

            <AnimatePresence mode="wait">
              {isRunning ? (
                <motion.div
                  key="running"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center flex flex-col items-center justify-center gap-2"
                >
                  <Cpu className="h-6 w-6 text-sky-500 animate-spin" />
                  <span className="text-xs font-mono theme-text-secondary">
                    Evaluating DAG plan & scanning BigQuery partitions...
                  </span>
                </motion.div>
              ) : hasRun ? (
                <motion.div
                  key="output"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 font-mono text-xs"
                >
                  {/* Status Banner */}
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{activeSnippet.output.status}</span>
                  </div>

                  {/* Telemetry Metric Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl border theme-border bg-white/70 dark:bg-slate-950/70 p-2.5">
                      <div className="text-[10px] theme-text-secondary uppercase">Execution Latency</div>
                      <div className="font-bold theme-text-primary text-sm mt-0.5">{activeSnippet.output.duration}</div>
                    </div>
                    <div className="rounded-xl border theme-border bg-white/70 dark:bg-slate-950/70 p-2.5">
                      <div className="text-[10px] theme-text-secondary uppercase">Bytes Scanned</div>
                      <div className="font-bold theme-text-primary text-sm mt-0.5">{activeSnippet.output.bytesProcessed}</div>
                    </div>
                    <div className="rounded-xl border theme-border bg-white/70 dark:bg-slate-950/70 p-2.5">
                      <div className="text-[10px] theme-text-secondary uppercase">Throughput</div>
                      <div className="font-bold theme-text-primary text-sm mt-0.5">{activeSnippet.output.rowsAffected}</div>
                    </div>
                    <div className="rounded-xl border theme-border bg-white/70 dark:bg-slate-950/70 p-2.5">
                      <div className="text-[10px] theme-text-secondary uppercase">Query Cost</div>
                      <div className="font-bold theme-accent text-sm mt-0.5">{activeSnippet.output.cost}</div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs theme-text-secondary leading-relaxed pt-1">
                    {activeSnippet.output.summary}
                  </p>

                  {/* Mini Records Preview */}
                  {activeSnippet.output.records && (
                    <div className="mt-2 rounded-xl border theme-border overflow-hidden bg-white/90 dark:bg-slate-950/90">
                      <div className="bg-slate-100 dark:bg-slate-900 px-3 py-1 text-[10px] font-bold theme-text-secondary uppercase">
                        Sample Result Stream (Top 3)
                      </div>
                      <div className="divide-y theme-border text-[11px]">
                        {activeSnippet.output.records.map((rec, rIdx) => (
                          <div key={rIdx} className="px-3 py-1.5 flex items-center justify-between theme-text-primary">
                            <span className="font-bold text-sky-600 dark:text-sky-400">
                              {rec.id || rec.account}
                            </span>
                            <span className="text-[10px] theme-text-secondary">
                              {rec.table || rec.region} • {rec.op || rec.balance}
                            </span>
                            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              {rec.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="mt-4 pt-3 border-t theme-border flex items-center justify-between text-[10px] font-mono theme-text-secondary">
            <span>Partition Engine: Time-Unit Partitioning</span>
            <span className="theme-accent font-bold">100% CI/CD Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
});
