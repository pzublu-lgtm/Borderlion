import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Asset = {
    src: string;
    label: string;
};

type EntryKind = 'images' | 'pdf';

type Entry = {
    id: string;
    title: string;
    description: string;
    kind: EntryKind;
    assets: Asset[];
};

const buildAssets = (folder: string, files: string[]): Asset[] =>
    files.map((file) => ({
        src: encodeURI(`${process.env.PUBLIC_URL}/${folder}/${file}`),
        label: file.replace(/\.[^.]+$/, '')
    }));

const collection13Assets = buildAssets('Collection 13', [
    "Collection '13' - 2023 Mattias Oblikas, Mantas Krikstaponis, Joci.jpg",
    "Look  2 Collection '13' - 2023 Mattias Oblikas.jpg",
    "Look 1 Collection '13' - 2023 Mantas Krikstaponis.jpg",
    "Look 1 Collection '13' II 2023 Mantas Krikstaponis.jpg",
    "Look 1 Collection '13' III 2023 Mantas Krikstaponis.jpg",
    "Look 2 Collection '13' II - 2023 Mattias Oblikas.jpg",
    "Look 2 Collection '13' IV - 2023 Mattias Oblikas.jpg",
    "Look 2 Collection '13'III - 2023 Mattias Oblikas.jpg",
    "Look 3 Collection '13' - 2023 Joci.jpg",
    "Look 3 Collection '13' II - 2023 Joci.jpg"
]);

const zeroPointOneAssets = buildAssets('Collection Zero Point One', [
    'Finale.jpg',
    'Future Self II.jpg',
    'Future Self Truth.jpg',
    'Future Self.jpg',
    'Self Finale.jpg',
    'Self.jpg',
    'Void Feminine I.jpg',
    'Void Feminine II.jpg'
]);

const processAssets = buildAssets(
    'Working Notes',
    Array.from({ length: 27 }, (_, index) => `Ramy Toma (Specialization Collections Process 2021-2022)-images-${index}.jpg`)
);

const zeroPointOneBookAssets = buildAssets('Zero Point One - The Book', ['0.1 The Book.pdf']);
const zeroPointOneProcessAssets = buildAssets('Zero Point One - The Process', ['Zero Point One - The Process.pdf']);

const entries: Entry[] = [
    {
        id: 'collection-13',
        title: 'View Collection 13',
        description: 'Photographed by Jaap van der Does',
        kind: 'images',
        assets: collection13Assets
    },
    {
        id: 'collection-zero-point-one',
        title: 'View Collection Zero Point One',
        description: 'A/W 2024 fashion collection imagery',
        kind: 'images',
        assets: zeroPointOneAssets
    },
    {
        id: 'process-images',
        title: 'View Process Images',
        description: 'Behind-the-scenes process photography',
        kind: 'images',
        assets: processAssets
    },
    {
        id: 'zero-point-one-book',
        title: 'View Zero Point One - The Book',
        description: 'Lookbook PDF for collection 0.1',
        kind: 'pdf',
        assets: zeroPointOneBookAssets
    },
    {
        id: 'zero-point-one-process',
        title: 'View Zero Point One - The Process',
        description: 'Process PDF for collection 0.1',
        kind: 'pdf',
        assets: zeroPointOneProcessAssets
    },
    {
        id: 'research-performative-being',
        title: 'View Research: Examining a Posthuman Understanding of Performative Being',
        description: 'Research PDF overlay',
        kind: 'pdf',
        assets: buildAssets('Research', ['Examining a Posthuman Understanding of Performative Being.pdf'])
    },
    {
        id: 'research-roles-human-nonhuman',
        title: 'View Research: Examining Roles of Human and Non-Human in an Anti-Anthropocentric Context',
        description: 'Research PDF overlay',
        kind: 'pdf',
        assets: buildAssets('Research', ['Examining Roles of Human and Non-Human in an Anti-Anthropocentric Context.pdf'])
    },
    {
        id: 'research-posthuman-intimacy',
        title: 'View Research: Posthuman Intimacy - Reconfiguring Desire and Connection in Digital Ecosystems',
        description: 'Research PDF overlay',
        kind: 'pdf',
        assets: buildAssets('Research', ['Posthuman Intimacy - Reconfiguring Desire and Connection in Digital Ecosystems.pdf'])
    }
];

