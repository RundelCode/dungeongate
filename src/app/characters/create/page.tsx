'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import styles from './characterCreation.module.css'
import { Class } from '@/app/types/class'
import { Race } from '@/app/types/race'
import { Background } from '@/app/types/background'
import { BarLoader } from 'react-spinners'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

type Props = {
  title: string
  description?: string
  onClick?: () => void
  delay?: number
}


type AbilityKey = "str" | "dex" | "con" | "int" | "wis" | "cha";

type StatBlock = Partial<Record<AbilityKey, number>>;

const BASE_STATS: Record<AbilityKey, number> = {
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
}

function mergeStats(
  base: Record<AbilityKey, number>,
  cls?: { base_stats?: StatBlock | null } | null,
  race?: { stat_bonuses?: StatBlock | null } | null,
  bg?: { stat_bonuses?: StatBlock | null } | null
): Record<AbilityKey, number> {
  const result = { ...base };

  const apply = (source?: StatBlock | null) => {
    if (!source) return;

    Object.entries(source).forEach(([key, value]) => {
      if (key in result && typeof value === 'number') {
        result[key as AbilityKey] += value;
      }
    });
  };

  apply(cls?.base_stats);
  apply(race?.stat_bonuses);
  apply(bg?.stat_bonuses);

  return result;
}


const DEFAULT_AVATAR =
  'https://lajlioiaxfjmmbjqguoj.supabase.co/storage/v1/object/public/dungeongate/characters/undefined/avatar-1f881e81-0206-4bfe-aa76-e12bf9e9f6c3.jpg'



