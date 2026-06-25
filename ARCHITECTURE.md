# Architecture Design

## Overview
The system follows a decoupled architecture with a Laravel API and a React-based frontend.

## Backend
- **Framework:** Laravel
- **Database:** SQLite (for rapid development and portability)
- **API Style:** RESTful

## Frontend
- **Framework:** React
- **Build Tool:** Vite
- **State Management:** Local component state with Axios for API synchronization.

## Database Schema
- `boards`: `id`, `name`, `timestamps`
- `lists`: `id`, `board_id` (FK $\to$ boards, cascade delete), `name`, `position`, `timestamps`
- `cards`: `id`, `list_id` (FK $\to$ lists, cascade delete), `title`, `description` (nullable), `due_date` (nullable), `position`, `timestamps`
- `tags`: `id`, `name`, `color`, `timestamps`
- `members`: `id`, `name`, `timestamps`
- `card_tag`: `card_id` (FK), `tag_id` (FK) — Pivot table
- `card_member`: `card_id` (FK), `member_id` (FK) — Pivot table

## Deployment Architecture
```
User Browser
 ↓
Vercel-hosted React/Vite frontend
 ↓ VITE_API_URL
Render-hosted Laravel API
 ↓
SQLite database file
```
The frontend is a static Vite build deployed on Vercel. The backend is a Laravel API deployed as a Render Docker Web Service. The frontend calls the backend through `VITE_API_URL=https://forge-sprint-2-api.onrender.com/api`.
