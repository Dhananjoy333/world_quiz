# 🌍 WorldQuiz

A fun and interactive geography quiz game built with **Next.js** where players can test their knowledge of world countries, capitals, and flags.

Compete on the **global leaderboard**, track your **personal high scores**, and improve your geography knowledge while enjoying a smooth retro-style gaming experience.

---

# 🎮 Game Modes

Currently the game includes two quiz modes:

## 🏳️ Flag Quiz
Guess the **country name** by looking at its **flag**.

## 🌆 Capital Quiz
Guess the **capital city** from the **country name**.

More exciting game modes are planned for future updates.

---

# ✨ Features

- 🎮 Multiple geography quiz game modes
- 🏆 Global leaderboard system
- 📈 Personal high score tracking
- 🔐 Authentication with Clerk
- ⚡ Faster performance with optimized data loading
- 🗂️ JSON-based country & flag data handling
- 🧠 Zustand state management
- 🎵 Background music and sound effects
- 🌐 REST API integration
- 🎨 Retro pixel-style UI
- 📱 Responsive interface for different screen sizes

---

# 🚀 Performance Improvements (Next.js Refactor)

The project was originally built using a full database flow:

```txt
Frontend → Backend → NeonDB
```

After refactoring to **Next.js**, country and flag data are now loaded from local JSON files:

```txt
Frontend → Backend → JSON
```

This significantly improved the app’s initial loading speed and overall responsiveness.

Additional improvements include:

- ⚡ Faster quiz rendering
- 📦 Reduced database dependency for static quiz data
- 🧠 Zustand-based global state management for highscores
- 🔄 Shared highscore state between homepage and game modes

---

# 🛠️ Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Axios
- Zustand
- Clerk Authentication
- React Hot Toast

## Backend
- Node.js
- Next.js API Routes
- Rest API
- PostgreSQL (NeonDB)

---

# 🧠 Future Improvements

Planned features for future versions:

- 🗺️ Map-based quiz mode
- ⏱️ Timed challenges
- 📊 Player statistics dashboard
- 🧑‍🤝‍🧑 Multiplayer mode
- 🌍 More geography quiz categories
- 📱 Progressive Web App (PWA) support

---

# ⚙️ Installation

## Clone the repository

```bash
git clone <your-repository-url>
```

## Navigate into the project

```bash
cd worldquiz
```

## Install dependencies

```bash
npm install
```

## Start the development server

```bash
npm run dev
```

---

# 👨‍💻 Author

Developed by **Dhananjoy Brahma**

If you like this project, feel free to ⭐ the repository!