export default function Page() {
  const [classes, setClasses] = useState<Class[]>([])
  const [races, setRaces] = useState<Race[]>([])
  const [backgrounds, setBackgrounds] = useState<Background[]>([])

  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [selectedRace, setSelectedRace] = useState<Race | null>(null)
  const [selectedBackground, setSelectedBackground] = useState<Background | null>(null)


  const [characterImage, setCharacterImage] = useState<File | null>(null)
  const [characterName, setCharacterName] = useState<string>('')
  const [notes, setNotes] = useState<string>('')


  const router = useRouter();


  useEffect(() => {
    fetch('/api/classes')
      .then(r => r.json())
      .then(setClasses)
  }, [])

  useEffect(() => {
    fetch('/api/races')
      .then(r => r.json())
      .then(setRaces)
  }, [])

  useEffect(() => {
    fetch('/api/backgrounds')
      .then(r => r.json())
      .then(setBackgrounds)
  }, [])


  const finalStats = mergeStats(
    BASE_STATS,
    selectedClass ?? undefined,
    selectedRace ?? undefined,
    selectedBackground ?? undefined
  );


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!selectedClass || !selectedRace || !selectedBackground) {
      alert('Debes seleccionar clase, raza y trasfondo')
      return
    }

    try {
      const payload = {
        name: characterName,
        class_id: selectedClass.id,
        race_id: selectedRace.id,
        background_id: selectedBackground.id,

        level: 1,
        experience: 0,

        str: finalStats.str,
        dex: finalStats.dex,
        con: finalStats.con,
        int_: finalStats.int,
        wis: finalStats.wis,
        cha: finalStats.cha,

        proficiency_bonus: 2,
        max_hp: 10 + Math.floor((finalStats.con - 10) / 2),
        armor_class: 10 + Math.floor((finalStats.dex - 10) / 2),
        speed: selectedRace.speed ?? 30,

        hit_dice: selectedClass.hit_die,
        passive_perception: 10 + Math.floor((finalStats.wis - 10) / 2),

        saving_throw_proficiencies: selectedClass.saving_throw_proficiencies ?? '',
        spellcasting_ability: selectedClass.spellcasting_ability ?? null,

        alignment: 'Neutral',
        senses: selectedRace.languages
          ? `Visión normal. Idiomas: ${selectedRace.languages}`
          : 'Visión normal',

        languages: selectedRace.languages ?? 'Common',
        skills_proficiencies: {},
        notes: notes || '',

        // 👇 SI NO HAY IMAGEN, SE GUARDA YA
        avatar_url: characterImage
          ? null
          : DEFAULT_AVATAR,
      }

      const res = await fetch('/api/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Error al crear personaje')
      }

      const character = await res.json()

      if (characterImage) {
        const fd = new FormData()
        fd.append('file', characterImage)

        const uploadRes = await fetch(
          `/api/uploads/characters/${character.id}`,
          {
            method: 'POST',
            body: fd,
          }
        )

        if (!uploadRes.ok) {
          alert('El personaje se creó, pero falló la subida de la imagen')
          return
        }

        const { url } = await uploadRes.json()

        await fetch(`/api/characters/${character.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatar_url: url }),
        })
      }

      router.push('/characters')
    } catch (err) {
      console.error(err)
      alert('Error creando el personaje')
    }
  }

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        <h2 className={styles.title}>Creacion De Personaje</h2>
        <form onSubmit={(e: FormEvent) => handleSubmit(e)} className={styles.creationForm}>
          <div className={styles.topSection}>
            <div className={styles.imageInput}>
              <div
                className={styles.uploadBox}
                onClick={() => document.getElementById('characterImageInput')?.click()}
              >
                {characterImage ? (
                  <img src={URL.createObjectURL(characterImage)} className={styles.uploadPreview} />
                ) : (
                  <>
                    <div className={styles.uploadIcon}>🧙‍♂️</div>
                    <p className={styles.uploadText}>Selecciona imagen</p>
                  </>
                )}

                <input
                  id="characterImageInput"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={e => setCharacterImage(e.target.files?.[0] ?? null)}
                />
              </div>
            </div>
            <div className={styles.inputSection}>
              <div className={styles.inputContainer}>
                <p>Nombre del personaje</p>
                <input type="text" placeholder='Nombre' value={characterName} onChange={(e) => setCharacterName(e.target.value)} required />
              </div>
              <div className={styles.inputContainer}>
                <p>Notas</p>
                <input type="text" placeholder='Agrega información relevante sobre el personaje' value={notes} onChange={(e) => setNotes(e.target.value)} required />
              </div>
              <div className={styles.inputContainer}>
                <p>Clase</p>

                <div className={styles.selectWrapper}>
                  <select
                    required
                    value={selectedClass?.id ?? ''}
                    onChange={(e) =>
                      setSelectedClass(classes.find(c => c.id === e.target.value) || null)
                    }
                  >
                    <option value="">Selecciona una clase</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.inputContainer}>
                <p>Raza</p>

                <div className={styles.selectWrapper}>
                  <select
                    required
                    value={selectedRace?.id ?? ''}
                    onChange={(e) =>
                      setSelectedRace(races.find(r => r.id === e.target.value) || null)
                    }
                  >
                    <option value="">Selecciona una raza</option>
                    {races.map(race => (
                      <option key={race.id} value={race.id}>
                        {race.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.inputContainer}>
                <p>Transfondo</p>

                <div className={styles.selectWrapper}>
                  <select
                    required
                    value={selectedBackground?.id ?? ''}
                    onChange={(e) =>
                      setSelectedBackground(
                        backgrounds.find(b => b.id === e.target.value) || null
                      )
                    }
                  >
                    <option value="">Selecciona un trasfondo</option>
                    {backgrounds.map(bg => (
                      <option key={bg.id} value={bg.id}>
                        {bg.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.details}>
            <h3>Estadísticas Base</h3>

            <div className={styles.statsGrid}>
              {(Object.entries(finalStats) as [AbilityKey, number][]).map(
                ([key, value]) => (
                  <div key={key} className={styles.statBox}>
                    <span>{key.toUpperCase()}</span>
                    <strong>{value}</strong>
                  </div>
                )
              )}
            </div>
          </div>

          <div className={styles.details}>
            <h3>Detalles De Clase</h3>
            {selectedClass ? <p className={styles.description}>{selectedClass?.description}</p>
              : <p className={styles.empty}>- Selecciona una clase -</p>}
          </div>

          <div className={styles.details}>
            <h3>Detalles De Raza</h3>
            {selectedClass ? <p className={styles.description}>{selectedRace?.description}</p>
              : <p className={styles.empty}>- Selecciona una raza -</p>}
          </div>

          <div className={styles.details}>
            <h3>Detalles De Transfondo</h3>
            {selectedClass ? <p className={styles.description}>{selectedBackground?.description}</p>
              : <p className={styles.empty}>- Selecciona un transfondo -</p>}
          </div>

          <button type="submit">Crear Personaje</button>
          <p className={styles.info}>- Con esto se creara una plantilla de personaje, que podras usar en tus partidas -</p>
        </form>

      </motion.div>
    </div>
  )
}
