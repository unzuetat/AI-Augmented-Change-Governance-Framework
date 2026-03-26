# PRINCE2 + ITIL 4 — Detailed Profile Mapping

> How ChangeFlow maps to PRINCE2 project management and ITIL 4 service management.

---

## Lifecycle Stage Mapping

| Universal Stage | PRINCE2 Term | ITIL 4 Term | Notes |
|---|---|---|---|
| REQUEST | Capture Issue | Create RFC | In PRINCE2, changes are Issues (specifically Requests for Change). In ITIL, they are Requests for Change (RFC). |
| CLASSIFY | Examine Issue | Categorize & Prioritize | PRINCE2 examines the issue type. ITIL categorizes and assigns priority based on urgency and impact. |
| ASSESS | Assess Impact | Change Assessment | Both frameworks require impact analysis. ChangeFlow mandates cross-domain assessment when both are affected. |
| APPROVE | Change Authority Decision | CAB Authorization | PRINCE2 uses Change Authority (delegated from Project Board). ITIL uses CAB. Cross-domain needs both. |
| IMPLEMENT | Execute Work Package | Change Implementation | PRINCE2 frames implementation as Work Package execution within a Stage Plan. ITIL coordinates change windows. |
| REVIEW | Capture Lessons | Post-Implementation Review | PRINCE2 captures Lessons Learned. ITIL conducts PIR. ChangeFlow merges both into one activity. |
| CLOSE | Close Issue | Close RFC | Both frameworks require formal closure with updated records. |

---

## Role Mapping

| Universal Role | PRINCE2 Equivalent | ITIL 4 Equivalent |
|---|---|---|
| Project Approval Authority | Change Authority (Project Board) | N/A (project-side) |
| Operational Approval Authority | N/A (ops-side) | Change Advisory Board (CAB) |
| Senior Project Authority | Project Board | N/A |
| Emergency Project Authority | Project Board (Exception) | N/A |
| Emergency Ops Authority | N/A | Emergency CAB (ECAB) |
| Change Coordinator | Project Support | Change Manager |
| Project Assessor | Project Manager | N/A |
| Operational Assessor | N/A | Change Manager / Technical Assessor |
| Project Executive | Executive | N/A |

---

## Artifact Mapping

| Universal Artifact | PRINCE2 Equivalent | ITIL 4 Equivalent |
|---|---|---|
| Change Record | Issue (Request for Change) | Request for Change (RFC) |
| Change Register | Issue Register | Change Schedule |
| Impact Assessment | Issue Report | Change Assessment |
| Approval Record | Change Authority Decision | CAB Authorization |
| Escalation Report | Exception Report | N/A (handled within Change Enablement) |
| Implementation Plan | Updated Stage Plan | Implementation Plan |
| Back-out Plan | Exception Plan | Remediation Plan |
| Post-Change Review | Lessons Log Entry | Post-Implementation Review (PIR) |
| Risk Register | Risk Register | Risk Assessment |
| Configuration Records | Configuration Item Records | CMDB |

---

## Escalation Model

| Concept | PRINCE2 Term |
|---|---|
| Threshold breach | Exception |
| Escalation process | Exception Process (Directing a Project) |
| Escalation report | Exception Report |
| Escalation authority | Project Board |
| Possible outcomes | Approve Exception Plan, Amend tolerances, Request revised Stage Plan, Premature close |

---

## Key Integration Points

**Where PRINCE2 and ITIL meet in ChangeFlow:**

1. **Scope Determination (CLASSIFY stage):** When a PRINCE2 project change affects live ITIL-managed services, the system flags it as cross-domain. This is the core integration that prevents changes falling through the gap.

2. **Dual Assessment (ASSESS stage):** The Project Manager assesses project impact (schedule, scope, cost). The Change Manager assesses operational impact (services, SLA, dependencies). Both assessments feed into the same approval decision.

3. **Dual Approval (APPROVE stage):** Cross-domain changes require sign-off from both Change Authority (PRINCE2) and CAB (ITIL). Neither overrides the other.

4. **Unified Review (REVIEW stage):** PRINCE2 Lessons Learned and ITIL PIR are merged into a single post-change review activity, eliminating duplicate effort.
