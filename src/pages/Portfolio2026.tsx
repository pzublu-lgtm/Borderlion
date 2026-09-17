import React from 'react';
import { Link } from 'react-router-dom';

const presentationPath = `${process.env.PUBLIC_URL}/Portfolio/Portfolio.pptx`;
const presentationPdfPath = `${process.env.PUBLIC_URL}/Portfolio/portfolio-2026.pdf`;
const videoPath = `${process.env.PUBLIC_URL}/Portfolio/portfolio-video.mp4`;

const Portfolio2026: React.FC = () => {
    return (
        <main className="portfolio-page">
            <header className="portfolio-page__header">
                <div>
                    <div className="selector__eyebrow">Portfolio presentation</div>
                    <h1>Portfolio 2026</h1>
                    <p>Complete presentation with the original embedded motion preserved.</p>
                </div>
                <Link className="portfolio-page__back" to="/">
                    Back to portfolio
                </Link>
            </header>

            <section className="portfolio-page__presentation" aria-label="Portfolio 2026 presentation">
                <iframe
                    title="Portfolio 2026 presentation"
                    src={presentationPdfPath}
                    className="portfolio-page__viewer"
                />
                <p className="portfolio-page__fallback">
                    Browse the complete presentation above, then play the embedded motion below.
                </p>
            </section>

            <section className="portfolio-page__video" aria-label="Embedded portfolio video">
                <div>
                    <div className="selector__eyebrow">Embedded motion</div>
                    <h2>Portfolio video</h2>
                </div>
                <video className="portfolio-page__video-player" controls playsInline preload="metadata">
                    <source src={videoPath} type="video/mp4" />
                    Your browser does not support embedded video.
                </video>
            </section>

            <a className="portfolio-page__download" href={presentationPath} download>
                Download the original PowerPoint presentation
            </a>
        </main>
    );
};

export default Portfolio2026;