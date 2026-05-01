# Threat Model

## Project Overview

This project is a personal portfolio and speaking site built as a single-page React application with a small Express backend. In production, the Node server serves the compiled frontend and exposes a few JSON API routes for contact submission and AI chat. The current production backend uses in-memory storage for contacts, with planned PostgreSQL support visible in the schema and package setup.

The meaningful production attack surface is concentrated in `server/index.ts`, `server/routes.ts`, `server/storage.ts`, and the shared request schemas in `shared/schema.ts`. Client-side customization features in the hidden “admin panel” are personalization helpers, not true privileged server-side admin controls.

## Assets

- **Contact submissions** — names, email addresses, phone numbers, free-form messages, and timestamps collected through the contact API. This is the most sensitive first-party data currently handled by the app.
- **Server-side secrets** — especially `ANTHROPIC_API_KEY` and any future database credentials. Exposure would allow third-party API abuse or backend compromise.
- **Service availability and quota** — the public chat endpoint can consume paid third-party API quota and backend resources.
- **Site integrity and reputation** — the public portfolio content, recruiter-targeted customization links, and outbound contact flows represent the owner’s public brand.

## Trust Boundaries

- **Browser to Express API** — all frontend input is untrusted. Every API route must validate input and enforce authorization where data is sensitive.
- **Express API to in-memory/data store** — the backend is trusted to enforce data access boundaries before reading or returning stored contacts.
- **Express API to Anthropic** — the server holds the API key and mediates calls to a paid external model API. User-controlled input crosses into a billable external service.
- **Public visitor to owner/private data boundary** — the site is public, but contact submissions are private and must never be exposed to unauthenticated visitors.
- **Production vs dev-only boundary** — mockup sandbox files, Vite-only behavior, and local testing conveniences are out of scope unless they are reachable from the production server path.

## Production Scope and Exclusions

- Production scope includes the Express server, frontend routes shipped from `dist/public`, shared schemas, analytics code that executes for real visitors, and any API route reachable in production.
- Dev-only artifacts under `artifacts/mockup-sandbox/` are out of scope unless production imports or serves them.
- The platform provides TLS in production, so transport encryption and certificate management are not focus areas for this scan.
- Authentication features described in comments or dependencies are not treated as implemented controls unless code actually enforces them.

## Scan Anchors

- `server/routes.ts` — all current API handlers and the highest-value place for authz, privacy, and abuse checks.
- `server/index.ts` — request parsing, logging, and global error handling.
- `shared/schema.ts` — request validation boundaries and sensitive fields.
- `client/src/lib/analytics.ts` — client-side data disclosure and third-party tracking behavior.
- `client/src/components/admin-panel.tsx` and `client/src/hooks/use-admin-panel.tsx` — verify whether hidden UI features create real security boundaries or are cosmetic only.

## Threat Categories

### Spoofing

This application currently has no implemented user authentication, so it cannot rely on identity for access control. Any route that is meant for the site owner only must be protected some other way before deployment; obscured UI or hidden query parameters are not valid identity checks.

Required guarantees:
- Owner-only or administrative data endpoints MUST require a real server-side authentication and authorization check before returning data.
- The application MUST NOT treat client-side state, localStorage, or query parameters as proof of privilege.

### Tampering

Public visitors can send arbitrary JSON to the API. The shared Zod schema provides basic shape validation for contact submissions, but any future sensitive operations must continue to validate and normalize untrusted input at the server boundary.

Required guarantees:
- API handlers MUST validate request bodies before processing them.
- Client-controlled values used to personalize frontend content MUST remain presentation-only unless separately validated and authorized on the server.

### Information Disclosure

The backend handles personally identifiable contact information, and the request logger can capture full API response bodies. Any route that returns stored contacts is highly sensitive because it exposes names, emails, phone numbers, and messages. Error handling and analytics must also avoid leaking secrets or private content.

Required guarantees:
- Stored contact submissions MUST only be accessible to an authenticated owner/admin context enforced on the server.
- API responses and logs MUST avoid exposing secrets or unnecessary personal data.
- Third-party analytics MUST NOT receive contact form contents or other visitor-submitted sensitive free text.

### Denial of Service

The chat endpoint is public and can trigger paid outbound requests to Anthropic. Without throttling, request size limits, or abuse controls, a visitor can repeatedly call this route to consume quota or degrade service availability.

Required guarantees:
- Public API routes that trigger expensive work or paid third-party calls MUST have rate limiting or equivalent abuse controls.
- Request sizes and message history length SHOULD be bounded before forwarding to third-party APIs.
- External API calls SHOULD fail safely without exposing internals.

### Elevation of Privilege

The biggest privilege boundary in this project is between public visitors and private owner data. Because there is no implemented auth layer, any endpoint intended “for admin purposes” is at high risk if it is reachable from the public internet.

Required guarantees:
- Server-side authorization MUST protect any route that reads or returns private stored data.
- Hidden frontend panels, keyboard shortcuts, and URL parameters MUST NOT be treated as access-control mechanisms.
