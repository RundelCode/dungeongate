import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '../../../../../lib/supabase/client'

export async function POST(req: Request) {
    const { email, password } = await req.json()

    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        })

    if (error || !data.session) {
        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        )
    }

    const cookieStore = await cookies()

    cookieStore.set('access_token', data.session.access_token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
    })

    cookieStore.set('refresh_token', data.session.refresh_token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
    })

    return NextResponse.json({ success: true })
}
