import { ExtendedMethodologicalProfile, Department, ProfileUser } from '../types/profile';

// =============================================================================
// Departments
// =============================================================================

const departments: Department[] = [
  {
    id: 'pmo',
    name: 'PMO',
    description: 'Project Management Office. Autonomous — creates and approves without dependencies.',
  },
  {
    id: 'product-management',
    name: 'Product Management',
    description: 'Product Managers. Autonomous — each manages their products and approves changes within their scope.',
  },
  {
    id: 'operations',
    name: 'Operations',
    description: 'IT Operations. Technicians create and escalate to coordinator for approval.',
  },
  {
    id: 'support',
    name: 'Support',
    description: 'IT Support. Technicians create and escalate to coordinator for approval.',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'IT Infrastructure. Technicians create and escalate to coordinator for approval.',
  },
];

// =============================================================================
// Users (14 simulated users)
// =============================================================================

const users: ProfileUser[] = [
  // --- PMO (2) — Autonomous ---
  {
    id: 'USR-001',
    username: 'coord-pmo',
    displayName: 'Coord. PMO',
    department: 'pmo',
    permissionLevel: 'autonomous',
    canCreate: true,
    canApprove: true,
    escalatesTo: null,
  },
  {
    id: 'USR-002',
    username: 'pmo',
    displayName: 'PMO',
    department: 'pmo',
    permissionLevel: 'autonomous',
    canCreate: true,
    canApprove: true,
    escalatesTo: null,
  },

  // --- Product Management (6) — Autonomous ---
  {
    id: 'USR-003',
    username: 'pdm-1',
    displayName: 'PdM 1',
    department: 'product-management',
    permissionLevel: 'autonomous',
    canCreate: true,
    canApprove: true,
    escalatesTo: null,
  },
  {
    id: 'USR-004',
    username: 'pdm-2',
    displayName: 'PdM 2',
    department: 'product-management',
    permissionLevel: 'autonomous',
    canCreate: true,
    canApprove: true,
    escalatesTo: null,
  },
  {
    id: 'USR-005',
    username: 'pdm-3',
    displayName: 'PdM 3',
    department: 'product-management',
    permissionLevel: 'autonomous',
    canCreate: true,
    canApprove: true,
    escalatesTo: null,
  },
  {
    id: 'USR-006',
    username: 'pdm-4',
    displayName: 'PdM 4',
    department: 'product-management',
    permissionLevel: 'autonomous',
    canCreate: true,
    canApprove: true,
    escalatesTo: null,
  },
  {
    id: 'USR-007',
    username: 'pdm-5',
    displayName: 'PdM 5',
    department: 'product-management',
    permissionLevel: 'autonomous',
    canCreate: true,
    canApprove: true,
    escalatesTo: null,
  },
  {
    id: 'USR-008',
    username: 'pdm-6',
    displayName: 'PdM 6',
    department: 'product-management',
    permissionLevel: 'autonomous',
    canCreate: true,
    canApprove: true,
    escalatesTo: null,
  },

  // --- Operations (2) — Coordinator approves, Technician escalates ---
  {
    id: 'USR-009',
    username: 'coord-ops',
    displayName: 'Coord. Operaciones',
    department: 'operations',
    permissionLevel: 'autonomous',
    canCreate: true,
    canApprove: true,
    escalatesTo: null,
  },
  {
    id: 'USR-010',
    username: 'tech-ops',
    displayName: 'Técnico Operaciones',
    department: 'operations',
    permissionLevel: 'requires-approval',
    canCreate: true,
    canApprove: false,
    escalatesTo: 'USR-009',
  },

  // --- Support (2) — Coordinator approves, Technician escalates ---
  {
    id: 'USR-011',
    username: 'coord-support',
    displayName: 'Coord. Soporte',
    department: 'support',
    permissionLevel: 'autonomous',
    canCreate: true,
    canApprove: true,
    escalatesTo: null,
  },
  {
    id: 'USR-012',
    username: 'tech-support',
    displayName: 'Técnico Soporte',
    department: 'support',
    permissionLevel: 'requires-approval',
    canCreate: true,
    canApprove: false,
    escalatesTo: 'USR-011',
  },

  // --- Infrastructure (2) — Coordinator approves, Technician escalates ---
  {
    id: 'USR-013',
    username: 'coord-infra',
    displayName: 'Coord. Infraestructura',
    department: 'infrastructure',
    permissionLevel: 'autonomous',
    canCreate: true,
    canApprove: true,
    escalatesTo: null,
  },
  {
    id: 'USR-014',
    username: 'tech-infra',
    displayName: 'Técnico Infraestructura',
    department: 'infrastructure',
    permissionLevel: 'requires-approval',
    canCreate: true,
    canApprove: false,
    escalatesTo: 'USR-013',
  },
];

// =============================================================================
// Profile Definition
// =============================================================================

export const prince2ItilCustomProfile: ExtendedMethodologicalProfile = {
  id: 'prince2-itil-custom',
  name: 'PRINCE2 + ITIL + Custom Governance',
  description:
    'PRINCE2 project management and ITIL 4 service management with a custom organizational governance layer. Includes simulated users, departments, and permission rules to demonstrate how ChangeFlow adapts to a real organization\'s structure.',
  projectMethodology: 'PRINCE2',
  operationsMethodology: 'ITIL 4',

  vocabulary: {
    standardChange: 'Standard Change',
    normalChange: 'Normal Change',
    emergencyChange: 'Emergency Change',
    projectOnly: 'Project Change',
    operationalOnly: 'Operational Change',
    crossDomain: 'Cross-domain Change',
    stageRequest: 'Capture Issue',
    stageClassify: 'Examine Issue',
    stageAssess: 'Assess Impact',
    stageApprove: 'Change Authority Decision',
    stageImplement: 'Execute Work Package',
    stageReview: 'Capture Lessons',
    stageClose: 'Close Issue',
    thresholdBreach: 'Exception',
    changeRegister: 'Issue Register',
    projectPlan: 'Stage Plan',
    phaseBoundary: 'Stage Gate',
    businessJustification: 'Business Case',
    postChangeReview: 'Lessons Learned',
  },

  roles: {
    projectApprovalAuthority: 'Change Authority (Project Board)',
    operationalApprovalAuthority: 'Change Advisory Board (CAB)',
    seniorProjectAuthority: 'Project Board',
    emergencyProjectAuthority: 'Project Board (Exception)',
    emergencyOpsAuthority: 'Emergency CAB (ECAB)',
    changeCoordinator: 'PMO / Coord. Área',
    projectAssessor: 'Product Manager / Project Manager',
    operationalAssessor: 'Coord. Operaciones',
    projectExecutive: 'Executive',
  },

  artifacts: {
    changeRecord: 'Issue (Request for Change)',
    changeRegister: 'Issue Register',
    impactAssessment: 'Issue Report',
    approvalRecord: 'Change Authority Decision',
    escalationReport: 'Exception Report',
    implementationPlan: 'Updated Stage Plan',
    backoutPlan: 'Exception Plan',
    postChangeReview: 'Lessons Log Entry',
    riskRegister: 'Risk Register',
    configurationRecords: 'Configuration Item Records',
  },

  escalation: {
    breachTerm: 'Exception',
    breachProcess: 'Exception Process (Directing a Project)',
    breachReport: 'Exception Report',
    breachAuthority: 'Project Board',
    breachOutcomes: [
      'Approve Exception Plan',
      'Amend project tolerances',
      'Request revised Stage Plan',
      'Premature close of the project',
    ],
  },

  // --- Custom Extension: Users & Permissions ---
  customExtension: {
    departments,
    users,
  },
};
