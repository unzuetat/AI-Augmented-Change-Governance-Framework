import { useStore } from '../store';
import { changes as seedChanges } from '../data/seed';
import { useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,

  ArrowRightLeft,
  Shield,
  Zap,
  FileText,
} from 'lucide-react';

const stageColorMap: Record<string, string> = {
  draft:              'bg-gray-100 text-gray-600',
  submitted:          'bg-gray-200 text-gray-700',
  classified:         'bg-purple-100 text-purple-700',
  assessing:          'bg-orange-100 text-orange-700',
  assessed:           'bg-orange-50 text-orange-600',
  'pending-approval': 'bg-teal-100 text-teal-700',
  approved:           'bg-blue-100 text-blue-700',
  'approved-with-conditions': 'bg-blue-50 text-blue-600',
  rejected:           'bg-red-100 text-red-700',
  deferred:           'bg-yellow-100 text-yellow-700',
  implementing:       'bg-indigo-100 text-indigo-700',
  implemented:        'bg-green-100 text-green-700',
  'in-review':        'bg-green-50 text-green-600',
  closed:             'bg-gray-100 text-gray-500',
};

const riskColorMap: Record<string, string> = {
  low:      'bg-risk-low/20 text-green-800',
  medium:   'bg-risk-medium/20 text-yellow-800',
  high:     'bg-risk-high/20 text-red-700',
  critical: 'bg-risk-critical/20 text-red-900',
};

const scopeIcons: Record<string, typeof ArrowRightLeft> = {
  'project-only':     FileText,
  'operational-only': Shield,
  'cross-domain':     ArrowRightLeft,
};

export default function Dashboard() {
  const { changes, setChanges, activeProfile } = useStore();

  useEffect(() => {
    if (changes.length === 0) {
      setChanges(seedChanges);
    }
  }, []);

  const total = changes.length;
  const active = changes.filter(
    (c) => !['closed', 'rejected'].includes(c.status)
  ).length;
  const emergency = changes.filter((c) => c.type === 'emergency').length;
  const crossDomain = changes.filter((c) => c.scope === 'cross-domain').length;
  const highRisk = changes.filter(
    (c) => c.risk === 'high' || c.risk === 'critical'
  ).length;
  const closed = changes.filter((c) => c.status === 'closed').length;

  const statCards = [
    { label: 'Total Changes',    value: total,       icon: FileText,       color: 'text-cf-600' },
    { label: 'Active',           value: active,      icon: Clock,          color: 'text-teal-600' },
    { label: 'Emergency',        value: emergency,   icon: Zap,            color: 'text-orange-600' },
    { label: 'Cross-domain',     value: crossDomain, icon: ArrowRightLeft, color: 'text-pink-600' },
    { label: 'High / Critical',  value: highRisk,    icon: AlertTriangle,  color: 'text-red-600' },
    { label: 'Closed',           value: closed,      icon: CheckCircle2,   color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">
              Active Governance Profile
            </p>
            <h3 className="text-xl font-bold text-gray-800">
              {activeProfile.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              {activeProfile.description}
            </p>
          </div>
          <div className="text-right shrink-0 ml-4">
            <span className="text-[10px] font-mono text-gray-400 block">PROJECT</span>
            <span className="text-xs font-semibold text-cf-700">{activeProfile.projectMethodology}</span>
            <span className="text-[10px] font-mono text-gray-400 block mt-2">OPERATIONS</span>
            <span className="text-xs font-semibold text-cf-700">{activeProfile.operationsMethodology}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-start"
          >
            <Icon size={16} className={`${color} mb-2`} strokeWidth={1.8} />
            <span className="text-2xl font-bold text-gray-800">{value}</span>
            <span className="text-[11px] text-gray-400 font-medium mt-0.5">{label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">All Changes</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {changes.map((change) => {
            const ScopeIcon = scopeIcons[change.scope] || FileText;
            return (
              <div
                key={change.id}
                className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
              >
                <span className="font-mono text-xs text-gray-400 w-16 shrink-0">
                  {change.id}
                </span>
                <ScopeIcon size={14} className="text-gray-400 shrink-0" strokeWidth={1.8} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {change.title}
                  </p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {change.description}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    riskColorMap[change.risk] || ''
                  }`}
                >
                  {change.risk}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                    stageColorMap[change.status] || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {change.status.replace(/-/g, ' ')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
          Universal Governance Lifecycle (profile vocabulary)
        </h3>
        <div className="flex flex-wrap gap-2">
          {([
            ['stageRequest', 'bg-stage-request'],
            ['stageClassify', 'bg-stage-classify'],
            ['stageAssess', 'bg-stage-assess'],
            ['stageApprove', 'bg-stage-approve'],
            ['stageImplement', 'bg-stage-implement'],
            ['stageReview', 'bg-stage-review'],
            ['stageClose', 'bg-stage-close'],
          ] as const).map(([key, bgClass]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${bgClass}`} />
              <span className="text-xs font-medium text-gray-600">
                {activeProfile.vocabulary[key]}
              </span>
              {key !== 'stageClose' && (
                <span className="text-gray-300 text-xs">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
