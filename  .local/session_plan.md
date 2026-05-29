# Objective
Assess the public production attack surface for concrete exploitable vulnerabilities in the deployed portfolio, standalone game, and shared API.

# Relevant information
- Deployment visibility is public and the app is deployed on the public internet.
- Production-relevant code is in `artifacts/api-server`, `artifacts/portfolio`, `artifacts/stakeholder-invaders`, and shared libs under `lib/`.
- `artifacts/mockup-sandbox` is dev-only unless a production reference is proven.
- Public API routes: `GET /api/healthz`, `POST /api/contact`, `POST /api/chat`, `GET /api/scores/top`, `POST /api/scores`.
- Shared libraries: OpenAPI spec in `lib/api-spec/openapi.yaml`, validation in `lib/api-zod`, DB schema in `lib/db`, generated client in `lib/api-client-react`.
- Initial hypotheses:
  - Public write endpoints may allow unbounded resource consumption or storage abuse.
  - Leaderboard integrity may rely entirely on client-supplied score values.
  - Frontend code may expose unsafe sinks or admin-like behavior, but only report issues with server-side or production impact.

# Tasks

### T001: Analyze public API write endpoints for abuse and DoS
- **Blocked By**: []
- **Details**:
  - Inspect `artifacts/api-server/src/routes/routes.ts`, `artifacts/api-server/src/storage.ts`, and related shared schemas.
  - Validate whether `/api/contact` and `/api/chat` have meaningful request size limits, storage limits, and rate limits.
  - Acceptance: Confirm or rule out exploitable unauthenticated resource-consumption issues with file-level evidence.

### T002: Analyze leaderboard integrity and persistence
- **Blocked By**: []
- **Details**:
  - Inspect `artifacts/api-server/src/routes/scores.ts`, `lib/db/src/schema/scores.ts`, and the game submission flow.
  - Determine whether the server independently verifies score legitimacy or simply trusts client-supplied values.
  - Acceptance: Confirm or rule out public data-tampering vulnerabilities affecting the leaderboard.

### T003: Analyze frontends and shared client for production-relevant trust boundary issues
- **Blocked By**: []
- **Details**:
  - Inspect `artifacts/portfolio/src/*`, `artifacts/stakeholder-invaders/src/*`, and `lib/api-client-react/src/*` for unsafe sinks, sensitive data exposure, or server-impacting behavior.
  - Ignore purely cosmetic or client-only concerns unless they create a real production exploit path.
  - Acceptance: Identify any concrete production vulnerability or explicitly rule out the obvious candidates.

### T004: Reconcile automated scan noise and update reporting artifacts
- **Blocked By**: [T001, T002, T003]
- **Details**:
  - Review scanner output, update `threat_model.md`, create grouped vulnerability files in `.local/new_vulnerabilities/`, and supersede any matching existing findings if present.
  - Acceptance: Findings are grouped by remediation area and ready for user review.