'use client'

import { useEffect, useState } from 'react'
import styles from './games.module.css'
import Navbar from '../components/navbar/navbar'
import { createGame, getMyGames } from '../api/games'
import { BarLoader } from "react-spinners";
import Footer from '../components/footer/footer'
import { useRouter } from 'next/navigation'

export type Game = {
    id: string
    name: string
    description: string | null
    mode: string
    status: 'active' | 'paused' | 'archived'
    max_players: number
    cover_url?: string | null
}

export const GAME_MODES = [
    {
        id: 'presencial-mapa',
        label: 'Presencial con mapa',
        description: 'Juego presencial usando mapas físicos o digitales',
    },
    {
        id: 'presencial-slide',
        label: 'Presencial con escenas',
        description: 'Escenas proyectadas en monitor o TV',
    },
    {
        id: 'presencial-hojas',
        label: 'Hojas interactivas',
        description: 'Sin mapas, solo fichas digitales',
    },
    {
        id: 'virtual',
        label: 'Virtual',
        description: 'Juego completamente online',
    },
]

export function getGameModeLabel(modeId: string): string {
    const mode = GAME_MODES.find(m => m.id === modeId)
    return mode ? mode.label : 'Modo desconocido'
}


export default function Page() {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [creating, setCreating] = useState(false)
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        mode: '',
        max_players: 4,
        description: '',
        cover_url: '',
    })

    const [coverFile, setCoverFile] = useState<File | null>(null)

    async function handleCreateGame(e: React.FormEvent) {
        e.preventDefault()
        if (creating) return

        setCreating(true)

        try {
            const createRes = await fetch('/api/games', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    mode: form.mode,
                    max_players: form.max_players,
                    description: form.description,
                    cover_url: null,
                }),
            })

            if (!createRes.ok) {
                const err = await createRes.json()
                alert(err.error || 'Error al crear la partida')
                return
            }

            const game = await createRes.json()

            if (coverFile) {
                const fd = new FormData()
                fd.append('file', coverFile)

                const uploadRes = await fetch(
                    `/api/uploads/games/${game.id}/cover`,
                    {
                        method: 'POST',
                        body: fd,
                    }
                )

                if (!uploadRes.ok) {
                    alert('La partida se creó, pero falló la subida de la portada')
                    setShowCreateModal(false)
                    return
                }

                const { url } = await uploadRes.json()

                const patchRes = await fetch(`/api/games/${game.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cover_url: url,
                    }),
                })

                if (!patchRes.ok) {
                    alert('La portada se subió, pero no se pudo guardar')
                }
            }

            setShowCreateModal(false)


            setCoverFile(null)
            setForm({
                name: '',
                mode: '',
                max_players: 4,
                description: '',
                cover_url: '',
            })

            const data = await getMyGames()
            const normalized = data.map((i: any) => i.games).filter(Boolean)
            setGames(normalized)

        } catch (err) {
            console.error(err)
            alert('Error inesperado')
        } finally {
            setCreating(false)
        }
    }






    useEffect(() => {
        getMyGames()
            .then((data: any[]) => {
                const normalizedGames = data
                    .map(item => item.games)
                    .filter(Boolean)

                setGames(normalizedGames)
            })
            .catch(() =>
                setError('No se pudieron cargar las partidas')
            )
            .finally(() => setLoading(false))
    }, [])



    return (
        <div className={styles.page}>
            <Navbar />

            <div className={styles.hero}>
                <h1>Mis Partidas</h1>

                <div className={styles.buttons}>
                    <button onClick={() => setShowCreateModal(true)}>Crear</button>
                    <button>Unirse</button>
                </div>
            </div>

            <div className={styles.content}>
                {loading ? (
                    <div className={styles.loaderContainer}>
                        <BarLoader color="#BE8D52" />
                    </div>
                ) : (
                    <>
                        {games.length > 0 ? (
                            <div className={styles.grid}>
                                {games.map(game => (
                                    <div key={game.id} className={styles.card}>
                                        <div
                                            className={styles.cover}
                                            style={{
                                                backgroundImage: `url(${game.cover_url || '/images/placeholder.png'})`,
                                            }}
                                        >
                                            <div className={styles.cardBody}>
                                                <p className={styles.title}>{game.name}</p>
                                                <p className={styles.description}>
                                                    {getGameModeLabel(game.mode)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No tienes partidas aún.</p>
                        )}
                    </>
                )}

                {error && <p className={styles.error}>{error}</p>}
            </div>

            {showCreateModal && (
                <>
                    <div
                        className={styles.overlay}
                        onClick={() => setShowCreateModal(false)}
                    />

                    <div className={styles.modal}>
                        <h2>Crear partida</h2>

                        <form onSubmit={handleCreateGame}>
                            <div
                                className={styles.uploadBox}
                                onClick={() =>
                                    document.getElementById('coverInput')?.click()
                                }
                            >
                                {coverFile ? (
                                    <img
                                        src={URL.createObjectURL(coverFile)}
                                        alt="Preview"
                                        className={styles.uploadPreview}
                                    />
                                ) : (
                                    <>
                                        <div className={styles.uploadIcon}>✔</div>
                                        <p className={styles.uploadText}>
                                            Busca la foto a subir
                                        </p>
                                        <button
                                            type="button"
                                            className={styles.uploadButton}
                                        >
                                            BUSCAR
                                        </button>
                                    </>
                                )}

                                <input
                                    id="coverInput"
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={e =>
                                        setCoverFile(e.target.files?.[0] ?? null)
                                    }
                                />
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.inputContainer}>
                                    <p>Titulo</p>
                                    <input
                                        type="text"
                                        placeholder="Titulo"
                                        required
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <p>Jugadores Maximos</p>
                                    <input
                                        type="number"
                                        min={1}
                                        max={10}
                                        required
                                        value={form.max_players}
                                        onChange={e => {
                                            const value = Number(e.target.value)
                                            if (value <= 10) {
                                                setForm({ ...form, max_players: value })
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputContainerFull}>
                                <p>Tipo de partida</p>
                                <div className={styles.modeGrid}>
                                    {GAME_MODES.map(mode => (
                                        <button
                                            key={mode.id}
                                            type="button"
                                            className={`${styles.modeCard} ${form.mode === mode.id ? styles.active : ''
                                                }`}
                                            onClick={() =>
                                                setForm({ ...form, mode: mode.id })
                                            }
                                        >
                                            <strong>{mode.label}</strong>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.inputContainerFull}>
                                <p>Descripción</p>
                                <textarea
                                    placeholder="Descripción"
                                    value={form.description}
                                    onChange={e =>
                                        setForm({ ...form, description: e.target.value })
                                    }
                                />
                            </div>


                            <button
                                type="submit"
                                className={styles.submit}
                                disabled={creating}
                            >
                                {creating ? (
                                    <BarLoader color="#131313" height={4} />
                                ) : (
                                    'Crear'
                                )}
                            </button>
                        </form>
                    </div>
                </>
            )}
            <Footer></Footer>
        </div>
    )
}
