import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColorMode = "light" | "dark" | "system";

interface ColorModeState {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

export const useColorModeStore = create<ColorModeState>()(
  persist(
    (set, get) => ({
      colorMode: "light",
      setColorMode: (mode: ColorMode) => set({ colorMode: mode }),
      toggleColorMode: () => {
        const next = get().colorMode === "dark" ? "light" : "dark";
        set({ colorMode: next });
      },
    }),
    { name: "color-mode" }
  )
);
