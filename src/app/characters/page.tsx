"use client";

import { useEffect, useState } from "react";
import styles from "./characters.module.css";
import { BarLoader } from "react-spinners";
import Navbar from "../components/navbar/navbar";
import { Character } from "../types/character";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import characterPlaceholder from "../../../public/images/characterPlaceholder.jpg";

export default function CharactersPage() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/characters")
            .then(async (res) => {
                if (!res.ok) throw new Error("Failed to fetch characters");
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setCharacters(data);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const activeBackground =
        characters.length > 0
            ? characters[Math.max(activeIndex - 1, 0)]?.avatar_url
            : "/images/Background-1.png";

    return (
        <main className={styles.page}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeBackground}
                    className={styles.background}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        backgroundImage: `url(${activeBackground})`,
                        backgroundPosition: "center",
                    }}
                />
            </AnimatePresence>

            <Navbar />

            <h1>Mis Personajes</h1>

            {loading ? (
                <div className={styles.loaderContainer}>
                    <BarLoader className={styles.loader} color="#ffffff" />
                </div>
            ) : (
                <div className={styles.grid}>
                    <div
                        className={`${styles.card} ${styles.createCard}`}
                        onClick={() => router.push("/characters/create")}
                    >
                        <div className={styles.createContent}>
                            <span className={styles.plus}>+</span>
                            <p>Crear personaje</p>
                        </div>
                    </div>

                    {characters.map((character, index) => (
                        <div
                            key={character.id}
                            className={`${styles.card} ${index + 1 === activeIndex ? styles.active : ""}`}
                            onMouseEnter={() => setActiveIndex(index + 1)}
                            onClick={() => setSelectedCharacter(character)}
                        >
                            <div
                                className={styles.cover}
                                style={{
                                    backgroundImage: `url(${character.avatar_url || "/images/characterplaceholder.jpg"})`,
                                }}
                            >
                                <div className={styles.cardBody}>
                                    <p className={styles.title}>{character.name}</p>
                                    <div className={styles.badges}>
                                        {character.class && (
                                            <span
                                                className={styles.badge}
                                                style={{ backgroundColor: character.class.color || "#444" }}
                                            >
                                                {character.class.name}
                                            </span>
                                        )}
                                        {character.race && (
                                            <span
                                                className={styles.badge}
                                                style={{ backgroundColor: character.race.color || "#444" }}
                                            >
                                                {character.race.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}


        </main>
    );
}



/*

<AnimatePresence>
                {selectedCharacter && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCharacter(null)}
                    >
                        <motion.div
                            className={styles.sheet}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.sheetHeader}>
                                <Image
                                    src={selectedCharacter.avatar_url || characterPlaceholder}
                                    alt={selectedCharacter.name}
                                    width={400}
                                    height={500}
                                    className={styles.sheetImage}
                                />

                                <div className={styles.sheetMainInfo}>
                                    <div className="">
                                        <h2>{selectedCharacter.name}</h2>
                                    <div className={styles.subtitle}>
                                        <div className={styles.badges}>
                                            {selectedCharacter.class && (
                                                <span
                                                    className={styles.badge}
                                                    style={{ backgroundColor: selectedCharacter.class.color || "#444" }}
                                                >
                                                    {selectedCharacter.class.name}
                                                </span>
                                            )}
                                            {selectedCharacter.race && (
                                                <span
                                                    className={styles.badge}
                                                    style={{ backgroundColor: selectedCharacter.race.color || "#444" }}
                                                >
                                                    {selectedCharacter.race.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    </div>
                                    <div className={styles.hpBox}>
                                        <div>
                                            <span>Puntos De Golpe</span>
                                            <strong>{selectedCharacter.max_hp}</strong>
                                        </div>
                                        <div>
                                            <span>Clase De Armadura</span>
                                            <strong>{selectedCharacter.armor_class}</strong>
                                        </div>
                                        <div>
                                            <span>Velocidad</span>
                                            <strong>{selectedCharacter.speed}</strong>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className={styles.statsRow}>
                                <div><span>FUE</span><strong>{selectedCharacter.str}</strong></div>
                                <div><span>DES</span><strong>{selectedCharacter.dex}</strong></div>
                                <div><span>CON</span><strong>{selectedCharacter.con}</strong></div>
                                <div><span>INT</span><strong>{selectedCharacter.int_}</strong></div>
                                <div><span>SAB</span><strong>{selectedCharacter.wis}</strong></div>
                                <div><span>CAR</span><strong>{selectedCharacter.cha}</strong></div>
                            </div>

                            <div className={styles.sheetGrid}>
                                <div className={styles.block}>
                                    <h3>Habilidades</h3>

                                    <div className={styles.skillsList}>
                                        {SKILLS.map((skill) => {
                                            const bonus = skillBonus(
                                                selectedCharacter,
                                                skill.ability,
                                                skill.key
                                            );

                                            const isProficient =
                                                selectedCharacter.skills_proficiencies?.[skill.key];

                                            return (
                                                <div
                                                    key={skill.key}
                                                    className={`${styles.skillRow} ${isProficient ? styles.proficient : ""
                                                        }`}
                                                >
                                                    <span className={styles.skillName}>
                                                        {skill.label}
                                                    </span>
                                                    <span className={styles.skillValue}>
                                                        {skill.ability.toUpperCase()}{" "}
                                                        {bonus >= 0 ? "+" : ""}
                                                        {bonus}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className={styles.block}>
                                    <div >
                                        <h3>Combate</h3>
                                    </div>

                                    <div>
                                        <h3>Hechizos</h3>
                                    </div>
                                </div>

                                <div className={styles.block}>
                                    <h3>Inventario</h3>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            

.sheet {
    width: 40vw;
    max-width: 1100px;
    height: 85vh;
    background: #1a1a1a;
    border-radius: 22px;
    padding: 24px;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0 40px 120px rgba(0, 0, 0, 0.9);
    overflow-y: scroll;
}

.sheet::-webkit-scrollbar {
    display: none;
}

.sheetHeader {
    display: flex;
    gap: 24px;
}

.sheetImage {
    width: 260px;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    max-height: 400px;
}

.sheetMainInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    width: 100%;

}

.sheetMainInfo h2 {
    font-size: 3.5rem;
    font-family: var(--font-bjorke), serif;
    color: #be8d52;
    font-weight: 100;
}

.subtitle {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.hpBox {
    width: 98%;
    display: flex;
    justify-content: space-between;
    gap: 16px;
}

.hpBox div {
    background: #be8d52;
    padding: 12px 18px;
    border-radius: 10px;
    text-align: center;
    min-width: 80px;
    flex: 1;
}

.hpBox span {
    display: block;
    font-size: 0.7rem;
    opacity: 0.9;
    font-weight: 400;
}

.hpBox strong {
    font-size: 2rem;
    color: #fff;
    font-family: var(--font-bjorke), serif;
    font-weight: 100;
}

.statsRow {
    display: flex;
    justify-content: space-between;
    background: #131313;
    padding: 12px;
    border-radius: 12px;
}

.statsRow div {
    text-align: center;
    flex: 1;
}

.statsRow span {
    display: block;
    font-size: 0.7rem;
    opacity: 0.7;
}

.statsRow strong {
    font-size: 2rem;
    color: #be8d52;
    font-family: var(--font-bjorke), serif;
    font-weight: 100;
}

.sheetGrid {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
}

.block {
    background: #131313;
    border-radius: 14px;
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.block h3 {
    font-size: 1.5rem;
    color: #be8d52;
    margin-bottom: 8px;
}


.skillsList {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.skillRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0.35);
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 0.85rem;
}

.skillName {
    color: #ddd;
}

.skillValue {
    background: #222;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    color: #be8d52;
    font-weight: 600;
}

.proficient {
    border-left: 3px solid #be8d52;
    background: rgba(190, 141, 82, 0.15);
}
            */