# TarotCards VSD Agent

A web application for Value Sensitive Design using tarot cards.

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- Google Cloud Console project with OAuth 2.0 credentials

### Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install
```

### Environment Setup

1. Copy environment files:
```bash
cp .env.example .env.local
cp backend/.env.example backend/.env
```

2. Fill in the environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID

### Run Locally

```bash
# Terminal 1: Start backend
cd backend && npm start

# Terminal 2: Start frontend
npm start
```

The frontend runs on http://localhost:3000 and proxies API calls to the backend on port 8000.

## Deployment on Render (Free Tier)

### Step 1: Set Up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and a free M0 cluster
3. Create a database user and whitelist `0.0.0.0/0` for access
4. Get your connection string

### Step 2: Deploy to Render

1. Push your code to GitHub
2. Go to [Render](https://render.com) and create an account
3. Click "New" → "Blueprint" and connect your repository
4. Render will detect `render.yaml` and create both services
5. Set the following environment variables in Render dashboard:

**For the Backend (tarotcards-vsd-api):**
- `MONGO_URI`: Your MongoDB Atlas connection string
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `FRONTEND_URL`: Your frontend URL (e.g., `https://tarotcards-vsd-frontend.onrender.com`)

**For the Frontend (tarotcards-vsd-frontend):**
- `REACT_APP_GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `REACT_APP_API_URL`: Your backend URL (e.g., `https://tarotcards-vsd-api.onrender.com`)

### Step 3: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. Edit your OAuth 2.0 Client ID
4. Add your Render frontend URL to:
   - Authorized JavaScript origins
   - Authorized redirect URIs

### Alternative: Manual Deployment

If you prefer not to use the Blueprint, you can deploy manually:

**Backend:**
1. New → Web Service → Connect your repo
2. Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `npm start`

**Frontend:**
1. New → Static Site → Connect your repo
2. Build Command: `npm install && npm run build`
3. Publish Directory: `build`

## Notes

- Render's free tier spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- MongoDB Atlas free tier provides 512MB storage
