'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './carousel.module.css'

type CarouselItem = {
    src: string
    alt: string
    title: string
    description: string
}

type Props = {
    items: CarouselItem[]
}

const ITEMS_PER_PAGE = 5

export default function Carousel({ items }: Props) {
    const [page, setPage] = useState(0)

    if (!items || items.length === 0) return null

    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)

    const next = () => {
        if (page < totalPages - 1) setPage(p => p + 1)
    }

    const prev = () => {
        if (page > 0) setPage(p => p - 1)
    }

    return (
        <div className={styles.wrapper}>
            {page > 0 && (
                <button className={`${styles.arrow} ${styles.left}`} onClick={prev}>
                    ‹
                </button>
            )}

            <div className={styles.viewport}>
                <div
                    className={styles.track}
                    style={{
                        transform: `translateX(-${page * 100}%)`
                    }}
                >
                    {items.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className={styles.image}
                            />

                            <div className={styles.overlay}>
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {page < totalPages - 1 && (
                <button className={`${styles.arrow} ${styles.right}`} onClick={next}>
                    ›
                </button>
            )}
        </div>
    )
}
