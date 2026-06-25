# Project Goals & Requirements

## Goals
Initialize a robust foundation for the Forge Sprint 2 project, focusing on structured documentation and a clean separation between backend and frontend components.

## Requirements
- Strict adherence to the `/home/openclaw/.openclaw/workspace/forge-sprint2` root.
- Production-ready implementation standards.
- Comprehensive audit trail via `agent-log.md`.

## Resubmission Progress
The first Forge Sprint 2 submission scored 55/100 and failed mainly because the submitted app URL was localhost rather than a live deployment. The resubmission work focused on the highest-impact blockers:
- Added sanitized OpenClaw and Hermes config example files.
- Fixed Tailwind/PostCSS so the frontend builds with visible styling.
- Improved the Kanban UI while preserving the required app behavior.
- Added board deletion to complete Boards CRUD.
- Fixed card modal UX around close/cancel, tags, and member assignment.
- Prepared backend/frontend deployment path using Render + Vercel.
- Kept the documented human-in-the-loop workflow: Hermes for planning/review, human relay, OpenClaw for implementation.

Remaining before resubmission:
- Deploy backend to Render.
- Deploy frontend to Vercel.
- Replace placeholder live URLs in README.
- Verify all five required features on the deployed URL.
- Submit the updated repo URL and live URL.
