# AI Augmentation Policy — Governance Guardrails

> How ChangeFlow uses AI to assist governance without replacing human judgment.

---

## Core Principle

**AI recommends. Humans decide.**

Every AI feature in ChangeFlow operates as an advisory layer. No AI output directly changes the status, classification, or approval of a change. Every suggestion requires explicit human acceptance.

---

## AI Features in ChangeFlow

### 1. Classification Suggestions

- **What it does:** Analyzes the title and description of a new change request and suggests type, risk level, category, and scope.
- **How it works:** Rule-based keyword matching with weighted scoring. No external API calls.
- **Where it appears:** Intake Form, after the user has entered a title and description.
- **User control:** Each suggestion can be individually accepted or dismissed. Dismissed suggestions disappear. Accepted suggestions populate the form fields.
- **Confidence display:** Every suggestion shows a confidence percentage so the user can gauge reliability.

### 2. Composite Risk Scoring

- **What it does:** Calculates a numerical risk score (0-100) based on multiple factors: declared risk, scope, type, number of affected services, and number of affected projects.
- **How it works:** Deterministic algorithm with defined weights per factor. Fully auditable.
- **Where it appears:** Change Register (expanded detail view).
- **User control:** The score is informational. It does not gate or block any action. The user can always override the declared risk level.

### 3. Similarity Detection

- **What it does:** Compares a change against all historical changes and identifies similar ones, highlighting their outcomes (approved, rejected, closed).
- **How it works:** Text similarity (Jaccard index on tokenized title/description), category matching, scope matching, service/project overlap scoring.
- **Where it appears:** Change Register (expanded detail view).
- **User control:** Matches are shown as references, not constraints. A similar change being rejected does not prevent the current one from proceeding.

---

## What AI Does NOT Do

| AI does NOT... | Reason |
|---|---|
| Approve or reject changes | Approval is a human governance decision requiring accountability |
| Move changes between stages | Stage transitions are governance gates that require human verification |
| Override manual classifications | Human judgment always takes precedence over AI suggestions |
| Access external data | All AI processing uses local data only — no API calls, no data leaves the system |
| Learn from user behavior | The rule engine is static and deterministic — no model training or drift |
| Make irreversible decisions | Every AI output is a suggestion that can be ignored |

---

## Fallback Guarantee

Every AI feature has a deterministic, rule-based implementation. The application works fully without:

- External AI API keys
- Internet connectivity (for AI features)
- Machine learning models
- Training data

This is deliberate. It demonstrates that governance has value independent of AI, and ensures the framework can operate in environments where AI usage is restricted.

---

## Future AI Capabilities (Roadmap)

These capabilities are designed but not yet implemented:

| Capability | Description | Governance Guardrail |
|---|---|---|
| Pattern detection | Identify recurring change patterns across the register | Advisory only — shown as insights, not actions |
| Predictive risk | Use historical outcomes to predict success/failure probability | Displayed alongside deterministic score, never replaces it |
| Natural language intake | Allow change requests in free text, auto-populate structured fields | Always shows populated fields for human review before submission |
| Anomaly detection | Flag changes that deviate significantly from organizational norms | Alert only — does not block or modify the change |

---

## Compliance Considerations

For organizations operating under AI governance regulations (EU AI Act, internal AI policies):

- **Transparency:** All AI suggestions include confidence scores and reasoning.
- **Auditability:** The rule-based engine produces deterministic results — same input always produces same output.
- **Human oversight:** No AI feature operates autonomously. Every output requires human action.
- **No personal data processing:** AI features analyze change metadata only, not personal data.
- **Opt-out:** AI suggestions can be globally disabled without affecting any other functionality.
