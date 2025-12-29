'use client'
import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import Logo from '../../../../public/icons/Logo.png'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabase/client'
import { useSessionStore } from '../../../../stores/session.store'
import { logout } from '../../../../lib/supabase/auth'

type Props = {}

export default function Navbar({ }: Props) {
  const router = useRouter()
  const clearSession = useSessionStore((state) => state.clear)

  const handleLogout = async () => {
    try {
      await logout()
      window.location.href = '/login'
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Image src={Logo} alt="Dungeon Gate" />
      </div>

      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/games">Partidas</a></li>
        <li><a href="/characters">Personajes</a></li>
        <li><a href="#">Recursos</a></li>
        <li><a href="#">Compendio</a></li>
        <li><a href="#">Ajustes</a></li>
      </ul>

      <div className={styles.buttonContainer}>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  )
}
