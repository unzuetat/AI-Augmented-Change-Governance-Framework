import { useStore } from '../store';
import {
  ArrowRight,
  ArrowRightLeft,
  Zap,
  AlertTriangle,
  Info,
} from 'lucide-react';

const stageColors: Record<string, { bg: string; border: string; text: string }> = {
  request:   { bg: 'bg-gray-50',    border: 'border-gray-300',   text: 'text-gray-700' },
  classify:  { bg: 'bg-purple-50',  border: 'border-purple-300', text: 'text-purple-700' },
  assess:    { bg: 'bg-orange-50',  border: 'border-orange-300', text: 'text-orange-700' },
  approve:   { bg: 'bg-teal-50',    border: 'border-teal-300',   text: 'text-teal-700' },
  implement: { bg: 'bg-blue-50',    border: 'border-blue-300',   text: 'text-blue-700' },
  review:    { bg: 'bg-green-50',   border: 'border-green-300',  text: 'text-green-700' },
  close:     { bg: 'bg-gray-50',    border: 'border-gray-300',   text: 'text-gray-600' },
};

export default function WorkflowViewer() {
  const { activeProfile } = useStore();
  const vocab = activeProfile.vocabulary;
  const roles = activeProfile.roles;
  const artifacts = activeProfile.artifacts;
  const escalation = activeProfile.escalation;

  const stages = [
    {
      key: 'request',
      name: vocab.stageRequest,
      universal: 'REQUEST',
      description: 'A change is identified and formally captured. The requester provides initial details about what needs to change and why.',
      responsible: roles.changeCoordinator,
      artifact: artifacts.changeRecord,
      rules: ['All changes enter through this single point', 'Minimum required fields must be completed'],
    },
    {
      key: 'classify',
      name: vocab.stageClassify,
      universal: 'CLASSIFY',
      description: 'The change is categorized by type, scope, and initial risk. The system determines if it affects projects, operations, or both.',
      responsible: roles.changeCoordinator,
      artifact: artifacts.changeRegister,
      rules: [
        'Scope determination: does this affect live services? Active projects? Both?',
        'Cross-domain changes flagged for dual-track processing',
        'Emergency changes routed to compressed lifecycle',
      ],
    },
    {
      key: 'assess',
      name: vocab.stageAssess,
      universal: 'ASSESS',
      description: 'Full impact analysis across both project and operational dimensions. Cross-domain changes are assessed by both domains.',
      responsible: `${roles.projectAssessor} + ${roles.operationalAssessor}`,
      artifact: artifacts.impactAssessment,
      rules: [
        'Project impact: schedule, scope, cost, quality, risk',
        'Operational impact: services, SLA, dependencies, change windows',
        'Cross-domain: mandatory assessment from BOTH sides',
      ],
    },
    {
      key: 'approve',
      name: vocab.stageApprove,
      universal: 'APPROVE',
      description: 'The appropriate authority reviews the assessment and decides. Cross-domain changes require approval from both project and operational authorities.',
      responsible: `${roles.projectApprovalAuthority} / ${roles.operationalApprovalAuthority}`,
      artifact: artifacts.approvalRecord,
      rules: [
        'Project-only: approved by ' + roles.projectApprovalAuthority,
        'Operational-only: approved by ' + roles.operationalApprovalAuthority,
        'Cross-domain: BOTH must approve — neither overrides the other',
        'Possible outcomes: approved, approved with conditions, deferred, rejected',
      ],
    },
    {
      key: 'implement',
      name: vocab.stageImplement,
      universal: 'IMPLEMENT',
      description: 'The approved change is executed according to the implementation plan. A rollback plan must be ready before execution begins.',
      responsible: roles.projectAssessor,
      artifact: artifacts.implementationPlan,
      rules: [
        'Rollback plan (' + artifacts.backoutPlan + ') must exist before start',
        'Implementation within approved change window',
        'Status updates at defined checkpoints',
      ],
    },
    {
      key: 'review',
      name: vocab.stageReview,
      universal: 'REVIEW',
      description: 'Post-implementation review combining project lessons and operational PIR into a single unified activity.',
      responsible: `${roles.projectAssessor} + ${roles.operationalAssessor}`,
      artifact: artifacts.postChangeReview,
      rules: [
        'Was the change implemented as planned?',
        'Did it achieve the expected outcome?',
        'What lessons should be captured?',
        'Are there follow-up actions needed?',
      ],
    },
    {
      key: 'close',
      name: vocab.stageClose,
      universal: 'CLOSE',
      description: 'All artifacts are complete, review is done, and the change record is formally closed.',
      responsible: roles.changeCoordinator,
      artifact: artifacts.configurationRecords,
      rules: [
        'All documentation complete',
        'Configuration records (' + artifacts.configurationRecords + ') updated',
        'Lessons logged for future reference',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile context */}
      <div className="bg-cf-50 border border-cf-200 rounded-xl px-4 py-3 flex items-start gap-3">
        <Info size={16} className="text-cf-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-cf-700">
            Showing workflow in: {activeProfile.name}
          </p>
          <p className="text-xs text-cf-600 mt-0.5">
            Stage names, roles, and artifacts reflect the selected profile vocabulary. Switch profiles in the header to compare.
          </p>
        </div>
      </div>

      {/* Visual pipeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
          Universal Governance Lifecycle
        </h3>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {stages.map((stage, i) => {
            const colors = stageColors[stage.key];
            return (
              <div key={stage.key} className="flex items-center gap-1">
                <div
                  className={`${colors.bg} ${colors.border} border rounded-lg px-3 py-2.5 min-w-[110px] text-center`}
                >
                  <span className="block text-[9px] font-mono text-gray-400 uppercase">
                    {stage.universal}
                  </span>
                  <span className={`block text-xs font-semibold ${colors.text} mt-0.5`}>
                    {stage.name}
                  </span>
                </div>
                {i < stages.length - 1 && (
                  <ArrowRight size={14} className="text-gray-300 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Special paths */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Cross-domain */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRightLeft size={16} className="text-pink-600" strokeWidth={1.8} />
            <h4 className="text-xs font-bold text-gray-700">Cross-domain Path</h4>
          </div>
          <p className="text-xs text-gray-500 mb-2">
            When a change affects both projects and live services.
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-start gap-2">
              <span className="text-pink-400 mt-0.5">•</span>
              <span className="text-gray-600">Dual assessment (project + operational)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-pink-400 mt-0.5">•</span>
              <span className="text-gray-600">Dual approval required — neither overrides</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-pink-400 mt-0.5">•</span>
              <span className="text-gray-600">Unified post-change review</span>
            </div>
          </div>
        </div>

        {/* Emergency */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-orange-600" strokeWidth={1.8} />
            <h4 className="text-xs font-bold text-gray-700">Emergency Path</h4>
          </div>
          <p className="text-xs text-gray-500 mb-2">
            For urgent changes that cannot wait for the full lifecycle.
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              <span className="text-gray-600">Compressed lifecycle (classify → approve → implement)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              <span className="text-gray-600">Approved by {roles.emergencyProjectAuthority} / {roles.emergencyOpsAuthority}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              <span className="text-gray-600">Full retrospective assessment within 5 business days</span>
            </div>
          </div>
        </div>

        {/* Threshold breach */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-red-600" strokeWidth={1.8} />
            <h4 className="text-xs font-bold text-gray-700">{escalation.breachTerm}</h4>
          </div>
          <p className="text-xs text-gray-500 mb-2">
            When a change pushes the project beyond agreed boundaries.
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              <span className="text-gray-600">Triggers {escalation.breachProcess}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              <span className="text-gray-600">Escalated to {escalation.breachAuthority}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              <span className="text-gray-600">Requires {escalation.breachReport}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed stage breakdown */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest">
          Stage Detail
        </h3>
        {stages.map((stage) => {
          const colors = stageColors[stage.key];
          return (
            <div
              key={stage.key}
              className="bg-white rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2 shrink-0 w-44">
                  <span className={`w-2.5 h-2.5 rounded-full ${colors.bg.replace('bg-', 'bg-stage-').replace('-50', '')}`} style={{backgroundColor: stage.key === 'request' ? '#868e96' : stage.key === 'classify' ? '#ae3ec9' : stage.key === 'assess' ? '#f76707' : stage.key === 'approve' ? '#1098ad' : stage.key === 'implement' ? '#4263eb' : stage.key === 'review' ? '#2b8a3e' : '#495057'}} />
                  <div>
                    <span className="text-[9px] font-mono text-gray-400 uppercase block">
                      {stage.universal}
                    </span>
                    <span className={`text-sm font-semibold ${colors.text}`}>
                      {stage.name}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-3">{stage.description}</p>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mb-3">
                    <div>
                      <span className="text-gray-400 font-medium">Responsible: </span>
                      <span className="text-gray-600">{stage.responsible}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium">Key artifact: </span>
                      <span className="text-gray-600">{stage.artifact}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {stage.rules.map((rule, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span className={`${colors.text} mt-0.5 opacity-50`}>•</span>
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