const accentPhrases = ['Select a path to enter.', 'Escape closes any overlay.'];

const ShowcaseSelector: React.FC = () => {
    const [activeEntry, setActiveEntry] = useState<Entry | null>(null);
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    const accentText = useMemo(() => accentPhrases[Math.floor(Math.random() * accentPhrases.length)], []);

    const scrollByStep = useCallback(
        (direction: 1 | -1) => {
            if (!scrollerRef.current) return;
            const step = scrollerRef.current.clientWidth * 0.8;
            scrollerRef.current.scrollBy({ left: direction * step, behavior: 'smooth' });
        },
        []
    );

    useEffect(() => {
        if (activeEntry?.kind === 'images' && scrollerRef.current) {
            scrollerRef.current.scrollTo({ left: 0, behavior: 'auto' });
        }
    }, [activeEntry]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveEntry(null);
            }
            if (activeEntry?.kind === 'images') {
                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    scrollByStep(1);
                }
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    scrollByStep(-1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeEntry, scrollByStep]);

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        if (activeEntry?.kind !== 'images') return;
        const container = scrollerRef.current;
        if (!container) return;
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.preventDefault();
            container.scrollBy({ left: event.deltaY, behavior: 'smooth' });
        }
    };

    const closeOverlay = () => setActiveEntry(null);

    const renderOverlayContent = () => {
        if (!activeEntry) return null;

        if (activeEntry.kind === 'images') {
            return (
                <div className="overlay__body">
                    <div className="overlay__carousel" ref={scrollerRef} onWheel={handleWheel}>
                        {activeEntry.assets.map((asset) => (
                            <figure key={asset.src} className="overlay__figure">
                                <img className="overlay__img" src={asset.src} alt={asset.label} loading="lazy" />
                                <figcaption className="overlay__caption">{asset.label}</figcaption>
                            </figure>
                        ))}
                    </div>
                    <div className="overlay__controls">
                        <button type="button" onClick={() => scrollByStep(-1)} aria-label="Scroll left">
                            Prev
                        </button>
                        <button type="button" onClick={() => scrollByStep(1)} aria-label="Scroll right">
                            Next
                        </button>
                    </div>
                </div>
            );
        }

        const pdf = activeEntry.assets[0];
        return (
            <div className="overlay__body overlay__body--pdf">
                <iframe title={activeEntry.title} className="overlay__pdf" src={pdf.src} />
                <div className="overlay__caption">{pdf.label}</div>
            </div>
        );
    };

    return (
        <div className="selector" aria-label="Portfolio content selector">
            <div className="selector__header">
                <div>
                    <div className="selector__eyebrow">Digital Assistant</div>
                    <div className="selector__title">Choose what to explore</div>
                    <div className="selector__subtitle">Collections, process, and research displayed in immersive overlays.</div>
                </div>
            </div>
            <div className="selector__grid">
                {entries.map((entry) => (
                    <button
                        key={entry.id}
                        className="selector__card"
                        onClick={() => setActiveEntry(entry)}
                        aria-haspopup="dialog"
                        aria-label={`${entry.title} (${entry.kind === 'images' ? 'images' : 'PDF'})`}
                    >
                        <div className="selector__card-text">
                            <div className="selector__card-title">{entry.title}</div>
                            <div className="selector__card-desc">{entry.description}</div>
                        </div>
                        <div className="pill">{entry.kind === 'images' ? 'Images' : 'PDF'}</div>
                    </button>
                ))}
            </div>

            {activeEntry && (
                <div className="overlay" role="dialog" aria-modal="true" aria-label={activeEntry.title} onClick={closeOverlay}>
                    <div className="overlay__panel" onClick={(event) => event.stopPropagation()}>
                        <div className="overlay__top">
                            <div>
                                <div className="overlay__eyebrow">{activeEntry.kind === 'images' ? 'Image roll' : 'PDF viewer'}</div>
                                <div className="overlay__title">{activeEntry.title}</div>
                                <div className="overlay__subtitle">{activeEntry.description}</div>
                            </div>
                            <button type="button" className="overlay__close" aria-label="Close" onClick={closeOverlay}>
                                X
                            </button>
                        </div>
                        {renderOverlayContent()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowcaseSelector;