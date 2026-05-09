import { create } from "zustand"

interface ScoreStore {
  countryHighScore: number
  capitalHighScore: number

  setCountryHighScore: (score: number) => void
  setCapitalHighScore: (score: number) => void
}

export const useScoreStore = create<ScoreStore>((set) => ({
  countryHighScore: 0,
  capitalHighScore: 0,

  setCountryHighScore: (score) =>
    set({ countryHighScore: score }),

  setCapitalHighScore: (score) =>
    set({ capitalHighScore: score }),
}))