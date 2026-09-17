import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

type Asset = {
    src: string;
    label: string;
};

type EntryKind = 'images' | 'pdf' | 'page';

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
    "Collection '13' - Mattias Oblikas, Mantas Krikstaponis, József Száz.jpg",
    "Look  2 Collection '13' - Mattias Oblikas.jpg",
    "Look 1 Collection '13' - Mantas Krikstaponis.jpg",
    "Look 1 Collection '13' II - Mantas Krikstaponis.jpg",
    "Look 1 Collection '13' III 2023 Mantas Krikstaponis.jpg",
    "Look 2 Collection '13' II - Mattias Oblikas.jpg",
    "Look 2 Collection '13' IV - Mattias Oblikas.jpg",
    "Look 2 Collection '13'III - Mattias Oblikas.jpg",
    "Look 3 Collection '13' - József Száz.jpg",
    "Look 3 Collection '13' II - József Száz.jpg"
]);

const zeroPointOneAssets = buildAssets('Collection Zero Point One', [
    'Finale - Mantas Krikstaponis.jpg',
    'Future Self - Liwia Labuz.jpg',
    'Future Self II - Liwia Labuz.jpg',
    'Future Self Truth - Ramy Toma.jpg',
    'Self - Mathijs.jpg',
    'Self Finale - Mantas Krikstaponis and Ramy Toma.jpg',
    'Void Feminine I - Elle.jpg',
    'Void Feminine II - Elle.jpg'
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
        description: 'Photographed by Team Peter Stigter',
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
        id: 'portfolio-2026',
        title: 'View Portfolio 2026',
        description: 'Complete presentation with embedded motion',
        kind: 'page',
        assets: []
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
    },
    {
        id: 'contact-me',
        title: 'Contact Me',
        description: 'Send me a message',
        kind: 'images',
        assets: []
    }
];

const accentPhrases = ['Select a path to enter.', 'Escape closes any overlay.'];

const ShowcaseSelector: React.FC = () => {
    const history = useHistory();
    const [activeEntry, setActiveEntry] = useState<Entry | null>(null);
    const [showContactModal, setShowContactModal] = useState(false);
    const [contactForm, setContactForm] = useState({ email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    // Initialize form state
    useEffect(() => {
        // No initialization needed
    }, []);

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
                setShowContactModal(false);
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
                        onClick={() => {
                            if (entry.id === 'contact-me') {
                                setShowContactModal(true);
                            } else if (entry.kind === 'page') {
                                history.push('/portfolio-2026');
                            } else {
                                setActiveEntry(entry);
                            }
                        }}
                        aria-haspopup="dialog"
                        aria-label={entry.id === 'contact-me' ? entry.title : `${entry.title} (${entry.kind === 'images' ? 'images' : entry.kind === 'page' ? 'page' : 'PDF'})`}
                    >
                        <div className="selector__card-text">
                            <div className="selector__card-title">{entry.title}</div>
                            <div className="selector__card-desc">{entry.description}</div>
                        </div>
                        {entry.id !== 'contact-me' && <div className="pill">{entry.kind === 'images' ? 'Images' : entry.kind === 'page' ? 'Page' : 'PDF'}</div>}
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

            {showContactModal && (
                <div className="overlay" role="dialog" aria-modal="true" aria-label="Contact Me" onClick={() => setShowContactModal(false)}>
                    <div className="overlay__panel overlay__panel--contact" onClick={(event) => event.stopPropagation()}>
                        <div className="overlay__top">
                            <div>
                                <div className="overlay__eyebrow">Contact Form</div>
                                <div className="overlay__title">Send a Message</div>
                                <div className="overlay__subtitle">To Borderlion</div>
                            </div>
                            <button type="button" className="overlay__close" aria-label="Close" onClick={() => setShowContactModal(false)}>
                                X
                            </button>
                        </div>
                        <div className="overlay__body overlay__body--contact">
                            <form className="contact-form" onSubmit={async (e) => {
                                e.preventDefault();
                                setIsSubmitting(true);
                                setSubmitMessage(null);

                                try {
                                    const discordWebhookUrl = 'https://discord.com/api/webhooks/1460597168820846594/2UxLl35EUSXzNvvhM8yw7tI_8EVCZiK654lRCkqdWzgXUR_Yq3cD4R9fSRMpjWs_GD2M';
                                    
                                    const response = await fetch(discordWebhookUrl, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            content: '',
                                            embeds: [
                                                {
                                                    title: contactForm.subject,
                                                    description: contactForm.message,
                                                    color: 0x6cf4ff,
                                                    footer: {
                                                        text: 'Portfolio Contact Form'
                                                    },
                                                    timestamp: new Date().toISOString()
                                                }
                                            ]
                                        })
                                    });

                                    if (response.ok) {
                                        setSubmitMessage('Message sent successfully!');
                                        setContactForm({ email: '', subject: '', message: '' });
                                        
                                        setTimeout(() => {
                                            setShowContactModal(false);
                                            setSubmitMessage(null);
                                        }, 2000);
                                    } else {
                                        setSubmitMessage('Error sending message. Please try again.');
                                    }
                                } catch (error) {
                                    setSubmitMessage('Error sending message. Please try again.');
                                    console.error('Discord webhook error:', error);
                                } finally {
                                    setIsSubmitting(false);
                                }
                            }}>
                                <div className="form-group">
                                    <label htmlFor="contact-subject">Subject</label>
                                    <input
                                        type="text"
                                        id="contact-subject"
                                        value={contactForm.subject}
                                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                        required
                                        placeholder="What is this about?"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea
                                        id="contact-message"
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                        required
                                        placeholder="Your message..."
                                        rows={6}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {submitMessage && (
                                    <div className={`form-message ${submitMessage.includes('successfully') ? 'form-message--success' : 'form-message--error'}`}>
                                        {submitMessage}
                                    </div>
                                )}
                                <button 
                                    type="submit" 
                                    className="contact-submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowcaseSelector;