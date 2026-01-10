import React, { useEffect, useMemo, useRef, useState } from 'react';

const CHARACTER_SRC = process.env.PUBLIC_URL + '/character.png';

const chatLines = [
    "Hi. I'm Ramy. I design things. Systems, clothes, habits. Clicking me counts as research.",
    "I'm a designer and a researcher, which means I ask too many questions and then aestheticize the anxiety.",
    'My work starts with images—the kind that look innocent until they start changing how you behave.',
    "I grew up between physical space and digital space. I don't fully trust either, but I use both professionally.",
    "I'm interested in visuals that act—images that don't just represent things, but quietly reorganize you.",
    "Games taught me that time isn't wasted just because it disappears. Capitalism disagrees. I sided with the games.",
    "In World of Warcraft, bugs weren't mistakes. They were frictions—and friction is where meaning sneaks in.",
    "When systems break, people talk. When everything works perfectly, no one remembers each other.",
    "My research lives in that space—between intention and automation, between what we want and what the interface lets us want.",
    "Posthuman theory helped me name the feeling: I was never working alone. The tools were shaping me back.",
    'Interfaces are not neutral. They choreograph bodies, attention, desire—and they do it while smiling.',
    'Dating apps figured this out early. Intimacy stopped being a destination and became a loop you are encouraged to stay inside.',
    'Desire turns into data. Scrolling turns into labor. You start moving at the speed the system prefers.',
    "At some point, you can't tell where your intention ends and the platform's rhythm begins. You feel connected, optimized, exhausted—and weirdly responsible for all of it.",
    "But here's the shift: I don't think this makes us less human. It just means humanity isn't where we thought it was.",
    "My work doesn't escape systems. It stays inside them long enough to learn their habits and sometimes trip them.",
    "What looks like wasted time—play, repetition, lingering—is often where meaning quietly forms.",
    'I design for that space. Where value is not efficient, but it sticks.',
    "If this all felt unresolved, that's intentional. Closure is usually a feature you're charged extra for.",
    "That's the end. Which is funny, because nothing here actually ends. You can click me again—I'll pretend it's the first time."
];

const CharacterCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [lineIndex, setLineIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const hideTimerRef = useRef<number | null>(null);
    const fadeTimerRef = useRef<number | null>(null);
    const currentLine = useMemo(() => chatLines[lineIndex], [lineIndex]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 420;
        canvas.height = 640;

        let frame = 0;
        let raf: number | null = null;
        const character = new Image();

        const drawFallback = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0d0d0d';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00d1ff';
            ctx.fillRect(canvas.width / 2 - 60, canvas.height / 2 - 120, 120, 240);
            ctx.fillStyle = '#ffffff';
            ctx.font = '16px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('sprite missing', canvas.width / 2, canvas.height / 2 + 150);
        };

        const draw = () => {
            frame += 1;
            const wobble = Math.sin(frame / 28) * 6;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const targetWidth = 260;
            const scale = targetWidth / character.width;
            const targetHeight = character.height * scale;
            const x = (canvas.width - targetWidth) / 2;
            const y = (canvas.height - targetHeight) / 2 + wobble;

            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(character, x, y, targetWidth, targetHeight);

            raf = requestAnimationFrame(draw);
        };

        character.onload = () => {
            draw();
        };

        character.onerror = () => {
            drawFallback();
        };

        character.src = CHARACTER_SRC;

        return () => {
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    const handleClick = () => {
        setLineIndex((prev) => (prev + 1) % chatLines.length);
        setIsVisible(true);
        setIsFading(false);
        if (hideTimerRef.current) {
            window.clearTimeout(hideTimerRef.current);
        }
        if (fadeTimerRef.current) {
            window.clearTimeout(fadeTimerRef.current);
        }
        fadeTimerRef.current = window.setTimeout(() => setIsFading(true), 3000);
        hideTimerRef.current = window.setTimeout(() => setIsVisible(false), 4000);
    };

    useEffect(() => {
        fadeTimerRef.current = window.setTimeout(() => setIsFading(true), 3000);
        hideTimerRef.current = window.setTimeout(() => setIsVisible(false), 4000);
        return () => {
            if (hideTimerRef.current) {
                window.clearTimeout(hideTimerRef.current);
            }
            if (fadeTimerRef.current) {
                window.clearTimeout(fadeTimerRef.current);
            }
        };
    }, []);

    return (
        <div className="character-canvas" aria-label="Pixel character canvas with chat" onClick={handleClick}>
            {isVisible && (
                <div className={`character-line${isFading ? ' character-line--fade' : ''}`} role="status">
                    {currentLine}
                </div>
            )}
            <canvas ref={canvasRef} className="character-canvas__surface" />
        </div>
    );
};

export default CharacterCanvas;