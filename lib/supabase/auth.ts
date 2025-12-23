
import { supabase } from './client'
import { setAuthCookies } from '../auth/cookies'

export async function loginWithEmail(
    email: string,
    password: string
) {
    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        })

    if (error) throw error

    if (data.session) {
        setAuthCookies(
            data.session.access_token,
            data.session.refresh_token
        )
    }

    return data
}

export async function registerWithEmail(
    email: string,
    password: string
) {
    const { data, error } =
        await supabase.auth.signUp({
            email,
            password,
        })

    if (error) throw error

    if (data.session) {
        setAuthCookies(
            data.session.access_token,
            data.session.refresh_token
        )
    }

    return data
}

export async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
        },
    })

    if (error) throw error
}

