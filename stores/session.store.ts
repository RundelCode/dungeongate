import { create } from 'zustand'

interface SessionState {
    user: any | null
    accessToken: string | null
    setSession: (session: any) => void
    clear: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
    user: null,
    accessToken: null,
    setSession: (session) =>
        set({
            user: session.user,
            accessToken: session.access_token,
        }),
    clear: () => set({ user: null, accessToken: null }),
}))
