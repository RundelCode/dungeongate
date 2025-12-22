'use client'
import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import Logo from '../../../../public/icons/Logo.png'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabase/client'
import { useSessionStore } from '../../../../stores/session.store'

type Props = {}

export default function Navbar({ }: Props) {
  const router = useRouter()
  const clearSession = useSessionStore((state) => state.clear)

  const logout = async () => {
    await supabase.auth.signOut()
    clearSession()
    router.push('/login')
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Image src={Logo} alt="Dungeon Gate" />
      </div>

      <ul>
        <li><a href="/dashboard">Inicio</a></li>
        <li><a href="/dashboard">Partidas</a></li>
        <li><a href="#">Personajes</a></li>
        <li><a href="#">Recursos</a></li>
        <li><a href="#">Compendio</a></li>
        <li><a href="#">Ajustes</a></li>
      </ul>

      <div className={styles.buttonContainer}>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </div>
  )
}
