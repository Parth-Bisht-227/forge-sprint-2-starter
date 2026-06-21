# Architecture Review Skill

## Description
Performs a critical audit of the current codebase and documentation against the `ARCHITECTURE.md` specification to ensure design consistency.

## Procedure
1. Read `ARCHITECTURE.md` to establish the source of truth for the design.
2. Inspect the current file structure and any implemented code in `backend/` and `frontend/`.
3. Identify discrepancies between the intended design and the actual implementation.
4. Evaluate if the current implementation introduces technical debt or violates the chosen tech stack (Laravel/SQLite, React/Vite).
5. Generate a review report containing:
   - **Consistency Score**: (e.g., 1-10).
   - **Deviations**: Specific examples of where implementation differs from design.
   - **Recommendations**: Proposed changes to align code with architecture or update documentation to reflect necessary design changes.
