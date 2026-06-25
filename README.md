# Forge Sprint 2 - Kanban Board

A minimal, high-performance Trello-style Kanban board implementation designed to demonstrate a decoupled architecture between a Laravel API and a React frontend.

## Live Demo
- **Frontend:** https://forge-sprint-2-frontend.vercel.app/
- **Backend API:** https://forge-sprint-2-api.onrender.com
- **Backend test endpoint:** https://forge-sprint-2-api.onrender.com/api/boards
- **Status:** deployed for Forge Sprint 2 resubmission.

## Required Features
- ✅ Boards → Lists → Cards CRUD
- ✅ Move cards between lists
- ✅ Tags/labels on cards
- ✅ Member assignment on cards
- ✅ Due dates with visual overdue flag
- ✅ Board deletion for complete board CRUD

## Deployment Target
- **Frontend:** Vercel, root directory `frontend`
- **Backend:** Render Web Service using Docker, root directory `backend`

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

## Deployment Notes
### Backend: Render
Use a Render Web Service connected to this GitHub repo.
**Recommended settings:**
- Root directory: `backend`
- Runtime/environment: Docker
- Dockerfile path: `backend/Dockerfile`

**Required environment variables:**
- `APP_KEY`: <generated with `php artisan key:generate --show`>
- `APP_ENV`: `production`
- `APP_DEBUG`: `false`
- `DB_CONNECTION`: `sqlite`
- `DB_DATABASE`: `database/database.sqlite`

The backend start command is handled by the Dockerfile CMD:
`touch database/database.sqlite && php artisan migrate --force && php artisan serve --host 0.0.0.0 --port ${PORT:-8000}`

### Frontend: Vercel
Use a Vercel project connected to this GitHub repo.
**Recommended settings:**
- Root directory: `frontend`
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

**Required environment variable:**
- `VITE_API_URL`: `https://forge-sprint-2-api.onrender.com/api`

## Workflow Note
This project utilized a specialized two-agent workflow. Due to a platform-level transport limitation with `delegate_task` (path drift between Windows and WSL2), planning and implementation were synchronized via human-relayed handoffs in Slack, preserving the full plan $\to$ code $\to$ report loop. See `ARCHITECTURE.md` for further details.
