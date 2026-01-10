import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>
                <li>
                    <Link to="/research">Research</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <Link to="/textile-philosophy">Textile Philosophies</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;