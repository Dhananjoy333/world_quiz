import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ScoreStore {
  countryHighScore: number;
  capitalHighScore: number;

  setCountryHighScore: (score: number) => void;
  setCapitalHighScore: (score: number) => void;

  resetScores: () => void;
}

export const useScoreStore = create<ScoreStore>()(
  persist(
    (set) => ({
      countryHighScore: 0,
      capitalHighScore: 0,

      setCountryHighScore: (score) =>
        set({ countryHighScore: score }),

      setCapitalHighScore: (score) =>
        set({ capitalHighScore: score }),

      resetScores: () =>
        set({
          countryHighScore: 0,
          capitalHighScore: 0,
        }),
    }),
    {
      name: "score-storage",
    }
  )
);