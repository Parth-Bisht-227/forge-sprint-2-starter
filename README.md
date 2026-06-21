# Forge Sprint 2 - Kanban Board

A minimal, high-performance Trello-style Kanban board implementation designed to demonstrate a decoupled architecture between a Laravel API and a React frontend.

## Features
- **Board Management:** Create and navigate multiple boards.
- **Lists & Cards:** Organize work into lists and create cards with descriptions and due dates.
- **Card Movement:** Seamlessly move cards between different lists.
- **Tags & Members:** Assign colorful tags and team members to cards via a multi-select interface.
- **Overdue Flagging:** Visual indicators (red borders/badges) for cards whose due dates have passed.

## Tech Stack
- **Backend:** Laravel 13 (PHP 8.3), SQLite.
- **Frontend:** React, Vite, Tailwind CSS, Axios.

## AI Model Configuration
This project was developed using a dual-agent orchestration:
- **Planning (Hermes):** `gemma` via Ollama Cloud.
- **Implementation (OpenClaw):** `ollama-cloud/gemma4:31b`.

## Run Instructions

### Backend
```bash
cd backend
php artisan serve --port=8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Visit: <http://localhost:5173>

## Deployment Note
**Live URL:** Not deployed — see video walkthrough (link) for a full local demo of all 5 features.

## Workflow Note
This project utilized a specialized two-agent workflow. Due to a platform-level transport limitation with `delegate_task` (path drift between Windows and WSL2), planning and implementation were synchronized via human-relayed handoffs in Slack, preserving the full plan $\to$ code $\to$ report loop. See `ARCHITECTURE.md` for further details.
