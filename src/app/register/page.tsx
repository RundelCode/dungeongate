'use client'
import React, { FormEvent, useState } from 'react'
import styles from './register.module.css'
import { registerWithEmail } from '../../../lib/supabase/auth'
import { useRouter } from 'next/navigation'

type Props = {}

export default function Page({ }: Props) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter();

    const register = async (e: FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden')
            return
        }

        try {
            await registerWithEmail(email, password)
            router.push('/login')
        } catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.background}></div>

            <div className={styles.formContainer}>
                <h1>Dungeon Gate</h1>
                <h3>Registrate</h3>

                <form onSubmit={register} className={styles.form}>
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
                        <p>Nombre de usuario</p>
                        <input
                            type="text"
                            placeholder="Tu nombre de aventurero"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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

                    <div className={styles.inputContainer}>
                        <p>Confirmar contraseña</p>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Regístrate</button>

                    <p className={styles.redirect}>
                        ¿Ya tienes una cuenta?{' '}
                        <a href="/login">Inicia sesión aquí</a>
                    </p>
                </form>
            </div>
        </div>
    )
}
