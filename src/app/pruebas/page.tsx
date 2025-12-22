"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Pos = { x: number; y: number };

export default function DragMapTest() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [pos, setPos] = useState<Pos>({ x: 100, y: 100 });
    const draggingRef = useRef(false);
    const startPointerRef = useRef<Pos>({ x: 0, y: 0 });
    const startPosRef = useRef<Pos>({ x: 0, y: 0 });

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        draggingRef.current = true;
        startPointerRef.current = { x: e.clientX, y: e.clientY };
        startPosRef.current = { ...pos };

        // 🔴 ANTES: e.target
        // 🟢 AHORA: e.currentTarget (el div que tiene los listeners)
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!draggingRef.current || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const dx = e.clientX - startPointerRef.current.x;
        const dy = e.clientY - startPointerRef.current.y;

        let newX = startPosRef.current.x + dx;
        let newY = startPosRef.current.y + dy;

        const tokenSize = 50;
        const maxX = rect.width - tokenSize;
        const maxY = rect.height - tokenSize;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        setPos({ x: newX, y: newY });
    };

    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        draggingRef.current = false;
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    };

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                background: "#111",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                ref={containerRef}
                style={{
                    width: 600,
                    height: 400,
                    border: "2px solid #555",
                    borderRadius: 12,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Image
                    src="/mapa.jpg"
                    alt="Mapa"
                    fill
                    draggable={false}
                    style={{ objectFit: "cover" }}
                />

                {/* Token encima */}
                <div
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    style={{
                        width: 50,
                        height: 50,
                        position: "absolute",
                        left: pos.x,
                        top: pos.y,
                        cursor: "grab",
                        touchAction: "none",
                        userSelect: "none",
                    }}
                >
                    <Image
                        src="/token.png"
                        alt="Token"
                        width={50}
                        height={50}
                        draggable={false}
                    />
                </div>
            </div>
        </div>
    );
}
