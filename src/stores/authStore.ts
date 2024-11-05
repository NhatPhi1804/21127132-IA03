import { create } from "zustand";

type authStore = {
  isAuthenticated: boolean;
  email: string;
  setEmail: (email: string) => void;
  login: () => void;
  logout: () => void;
};

const useAuthStore = create<authStore>()((set) => ({
  isAuthenticated: false,
  email: "",
  setEmail: (email: string) => set({ email: email }),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));

export default useAuthStore;
