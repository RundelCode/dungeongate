import { supabase } from './client'
import { useSessionStore } from '../../stores/session.store'

export function listenAuthChanges() {
    supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
            useSessionStore.getState().setSession(session)
        } else {
            useSessionStore.getState().clear()
        }
    })
}
