import { useState } from 'react';
import { useStore } from '../store';
import { useI18n } from '../i18n';
import { routeChange } from '../engine/routing';
import RoutingResultPanel from '../components/routing/RoutingResultPanel';
import type { ChangeType, ChangeScope, RiskLevel, ChangeCategory } from '../types';
import type { RoutingDecision } from '../types/routing';
import { ArrowRight, Zap, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Scenario {
  name: string;
  nameEs: string;
  type: ChangeType;
  scope: ChangeScope;
  risk: RiskLevel;
  category: ChangeCategory;
}

const scenarios: Scenario[] = [
  {
    name: 'Emergency server migration',
    nameEs: 'Migración de servidor de emergencia',
    type: 'emergency',
    scope: 'cross-domain',
    risk: 'critical',
    category: 'infrastructure',
  },
  {
    name: 'Standard app update',
    nameEs: 'Actualización estándar de app',
    type: 'standard',
    scope: 'project-only',
    risk: 'low',
    category: 'application',
  },
  {
    name: 'Cross-domain security patch',
    nameEs: 'Parche de seguridad cross-domain',
    type: 'normal',
    scope: 'cross-domain',
    risk: 'high',
    category: 'security',
  },
];

export default function HeroDemo() {
  const { activeProfile, routingRules } = useStore();
  const { t, language } = useI18n();
  const vocab = activeProfile.vocabulary;

  const [type, setType] = useState<ChangeType>(scenarios[0].type);
  const [scope, setScope] = useState<ChangeScope>(scenarios[0].scope);
  const [risk, setRisk] = useState<RiskLevel>(scenarios[0].risk);
  const [category, setCategory] = useState<ChangeCategory>(scenarios[0].category);
  const [activeScenario, setActiveScenario] = useState(0);

  function applyScenario(index: number) {
    const s = scenarios[index];
    setType(s.type);
    setScope(s.scope);
    setRisk(s.risk);
    setCategory(s.category);
    setActiveScenario(index);
  }

  function handleDropdownChange(setter: (v: never) => void, value: string) {
    setter(value as never);
    setActiveScenario(-1); // deselect scenario buttons on manual change
  }

  let decision: RoutingDecision;
  try {
    decision = routeChange('DEMO', {
      scope,
      type,
      category,
      risk,
      originType: 'project',
      affectedSystems: [],
    }, routingRules, activeProfile);
  } catch {
    decision = {
      changeId: 'DEMO',
      matchedRuleId: null,
      ruleName: 'Error',
      primaryApprover: '—',
      secondaryApprover: null,
      notify: [],
      reason: t.routing.unableToCalculate,
      decidedAt: new Date().toISOString(),
      fallback: true,
    };
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Value prop header */}
      <div className="text-center py-6">
        <h1 className="text-lg font-bold text-gray-900 mb-2">
          {t.routing.heroTitle}
        </h1>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          {t.routing.heroSubtitle}
        </p>
      </div>

      {/* Playground */}
      <div className="bg-white rounded border border-gray-200 p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left: dropdowns */}
          <div className="space-y-3">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">
              {t.routing.configureChange}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {t.intake?.changeType || 'Type'}
                </label>
                <select
                  value={type}
                  onChange={(e) => handleDropdownChange(setType, e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-cf-300"
                >
                  <option value="standard">{vocab.standardChange}</option>
                  <option value="normal">{vocab.normalChange}</option>
                  <option value="emergency">{vocab.emergencyChange}</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {t.intake?.scope || 'Scope'}
                </label>
                <select
                  value={scope}
                  onChange={(e) => handleDropdownChange(setScope, e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-cf-300"
                >
                  <option value="project-only">{vocab.projectOnly}</option>
                  <option value="operational-only">{vocab.operationalOnly}</option>
                  <option value="cross-domain">{vocab.crossDomain}</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {t.intake?.risk || 'Risk'}
                </label>
                <select
                  value={risk}
                  onChange={(e) => handleDropdownChange(setRisk, e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-cf-300"
                >
                  <option value="low">{t.risk.low}</option>
                  <option value="medium">{t.risk.medium}</option>
                  <option value="high">{t.risk.high}</option>
                  <option value="critical">{t.risk.critical}</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {t.intake?.category || 'Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => handleDropdownChange(setCategory, e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-cf-300"
                >
                  <option value="infrastructure">Infrastructure</option>
                  <option value="application">Application</option>
                  <option value="security">Security</option>
                  <option value="data">Data</option>
                  <option value="network">Network</option>
                  <option value="configuration">Configuration</option>
                </select>
              </div>
            </div>

            {/* Scenario buttons */}
            <div className="pt-2 space-y-1.5">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                {t.routing.tryScenario}
              </div>
              {scenarios.map((s, i) => {
                const icons = [Zap, FileText, Shield];
                const Icon = icons[i];
                return (
                  <button
                    key={i}
                    onClick={() => applyScenario(i)}
                    aria-label={language === 'es' ? s.nameEs : s.name}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded border text-xs text-left transition-colors ${
                      activeScenario === i
                        ? 'bg-cf-50 border-cf-300 text-cf-800 font-medium'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={12} className={activeScenario === i ? 'text-cf-600' : 'text-gray-400'} />
                    {language === 'es' ? s.nameEs : s.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: routing result */}
          <div>
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">
              {t.routing.routingResult}
            </div>
            <div aria-live="polite">
              <RoutingResultPanel decision={decision} />
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Link
          to="/intake"
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium bg-cf-500 text-white rounded hover:bg-cf-600 transition-colors"
        >
          {t.routing.ctaFullIntake}
          <ArrowRight size={13} />
        </Link>
        <Link
          to="/changes"
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium bg-white text-gray-700 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
        >
          {t.routing.ctaChangeRegister}
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Profile note */}
      <div className="text-center">
        <p className="text-[10px] text-gray-400">
          {t.routing.profileNote} <span className="font-medium text-gray-500">{activeProfile.name}</span>
        </p>
      </div>
    </div>
  );
}
