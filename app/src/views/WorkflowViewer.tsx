import { useStore } from '../store';
import {
  ArrowRight,
  ArrowRightLeft,
  Zap,
  AlertTriangle,
  Info,
} from 'lucide-react';

const stageColors: Record<string, { bg: string; border: string; text: string; color: string }> = {
  request:   { bg: 'bg-gray-50',    border: 'border-gray-300',   text: 'text-gray-700',   color: '#868e96' },
  classify:  { bg: 'bg-purple-50',  border: 'border-purple-300', text: 'text-purple-700',  color: '#ae3ec9' },
  assess:    { bg: 'bg-orange-50',  border: 'border-orange-300', text: 'text-orange-700',  color: '#f76707' },
  approve:   { bg: 'bg-teal-50',    border: 'border-teal-300',   text: 'text-teal-700',    color: '#1098ad' },
  implement: { bg: 'bg-blue-50',    border: 'border-blue-300',   text: 'text-blue-700',    color: '#4263eb' },
  review:    { bg: 'bg-green-50',   border: 'border-green-300',  text: 'text-green-700',   color: '#2b8a3e' },
  close:     { bg: 'bg-gray-50',    border: 'border-gray-300',   text: 'text-gray-600',    color: '#495057' },
};

export default function WorkflowViewer() {
  const { activeProfile } = useStore();
  const vocab = activeProfile.vocabulary;
  const roles = activeProfile.roles;
  const artifacts = activeProfile.artifacts;
  const escalation = activeProfile.escalation;

  const stages = [
    { key: 'request', name: vocab.stageRequest, universal: 'REQUEST', description: 'A change is identified and formally captured.', responsible: roles.changeCoordinator, artifact: artifacts.changeRecord, rules: ['All changes enter through this single point', 'Minimum required fields must be completed'] },
    { key: 'classify', name: vocab.stageClassify, universal: 'CLASSIFY', description: 'The change is categorized by type, scope, and initial risk.', responsible: roles.changeCoordinator, artifact: artifacts.changeRegister, rules: ['Scope determination: project, operational, or both?', 'Cross-domain changes flagged for dual-track', 'Emergency changes routed to compressed lifecycle'] },
    { key: 'assess', name: vocab.stageAssess, universal: 'ASSESS', description: 'Full impact analysis across project and operational dimensions.', responsible: `${roles.projectAssessor} + ${roles.operationalAssessor}`, artifact: artifacts.impactAssessment, rules: ['Project impact: schedule, scope, cost, quality, risk', 'Operational impact: services, SLA, dependencies', 'Cross-domain: mandatory assessment from BOTH sides'] },
    { key: 'approve', name: vocab.stageApprove, universal: 'APPROVE', description: 'The appropriate authority reviews and decides.', responsible: `${roles.projectApprovalAuthority} / ${roles.operationalApprovalAuthority}`, artifact: artifacts.approvalRecord, rules: ['Project-only: ' + roles.projectApprovalAuthority, 'Operational-only: ' + roles.operationalApprovalAuthority, 'Cross-domain: BOTH must approve', 'Outcomes: approved, conditions, deferred, rejected'] },
    { key: 'implement', name: vocab.stageImplement, universal: 'IMPLEMENT', description: 'The approved change is executed per the implementation plan.', responsible: roles.projectAssessor, artifact: artifacts.implementationPlan, rules: [artifacts.backoutPlan + ' must exist before start', 'Implementation within approved change window', 'Status updates at defined checkpoints'] },
    { key: 'review', name: vocab.stageReview, universal: 'REVIEW', description: 'Unified post-implementation review.', responsible: `${roles.projectAssessor} + ${roles.operationalAssessor}`, artifact: artifacts.postChangeReview, rules: ['Was the change implemented as planned?', 'Did it achieve the expected outcome?', 'What lessons should be captured?'] },
    { key: 'close', name: vocab.stageClose, universal: 'CLOSE', description: 'All artifacts complete, change record formally closed.', responsible: roles.changeCoordinator, artifact: artifacts.configurationRecords, rules: ['All documentation complete', artifacts.configurationRecords + ' updated', 'Lessons logged for future reference'] },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-cf-50 border border-cf-200 rounded px-3 py-2 flex items-start gap-2">
        <Info size={14} className="text-cf-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-[11px] font-semibold text-cf-800">Showing workflow in: {activeProfile.name}</p>
          <p className="text-[10px] text-cf-600 mt-0.5">Stage names, roles, and artifacts reflect the selected profile. Switch profiles in the header to compare.</p>
        </div>
      </div>

      {/* Pipeline */}
      <div className="bg-white rounded border border-gray-200 p-4">
        <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Universal governance lifecycle</div>
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {stages.map((stage, i) => {
            const c = stageColors[stage.key];
            return (
              <div key={stage.key} className="flex items-center gap-1 flex-1">
                <div className="flex-1 text-center py-2 bg-gray-50 rounded-sm border-t-2" style={{ borderTopColor: c.color }}>
                  <div className="text-[8px] text-gray-400 uppercase">{stage.universal}</div>
                  <div className={`text-[10px] font-medium ${c.text} mt-0.5`}>{stage.name}</div>
                </div>
                {i < stages.length - 1 && (
                  <ArrowRight size={12} className="text-gray-300 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Special paths */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-white rounded border border-gray-200 p-3">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRightLeft size={14} className="text-pink-700" strokeWidth={1.8} />
            <span className="text-xs font-semibold text-gray-700">Cross-domain path</span>
          </div>
          <p className="text-[10px] text-gray-500 mb-2">When a change affects both projects and live services.</p>
          <div className="space-y-1 text-[10px]">
            <div className="flex items-start gap-1.5"><span className="text-pink-400 mt-0.5">•</span><span className="text-gray-600">Dual assessment (project + operational)</span></div>
            <div className="flex items-start gap-1.5"><span className="text-pink-400 mt-0.5">•</span><span className="text-gray-600">Dual approval — neither overrides</span></div>
            <div className="flex items-start gap-1.5"><span className="text-pink-400 mt-0.5">•</span><span className="text-gray-600">Unified post-change review</span></div>
          </div>
        </div>
        <div className="bg-white rounded border border-gray-200 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-orange-700" strokeWidth={1.8} />
            <span className="text-xs font-semibold text-gray-700">Emergency path</span>
          </div>
          <p className="text-[10px] text-gray-500 mb-2">For urgent changes that cannot wait.</p>
          <div className="space-y-1 text-[10px]">
            <div className="flex items-start gap-1.5"><span className="text-orange-400 mt-0.5">•</span><span className="text-gray-600">Compressed lifecycle</span></div>
            <div className="flex items-start gap-1.5"><span className="text-orange-400 mt-0.5">•</span><span className="text-gray-600">Approved by {roles.emergencyProjectAuthority} / {roles.emergencyOpsAuthority}</span></div>
            <div className="flex items-start gap-1.5"><span className="text-orange-400 mt-0.5">•</span><span className="text-gray-600">Retrospective within 5 business days</span></div>
          </div>
        </div>
        <div className="bg-white rounded border border-gray-200 p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-red-700" strokeWidth={1.8} />
            <span className="text-xs font-semibold text-gray-700">{escalation.breachTerm}</span>
          </div>
          <p className="text-[10px] text-gray-500 mb-2">When a change exceeds agreed boundaries.</p>
          <div className="space-y-1 text-[10px]">
            <div className="flex items-start gap-1.5"><span className="text-red-400 mt-0.5">•</span><span className="text-gray-600">Triggers {escalation.breachProcess}</span></div>
            <div className="flex items-start gap-1.5"><span className="text-red-400 mt-0.5">•</span><span className="text-gray-600">Escalated to {escalation.breachAuthority}</span></div>
            <div className="flex items-start gap-1.5"><span className="text-red-400 mt-0.5">•</span><span className="text-gray-600">Requires {escalation.breachReport}</span></div>
          </div>
        </div>
      </div>

      {/* Stage detail */}
      <div className="space-y-2">
        <div className="text-[10px] text-gray-400 uppercase tracking-widest">Stage detail</div>
        {stages.map((stage) => {
          const c = stageColors[stage.key];
          return (
            <div key={stage.key} className="bg-white rounded border border-gray-200 p-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2 shrink-0 w-40">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <div>
                    <span className="text-[8px] font-mono text-gray-400 uppercase block">{stage.universal}</span>
                    <span className={`text-xs font-semibold ${c.text}`}>{stage.name}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-gray-600 mb-2">{stage.description}</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px] mb-2">
                    <div><span className="text-gray-400 font-medium">Responsible: </span><span className="text-gray-600">{stage.responsible}</span></div>
                    <div><span className="text-gray-400 font-medium">Artifact: </span><span className="text-gray-600">{stage.artifact}</span></div>
                  </div>
                  <div className="space-y-0.5">
                    {stage.rules.map((rule, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[10px]">
                        <span className={`${c.text} mt-0.5 opacity-50`}>•</span>
                        <span className="text-gray-500">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
