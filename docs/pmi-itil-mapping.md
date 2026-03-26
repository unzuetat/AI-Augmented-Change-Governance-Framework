# PMI/PMBOK + ITIL 4 — Detailed Profile Mapping

> How ChangeFlow maps to PMI/PMBOK project management and ITIL 4 service management.

---

## Lifecycle Stage Mapping

| Universal Stage | PMI/PMBOK Term | ITIL 4 Term | Notes |
|---|---|---|---|
| REQUEST | Submit Change Request | Create RFC | PMI uses formal Change Requests through Integrated Change Control. ITIL uses RFC. |
| CLASSIFY | Log & Categorize | Categorize & Prioritize | PMI logs in the Change Log. ITIL categorizes by type, urgency, and impact. |
| ASSESS | Perform Impact Analysis | Change Assessment | PMI assesses against the Project Management Plan baselines. ITIL assesses service impact. |
| APPROVE | CCB Decision | CAB Authorization | PMI uses Change Control Board (CCB). ITIL uses CAB. Cross-domain needs both. |
| IMPLEMENT | Update PM Plan & Execute | Change Implementation | PMI updates the Project Management Plan and executes. ITIL coordinates change windows. |
| REVIEW | Lessons Learned | Post-Implementation Review | PMI captures Lessons Learned (part of Close Project or Phase). ITIL conducts PIR. |
| CLOSE | Close Change Request | Close RFC | Both require formal closure and documentation updates. |

---

## Role Mapping

| Universal Role | PMI/PMBOK Equivalent | ITIL 4 Equivalent |
|---|---|---|
| Project Approval Authority | Change Control Board (CCB) | N/A (project-side) |
| Operational Approval Authority | N/A (ops-side) | Change Advisory Board (CAB) |
| Senior Project Authority | Project Sponsor / Steering Committee | N/A |
| Emergency Project Authority | Project Sponsor (Emergency) | N/A |
| Emergency Ops Authority | N/A | Emergency CAB (ECAB) |
| Change Coordinator | PMO | Change Manager |
| Project Assessor | Project Manager | N/A |
| Operational Assessor | N/A | Change Manager / Technical Assessor |
| Project Executive | Project Sponsor | N/A |

---

## Artifact Mapping

| Universal Artifact | PMI/PMBOK Equivalent | ITIL 4 Equivalent |
|---|---|---|
| Change Record | Change Request | Request for Change (RFC) |
| Change Register | Change Log | Change Schedule |
| Impact Assessment | Impact Analysis | Change Assessment |
| Approval Record | CCB Decision | CAB Authorization |
| Escalation Report | Variance Report / Escalation to Sponsor | N/A |
| Implementation Plan | Updated Project Management Plan | Implementation Plan |
| Back-out Plan | Contingency Plan | Remediation Plan |
| Post-Change Review | Lessons Learned | Post-Implementation Review (PIR) |
| Risk Register | Risk Register | Risk Assessment |
| Configuration Records | OPA (Organizational Process Assets) | CMDB |

---

## Escalation Model

| Concept | PMI/PMBOK Term |
|---|---|
| Threshold breach | Variance Beyond Threshold |
| Escalation process | Escalation to Sponsor / Steering Committee |
| Escalation report | Variance Analysis |
| Escalation authority | Project Sponsor / Steering Committee |
| Possible outcomes | Approve corrective action, Rebaseline the project, Approve additional resources/time, Terminate the project |

---

## Key Integration Points

**Where PMI/PMBOK and ITIL meet in ChangeFlow:**

1. **Integrated Change Control meets Change Enablement:** PMI's Perform Integrated Change Control process and ITIL's Change Enablement practice both aim to govern changes — but from different angles. ChangeFlow bridges them through scope determination at the CLASSIFY stage.

2. **Baselines meet SLAs:** PMI assesses change impact against project baselines (scope, schedule, cost). ITIL assesses against service SLAs and operational stability. Cross-domain changes require both assessments.

3. **CCB meets CAB:** For cross-domain changes, the CCB (project authority) and CAB (operational authority) must both approve. ChangeFlow enforces this dual-approval gate.

4. **OPA meets CMDB:** PMI stores organizational knowledge in OPA. ITIL stores service configuration in CMDB. ChangeFlow's unified review ensures both knowledge bases are updated after every change.
