import React from 'react';

const ResearchList: React.FC = () => {
    const researchTopics = [
        { title: 'Sustainable Textiles', link: '#' },
        { title: 'Digital Fabrication Techniques', link: '#' },
        { title: 'Textile Waste Management', link: '#' },
        { title: 'Innovations in Textile Design', link: '#' },
        { title: 'Cultural Significance of Textiles', link: '#' },
    ];

    return (
        <div className="research-list">
            <h2>Research Topics</h2>
            <ul>
                {researchTopics.map((topic, index) => (
                    <li key={index}>
                        <a href={topic.link}>{topic.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResearchList;