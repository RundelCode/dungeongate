import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register', '/auth/callback']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/carousel') ||
        pathname.startsWith('/public')
    ) {
        return NextResponse.next()
    }

    const accessToken = request.cookies.get('access_token')?.value

    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
        return NextResponse.next()
    }

    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
