## [2026-06-21] Infrastructure Investigation: Delegation Path Drift
**Issue:** Discovered a critical discrepancy between the expected repository root (`/home/openclaw/.openclaw/workspace/forge-sprint2`) and the actual current working directory (CWD) resolved by `delegate_task`.

**Findings:**
- Direct chat execution and manual verification confirm the Linux-style workspace path is correct and writable.
- `delegate_task` resolved to a Windows-style path (`/c/Users/bisht`), causing subagents to write deliverables to the wrong location.
- Verified that the agent lacks a direct `messaging` tool to communicate with OpenClaw outside of the standard orchestration loop.
- Ruled out workspace configuration, user permissions, duplicate binaries, and system `PATH` issues via direct testing.

**Resolution:**
The infrastructure drift between the orchestrator and delegated subagents is deemed a system-level issue. To ensure strict adherence to project constraints and avoid path leakage, all tasks for OpenClaw will be relayed manually by the orchestrator. The orchestrator retains full planning, review, and verification responsibility.
