'use client'

import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import Logo from '../../../../public/icons/Logo.png'
import { useRouter } from 'next/navigation'

type Props = {}

export default function Footer({ }: Props) {
    const router = useRouter()

    return (
        <footer className={styles.footer}>
            <Image src={Logo} alt="Dungeon Gate" />

            <div className={styles.nav}>
                <p className={styles.navTitle}>Navega por la página</p>

                <button onClick={() => router.push('/')}>Inicio</button>
                <button onClick={() => router.push('/games')}>Partidas</button>
                <button onClick={() => router.push('/characters')}>Personajes</button>
                <button onClick={() => router.push('/resources')}>Recursos</button>
                <button onClick={() => router.push('/compendium')}>Compendio</button>
                <button onClick={() => router.push('/settings')}>Ajustes</button>
            </div>
            <div className={styles.words}>
                <p>Dados que ruedan, risas que quedan.<br />
                    Las aventuras terminan, pero las historias se recuerdan para siempre.</p>
            </div>
        </footer>
    )
}
