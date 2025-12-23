'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabase/client'
import { setAuthCookies } from '../../../../lib/auth/cookies'

export default function AuthCallbackPage() {
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                setAuthCookies(
                    data.session.access_token,
                    data.session.refresh_token
                )
                router.replace('/')
            }
        })
    }, [router])

    return null
}
