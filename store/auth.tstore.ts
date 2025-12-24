import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  hasSeenOnboarding: boolean;
  isLoading: boolean;
  user: { id: string; email: string } | null;

  // Actions
  setAuth: (isAuth: boolean) => void;
  setOnboardingComplete: () => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      hasSeenOnboarding: false,
      isLoading: true,
      user: null,

      setAuth: (isAuth) => set({ isAuthenticated: isAuth }),

      setOnboardingComplete: () => set({ hasSeenOnboarding: true }),

      checkAuth: async () => {
        try {
          const token = await AsyncStorage.getItem("auth-token");
          const userString = await AsyncStorage.getItem("auth-user");
          const onboarding = await AsyncStorage.getItem("onboarding-complete");

          set({
            isAuthenticated: !!token,
            user: userString ? JSON.parse(userString) : null,
            hasSeenOnboarding: onboarding === "true",
            isLoading: false,
          });
        } catch (error) {
          console.error("Auth check failed:", error);
          set({ isLoading: false });
        }
      },

      logout: async () => {
        await AsyncStorage.removeItem("auth-token");
        await AsyncStorage.removeItem("auth-user");
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
