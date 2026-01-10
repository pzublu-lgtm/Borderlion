import React from 'react';
import ShowcaseSelector from '../components/Chatbox';
import CharacterCanvas from '../components/CharacterCanvas';

const Home: React.FC = () => {
    return (
        <div className="home-shell">
            <div className="hero">
                <div className="hero__visual">
                    <CharacterCanvas />
                </div>
                <div className="hero__panel">
                    <ShowcaseSelector />
                </div>
            </div>
        </div>
    );
};

export default Home;