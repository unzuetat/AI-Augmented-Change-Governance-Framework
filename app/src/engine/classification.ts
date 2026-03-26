import { ChangeType, ChangeScope, RiskLevel, ChangeCategory } from '../types';

export interface ClassificationSuggestion {
  type: { value: ChangeType; confidence: number; reason: string };
  risk: { value: RiskLevel; confidence: number; reason: string };
  category: { value: ChangeCategory; confidence: number; reason: string };
  scope: { value: ChangeScope; confidence: number; reason: string };
}

interface KeywordRule {
  keywords: string[];
  weight: number;
}

const typeRules: Record<ChangeType, KeywordRule[]> = {
  emergency: [
    { keywords: ['emergency', 'urgent', 'critical', 'outage', 'down', 'breach', 'vulnerability', 'exploit', 'zero-day', 'p1', 'sev1', 'incident'], weight: 3 },
    { keywords: ['immediate', 'asap', 'now', 'broken', 'crash', 'failure', 'unavailable'], weight: 2 },
  ],
  standard: [
    { keywords: ['routine', 'scheduled', 'regular', 'maintenance', 'patch', 'update', 'renewal', 'certificate', 'license'], weight: 3 },
    { keywords: ['minor', 'cosmetic', 'documentation', 'cleanup', 'housekeeping'], weight: 2 },
    { keywords: ['pre-approved', 'standard', 'template', 'recurring'], weight: 3 },
  ],
  normal: [
    { keywords: ['new', 'feature', 'enhancement', 'migration', 'upgrade', 'redesign', 'replace', 'integrate', 'implement'], weight: 2 },
    { keywords: ['change', 'modify', 'add', 'remove', 'extend', 'refactor'], weight: 1 },
  ],
};

const categoryRules: Record<ChangeCategory, KeywordRule[]> = {
  infrastructure: [
    { keywords: ['server', 'vm', 'virtual', 'hardware', 'storage', 'disk', 'memory', 'cpu', 'rack', 'datacenter', 'cloud', 'aws', 'azure', 'host'], weight: 3 },
    { keywords: ['capacity', 'scale', 'provision', 'deploy', 'cluster'], weight: 2 },
  ],
  application: [
    { keywords: ['application', 'app', 'software', 'code', 'api', 'frontend', 'backend', 'module', 'feature', 'release', 'deploy', 'version'], weight: 3 },
    { keywords: ['bug', 'fix', 'patch', 'update', 'ui', 'interface', 'database', 'query'], weight: 2 },
  ],
  security: [
    { keywords: ['security', 'firewall', 'vulnerability', 'cve', 'patch', 'encrypt', 'certificate', 'ssl', 'tls', 'access', 'permission', 'authentication', 'mfa'], weight: 3 },
    { keywords: ['audit', 'compliance', 'penetration', 'scan', 'threat', 'malware', 'antivirus'], weight: 2 },
  ],
  data: [
    { keywords: ['data', 'database', 'migration', 'schema', 'table', 'backup', 'restore', 'etl', 'warehouse', 'analytics', 'report'], weight: 3 },
    { keywords: ['record', 'field', 'column', 'index', 'query', 'sql', 'archive'], weight: 2 },
  ],
  network: [
    { keywords: ['network', 'dns', 'ip', 'subnet', 'vlan', 'router', 'switch', 'load balancer', 'vpn', 'bandwidth', 'latency'], weight: 3 },
    { keywords: ['port', 'protocol', 'tcp', 'http', 'ssl', 'proxy', 'cdn', 'domain'], weight: 2 },
  ],
  configuration: [
    { keywords: ['configuration', 'config', 'setting', 'parameter', 'environment', 'variable', 'policy', 'rule', 'threshold', 'toggle'], weight: 3 },
    { keywords: ['enable', 'disable', 'flag', 'option', 'preference', 'tuning'], weight: 2 },
  ],
};

const riskIndicators = {
  critical: {
    keywords: ['production', 'live', 'customer-facing', 'revenue', 'core', 'critical', 'all users', 'entire', 'complete outage', 'data loss'],
    weight: 3,
  },
  high: {
    keywords: ['major', 'significant', 'multiple services', 'cross-domain', 'downtime', 'sla', 'dependency', 'breaking change', 'irreversible'],
    weight: 2,
  },
  medium: {
    keywords: ['moderate', 'some impact', 'partial', 'limited', 'subset', 'team', 'department'],
    weight: 1,
  },
  low: {
    keywords: ['minor', 'no impact', 'cosmetic', 'documentation', 'internal', 'dev', 'test', 'staging', 'non-production'],
    weight: 1,
  },
};

