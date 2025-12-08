'use client';

import { CircleXIcon, CircleAlertIcon, CircleCheckIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  getEmbedUrl,
  MAJOR_CLIENTS,
  type MajorClient,
  type CanIEmailFeature,
  getFeatureSupportSummary,
} from '@/lib/caniemail';

type CompatibilityIssue = {
  feature: CanIEmailFeature;
  property: string;
  severity: 'error' | 'warning' | 'success';
  summary: {
    partial: MajorClient[];
    supported: MajorClient[];
    unknown: MajorClient[];
    unsupported: MajorClient[];
  };
};

type CompatibilityReportProps = {
  isLoading?: boolean;
  issues: CompatibilityIssue[];
};

function SeverityIcon({ severity }: { severity: CompatibilityIssue['severity'] }) {
  switch (severity) {
    case 'error':
      return <CircleXIcon className="size-4 text-red-500" />;

    case 'warning':
      return <CircleAlertIcon className="size-4 text-amber-500" />;

    case 'success':
      return <CircleCheckIcon className="size-4 text-green-500" />;
  }
}

function ClientBadge({ client, supported }: { client: MajorClient; supported: 'yes' | 'partial' | 'no' }) {
  const colors = {
    no: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    partial: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    yes: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };

  return (
    <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium ${colors[supported]}`}>
      {client.label}
    </span>
  );
}

function IssueCard({
  isExpanded,
  issue,
  onToggle,
}: {
  isExpanded: boolean;
  issue: CompatibilityIssue;
  onToggle: () => void;
}) {
  const { feature, severity, summary } = issue;

  return (
    <div
      className={`overflow-hidden rounded-lg border ${
        severity === 'error'
          ? 'border-red-200 dark:border-red-900/50'
          : severity === 'warning'
            ? 'border-amber-200 dark:border-amber-900/50'
            : 'border-green-200 dark:border-green-900/50'
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      >
        <SeverityIcon severity={severity} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-zinc-800 dark:text-zinc-200">{feature.title}</span>
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {issue.property}
            </code>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {summary.unsupported.map((client) => {
              return <ClientBadge supported="no" client={client} key={client.label} />;
            })}
            {summary.partial.map((client) => {
              return <ClientBadge client={client} key={client.label} supported="partial" />;
            })}
          </div>
        </div>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`h-5 w-5 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        >
          <path strokeWidth={2} d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isExpanded && (
        <div className="border-t border-zinc-200 dark:border-zinc-700">
          <div className="p-4">
            <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
              {feature.description || `Support details for ${feature.title}`}
            </p>
            <a
              target="_blank"
              href={feature.url}
              rel="noopener noreferrer"
              className="mb-4 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              View on caniemail.com
              <svg fill="none" className="h-3 w-3" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
          <iframe
            loading="lazy"
            src={getEmbedUrl(feature.slug)}
            title={`Can I email ${feature.title}`}
            className="h-[420px] w-full border-0 bg-white"
          />
        </div>
      )}
    </div>
  );
}

export function CompatibilityReport({ isLoading, issues }: CompatibilityReportProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'errors' | 'warnings'>('all');

  const { errors, filteredIssues, successes, warnings } = useMemo(() => {
    const errors = issues.filter((i) => {
      return i.severity === 'error';
    });
    const warnings = issues.filter((i) => {
      return i.severity === 'warning';
    });
    const successes = issues.filter((i) => {
      return i.severity === 'success';
    });

    let filtered = issues;

    if (filter === 'errors') {
      filtered = errors;
    } else if (filter === 'warnings') {
      filtered = [...errors, ...warnings];
    }

    filtered = [...filtered].sort((a, b) => {
      const order = { error: 0, success: 2, warning: 1 };

      return order[a.severity] - order[b.severity];
    });

    return { errors, filteredIssues: filtered, successes, warnings };
  }, [issues, filter]);

  if (isLoading) {
    return (
      <div className="flex h-full flex-col">
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800">
          <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Compatibility Report</h2>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-2 text-zinc-500">
            <svg fill="none" viewBox="0 0 24 24" className="h-5 w-5 animate-spin">
              <circle r="10" cx="12" cy="12" strokeWidth="4" stroke="currentColor" className="opacity-25" />
              <path
                fill="currentColor"
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Analyzing compatibility...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-3.5 dark:border-zinc-700 dark:bg-zinc-800">
        <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Compatibility Report</h2>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
            <span className="text-zinc-600 dark:text-zinc-400">{errors.length} issues</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-zinc-600 dark:text-zinc-400">{warnings.length} warnings</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
            <span className="text-zinc-600 dark:text-zinc-400">{successes.length} OK</span>
          </span>
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="flex flex-1 items-center justify-center p-8 text-center">
          <div>
            <p className="text-zinc-500 dark:text-zinc-400">Enter email HTML to analyze compatibility</p>
            <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
              We&apos;ll check your CSS against {MAJOR_CLIENTS.length} major email clients
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-1 border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
            <button
              onClick={() => {
                return setFilter('all');
              }}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              All ({issues.length})
            </button>
            <button
              onClick={() => {
                return setFilter('errors');
              }}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                filter === 'errors'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              Issues ({errors.length})
            </button>
            <button
              onClick={() => {
                return setFilter('warnings');
              }}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                filter === 'warnings'
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              Issues + Warnings ({errors.length + warnings.length})
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {filteredIssues.map((issue, index) => {
                return (
                  <IssueCard
                    issue={issue}
                    key={issue.feature.slug}
                    isExpanded={expandedIndex === index}
                    onToggle={() => {
                      return setExpandedIndex(expandedIndex === index ? null : index);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Helper to create issues from extracted features and caniemail data
export function createCompatibilityIssues(
  extractedProperties: Set<string>,
  cssPropertyMap: Map<string, CanIEmailFeature>
): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];
  const processedSlugs = new Set<string>();

  for (const property of extractedProperties) {
    // Try to find matching caniemail feature
    const feature = cssPropertyMap.get(property);

    if (!feature) {
      continue;
    }

    // Avoid duplicates (e.g., "background" and "background-color" mapping to same feature)
    if (processedSlugs.has(feature.slug)) {
      continue;
    }

    processedSlugs.add(feature.slug);

    const summary = getFeatureSupportSummary(feature);

    // Determine severity based on support
    let severity: CompatibilityIssue['severity'] = 'success';

    if (summary.unsupported.length > 0) {
      severity = 'error';
    } else if (summary.partial.length > 0) {
      severity = 'warning';
    }

    issues.push({
      feature,
      property,
      severity,
      summary,
    });
  }

  return issues;
}
