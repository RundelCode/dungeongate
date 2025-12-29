'use client'

import React, { useEffect, useState } from 'react'
import styles from './resources.module.css'
import Navbar from '../components/navbar/navbar'
import { Item } from '../types/items'
import { Monster } from '../types/monsters'
import { Scene } from '../types/scenes'

type ResourceCategory = 'items' | 'monsters' | 'scenes'

type Folder = {
    id: string
    name: string
    items: {
        id: string
        name: string
    }[]
}

export default function ResourcesPage() {
    const [activeCategory, setActiveCategory] = useState<ResourceCategory>('items')
    const [folders, setFolders] = useState<Folder[]>([])
    const [folderItems, setFolderItems] = useState<Record<string, any[]>>({})
    const [expandedFolders, setExpandedFolders] = useState<string[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchItemsForFolders = async () => {
            const results: Record<string, any[]> = {}

            for (const folder of folders) {
                const res = await fetch(`/api/folders/items/${folder.id}`)
                const data = await res.json()
                results[folder.id] = data
            }

            setFolderItems(results)
        }

        if (folders.length > 0) {
            fetchItemsForFolders()
        }
    }, [folders])


    const toggleFolder = (id: string) => {
        setExpandedFolders(prev =>
            prev.includes(id)
                ? prev.filter(f => f !== id)
                : [...prev, id]
        )
    }

    return (
        <div className={styles.page}>
            <Navbar />

            <div className={styles.folders}>
                <div className={styles.foldersNav}>
                    <h3>Resources</h3>

                    <div className={styles.categoryList}>
                        {['items', 'monsters', 'scenes'].map(cat => (
                            <div
                                key={cat}
                                className={`${styles.categoryItem} ${activeCategory === cat ? styles.active : ''
                                    }`}
                                onClick={() => setActiveCategory(cat as ResourceCategory)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </div>
                        ))}
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.folderTree}>
                        {loading && <p>Cargando...</p>}

                        {!loading &&
                            folders.map(folder => (
                                <div key={folder.id} className={styles.folderItem}>
                                    <div
                                        className={styles.folderHeader}
                                        onClick={() => toggleFolder(folder.id)}
                                    >
                                        {expandedFolders.includes(folder.id) ? '📂' : '📁'}{' '}
                                        {folder.name}
                                    </div>

                                    {expandedFolders.includes(folder.id) && (
                                        <div className={styles.subFolder}>
                                            {folderItems[folder.id]?.map(item => (
                                                <div key={item.id} className={styles.subItem}>
                                                    {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>

                <div className={styles.foldersContent}>
                    <h2>
                        {activeCategory.charAt(0).toUpperCase() +
                            activeCategory.slice(1)}
                    </h2>

                    <p style={{ opacity: 0.6 }}>
                        Selecciona un recurso o carpeta para ver detalles.
                    </p>
                </div>
            </div>
        </div>
    )
}
 