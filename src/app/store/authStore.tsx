import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  uid: string;
  email: string;
  username: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const response = await fetch('https://api-dante-joki-871423140998.asia-southeast2.run.app/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          // Handle specific error codes
          if (response.status === 404) {
            throw new Error('User not found');
          }

          if (response.status === 400) {
            throw new Error('Invalid credentials');
          }

          if (!response.ok) {
            throw new Error('Login failed');
          }

          const { message, data } = await response.json();

          // Success handling
          if (message === "Logged in successfully") {
            set({
              user: {
                uid: data.uid,
                email: data.email,
                username: data.username,
                role: data.role,
              },
              token: data.token,
              isAuthenticated: true,
            });
          } else {
            throw new Error('Unexpected response from server');
          }
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
