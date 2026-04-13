# Government Scheme Finder

A full-stack web app that helps users discover Indian government welfare schemes, view details, and find schemes based on their profile.

## Features

- Browse and view scheme details
- User authentication (JWT) + optional Google OAuth login
- User profile (age, income, state, category, gender) for eligibility-based discovery
- Save/unsave schemes
- Admin APIs for scheme management
- Background scheme sync job (cron-based)

## Tech Stack

- Frontend: React + Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB (Mongoose), Passport (Google OAuth), JWT

## Project Structure

- `backend/` — Express API server
- `frontend/` — React (Vite) client

Note: There is also a `src/` folder at the repository root that mirrors the frontend structure. The recommended/maintained frontend is `frontend/`.

## Local Setup

### Prerequisites

- Node.js (18+ recommended)
- MongoDB (local or Atlas)

### 1) Backend

```bash
cd backend
npm install
```

Create `backend/.env` (copy from `backend/.env.example`) and set:

```env
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_random_secret
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Optional (only if you want Google Login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

Seed sample schemes (optional):

```bash
npm run seed
```

Run the backend:

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2) Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Environment Variables (Deployment)

- Frontend: set `VITE_API_URL` to your deployed backend URL (example: `https://your-backend.com/api`)
- Backend: set `FRONTEND_URL` to your deployed frontend origin (example: `https://your-frontend.com`)
- Backend: configure `GOOGLE_CALLBACK_URL` to your deployed callback URL if using Google login

## API (Quick Reference)

- Auth: `/api/auth/*`
- Schemes: `/api/schemes/*`
- User: `/api/user/*`
- Admin: `/api/admin/*`

## License

MIT
