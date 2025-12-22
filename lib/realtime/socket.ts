import { io } from 'socket.io-client'
import { useSessionStore } from '../../stores/session.store'

export function connectSocket() {
    const token = useSessionStore.getState().accessToken

    return io(process.env.NEXT_PUBLIC_API_URL!, {
        auth: { token },
    })
}
