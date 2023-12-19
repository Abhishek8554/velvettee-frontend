import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    token: string | undefined;
    setToken: (token: string) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: undefined,
            setToken: (token) => set({ token }),
        }),
        {
            name: 've-auth-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;
