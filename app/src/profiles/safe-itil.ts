import { MethodologicalProfile } from '../types/profile';

export const safeItilProfile: MethodologicalProfile = {
  id: 'safe-itil',
  name: 'SAFe / Agile + ITIL 4',
  description:
    'For organizations using Scaled Agile Framework (SAFe) or general Agile practices for delivery and ITIL 4 for service management. Common in organizations transitioning from traditional to agile delivery while maintaining operational governance.',
  projectMethodology: 'SAFe / Agile',
  operationsMethodology: 'ITIL 4',

  vocabulary: {
    standardChange: 'Pre-approved Change',
    normalChange: 'Backlog Change Item',
    emergencyChange: 'Expedited Change',
    projectOnly: 'ART-scoped Change',
    operationalOnly: 'Service Change',
    crossDomain: 'Cross-domain Change',
    stageRequest: 'Capture in Backlog',
    stageClassify: 'Triage & Classify',
    stageAssess: 'Impact Analysis',
    stageApprove: 'Approve Change',
    stageImplement: 'Deliver in PI/Sprint',
    stageReview: 'Inspect & Adapt',
    stageClose: 'Close Change',
    thresholdBreach: 'Impediment Escalation',
    changeRegister: 'Change Backlog',
    projectPlan: 'PI Planning Board',
    phaseBoundary: 'PI Boundary',
    businessJustification: 'Lean Business Case',
    postChangeReview: 'Inspect & Adapt',
  },

  roles: {
    projectApprovalAuthority: 'Product Management / RTE',
    operationalApprovalAuthority: 'Change Advisory Board (CAB)',
    seniorProjectAuthority: 'Lean Portfolio Management (LPM)',
    emergencyProjectAuthority: 'RTE (Emergency)',
    emergencyOpsAuthority: 'Emergency CAB (ECAB)',
    changeCoordinator: 'Release Train Engineer (RTE)',
    projectAssessor: 'Product Owner / Scrum Master',
    operationalAssessor: 'Change Manager',
    projectExecutive: 'Epic Owner / Business Owner',
  },

  artifacts: {
    changeRecord: 'Change Item (Feature/Enabler)',
    changeRegister: 'Change Backlog',
    impactAssessment: 'Impact Analysis',
    approvalRecord: 'Approval Record',
    escalationReport: 'Impediment Escalation Report',
    implementationPlan: 'PI Plan / Sprint Plan',
    backoutPlan: 'Rollback Plan',
    postChangeReview: 'Inspect & Adapt Report',
    riskRegister: 'ROAM Board',
    configurationRecords: 'CMDB / CI Records',
  },

  escalation: {
    breachTerm: 'Impediment Escalation',
    breachProcess: 'Escalation to LPM via RTE',
    breachReport: 'Impediment Escalation Report',
    breachAuthority: 'Lean Portfolio Management (LPM)',
    breachOutcomes: [
      'Adjust PI objectives',
      'Reallocate capacity across teams',
      'Approve additional PI to resolve',
      'Descope or cancel the initiative',
    ],
  },
};
