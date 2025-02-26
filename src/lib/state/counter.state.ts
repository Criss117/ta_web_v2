import { create } from "zustand";

interface CounterState {
  counter: number;
  setCounter: (counter: number) => void;
  increment: () => void;
}

export const counterState = create<CounterState>()((set) => ({
  counter: 0,
  setCounter: (counter) => set({ counter }),
  increment: () => set((prev) => ({ counter: prev.counter + 1 })),
}));
