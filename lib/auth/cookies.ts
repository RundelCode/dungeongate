
export function setAuthCookies(
    accessToken: string,
    refreshToken: string
) {
    document.cookie = `access_token=${accessToken}; path=/; secure; samesite=lax`
    document.cookie = `refresh_token=${refreshToken}; path=/; secure; samesite=lax`
}

export function getAuthToken(): string | null {
    const match = document.cookie.match(
        /(^| )access_token=([^;]+)/
    )
    return match ? match[2] : null
}

export function clearAuthCookies() {
    document.cookie = 'access_token=; path=/; max-age=0'
    document.cookie = 'refresh_token=; path=/; max-age=0'
}
