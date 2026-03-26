# Migration Guide — Demo to Production

> How to take ChangeFlow from a demonstration framework to a real implementation.

---

## What Migration Means

ChangeFlow is designed with a three-layer architecture specifically to make migration straightforward:
```
Layer 1: Universal Governance Engine    → KEEP (no changes needed)
Layer 2: Profile Configuration          → CUSTOMIZE (adapt to your organization)
Layer 3: Data                           → REPLACE (swap simulated for real data)
```

Migration is a **data and configuration swap**, not a rebuild.

---

## Pre-Migration Checklist

Before migrating, ensure your organization has:

- [ ] Selected the governance profile that best matches your methodologies (or decided to create a custom one)
- [ ] Identified the real roles that map to ChangeFlow's universal roles
- [ ] Documented your existing change management process and identified gaps
- [ ] Defined your threshold/tolerance levels for escalation
- [ ] Identified the services and projects that will be governed
- [ ] Secured stakeholder buy-in for the unified governance approach

---

## Step 1: Select or Create Your Profile

**If an existing profile fits:**
Choose from PRINCE2+ITIL, PMI+ITIL, SAFe+ITIL, Hybrid, or Generic. Review the vocabulary, roles, and artifacts in the Settings view to confirm they match your organization.

**If you need a custom profile:**
1. Copy the closest existing profile file (e.g., `prince2-itil.ts`)
2. Rename it (e.g., `my-org-profile.ts`)
3. Update every vocabulary term, role name, and artifact name to match your organization
4. Add the profile ID to the `ProfileId` type
5. Register it in the profiles index

---

## Step 2: Replace Simulated Data

The seed data in `app/src/data/seed.ts` contains 5 change records, 3 projects, 7 services, and 10 people. Replace these with your real data.

### People

Replace the `people` array with your actual team members. Each person needs:
- `id` — Your internal identifier
- `name` — Display name
- `role` — Their governance role (use universal terms)
- `department` — project, operations, management, or technical

### Services

Replace the `services` array with your real services. Each service needs:
- `id`, `name`, `criticality` (low/medium/high/critical)
- `ownerId` — Reference to a person
- `slaTarget` — Your actual SLA
- `dependsOn` — Other service IDs this service depends on
- `usedByProjects` — Project IDs that use this service

### Projects

Replace the `projects` array with your active projects. Each project needs:
- `id`, `name`, `status`, `managerId`
- `thresholds` — Your actual tolerance levels (schedule days, scope %, max risk)

### Change Records

You can either:
- Start fresh with an empty array and create changes through the Intake Form
- Import historical changes into the seed data format

---

## Step 3: Configure Thresholds

Review and adjust the governance thresholds in the engine:

- **Risk scoring weights** (`app/src/engine/risk-scoring.ts`) — Adjust the scoring factors to match your organization's risk appetite
- **Classification keywords** (`app/src/engine/classification.ts`) — Add organization-specific keywords for better AI suggestions
- **Similarity detection** (`app/src/engine/similarity.ts`) — Adjust the minimum score threshold for your needs

---

## Step 4: Connect to Real Systems (Optional)

ChangeFlow is designed as a standalone frontend application. For production use, you may want to:

| Integration | Purpose | Approach |
|---|---|---|
| Backend API | Persist data beyond browser session | Add a REST API layer; replace Zustand store with API calls |
| Authentication | Control who can approve, assess, submit | Add an auth provider (e.g., Azure AD, Okta) |
| ServiceNow / Jira | Import existing change data | Build an import adapter for the seed data format |
| Email / Slack | Notifications for approvals and escalations | Add a notification service layer |
| CMDB | Auto-populate affected services | Query your CMDB API at the CLASSIFY stage |

---

## Step 5: Validate

Before going live:

- [ ] Walk through each governance stage with a test change
- [ ] Verify cross-domain detection works with your real services and projects
- [ ] Confirm dual approval logic triggers correctly
- [ ] Test the emergency path end-to-end
- [ ] Validate that threshold breach escalation uses your organization's terms
- [ ] Review AI classification suggestions with real change descriptions
- [ ] Confirm all role names and artifact names match your organization's expectations

---

## Data Privacy Note

The demo version uses simulated data with no connection to any real organization. When migrating:

- All data stays client-side (no external API calls)
- AI features process data locally (no data sent to AI providers)
- The application can be deployed on your internal network
- No analytics or telemetry is included

---

## Support

ChangeFlow is maintained by [Unzuetat](https://github.com/unzuetat). For questions about migration or customization, open an issue on the GitHub repository.