const scopeIndicators = {
  'cross-domain': {
    keywords: ['service and project', 'infrastructure and application', 'affects operations', 'affects project', 'cross-domain', 'both teams', 'production service', 'live service'],
    weight: 3,
  },
  'operational-only': {
    keywords: ['operational', 'service', 'infrastructure', 'maintenance', 'monitoring', 'sla', 'availability', 'incident', 'capacity', 'itil'],
    weight: 2,
  },
  'project-only': {
    keywords: ['project', 'sprint', 'feature', 'requirement', 'scope', 'milestone', 'deliverable', 'phase', 'release plan'],
    weight: 2,
  },
};

function scoreText(text: string, rules: KeywordRule[]): number {
  const lower = text.toLowerCase();
  let score = 0;
  for (const rule of rules) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) {
        score += rule.weight;
      }
    }
  }
  return score;
}

function scoreKeywords(text: string, keywords: string[], weight: number): number {
  const lower = text.toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    if (lower.includes(kw)) score += weight;
  }
  return score;
}

function toConfidence(score: number, maxReasonable: number): number {
  return Math.min(Math.round((score / maxReasonable) * 100), 95);
}

export function classifyChange(title: string, description: string): ClassificationSuggestion {
  const fullText = `${title} ${description}`;

  const typeScores: Record<ChangeType, number> = {
    emergency: scoreText(fullText, typeRules.emergency),
    standard: scoreText(fullText, typeRules.standard),
    normal: scoreText(fullText, typeRules.normal),
  };
  const bestType = (Object.entries(typeScores) as [ChangeType, number][])
    .sort((a, b) => b[1] - a[1])[0];
  const typeConfidence = bestType[1] > 0 ? toConfidence(bestType[1], 12) : 30;

  const catScores: Record<ChangeCategory, number> = {
    infrastructure: scoreText(fullText, categoryRules.infrastructure),
    application: scoreText(fullText, categoryRules.application),
    security: scoreText(fullText, categoryRules.security),
    data: scoreText(fullText, categoryRules.data),
    network: scoreText(fullText, categoryRules.network),
    configuration: scoreText(fullText, categoryRules.configuration),
  };
  const bestCat = (Object.entries(catScores) as [ChangeCategory, number][])
    .sort((a, b) => b[1] - a[1])[0];
  const catConfidence = bestCat[1] > 0 ? toConfidence(bestCat[1], 10) : 20;

  const riskScores: Record<RiskLevel, number> = {
    critical: scoreKeywords(fullText, riskIndicators.critical.keywords, riskIndicators.critical.weight),
    high: scoreKeywords(fullText, riskIndicators.high.keywords, riskIndicators.high.weight),
    medium: scoreKeywords(fullText, riskIndicators.medium.keywords, riskIndicators.medium.weight),
    low: scoreKeywords(fullText, riskIndicators.low.keywords, riskIndicators.low.weight),
  };
  const bestRisk = (Object.entries(riskScores) as [RiskLevel, number][])
    .sort((a, b) => b[1] - a[1])[0];
  const riskConfidence = bestRisk[1] > 0 ? toConfidence(bestRisk[1], 8) : 25;

  const scopeScores: Record<ChangeScope, number> = {
    'cross-domain': scoreKeywords(fullText, scopeIndicators['cross-domain'].keywords, scopeIndicators['cross-domain'].weight),
    'operational-only': scoreKeywords(fullText, scopeIndicators['operational-only'].keywords, scopeIndicators['operational-only'].weight),
    'project-only': scoreKeywords(fullText, scopeIndicators['project-only'].keywords, scopeIndicators['project-only'].weight),
  };
  const bestScope = (Object.entries(scopeScores) as [ChangeScope, number][])
    .sort((a, b) => b[1] - a[1])[0];
  const scopeConfidence = bestScope[1] > 0 ? toConfidence(bestScope[1], 8) : 25;

  function getReason(field: string, value: string, score: number): string {
    if (score === 0) return `Default suggestion — no strong ${field} indicators found in text`;
    return `Detected ${field} keywords matching "${value}" pattern`;
  }

  return {
    type: {
      value: bestType[1] > 0 ? bestType[0] : 'normal',
      confidence: bestType[1] > 0 ? typeConfidence : 30,
      reason: getReason('type', bestType[0], bestType[1]),
    },
    risk: {
      value: bestRisk[1] > 0 ? bestRisk[0] : 'medium',
      confidence: bestRisk[1] > 0 ? riskConfidence : 25,
      reason: getReason('risk', bestRisk[0], bestRisk[1]),
    },
    category: {
      value: bestCat[1] > 0 ? bestCat[0] : 'application',
      confidence: bestCat[1] > 0 ? catConfidence : 20,
      reason: getReason('category', bestCat[0], bestCat[1]),
    },
    scope: {
      value: bestScope[1] > 0 ? bestScope[0] : 'project-only',
      confidence: bestScope[1] > 0 ? scopeConfidence : 25,
      reason: getReason('scope', bestScope[0], bestScope[1]),
    },
  };
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 70) return 'text-green-600 bg-green-50';
  if (confidence >= 45) return 'text-yellow-600 bg-yellow-50';
  return 'text-gray-500 bg-gray-50';
}
