import React from 'react'
import styles from './games.module.css'
import Navbar from '../components/navbar/navbar'

type Props = {}

export default function page({ }: Props) {
    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.hero}>
                <h1>Mis Partidas</h1>
                <div className={styles.buttons}>
                    <button>Crear</button>
                    <button>Unirse</button>
                </div>
            </div>
        </div>
    )
}