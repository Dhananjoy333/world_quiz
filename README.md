# 🌍 WorldQuiz

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Neon_PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**An arcade-style geography quiz game where players test their knowledge of world countries, flags, and capitals.**

[Explore Features](#-features) • [Game Modes](#-game-modes) • [Tech Stack](#%EF%B8%8F-tech-stack) • [Database Setup](#%EF%B8%8F-database-schema) • [Installation](#%EF%B8%8F-getting-started) • [Docker](#-docker-deployment) • [API Reference](#-api-endpoints)

</div>

---

## 📖 Overview

**WorldQuiz** is a fast-paced, retro-arcade trivia web application built with **Next.js (App Router)** and **React 19**. Players can test their geography skills across different game modes, trigger score multipliers through consecutive correct answers, unlock progressive hints, listen to chilled lo-fi audio, and compete for the top ranks on the **Global Hall of Fame** leaderboard.

---

## 🎮 Game Modes

### 🏳️ Flag Quiz (`/guess-country`)
- **Objective**: Identify the country based on its national flag SVG.
- **Assistance**: Access country facts and continent hints from the Intelligence panel.
- **Audio Feedback**: Instant sound feedback on correct and incorrect guesses.

### 🌆 Capital Quiz (`/guess-capital`)
- **Objective**: Identify the capital city given the country name in 3D retro arcade typography.
- **Interactive Letter Reveal**: Use the **Hint (💡)** powerup to reveal capital letters sequentially (`_ _ _ _`).
- **Dynamic Stats**: Real-time tracking of correct/wrong answers and current session scores.

### 🗺️ More Modes (Coming Soon)
- Map-based pinpoint challenges, time-attack blitzes, and multiplayer head-to-head showdowns.

---

## ⚡ Game Mechanics & Scoring

| Outcome | Score Change | Streak Impact | Multiplier |
| :--- | :---: | :---: | :---: |
| **Correct Answer** | `+100` pts | `+1` streak | Scale up: 2x streak → **1.5x**, 3x streak → **2x**, 5x streak → **3x**, 10x streak → **5x** |
| **Wrong Answer** | `-100` pts | Reset to `0` | Multiplier resets to `1x` |

- **Personal High Scores**: Automatically saved to your account when your current session score exceeds your recorded best.
- **Guest Mode**: Anyone can jump in and play without logging in. Sign in with Clerk to save high scores and rank on the leaderboard.
- **Lofi Soundtrack**: Toggle background music (`lofi3.mp3`) with the audio button in any mode.

---

## ✨ Features

- 🕹️ **Arcade Retro Aesthetics**: Custom fonts, scanlines, CRT glow overlays, and pixel buttons.
- 🏆 **Global Hall of Fame**: Aggregated high-score leaderboard querying top players from Neon PostgreSQL.
- 🔐 **Clerk Authentication**: Effortless user sign-in with automatic PostgreSQL profile synchronization.
- 🧠 **Zustand State Store**: High scores stay synchronized across the homepage and all active quiz routes.
- 🚀 **High Performance Data Layer**: Static country and flag datasets served directly from local JSON and optimized vector SVGs, eliminating latency.
- 📱 **Mobile & Desktop Layouts**: Dedicated desktop navigation bar and adaptive mobile bottom navigation bar.
- 🐳 **Dockerized**: Multi-stage production container setup ready for immediate cloud deployment.

---

## 🚀 Performance Architecture: JSON Refactoring

In earlier iterations, every quiz question required roundtrip database queries:

```
[Client] ──> [Next.js API] ──> [Remote Database] ──> [Latency Delay]
```

To deliver instant, stutter-free gameplay, country definitions and flags were refactored into pre-bundled datasets:

```
[Client] ──> [Next.js App Router] ──> [Local JSON & SVG Assets]  (⚡ <5ms)
                                └──> [NeonDB (High Scores & Leaderboard only)]
```

- **Instant Question Transitions**: Zero wait time between questions.
- **Reduced Database Load**: PostgreSQL connections are reserved exclusively for score persistence and leaderboard rankings.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router & Server Actions / API Routes) |
| **Frontend Library** | [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with custom typography & retro utilities |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) (`useScoreStore`) |
| **Authentication** | [Clerk](https://clerk.com/) (`@clerk/nextjs`) |
| **Database** | [PostgreSQL via Neon](https://neon.tech/) with connection pooling (`pg`) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com/) |
| **Containerization** | [Docker](https://www.docker.com/) (Node.js 22 Alpine multi-stage) |

---

## 📁 Project Structure

```text
world_quiz_nextjs/
├── app/
│   ├── (pages)/
│   │   ├── guess-capital/      # Capital Quiz gameplay page & styling
│   │   └── guess-country/      # Flag Quiz gameplay page & styling
│   ├── api/
│   │   ├── country/            # Random country/capital generator endpoint
│   │   ├── create-user/        # Upserts Clerk user to NeonDB
│   │   ├── flag/               # Random country/flag generator endpoint
│   │   ├── highscore/          # Fetch user highscore per mode
│   │   ├── leaderboard/        # Global top 10 players endpoint
│   │   └── save-score/         # High score update endpoint
│   ├── globals.css             # Theme tokens, retro animations, CRT effects
│   ├── layout.tsx              # ClerkProvider & Root layout wrapper
│   └── page.tsx                # Homepage, mode selection & leaderboard
├── components/
│   ├── GameModeCard.tsx        # Animated game mode selection cards
│   ├── Leaderboard.tsx         # Global Hall of Fame arcade table
│   └── Navbar.tsx              # Responsive navigation & Clerk user controls
├── data/
│   └── countries.json          # Master list of countries, capitals, and codes
├── lib/
│   └── neondb.ts               # PostgreSQL connection pool configuration
├── public/
│   ├── assets/                 # Backgrounds, retro sounds (lofi, win, error)
│   └── countryFlags/           # Pixel-perfect country flag vector SVGs
├── store/
│   └── useScoreStore.ts        # Zustand global store for user high scores
├── proxy.ts                    # Clerk authentication middleware matcher
├── Dockerfile                  # Multi-stage production container build
├── .dockerignore               # Docker context exclusion rules
└── .env.example                # Sample environment variables
```

---

## 🗄️ Database Schema

Run the following SQL in your NeonDB SQL Editor or PostgreSQL client to initialize the tables:

```sql
-- 1. Users table (synced from Clerk)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Scores table (stores highest score per game mode per user)
CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    game_mode VARCHAR(50) NOT NULL,
    high_score INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_mode UNIQUE (user_id, game_mode)
);

-- 3. Index for fast leaderboard aggregation
CREATE INDEX IF NOT EXISTS idx_scores_user_mode ON scores(user_id, game_mode);
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version `20.x` or `22.x`)
- [npm](https://www.npmjs.com/) or your preferred package manager
- A free [Clerk](https://clerk.com/) account
- A free [Neon](https://neon.tech/) Serverless PostgreSQL database

### 1. Clone the Repository

```bash
git clone https://github.com/Dhananjoy333/world_quiz.git
cd world_quiz_nextjs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy the sample environment file:

```bash
cp .env.example .env.local
```

Fill in your actual credentials in `.env.local`:

```env
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
CLERK_SECRET_KEY=<your_clerk_secret_key>

# NeonDB PostgreSQL Connection String
DATABASE_URL=postgresql://<username>:<password>@<host>/<database>?sslmode=require
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to play!

---

## 🐳 Docker Deployment

The application includes a production-ready, multi-stage `Dockerfile`.

### Build the Docker Image

```bash
docker build -t world-quiz .
```

### Run the Container

```bash
docker run -d \
  -p 3000:3000 \
  --name world-quiz \
  --env-file .env.local \
  world-quiz
```

Access the app at [http://localhost:3000](http://localhost:3000).

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/flag` | Returns a randomized country name and corresponding flag code. |
| `GET` | `/api/country` | Returns a randomized country and its correct capital city. |
| `POST` | `/api/create-user` | Upserts a newly registered Clerk user into PostgreSQL (`clerkId`, `username`). |
| `POST` | `/api/save-score` | Updates user's high score if the submitted score is higher than current record. |
| `GET` | `/api/highscore/[mode]/[clerkId]` | Retrieves the saved high score for a specific player and mode (`country` or `capital`). |
| `GET` | `/api/leaderboard` | Fetches the top 10 global players ranked by sum of high scores. |

---

## 🧠 Future Roadmap

- [ ] 🗺️ **Interactive World Map Quiz**: Click on the correct country on an interactive globe.
- [ ] ⏱️ **Time Attack Mode**: Guess as many capitals/flags as possible within 60 seconds.
- [ ] 👥 **Multiplayer 1v1**: Real-time room challenges using WebSockets.
- [ ] 🏅 **Achievements & Badges**: Unlock custom pixel trophies for streak milestones.
- [ ] 📱 **PWA Offline Support**: Play offline with cached flag vectors.

---

## 👨‍💻 Author

Developed by **[Dhananjoy Brahma](https://github.com/Dhananjoy333)**

If you enjoy playing WorldQuiz, please consider giving the repository a ⭐!