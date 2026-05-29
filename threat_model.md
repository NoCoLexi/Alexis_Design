# Threat Model

## Project Overview

This repository contains a public-facing portfolio site, a standalone public game mounted under the portfolio, and an Express API that serves public endpoints for health checks, AI chat, contact submissions, and leaderboard writes. The deployed app is publicly reachable on the internet. Production-relevant code is primarily in `artifacts/api-server`, `artifacts/portfolio`, `artifacts/stakeholder-invaders`, and shared libraries under `lib/`.

Per deployment assumptions for this scan: TLS is handled by the platform, `NODE_ENV` is `production` in production, and the mockup sandbox is not deployed to production.

## Assets

- **Availability of the public site and API**. The portfolio, chatbot, and game rely on the API remaining responsive. Public unauthenticated write paths can threaten uptime.
- **Integrity of public content and leaderboard data**. Visitors trust public-facing content, including the Stakeholder Invaders leaderboard. Unauthorized tampering would damage credibility.
- **Contact submission data**. Contact form entries contain names, email addresses, optional phone numbers, and message contents. Even if not exposed back to users, these submissions are user-provided records the server accepts and stores.
- **Third-party API secrets**. The Anthropic API key and database connection string grant access to paid upstream services and data storage.
- **Database contents**. The scores table is production data visible to users through leaderboard responses. Shared DB schema also includes user and contact models that would become sensitive if they are ever wired into live routes.

## Trust Boundaries

- **Browser to API**. All `/api/*` requests originate from untrusted clients. Request bodies, headers, and rate characteristics must be treated as attacker-controlled.
- **API to PostgreSQL**. The API server has direct write access to the scores table. Any injection or broken business-rule enforcement here impacts persistent data.
- **API to Anthropic**. The chat route forwards user-supplied prompt history to a third-party API using a secret key. Abuse of this path can consume paid resources.
- **Public internet to unauthenticated routes**. The health check, contact submission, chat, leaderboard reads, and leaderboard writes are all publicly reachable without authentication.
- **Production versus dev-only artifacts**. `artifacts/mockup-sandbox` is out of scope for production vulnerability reporting unless a production code path is shown to serve or invoke it.

## Scan Anchors

- **Production entry points**: `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`, `artifacts/api-server/src/routes/*`
- **Public write surfaces**: `POST /api/contact`, `POST /api/chat`, `POST /api/scores`
- **Shared persistence and contracts**: `lib/db/src/schema/*`, `lib/api-spec/openapi.yaml`, `lib/api-client-react/src/generated/api.ts`
- **Public frontends**: `artifacts/portfolio/src/*`, `artifacts/stakeholder-invaders/src/*`
- **Usually ignore as dev-only**: `artifacts/mockup-sandbox/**`

## Threat Categories

### Spoofing

There is no authentication boundary on the production API today, so the main spoofing risk is not account takeover but forged client identity on public write endpoints. The system must not rely on client claims for trust decisions, authorship, or game result legitimacy unless those claims are independently verifiable server-side.

### Tampering

The most relevant tampering risk is client-side control over data that the server treats as authoritative. Public routes that write contact records, leaderboard entries, or upstream AI requests must enforce server-side validation, bounds, and business rules. Any public-facing ranking or record that matters to users must not be derived purely from attacker-supplied values without verification.

### Information Disclosure

The API accepts contact data and uses third-party and database credentials. Secrets must never appear in client bundles, logs, or error responses. Public responses must avoid leaking internal exception details, database state, or request metadata beyond what is necessary for callers.

### Denial of Service

Because the deployment is public and several routes are unauthenticated, availability threats are central. Public write endpoints must have bounded request sizes, bounded storage growth, and rate limiting proportionate to their cost. Endpoints that retain attacker input in memory or trigger paid upstream requests are especially sensitive to abuse.

### Elevation of Privilege

There is currently no authenticated admin surface in production, so classic role escalation is less relevant than abuse of privileged server capabilities. The API must not let arbitrary users leverage server-side database writes, persistent storage, or third-party API spend in ways that exceed the intended public feature set.