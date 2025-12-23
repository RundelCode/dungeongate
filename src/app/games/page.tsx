'use client'

import { useEffect, useState } from 'react'
import { getMyGames, Game } from '../../../lib/api/games'
import styles from './games.module.css'
import Navbar from '../components/navbar/navbar'

export default function Page() {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getMyGames()
            .then(setGames)
            .catch(() => setError('No se pudieron cargar las partidas'))
            .finally(() => setLoading(false))
    }, [])

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

            <div className={styles.content}>
                {loading && <p>Cargando partidas...</p>}
                {error && <p className={styles.error}>{error}</p>}

                {!loading && games.length === 0 && (
                    <p>No tienes partidas aún.</p>
                )}

                <div className={styles.grid}>
                    {games.map(game => (
                        <div key={game.id} className={styles.card}>
                            <h3>{game.name}</h3>
                            <p>{game.description ?? 'Sin descripción'}</p>

                            <div className={styles.meta}>
                                <span>{game.mode}</span>
                                <span>{game.status}</span>
                                <span>{game.max_players} jugadores</span>
                            </div>

                            <button>Entrar</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
