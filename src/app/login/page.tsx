'use client'
import React, { FormEvent, useState } from 'react'
import styles from './login.module.css'
import Image from 'next/image'
import Google from '../../../public/icons/google.png'
import { useRouter } from 'next/navigation'
import { loginWithEmail, loginWithGoogle } from '../../../lib/supabase/auth'
import { useSessionStore } from '../../../stores/session.store'

type Props = {}

export default function Page({ }: Props) {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const login = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const data = await loginWithEmail(email, password)
            useSessionStore.getState().setSession(data.session)
            router.push('/dashboard')
        } catch (err: any) {
            alert(err.message)
        }
    }

    const loginWithGoogleHandler = async () => {
        try {
            await loginWithGoogle()
        } catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.formContainer}>
                <h1>Dungeon Gate</h1>
                <h3>Inicia sesion</h3>

                <form onSubmit={login} className={styles.form}>
                    <button
                        type="button"
                        onClick={loginWithGoogle}
                        className={styles.googleButton}
                    >
                        <Image src={Google} alt="Google" width={20} height={20} />
                        <span>Inicia sesión con Google</span>
                    </button>

                    <div className={styles.divider}>
                        <div className={styles.line}></div>
                        <p>O</p>
                        <div className={styles.line}></div>
                    </div>

                    <div className={styles.inputContainer}>
                        <p>Correo electrónico</p>
                        <input
                            type="email"
                            placeholder="ejemplo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <p>Contraseña</p>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <p>Recuérdame</p>
                    </div>

                    <button type="submit">Iniciar sesión</button>

                    <p className={styles.redirect}>
                        ¿Aún no tienes una cuenta?{' '}
                        <a href="/register">Regístrate aquí</a>
                    </p>
                </form>
            </div>

            <div className={styles.background}></div>
        </div>
    )
}
